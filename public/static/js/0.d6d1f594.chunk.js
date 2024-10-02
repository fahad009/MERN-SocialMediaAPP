/*! For license information please see 0.d6d1f594.chunk.js.LICENSE.txt */
(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[0],{670:function(e,t,r){"use strict";var n=r(9),o=r(2),i=r(20),a=r(61),s="firebasestorage.googleapis.com",u=function(e){function t(r,n){var o=e.call(this,U(r),"Firebase Storage: "+n+" ("+U(r)+")")||this;return o.customData={serverResponse:null},Object.setPrototypeOf(o,t.prototype),o}return Object(o.c)(t,e),t.prototype.codeEquals=function(e){return U(e)===this.code},Object.defineProperty(t.prototype,"message",{get:function(){return this.customData.serverResponse?this.message+"\n"+this.customData.serverResponse:this.message},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"serverResponse",{get:function(){return this.customData.serverResponse},set:function(e){this.customData.serverResponse=e},enumerable:!1,configurable:!0}),t}(i.c),c="unknown",l="object-not-found",h="quota-exceeded",f="unauthenticated",p="unauthorized",d="retry-limit-exceeded",_="canceled",g="invalid-url",b="invalid-default-bucket",v="no-default-bucket",m="cannot-slice-blob",y="server-file-wrong-size",w="no-download-url",R="invalid-argument",k="app-deleted",T="invalid-root-operation",O="invalid-format",x="internal-error",P="unsupported-environment";function U(e){return"storage/"+e}function S(){return new u(c,"An unknown error occurred, please check the error payload for server response.")}function C(){return new u(_,"User canceled the upload/download.")}function E(){return new u(m,"Cannot slice blob for upload. Please retry the upload.")}function A(e){return new u(R,e)}function j(){return new u(k,"The Firebase app was deleted.")}function I(e){return new u(T,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function q(e,t){return new u(O,"String does not match format '"+e+"': "+t)}function L(e){throw new u(x,"Internal error: "+e)}var N={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"},B=function(e,t){this.data=e,this.contentType=t||null};function M(e,t){switch(e){case N.RAW:return new B(D(t));case N.BASE64:case N.BASE64URL:return new B(z(e,t));case N.DATA_URL:return new B(function(e){var t=new H(e);return t.base64?z(N.BASE64,t.rest):function(e){var t;try{t=decodeURIComponent(e)}catch(r){throw q(N.DATA_URL,"Malformed data URL.")}return D(t)}(t.rest)}(t),new H(t).contentType)}throw S()}function D(e){for(var t=[],r=0;r<e.length;r++){var n=e.charCodeAt(r);if(n<=127)t.push(n);else if(n<=2047)t.push(192|n>>6,128|63&n);else if(55296===(64512&n))if(r<e.length-1&&56320===(64512&e.charCodeAt(r+1)))n=65536|(1023&n)<<10|1023&e.charCodeAt(++r),t.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|63&n);else t.push(239,191,189);else 56320===(64512&n)?t.push(239,191,189):t.push(224|n>>12,128|n>>6&63,128|63&n)}return new Uint8Array(t)}function z(e,t){switch(e){case N.BASE64:var r=-1!==t.indexOf("-"),n=-1!==t.indexOf("_");if(r||n)throw q(e,"Invalid character '"+(r?"-":"_")+"' found: is it base64url encoded?");break;case N.BASE64URL:var o=-1!==t.indexOf("+"),i=-1!==t.indexOf("/");if(o||i)throw q(e,"Invalid character '"+(o?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/")}var a;try{a=atob(t)}catch(c){throw q(e,"Invalid character found")}for(var s=new Uint8Array(a.length),u=0;u<a.length;u++)s[u]=a.charCodeAt(u);return s}var H=function(e){this.base64=!1,this.contentType=null;var t=e.match(/^data:([^,]+)?,/);if(null===t)throw q(N.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");var r=t[1]||null;null!=r&&(this.base64=(n=r,o=";base64",n.length>=o.length&&n.substring(n.length-o.length)===o),this.contentType=this.base64?r.substring(0,r.length-";base64".length):r),this.rest=e.substring(e.indexOf(",")+1);var n,o};var F,X={STATE_CHANGED:"state_changed"},G="running",W="pausing",K="paused",V="success",J="canceling",Z="canceled",$="error",Y={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function Q(e){switch(e){case G:case W:case J:return Y.RUNNING;case K:return Y.PAUSED;case V:return Y.SUCCESS;case Z:return Y.CANCELED;case $:default:return Y.ERROR}}!function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"}(F||(F={}));var ee=function(){function e(){var e=this;this.sent_=!1,this.xhr_=new XMLHttpRequest,this.errorCode_=F.NO_ERROR,this.sendPromise_=new Promise((function(t){e.xhr_.addEventListener("abort",(function(){e.errorCode_=F.ABORT,t(e)})),e.xhr_.addEventListener("error",(function(){e.errorCode_=F.NETWORK_ERROR,t(e)})),e.xhr_.addEventListener("load",(function(){t(e)}))}))}return e.prototype.send=function(e,t,r,n){if(this.sent_)throw L("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),void 0!==n)for(var o in n)n.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,n[o].toString());return void 0!==r?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_},e.prototype.getErrorCode=function(){if(!this.sent_)throw L("cannot .getErrorCode() before sending");return this.errorCode_},e.prototype.getStatus=function(){if(!this.sent_)throw L("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return-1}},e.prototype.getResponseText=function(){if(!this.sent_)throw L("cannot .getResponseText() before sending");return this.xhr_.responseText},e.prototype.abort=function(){this.xhr_.abort()},e.prototype.getResponseHeader=function(e){return this.xhr_.getResponseHeader(e)},e.prototype.addUploadProgressListener=function(e){null!=this.xhr_.upload&&this.xhr_.upload.addEventListener("progress",e)},e.prototype.removeUploadProgressListener=function(e){null!=this.xhr_.upload&&this.xhr_.upload.removeEventListener("progress",e)},e}(),te=function(){function e(){}return e.prototype.createXhrIo=function(){return new ee},e}();function re(e){return"string"===typeof e||e instanceof String}function ne(e){return oe()&&e instanceof Blob}function oe(){return"undefined"!==typeof Blob}function ie(e,t,r,n){if(n<t)throw new u(R,"Invalid value for '"+e+"'. Expected "+t+" or greater.");if(n>r)throw new u(R,"Invalid value for '"+e+"'. Expected "+r+" or less.")}function ae(){return"undefined"!==typeof BlobBuilder?BlobBuilder:"undefined"!==typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0}function se(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r=ae();if(void 0!==r){for(var n=new r,o=0;o<e.length;o++)n.append(e[o]);return n.getBlob()}if(oe())return new Blob(e);throw new u(P,"This browser doesn't seem to support creating Blobs")}var ue=function(){function e(e,t){var r=0,n="";ne(e)?(this.data_=e,r=e.size,n=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=n}return e.prototype.size=function(){return this.size_},e.prototype.type=function(){return this.type_},e.prototype.slice=function(t,r){if(ne(this.data_)){var n=function(e,t,r){return e.webkitSlice?e.webkitSlice(t,r):e.mozSlice?e.mozSlice(t,r):e.slice?e.slice(t,r):null}(this.data_,t,r);return null===n?null:new e(n)}return new e(new Uint8Array(this.data_.buffer,t,r-t),!0)},e.getBlob=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];if(oe()){var n=t.map((function(t){return t instanceof e?t.data_:t}));return new e(se.apply(null,n))}var o=t.map((function(e){return re(e)?M(N.RAW,e).data:e.data_})),i=0;o.forEach((function(e){i+=e.byteLength}));var a=new Uint8Array(i),s=0;return o.forEach((function(e){for(var t=0;t<e.length;t++)a[s++]=e[t]})),new e(a,!0)},e.prototype.uploadData=function(){return this.data_},e}(),ce=function(){function e(e,t){this.bucket=e,this.path_=t}return Object.defineProperty(e.prototype,"path",{get:function(){return this.path_},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isRoot",{get:function(){return 0===this.path.length},enumerable:!1,configurable:!0}),e.prototype.fullServerUrl=function(){var e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)},e.prototype.bucketOnlyServerUrl=function(){return"/b/"+encodeURIComponent(this.bucket)+"/o"},e.makeFromBucketSpec=function(t){var r;try{r=e.makeFromUrl(t)}catch(n){return new e(t,"")}if(""===r.path)return r;throw new u(b,"Invalid default bucket '"+t+"'.")},e.makeFromUrl=function(t){var r=null,n="([A-Za-z0-9.\\-_]+)";var o=new RegExp("^gs://"+n+"(/(.*))?$","i");function i(e){e.path_=decodeURIComponent(e.path)}for(var a=s.replace(/[.]/g,"\\."),c=[{regex:o,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:new RegExp("^https?://"+a+"/v[A-Za-z0-9_]+/b/"+n+"/o(/([^?#]*).*)?$","i"),indices:{bucket:1,path:3},postModify:i},{regex:new RegExp("^https?://(?:storage.googleapis.com|storage.cloud.google.com)/"+n+"/([^?#]*)","i"),indices:{bucket:1,path:2},postModify:i}],l=0;l<c.length;l++){var h=c[l],f=h.regex.exec(t);if(f){var p=f[h.indices.bucket],d=f[h.indices.path];d||(d=""),r=new e(p,d),h.postModify(r);break}}if(null==r)throw function(e){return new u(g,"Invalid URL '"+e+"'.")}(t);return r},e}();function le(e){var t,r;try{t=JSON.parse(e)}catch(n){return null}return"object"!==typeof(r=t)||Array.isArray(r)?null:t}function he(e){var t=e.lastIndexOf("/",e.length-2);return-1===t?e:e.slice(t+1)}function fe(e){return"https://"+s+"/v0"+e}function pe(e){var t=encodeURIComponent,r="?";for(var n in e){if(e.hasOwnProperty(n))r=r+(t(n)+"="+t(e[n]))+"&"}return r=r.slice(0,-1)}function de(e,t){return t}var _e=function(e,t,r,n){this.server=e,this.local=t||e,this.writable=!!r,this.xform=n||de},ge=null;function be(){if(ge)return ge;var e=[];e.push(new _e("bucket")),e.push(new _e("generation")),e.push(new _e("metageneration")),e.push(new _e("name","fullPath",!0));var t=new _e("name");t.xform=function(e,t){return function(e){return!re(e)||e.length<2?e:he(e)}(t)},e.push(t);var r=new _e("size");return r.xform=function(e,t){return void 0!==t?Number(t):t},e.push(r),e.push(new _e("timeCreated")),e.push(new _e("updated")),e.push(new _e("md5Hash",null,!0)),e.push(new _e("cacheControl",null,!0)),e.push(new _e("contentDisposition",null,!0)),e.push(new _e("contentEncoding",null,!0)),e.push(new _e("contentLanguage",null,!0)),e.push(new _e("contentType",null,!0)),e.push(new _e("metadata","customMetadata",!0)),ge=e}function ve(e,t,r){for(var n={type:"file"},o=r.length,i=0;i<o;i++){var a=r[i];n[a.local]=a.xform(n,t[a.server])}return function(e,t){Object.defineProperty(e,"ref",{get:function(){var r=e.bucket,n=e.fullPath,o=new ce(r,n);return t.makeStorageReference(o)}})}(n,e),n}function me(e,t,r){var n=le(t);return null===n?null:ve(e,n,r)}function ye(e,t){for(var r={},n=t.length,o=0;o<n;o++){var i=t[o];i.writable&&(r[i.server]=e[i.local])}return JSON.stringify(r)}function we(e,t,r){var n=le(r);return null===n?null:function(e,t,r){var n={prefixes:[],items:[],nextPageToken:r.nextPageToken};if(r.prefixes)for(var o=0,i=r.prefixes;o<i.length;o++){var a=i[o].replace(/\/$/,""),s=e.makeStorageReference(new ce(t,a));n.prefixes.push(s)}if(r.items)for(var u=0,c=r.items;u<c.length;u++){var l=c[u];s=e.makeStorageReference(new ce(t,l.name)),n.items.push(s)}return n}(e,t,n)}var Re=function(e,t,r,n){this.url=e,this.method=t,this.handler=r,this.timeout=n,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]};function ke(e){if(!e)throw S()}function Te(e,t){return function(r,n){var o=me(e,n,t);return ke(null!==o),o}}function Oe(e,t){return function(r,n){var o=me(e,n,t);return ke(null!==o),function(e,t){var r=le(t);if(null===r)return null;if(!re(r.downloadTokens))return null;var n=r.downloadTokens;if(0===n.length)return null;var o=encodeURIComponent;return n.split(",").map((function(t){var r=e.bucket,n=e.fullPath;return fe("/b/"+o(r)+"/o/"+o(n))+pe({alt:"media",token:t})}))[0]}(o,n)}}function xe(e){return function(t,r){var n,o,i;return 401===t.getStatus()?n=new u(f,"User is not authenticated, please authenticate using Firebase Authentication and try again."):402===t.getStatus()?(i=e.bucket,n=new u(h,"Quota for bucket '"+i+"' exceeded, please view quota on https://firebase.google.com/pricing/.")):403===t.getStatus()?(o=e.path,n=new u(p,"User does not have permission to access '"+o+"'.")):n=r,n.serverResponse=r.serverResponse,n}}function Pe(e){var t=xe(e);return function(r,n){var o,i=t(r,n);return 404===r.getStatus()&&(o=e.path,i=new u(l,"Object '"+o+"' does not exist.")),i.serverResponse=n.serverResponse,i}}function Ue(e,t,r){var n=fe(t.fullServerUrl()),o=e.maxOperationRetryTime,i=new Re(n,"GET",Te(e,r),o);return i.errorHandler=Pe(t),i}function Se(e,t,r,n,o){var i={};t.isRoot?i.prefix="":i.prefix=t.path+"/",r&&r.length>0&&(i.delimiter=r),n&&(i.pageToken=n),o&&(i.maxResults=o);var a=fe(t.bucketOnlyServerUrl()),s=e.maxOperationRetryTime,u=new Re(a,"GET",function(e,t){return function(r,n){var o=we(e,t,n);return ke(null!==o),o}}(e,t.bucket),s);return u.urlParams=i,u.errorHandler=xe(t),u}function Ce(e,t,r){var n=Object.assign({},r);return n.fullPath=e.path,n.size=t.size(),n.contentType||(n.contentType=function(e,t){return e&&e.contentType||t&&t.type()||"application/octet-stream"}(null,t)),n}var Ee=function(e,t,r,n){this.current=e,this.total=t,this.finalized=!!r,this.metadata=n||null};function Ae(e,t){var r=null;try{r=e.getResponseHeader("X-Goog-Upload-Status")}catch(n){ke(!1)}return ke(!!r&&-1!==(t||["active"]).indexOf(r)),r}var je=262144;function Ie(e,t,r,n,o,i,a,s){var c=new Ee(0,0);if(a?(c.current=a.current,c.total=a.total):(c.current=0,c.total=n.size()),n.size()!==c.total)throw new u(y,"Server recorded incorrect upload file size, please retry the upload.");var l=c.total-c.current,h=l;o>0&&(h=Math.min(h,o));var f=c.current,p=f+h,d={"X-Goog-Upload-Command":h===l?"upload, finalize":"upload","X-Goog-Upload-Offset":c.current},_=n.slice(f,p);if(null===_)throw E();var g=t.maxUploadRetryTime,b=new Re(r,"POST",(function(e,r){var o,a=Ae(e,["active","final"]),s=c.current+h,u=n.size();return o="final"===a?Te(t,i)(e,r):null,new Ee(s,u,"final"===a,o)}),g);return b.headers=d,b.body=_.uploadData(),b.progressCallback=s||null,b.errorHandler=xe(e),b}var qe=function(e,t,r){if("function"===typeof e||null!=t||null!=r)this.next=e,this.error=t,this.complete=r;else{var n=e;this.next=n.next,this.error=n.error,this.complete=n.complete}},Le=function(e,t,r,n,o,i){this.bytesTransferred=e,this.totalBytes=t,this.state=r,this.metadata=n,this.task=o,this.ref=i};function Ne(e){return function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];Promise.resolve().then((function(){return e.apply(void 0,t)}))}}var Be=function(){function e(e,t,r){var n=this;void 0===r&&(r=null),this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=t,this._metadata=r,this._mappings=be(),this._resumable=this._shouldDoResumable(this._blob),this._state=G,this._errorHandler=function(e){n._request=void 0,n._chunkMultiplier=1,e.codeEquals(_)?(n._needToFetchStatus=!0,n.completeTransitions_()):(n._error=e,n._transition($))},this._metadataErrorHandler=function(e){n._request=void 0,e.codeEquals(_)?n.completeTransitions_():(n._error=e,n._transition($))},this._promise=new Promise((function(e,t){n._resolve=e,n._reject=t,n._start()})),this._promise.then(null,(function(){}))}return e.prototype._makeProgressCallback=function(){var e=this,t=this._transferred;return function(r){return e._updateProgress(t+r)}},e.prototype._shouldDoResumable=function(e){return e.size()>262144},e.prototype._start=function(){this._state===G&&void 0===this._request&&(this._resumable?void 0===this._uploadUrl?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this._continueUpload():this._oneShotUpload())},e.prototype._resolveToken=function(e){var t=this;this._ref.storage.getAuthToken().then((function(r){switch(t._state){case G:e(r);break;case J:t._transition(Z);break;case W:t._transition(K)}}))},e.prototype._createResumable=function(){var e=this;this._resolveToken((function(t){var r=function(e,t,r,n,o){var i=t.bucketOnlyServerUrl(),a=Ce(t,n,o),s={name:a.fullPath},u=fe(i),c={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":n.size(),"X-Goog-Upload-Header-Content-Type":a.contentType,"Content-Type":"application/json; charset=utf-8"},l=ye(a,r),h=e.maxUploadRetryTime,f=new Re(u,"POST",(function(e){var t;Ae(e);try{t=e.getResponseHeader("X-Goog-Upload-URL")}catch(r){ke(!1)}return ke(re(t)),t}),h);return f.urlParams=s,f.headers=c,f.body=l,f.errorHandler=xe(t),f}(e._ref.storage,e._ref._location,e._mappings,e._blob,e._metadata),n=e._ref.storage.makeRequest(r,t);e._request=n,n.getPromise().then((function(t){e._request=void 0,e._uploadUrl=t,e._needToFetchStatus=!1,e.completeTransitions_()}),e._errorHandler)}))},e.prototype._fetchStatus=function(){var e=this,t=this._uploadUrl;this._resolveToken((function(r){var n=function(e,t,r,n){var o=e.maxUploadRetryTime,i=new Re(r,"POST",(function(e){var t=Ae(e,["active","final"]),r=null;try{r=e.getResponseHeader("X-Goog-Upload-Size-Received")}catch(i){ke(!1)}r||ke(!1);var o=Number(r);return ke(!isNaN(o)),new Ee(o,n.size(),"final"===t)}),o);return i.headers={"X-Goog-Upload-Command":"query"},i.errorHandler=xe(t),i}(e._ref.storage,e._ref._location,t,e._blob),o=e._ref.storage.makeRequest(n,r);e._request=o,o.getPromise().then((function(t){t=t,e._request=void 0,e._updateProgress(t.current),e._needToFetchStatus=!1,t.finalized&&(e._needToFetchMetadata=!0),e.completeTransitions_()}),e._errorHandler)}))},e.prototype._continueUpload=function(){var e=this,t=je*this._chunkMultiplier,r=new Ee(this._transferred,this._blob.size()),n=this._uploadUrl;this._resolveToken((function(o){var i;try{i=Ie(e._ref._location,e._ref.storage,n,e._blob,t,e._mappings,r,e._makeProgressCallback())}catch(s){return e._error=s,void e._transition($)}var a=e._ref.storage.makeRequest(i,o);e._request=a,a.getPromise().then((function(t){e._increaseMultiplier(),e._request=void 0,e._updateProgress(t.current),t.finalized?(e._metadata=t.metadata,e._transition(V)):e.completeTransitions_()}),e._errorHandler)}))},e.prototype._increaseMultiplier=function(){je*this._chunkMultiplier<33554432&&(this._chunkMultiplier*=2)},e.prototype._fetchMetadata=function(){var e=this;this._resolveToken((function(t){var r=Ue(e._ref.storage,e._ref._location,e._mappings),n=e._ref.storage.makeRequest(r,t);e._request=n,n.getPromise().then((function(t){e._request=void 0,e._metadata=t,e._transition(V)}),e._metadataErrorHandler)}))},e.prototype._oneShotUpload=function(){var e=this;this._resolveToken((function(t){var r=function(e,t,r,n,o){var i=t.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"},s=function(){for(var e="",t=0;t<2;t++)e+=Math.random().toString().slice(2);return e}();a["Content-Type"]="multipart/related; boundary="+s;var u=Ce(t,n,o),c="--"+s+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+ye(u,r)+"\r\n--"+s+"\r\nContent-Type: "+u.contentType+"\r\n\r\n",l="\r\n--"+s+"--",h=ue.getBlob(c,n,l);if(null===h)throw E();var f={name:u.fullPath},p=fe(i),d=e.maxUploadRetryTime,_=new Re(p,"POST",Te(e,r),d);return _.urlParams=f,_.headers=a,_.body=h.uploadData(),_.errorHandler=xe(t),_}(e._ref.storage,e._ref._location,e._mappings,e._blob,e._metadata),n=e._ref.storage.makeRequest(r,t);e._request=n,n.getPromise().then((function(t){e._request=void 0,e._metadata=t,e._updateProgress(e._blob.size()),e._transition(V)}),e._errorHandler)}))},e.prototype._updateProgress=function(e){var t=this._transferred;this._transferred=e,this._transferred!==t&&this._notifyObservers()},e.prototype._transition=function(e){if(this._state!==e)switch(e){case J:case W:this._state=e,void 0!==this._request&&this._request.cancel();break;case G:var t=this._state===K;this._state=e,t&&(this._notifyObservers(),this._start());break;case K:this._state=e,this._notifyObservers();break;case Z:this._error=C(),this._state=e,this._notifyObservers();break;case $:case V:this._state=e,this._notifyObservers()}},e.prototype.completeTransitions_=function(){switch(this._state){case W:this._transition(K);break;case J:this._transition(Z);break;case G:this._start()}},Object.defineProperty(e.prototype,"snapshot",{get:function(){var e=Q(this._state);return new Le(this._transferred,this._blob.size(),e,this._metadata,this,this._ref)},enumerable:!1,configurable:!0}),e.prototype.on=function(e,t,r,n){var o=this,i=new qe(t,r,n);return this._addObserver(i),function(){o._removeObserver(i)}},e.prototype.then=function(e,t){return this._promise.then(e,t)},e.prototype.catch=function(e){return this.then(null,e)},e.prototype._addObserver=function(e){this._observers.push(e),this._notifyObserver(e)},e.prototype._removeObserver=function(e){var t=this._observers.indexOf(e);-1!==t&&this._observers.splice(t,1)},e.prototype._notifyObservers=function(){var e=this;this._finishPromise(),this._observers.slice().forEach((function(t){e._notifyObserver(t)}))},e.prototype._finishPromise=function(){if(void 0!==this._resolve){var e=!0;switch(Q(this._state)){case Y.SUCCESS:Ne(this._resolve.bind(null,this.snapshot))();break;case Y.CANCELED:case Y.ERROR:Ne(this._reject.bind(null,this._error))();break;default:e=!1}e&&(this._resolve=void 0,this._reject=void 0)}},e.prototype._notifyObserver=function(e){switch(Q(this._state)){case Y.RUNNING:case Y.PAUSED:e.next&&Ne(e.next.bind(e,this.snapshot))();break;case Y.SUCCESS:e.complete&&Ne(e.complete.bind(e))();break;case Y.CANCELED:case Y.ERROR:e.error&&Ne(e.error.bind(e,this._error))();break;default:e.error&&Ne(e.error.bind(e,this._error))()}},e.prototype.resume=function(){var e=this._state===K||this._state===W;return e&&this._transition(G),e},e.prototype.pause=function(){var e=this._state===G;return e&&this._transition(W),e},e.prototype.cancel=function(){var e=this._state===G||this._state===W;return e&&this._transition(J),e},e}(),Me=function(){function e(e,t){this._service=e,this._location=t instanceof ce?t:ce.makeFromUrl(t)}return e.prototype.toString=function(){return"gs://"+this._location.bucket+"/"+this._location.path},e.prototype.newRef=function(t,r){return new e(t,r)},Object.defineProperty(e.prototype,"root",{get:function(){var e=new ce(this._location.bucket,"");return this.newRef(this._service,e)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"bucket",{get:function(){return this._location.bucket},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"fullPath",{get:function(){return this._location.path},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"name",{get:function(){return he(this._location.path)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"storage",{get:function(){return this._service},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"parent",{get:function(){var t=function(e){if(0===e.length)return null;var t=e.lastIndexOf("/");return-1===t?"":e.slice(0,t)}(this._location.path);if(null===t)return null;var r=new ce(this._location.bucket,t);return new e(this._service,r)},enumerable:!1,configurable:!0}),e.prototype._throwIfRoot=function(e){if(""===this._location.path)throw I(e)},e}();function De(e){var t={prefixes:[],items:[]};return ze(e,t).then((function(){return t}))}function ze(e,t,r){return Object(o.b)(this,void 0,void 0,(function(){var n,i,a;return Object(o.d)(this,(function(o){switch(o.label){case 0:return[4,He(e,{pageToken:r})];case 1:return n=o.sent(),(i=t.prefixes).push.apply(i,n.prefixes),(a=t.items).push.apply(a,n.items),null==n.nextPageToken?[3,3]:[4,ze(e,t,n.nextPageToken)];case 2:o.sent(),o.label=3;case 3:return[2]}}))}))}function He(e,t){return Object(o.b)(this,void 0,void 0,(function(){var r,n,i;return Object(o.d)(this,(function(o){switch(o.label){case 0:return null!=t&&"number"===typeof t.maxResults&&ie("options.maxResults",1,1e3,t.maxResults),[4,e.storage.getAuthToken()];case 1:return r=o.sent(),n=t||{},i=Se(e.storage,e._location,"/",n.pageToken,n.maxResults),[2,e.storage.makeRequest(i,r).getPromise()]}}))}))}function Fe(e,t){return Object(o.b)(this,void 0,void 0,(function(){var r,n;return Object(o.d)(this,(function(o){switch(o.label){case 0:return e._throwIfRoot("updateMetadata"),[4,e.storage.getAuthToken()];case 1:return r=o.sent(),n=function(e,t,r,n){var o=fe(t.fullServerUrl()),i=ye(r,n),a=e.maxOperationRetryTime,s=new Re(o,"PATCH",Te(e,n),a);return s.headers={"Content-Type":"application/json; charset=utf-8"},s.body=i,s.errorHandler=Pe(t),s}(e.storage,e._location,t,be()),[2,e.storage.makeRequest(n,r).getPromise()]}}))}))}function Xe(e){return Object(o.b)(this,void 0,void 0,(function(){var t,r;return Object(o.d)(this,(function(n){switch(n.label){case 0:return e._throwIfRoot("getDownloadURL"),[4,e.storage.getAuthToken()];case 1:return t=n.sent(),r=function(e,t,r){var n=fe(t.fullServerUrl()),o=e.maxOperationRetryTime,i=new Re(n,"GET",Oe(e,r),o);return i.errorHandler=Pe(t),i}(e.storage,e._location,be()),[2,e.storage.makeRequest(r,t).getPromise().then((function(e){if(null===e)throw new u(w,"The given file does not have any download URLs.");return e}))]}}))}))}function Ge(e){return Object(o.b)(this,void 0,void 0,(function(){var t,r;return Object(o.d)(this,(function(n){switch(n.label){case 0:return e._throwIfRoot("deleteObject"),[4,e.storage.getAuthToken()];case 1:return t=n.sent(),r=function(e,t){var r=fe(t.fullServerUrl()),n=e.maxOperationRetryTime,o=new Re(r,"DELETE",(function(e,t){}),n);return o.successCodes=[200,204],o.errorHandler=Pe(t),o}(e.storage,e._location),[2,e.storage.makeRequest(r,t).getPromise()]}}))}))}function We(e,t){var r=function(e,t){var r=t.split("/").filter((function(e){return e.length>0})).join("/");return 0===e.length?r:e+"/"+r}(e._location.path,t),n=new ce(e._location.bucket,r);return new Me(e.storage,n)}var Ke=function(){function e(e,t,r){this._delegate=e,this.task=t,this.ref=r}return Object.defineProperty(e.prototype,"bytesTransferred",{get:function(){return this._delegate.bytesTransferred},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"metadata",{get:function(){return this._delegate.metadata},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"state",{get:function(){return this._delegate.state},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"totalBytes",{get:function(){return this._delegate.totalBytes},enumerable:!1,configurable:!0}),e}(),Ve=function(){function e(e,t){this._delegate=e,this._ref=t,this.cancel=this._delegate.cancel.bind(this._delegate),this.catch=this._delegate.catch.bind(this._delegate),this.pause=this._delegate.pause.bind(this._delegate),this.resume=this._delegate.resume.bind(this._delegate),this._snapshot=new Ke(this._delegate.snapshot,this,this._ref)}return Object.defineProperty(e.prototype,"snapshot",{get:function(){return this._snapshot},enumerable:!1,configurable:!0}),e.prototype.then=function(e,t){var r=this;return this._delegate.then((function(t){if(e)return e(new Ke(t,r,r._ref))}),t)},e.prototype.on=function(e,t,r,n){var o=this,i=void 0;return t&&(i="function"===typeof t?function(e){return t(new Ke(e,o,o._ref))}:{next:t.next?function(e){return t.next(new Ke(e,o,o._ref))}:void 0,complete:t.complete||void 0,error:t.error||void 0}),this._delegate.on(e,i,r||void 0,n||void 0)},e}(),Je=function(){function e(e,t){this._delegate=e,this._service=t}return Object.defineProperty(e.prototype,"prefixes",{get:function(){var e=this;return this._delegate.prefixes.map((function(t){return new Ze(t,e._service)}))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"items",{get:function(){var e=this;return this._delegate.items.map((function(t){return new Ze(t,e._service)}))},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"nextPageToken",{get:function(){return this._delegate.nextPageToken||null},enumerable:!1,configurable:!0}),e}(),Ze=function(){function e(e,t){this._delegate=e,this.storage=t}return Object.defineProperty(e.prototype,"name",{get:function(){return this._delegate.name},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"bucket",{get:function(){return this._delegate.bucket},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"fullPath",{get:function(){return this._delegate.fullPath},enumerable:!1,configurable:!0}),e.prototype.toString=function(){return this._delegate.toString()},e.prototype.child=function(t){return new e(We(this._delegate,t),this.storage)},Object.defineProperty(e.prototype,"root",{get:function(){return new e(this._delegate.root,this.storage)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"parent",{get:function(){var t=this._delegate.parent;return null==t?null:new e(t,this.storage)},enumerable:!1,configurable:!0}),e.prototype.put=function(e,t){return this._throwIfRoot("put"),new Ve(function(e,t,r){return void 0===r&&(r=null),e._throwIfRoot("uploadBytesResumable"),new Be(e,new ue(t),r)}(this._delegate,e,t),this)},e.prototype.putString=function(e,t,r){return void 0===t&&(t=N.RAW),this._throwIfRoot("putString"),new Ve(function(e,t,r,n){void 0===r&&(r=N.RAW),e._throwIfRoot("putString");var i=M(r,t),a=Object(o.a)({},n);return null==a.contentType&&null!=i.contentType&&(a.contentType=i.contentType),new Be(e,new ue(i.data,!0),a)}(this._delegate,e,t,r),this)},e.prototype.listAll=function(){var e=this;return De(this._delegate).then((function(t){return new Je(t,e.storage)}))},e.prototype.list=function(e){var t=this;return He(this._delegate,e).then((function(e){return new Je(e,t.storage)}))},e.prototype.getMetadata=function(){return function(e){return Object(o.b)(this,void 0,void 0,(function(){var t,r;return Object(o.d)(this,(function(n){switch(n.label){case 0:return e._throwIfRoot("getMetadata"),[4,e.storage.getAuthToken()];case 1:return t=n.sent(),r=Ue(e.storage,e._location,be()),[2,e.storage.makeRequest(r,t).getPromise()]}}))}))}(this._delegate)},e.prototype.updateMetadata=function(e){return Fe(this._delegate,e)},e.prototype.getDownloadURL=function(){return Xe(this._delegate)},e.prototype.delete=function(){return this._throwIfRoot("delete"),Ge(this._delegate)},e.prototype._throwIfRoot=function(e){if(""===this._delegate._location.path)throw I(e)},e}(),$e=function(){function e(e){this.promise_=Promise.reject(e)}return e.prototype.getPromise=function(){return this.promise_},e.prototype.cancel=function(e){},e}();var Ye=function(){function e(e,t,r,n,o,i,a,s,u,c,l){var h=this;this.pendingXhr_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.url_=e,this.method_=t,this.headers_=r,this.body_=n,this.successCodes_=o.slice(),this.additionalRetryCodes_=i.slice(),this.callback_=a,this.errorCallback_=s,this.progressCallback_=c,this.timeout_=u,this.pool_=l,this.promise_=new Promise((function(e,t){h.resolve_=e,h.reject_=t,h.start_()}))}return e.prototype.start_=function(){var e=this;function t(t,r){var n,o=e.resolve_,i=e.reject_,a=r.xhr;if(r.wasSuccessCode)try{var s=e.callback_(a,a.getResponseText());void 0!==s?o(s):o()}catch(c){i(c)}else null!==a?((n=S()).serverResponse=a.getResponseText(),e.errorCallback_?i(e.errorCallback_(a,n)):i(n)):r.canceled?i(n=e.appDelete_?j():C()):i(n=new u(d,"Max retry time for operation exceeded, please try again."))}this.canceled_?t(0,new Qe(!1,null,!0)):this.backoffId_=function(e,t,r){var n=1,i=null,a=!1,s=0;function u(){return 2===s}var c=!1;function l(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];c||(c=!0,t.apply(null,e))}function h(t){i=setTimeout((function(){i=null,e(f,u())}),t)}function f(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];if(!c)if(e)l.call.apply(l,Object(o.g)([null,e],t));else{var i;u()||a?l.call.apply(l,Object(o.g)([null,e],t)):(n<64&&(n*=2),1===s?(s=2,i=0):i=1e3*(n+Math.random()),h(i))}}var p=!1;function d(e){p||(p=!0,c||(null!==i?(e||(s=2),clearTimeout(i),h(0)):e||(s=1)))}return h(0),setTimeout((function(){a=!0,d(!0)}),r),d}((function(t,r){if(r)t(!1,new Qe(!1,null,!0));else{var n=e.pool_.createXhrIo();e.pendingXhr_=n,null!==e.progressCallback_&&n.addUploadProgressListener(o),n.send(e.url_,e.method_,e.body_,e.headers_).then((function(r){null!==e.progressCallback_&&r.removeUploadProgressListener(o),e.pendingXhr_=null;var n=(r=r).getErrorCode()===F.NO_ERROR,i=r.getStatus();if(n&&!e.isRetryStatusCode_(i)){var a=-1!==e.successCodes_.indexOf(i);t(!0,new Qe(a,r))}else{var s=r.getErrorCode()===F.ABORT;t(!1,new Qe(!1,null,s))}}))}function o(t){var r=t.loaded,n=t.lengthComputable?t.total:-1;null!==e.progressCallback_&&e.progressCallback_(r,n)}}),t,this.timeout_)},e.prototype.getPromise=function(){return this.promise_},e.prototype.cancel=function(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&(0,this.backoffId_)(!1),null!==this.pendingXhr_&&this.pendingXhr_.abort()},e.prototype.isRetryStatusCode_=function(e){var t=e>=500&&e<600,r=-1!==[408,429].indexOf(e),n=-1!==this.additionalRetryCodes_.indexOf(e);return t||r||n},e}(),Qe=function(e,t,r){this.wasSuccessCode=e,this.xhr=t,this.canceled=!!r};function et(e,t,r,o){var i=pe(e.urlParams),a=e.url+i,s=Object.assign({},e.headers);return function(e,t){t&&(e["X-Firebase-GMPID"]=t)}(s,t),function(e,t){null!==t&&t.length>0&&(e.Authorization="Firebase "+t)}(s,r),function(e){var t="undefined"!==typeof n.a?n.a.SDK_VERSION:"AppManager";e["X-Firebase-Storage-Version"]="webjs/"+t}(s),new Ye(a,e.method,s,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,o)}function tt(e){return/^[A-Za-z]+:\/\//.test(e)}function rt(e,t){if(e instanceof ot){var r=e;if(null==r._bucket)throw new u(v,"No default bucket found. Did you set the 'storageBucket' property when initializing the app?");var n=new Me(r,r._bucket);return null!=t?rt(n,t):n}if(void 0!==t){if(t.includes(".."))throw A('`path` param cannot contain ".."');return We(e,t)}return e}function nt(e,t){if(t&&tt(t)){if(e instanceof ot)return new Me(e,t);throw A("To use ref(service, url), the first argument must be a Storage instance.")}return rt(e,t)}var ot=function(){function e(e,t,r,n){this.app=e,this._authProvider=t,this._pool=r,this._url=n,this._bucket=null,this._appId=null,this._deleted=!1,this._maxOperationRetryTime=12e4,this._maxUploadRetryTime=6e5,this._requests=new Set,this._bucket=null!=n?ce.makeFromBucketSpec(n):function(e){var t=null===e||void 0===e?void 0:e.storageBucket;return null==t?null:ce.makeFromBucketSpec(t)}(this.app.options)}return Object.defineProperty(e.prototype,"maxUploadRetryTime",{get:function(){return this._maxUploadRetryTime},set:function(e){ie("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"maxOperationRetryTime",{get:function(){return this._maxOperationRetryTime},set:function(e){ie("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e},enumerable:!1,configurable:!0}),e.prototype.getAuthToken=function(){return Object(o.b)(this,void 0,void 0,(function(){var e,t;return Object(o.d)(this,(function(r){switch(r.label){case 0:return(e=this._authProvider.getImmediate({optional:!0}))?[4,e.getToken()]:[3,2];case 1:if(null!==(t=r.sent()))return[2,t.accessToken];r.label=2;case 2:return[2,null]}}))}))},e.prototype._delete=function(){return this._deleted=!0,this._requests.forEach((function(e){return e.cancel()})),this._requests.clear(),Promise.resolve()},e.prototype.makeStorageReference=function(e){return new Me(this,e)},e.prototype.makeRequest=function(e,t){var r=this;if(this._deleted)return new $e(j());var n=et(e,this._appId,t,this._pool);return this._requests.add(n),n.getPromise().then((function(){return r._requests.delete(n)}),(function(){return r._requests.delete(n)})),n},e}(),it=function(){function e(e,t){var r=this;this.app=e,this._delegate=t,this.INTERNAL={delete:function(){return r._delegate._delete()}}}return Object.defineProperty(e.prototype,"maxOperationRetryTime",{get:function(){return this._delegate.maxOperationRetryTime},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"maxUploadRetryTime",{get:function(){return this._delegate.maxUploadRetryTime},enumerable:!1,configurable:!0}),e.prototype.ref=function(e){if(tt(e))throw A("ref() expected a child path but got a URL, use refFromURL instead.");return new Ze(nt(this._delegate,e),this)},e.prototype.refFromURL=function(e){if(!tt(e))throw A("refFromURL() expected a full URL but got a child path, use ref() instead.");try{ce.makeFromUrl(e)}catch(t){throw A("refFromUrl() expected a valid full URL but got an invalid one.")}return new Ze(nt(this._delegate,e),this)},e.prototype.setMaxUploadRetryTime=function(e){this._delegate.maxUploadRetryTime=e},e.prototype.setMaxOperationRetryTime=function(e){this._delegate.maxOperationRetryTime=e},e}();function at(e,t){var r=e.getProvider("app").getImmediate(),n=e.getProvider("auth-internal");return new it(r,new ot(r,n,new te,t))}!function(e){var t={TaskState:Y,TaskEvent:X,StringFormat:N,Storage:ot,Reference:Ze};e.INTERNAL.registerComponent(new a.a("storage",at,"PUBLIC").setServiceProps(t).setMultipleInstances(!0)),e.registerVersion("@firebase/storage","0.4.2")}(n.a)}}]);
//# sourceMappingURL=0.d6d1f594.chunk.js.map