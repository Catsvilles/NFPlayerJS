/*
 * Copyright (c) 2018-Present, Spotify AB.
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import * as React from 'react';
import {
  SmartPlayer,
  TimeInstant,
  ScriptProcessorRenderer
} from '../../../src';
import { XAudioContext } from '../../../src/WebAudioContext';

import { JSONEditor } from './JSONEditor/JSONEditor';
import { CODEEditor } from './CODEEditor/CODEEditor';
import { WaveVisualizer } from './WaveVisualizer/WaveVisualizer';
import styled from 'styled-components';
import { DemoTheme } from './Theme';
import { Score } from 'nf-grapher';
import {
  VerticalFitArea,
  VerticalFixedSection,
  VerticalExpandableSection
} from './VerticalLayout';

const StyledApplication = styled.div`
  font-family: ${DemoTheme.fontFamily};
  color: #000;
  font-size: ${DemoTheme.bodyFontSize};
  height: 100%;
`;

enum Panels {
  CODE,
  JSON,
  VISUALIZER
}

// https://webaudio.github.io/web-audio-api/#AnalyserNode-attributes
const defaultAnalyserOptions = {
  smoothingTimeConstant: 0.8,
  fftSize: 2048,
  minDecibels: -100,
  maxDecibels: -30
};

const initialAppState = {
  panel: Panels.CODE,
  player: new SmartPlayer(),
  analyser: XAudioContext().createAnalyser()
};

type AppState = Readonly<typeof initialAppState>;
type AppProps = {};

export class App extends React.Component<AppProps, AppState> {
  readonly state: AppState = initialAppState;

  switchPanel(to: Panels) {
    if (this.state.player.playing) {
      this.state.player.playing = false;
    }

    this.state.player.renderTime = TimeInstant.ZERO;
    this.state.player.setJson(JSON.stringify(new Score()));

    let nextRenderer;
    let analyser;
    if (to === Panels.VISUALIZER) {
      const context = XAudioContext();
      analyser = new AnalyserNode(context, defaultAnalyserOptions);
      analyser.connect(context.destination);
      nextRenderer = new ScriptProcessorRenderer(context, undefined);

      // FFT analyzer - note that processor is a private property
      nextRenderer.processor.connect(analyser);
    } else {
      // SmashEditor needs a much smaller quantum in order to
      // feel responsive when triggering one-shots!
      nextRenderer = new ScriptProcessorRenderer(undefined, undefined);
    }

    const nextPlayer = new SmartPlayer(nextRenderer);
    const nextState = {
      panel: to,
      player: nextPlayer
    };

    // typescript type guard
    if (analyser !== undefined) {
      this.setState({
        ...nextState,
        analyser
      });
    } else {
      this.setState(nextState);
    }
  }

  componentDidUpdate() {
    (window as any).p = this.state.player;
  }

  render() {
    const { panel, player, analyser } = this.state;

    return (
      <StyledApplication>
        <VerticalFitArea>
          <VerticalFixedSection>
            <button onClick={() => this.switchPanel(Panels.CODE)}>
              {panel === Panels.CODE && '>'} CODE EDITOR
            </button>
            <button onClick={() => this.switchPanel(Panels.JSON)}>
              {panel === Panels.JSON && '>'} JSON
            </button>
            <button onClick={() => this.switchPanel(Panels.VISUALIZER)}>
              {panel === Panels.VISUALIZER && '>'} VISUALIZER
            </button>
          </VerticalFixedSection>
          <VerticalExpandableSection>
            {panel === Panels.JSON && <JSONEditor player={player} />}
            {panel === Panels.CODE && <CODEEditor player={player} />}
            {panel === Panels.VISUALIZER && (
              <WaveVisualizer player={player} analyser={analyser} />
            )}
          </VerticalExpandableSection>
        </VerticalFitArea>
      </StyledApplication>
    );
  }
}
