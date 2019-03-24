parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"1TWu":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.WorkerManager=void 0;var e=function(){function e(e,t){var r=this;this._modeId=e,this._defaults=t,this._worker=null,this._idleCheckInterval=setInterval(function(){return r._checkIfIdle()},3e4),this._lastUsedTime=0,this._configChangeListener=this._defaults.onDidChange(function(){return r._stopWorker()})}return e.prototype._stopWorker=function(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null},e.prototype.dispose=function(){clearInterval(this._idleCheckInterval),this._configChangeListener.dispose(),this._stopWorker()},e.prototype._checkIfIdle=function(){if(this._worker){var e=this._defaults.getWorkerMaxIdleTime(),t=Date.now()-this._lastUsedTime;e>0&&t>e&&this._stopWorker()}},e.prototype._getClient=function(){var e=this;if(this._lastUsedTime=Date.now(),!this._client){this._worker=monaco.editor.createWebWorker({moduleId:"vs/language/typescript/tsWorker",label:this._modeId,createData:{compilerOptions:this._defaults.getCompilerOptions(),extraLibs:this._defaults.getExtraLibs()}});var t=this._worker.getProxy();this._defaults.getEagerModelSync()&&(t=t.then(function(t){return e._worker.withSyncedResources(monaco.editor.getModels().filter(function(t){return t.getModeId()===e._modeId}).map(function(e){return e.uri}))})),this._client=t}return this._client},e.prototype.getLanguageServiceWorker=function(){for(var e,t=this,r=[],i=0;i<arguments.length;i++)r[i]=arguments[i];return this._getClient().then(function(t){e=t}).then(function(e){return t._worker.withSyncedResources(r)}).then(function(t){return e})},e}();exports.WorkerManager=e;
},{}],"PKyG":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.FormatOnTypeAdapter=exports.FormatAdapter=exports.FormatHelper=exports.Kind=exports.OutlineAdapter=exports.ReferenceAdapter=exports.DefinitionAdapter=exports.OccurrencesAdapter=exports.QuickInfoAdapter=exports.SignatureHelpAdapter=exports.SuggestAdapter=exports.DiagnostcsAdapter=exports.Adapter=void 0;var e,t=function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),n=monaco.Uri,r=monaco.Promise;function o(e,t){if("string"==typeof e)return e;for(var n=e,r="",o=0;n;){if(o){r+=t;for(var i=0;i<o;i++)r+="  "}r+=n.messageText,o++,n=n.next}return r}function i(e){return e?e.map(function(e){return e.text}).join(""):""}!function(e){e[e.None=0]="None",e[e.Block=1]="Block",e[e.Smart=2]="Smart"}(e||(e={}));var a=function(){function e(e){this._worker=e}return e.prototype._positionToOffset=function(e,t){return monaco.editor.getModel(e).getOffsetAt(t)},e.prototype._offsetToPosition=function(e,t){return monaco.editor.getModel(e).getPositionAt(t)},e.prototype._textSpanToRange=function(e,t){var n=this._offsetToPosition(e,t.start),r=this._offsetToPosition(e,t.start+t.length);return{startLineNumber:n.lineNumber,startColumn:n.column,endLineNumber:r.lineNumber,endColumn:r.column}},e}();exports.Adapter=a;var s=function(e){function n(t,n,r){var o=e.call(this,r)||this;o._defaults=t,o._selector=n,o._disposables=[],o._listener=Object.create(null);var i=function(e){if(e.getModeId()===n){var t,r=e.onDidChangeContent(function(){clearTimeout(t),t=setTimeout(function(){return o._doValidate(e.uri)},500)});o._listener[e.uri.toString()]={dispose:function(){r.dispose(),clearTimeout(t)}},o._doValidate(e.uri)}},a=function(e){monaco.editor.setModelMarkers(e,o._selector,[]);var t=e.uri.toString();o._listener[t]&&(o._listener[t].dispose(),delete o._listener[t])};return o._disposables.push(monaco.editor.onDidCreateModel(i)),o._disposables.push(monaco.editor.onWillDisposeModel(a)),o._disposables.push(monaco.editor.onDidChangeModelLanguage(function(e){a(e.model),i(e.model)})),o._disposables.push({dispose:function(){for(var e=0,t=monaco.editor.getModels();e<t.length;e++){var n=t[e];a(n)}}}),o._disposables.push(o._defaults.onDidChange(function(){for(var e=0,t=monaco.editor.getModels();e<t.length;e++){var n=t[e];a(n),i(n)}})),monaco.editor.getModels().forEach(i),o}return t(n,e),n.prototype.dispose=function(){this._disposables.forEach(function(e){return e&&e.dispose()}),this._disposables=[]},n.prototype._doValidate=function(e){var t=this;this._worker(e).then(function(n){if(!monaco.editor.getModel(e))return null;var o=[],i=t._defaults.getDiagnosticsOptions(),a=i.noSyntaxValidation,s=i.noSemanticValidation;return a||o.push(n.getSyntacticDiagnostics(e.toString())),s||o.push(n.getSemanticDiagnostics(e.toString())),r.join(o)}).then(function(n){if(!n||!monaco.editor.getModel(e))return null;var r=n.reduce(function(e,t){return t.concat(e)},[]).map(function(n){return t._convertDiagnostics(e,n)});monaco.editor.setModelMarkers(monaco.editor.getModel(e),t._selector,r)}).then(void 0,function(e){console.error(e)})},n.prototype._convertDiagnostics=function(e,t){var n=this._offsetToPosition(e,t.start),r=n.lineNumber,i=n.column,a=this._offsetToPosition(e,t.start+t.length),s=a.lineNumber,u=a.column;return{severity:monaco.MarkerSeverity.Error,startLineNumber:r,startColumn:i,endLineNumber:s,endColumn:u,message:o(t.messageText,"\n")}},n}(a);exports.DiagnostcsAdapter=s;var u=function(e){function n(){return null!==e&&e.apply(this,arguments)||this}return t(n,e),Object.defineProperty(n.prototype,"triggerCharacters",{get:function(){return["."]},enumerable:!0,configurable:!0}),n.prototype.provideCompletionItems=function(e,t,r,o){e.getWordUntilPosition(t);var i=e.uri,a=this._positionToOffset(i,t);return this._worker(i).then(function(e){return e.getCompletionsAtPosition(i.toString(),a)}).then(function(e){if(e)return{suggestions:e.entries.map(function(e){return{uri:i,position:t,label:e.name,insertText:e.name,sortText:e.sortText,kind:n.convertKind(e.kind)}})}})},n.prototype.resolveCompletionItem=function(e,t,r,o){var a=this,s=r,u=s.uri,c=s.position;return this._worker(u).then(function(e){return e.getCompletionEntryDetails(u.toString(),a._positionToOffset(u,c),s.label)}).then(function(e){return e?{uri:u,position:c,label:e.name,kind:n.convertKind(e.kind),detail:i(e.displayParts),documentation:{value:i(e.documentation)}}:s})},n.convertKind=function(e){switch(e){case d.primitiveType:case d.keyword:return monaco.languages.CompletionItemKind.Keyword;case d.variable:case d.localVariable:return monaco.languages.CompletionItemKind.Variable;case d.memberVariable:case d.memberGetAccessor:case d.memberSetAccessor:return monaco.languages.CompletionItemKind.Field;case d.function:case d.memberFunction:case d.constructSignature:case d.callSignature:case d.indexSignature:return monaco.languages.CompletionItemKind.Function;case d.enum:return monaco.languages.CompletionItemKind.Enum;case d.module:return monaco.languages.CompletionItemKind.Module;case d.class:return monaco.languages.CompletionItemKind.Class;case d.interface:return monaco.languages.CompletionItemKind.Interface;case d.warning:return monaco.languages.CompletionItemKind.File}return monaco.languages.CompletionItemKind.Property},n}(a);exports.SuggestAdapter=u;var c=function(e){function n(){var t=null!==e&&e.apply(this,arguments)||this;return t.signatureHelpTriggerCharacters=["(",","],t}return t(n,e),n.prototype.provideSignatureHelp=function(e,t,n){var r=this,o=e.uri;return this._worker(o).then(function(e){return e.getSignatureHelpItems(o.toString(),r._positionToOffset(o,t))}).then(function(e){if(e){var t={activeSignature:e.selectedItemIndex,activeParameter:e.argumentIndex,signatures:[]};return e.items.forEach(function(e){var n={label:"",documentation:null,parameters:[]};n.label+=i(e.prefixDisplayParts),e.parameters.forEach(function(t,r,o){var a=i(t.displayParts),s={label:a,documentation:i(t.documentation)};n.label+=a,n.parameters.push(s),r<o.length-1&&(n.label+=i(e.separatorDisplayParts))}),n.label+=i(e.suffixDisplayParts),t.signatures.push(n)}),t}})},n}(a);exports.SignatureHelpAdapter=c;var l=function(e){function n(){return null!==e&&e.apply(this,arguments)||this}return t(n,e),n.prototype.provideHover=function(e,t,n){var r=this,o=e.uri;return this._worker(o).then(function(e){return e.getQuickInfoAtPosition(o.toString(),r._positionToOffset(o,t))}).then(function(e){if(e){var t=i(e.documentation),n=e.tags?e.tags.map(function(e){var t="*@"+e.name+"*";return e.text?t+(e.text.match(/\r\n|\n/g)?" \n"+e.text:" - "+e.text):t}).join("  \n\n"):"",a=i(e.displayParts);return{range:r._textSpanToRange(o,e.textSpan),contents:[{value:"```js\n"+a+"\n```\n"},{value:t+(n?"\n\n"+n:"")}]}}})},n}(a);exports.QuickInfoAdapter=l;var p=function(e){function n(){return null!==e&&e.apply(this,arguments)||this}return t(n,e),n.prototype.provideDocumentHighlights=function(e,t,n){var r=this,o=e.uri;return this._worker(o).then(function(e){return e.getOccurrencesAtPosition(o.toString(),r._positionToOffset(o,t))}).then(function(e){if(e)return e.map(function(e){return{range:r._textSpanToRange(o,e.textSpan),kind:e.isWriteAccess?monaco.languages.DocumentHighlightKind.Write:monaco.languages.DocumentHighlightKind.Text}})})},n}(a);exports.OccurrencesAdapter=p;var m=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return t(r,e),r.prototype.provideDefinition=function(e,t,r){var o=this,i=e.uri;return this._worker(i).then(function(e){return e.getDefinitionAtPosition(i.toString(),o._positionToOffset(i,t))}).then(function(e){if(e){for(var t=[],r=0,i=e;r<i.length;r++){var a=i[r],s=n.parse(a.fileName);monaco.editor.getModel(s)&&t.push({uri:s,range:o._textSpanToRange(s,a.textSpan)})}return t}})},r}(a);exports.DefinitionAdapter=m;var f=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return t(r,e),r.prototype.provideReferences=function(e,t,r,o){var i=this,a=e.uri;return this._worker(a).then(function(e){return e.getReferencesAtPosition(a.toString(),i._positionToOffset(a,t))}).then(function(e){if(e){for(var t=[],r=0,o=e;r<o.length;r++){var a=o[r],s=n.parse(a.fileName);monaco.editor.getModel(s)&&t.push({uri:s,range:i._textSpanToRange(s,a.textSpan)})}return t}})},r}(a);exports.ReferenceAdapter=f;var g=function(e){function n(){return null!==e&&e.apply(this,arguments)||this}return t(n,e),n.prototype.provideDocumentSymbols=function(e,t){var n=this,r=e.uri;return this._worker(r).then(function(e){return e.getNavigationBarItems(r.toString())}).then(function(e){if(e){var t=function(e,o,i){var a={name:o.text,detail:"",kind:h[o.kind]||monaco.languages.SymbolKind.Variable,range:n._textSpanToRange(r,o.spans[0]),selectionRange:n._textSpanToRange(r,o.spans[0]),containerName:i};if(o.childItems&&o.childItems.length>0)for(var s=0,u=o.childItems;s<u.length;s++){var c=u[s];t(e,c,a.name)}e.push(a)},o=[];return e.forEach(function(e){return t(o,e)}),o}})},n}(a);exports.OutlineAdapter=g;var d=function(){function e(){}return e.unknown="",e.keyword="keyword",e.script="script",e.module="module",e.class="class",e.interface="interface",e.type="type",e.enum="enum",e.variable="var",e.localVariable="local var",e.function="function",e.localFunction="local function",e.memberFunction="method",e.memberGetAccessor="getter",e.memberSetAccessor="setter",e.memberVariable="property",e.constructorImplementation="constructor",e.callSignature="call",e.indexSignature="index",e.constructSignature="construct",e.parameter="parameter",e.typeParameter="type parameter",e.primitiveType="primitive type",e.label="label",e.alias="alias",e.const="const",e.let="let",e.warning="warning",e}();exports.Kind=d;var h=Object.create(null);h[d.module]=monaco.languages.SymbolKind.Module,h[d.class]=monaco.languages.SymbolKind.Class,h[d.enum]=monaco.languages.SymbolKind.Enum,h[d.interface]=monaco.languages.SymbolKind.Interface,h[d.memberFunction]=monaco.languages.SymbolKind.Method,h[d.memberVariable]=monaco.languages.SymbolKind.Property,h[d.memberGetAccessor]=monaco.languages.SymbolKind.Property,h[d.memberSetAccessor]=monaco.languages.SymbolKind.Property,h[d.variable]=monaco.languages.SymbolKind.Variable,h[d.const]=monaco.languages.SymbolKind.Variable,h[d.localVariable]=monaco.languages.SymbolKind.Variable,h[d.variable]=monaco.languages.SymbolKind.Variable,h[d.function]=monaco.languages.SymbolKind.Function,h[d.localFunction]=monaco.languages.SymbolKind.Function;var v=function(n){function r(){return null!==n&&n.apply(this,arguments)||this}return t(r,n),r._convertOptions=function(t){return{ConvertTabsToSpaces:t.insertSpaces,TabSize:t.tabSize,IndentSize:t.tabSize,IndentStyle:e.Smart,NewLineCharacter:"\n",InsertSpaceAfterCommaDelimiter:!0,InsertSpaceAfterSemicolonInForStatements:!0,InsertSpaceBeforeAndAfterBinaryOperators:!0,InsertSpaceAfterKeywordsInControlFlowStatements:!0,InsertSpaceAfterFunctionKeywordForAnonymousFunctions:!0,InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis:!1,InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets:!1,InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces:!1,PlaceOpenBraceOnNewLineForControlBlocks:!1,PlaceOpenBraceOnNewLineForFunctions:!1}},r.prototype._convertTextChanges=function(e,t){return{text:t.newText,range:this._textSpanToRange(e,t.span)}},r}(a);exports.FormatHelper=v;var y=function(e){function n(){return null!==e&&e.apply(this,arguments)||this}return t(n,e),n.prototype.provideDocumentRangeFormattingEdits=function(e,t,n,r){var o=this,i=e.uri;return this._worker(i).then(function(e){return e.getFormattingEditsForRange(i.toString(),o._positionToOffset(i,{lineNumber:t.startLineNumber,column:t.startColumn}),o._positionToOffset(i,{lineNumber:t.endLineNumber,column:t.endColumn}),v._convertOptions(n))}).then(function(e){if(e)return e.map(function(e){return o._convertTextChanges(i,e)})})},n}(v);exports.FormatAdapter=y;var b=function(e){function n(){return null!==e&&e.apply(this,arguments)||this}return t(n,e),Object.defineProperty(n.prototype,"autoFormatTriggerCharacters",{get:function(){return[";","}","\n"]},enumerable:!0,configurable:!0}),n.prototype.provideOnTypeFormattingEdits=function(e,t,n,r,o){var i=this,a=e.uri;return this._worker(a).then(function(e){return e.getFormattingEditsAfterKeystroke(a.toString(),i._positionToOffset(a,t),n,v._convertOptions(r))}).then(function(e){if(e)return e.map(function(e){return i._convertTextChanges(a,e)})})},n}(v);exports.FormatOnTypeAdapter=b;
},{}],"wBzX":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.setupTypeScript=a,exports.setupJavaScript=i,exports.getJavaScriptWorker=g,exports.getTypeScriptWorker=c;var e,r,t=require("./workerManager.js"),n=o(require("./languageFeatures.js"));function o(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t)){var n=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,t):{};n.get||n.set?Object.defineProperty(r,t,n):r[t]=e[t]}return r.default=e,r}function a(e){r=u(e,"typescript")}function i(r){e=u(r,"javascript")}function g(){return new monaco.Promise(function(r,t){if(!e)return t("JavaScript not registered!");r(e)})}function c(){return new monaco.Promise(function(e,t){if(!r)return t("TypeScript not registered!");e(r)})}function u(e,r){var o=new t.WorkerManager(r,e),a=function(e){for(var r=[],t=1;t<arguments.length;t++)r[t-1]=arguments[t];return o.getLanguageServiceWorker.apply(o,[e].concat(r))};return monaco.languages.registerCompletionItemProvider(r,new n.SuggestAdapter(a)),monaco.languages.registerSignatureHelpProvider(r,new n.SignatureHelpAdapter(a)),monaco.languages.registerHoverProvider(r,new n.QuickInfoAdapter(a)),monaco.languages.registerDocumentHighlightProvider(r,new n.OccurrencesAdapter(a)),monaco.languages.registerDefinitionProvider(r,new n.DefinitionAdapter(a)),monaco.languages.registerReferenceProvider(r,new n.ReferenceAdapter(a)),monaco.languages.registerDocumentSymbolProvider(r,new n.OutlineAdapter(a)),monaco.languages.registerDocumentRangeFormattingEditProvider(r,new n.FormatAdapter(a)),monaco.languages.registerOnTypeFormattingEditProvider(r,new n.FormatOnTypeAdapter(a)),new n.DiagnostcsAdapter(e,r,a),a}
},{"./workerManager.js":"1TWu","./languageFeatures.js":"PKyG"}]},{},["wBzX"], null)
//# sourceMappingURL=tsMode.a7f3cfe4.js.map