(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[24],{674:function(e,t,s){},693:function(e,t,s){"use strict";s.r(t);var n=s(129),c=s.n(n),a=s(77),i=s(669),r=s(187),o=s(186),l=s(182),u=s(183),h=s(185),d=s(184),b=s(1),j=s(677),p=s.n(j),m=(s(674),s(179)),f=s(58),x=s(62),O=(s(666),s(405),s(128)),g=s(732),v=s(27),w="_dev",R=null,S=x.a.storage(),k=function(e){Object(h.a)(s,e);var t=Object(d.a)(s);function s(e){var n;return Object(l.a)(this,s),(n=t.call(this,e)).getFiles=function(e){return new Promise((function(t,s){S.ref(e).listAll().then((function(e){var s=[];e.items.forEach((function(e){s.push(e.fullPath)})),t(s)})).catch((function(e){Object(O.d)(O.a.ERROR,e.toString()),t([])}))}))},n.onTextChange=function(e){var t=e.currentTarget;n.setState(Object(o.a)({},t.name,t.value))},n.onSwitchChange=function(e){var t=e.currentTarget;n.setState(Object(o.a)({},t.name,t.checked))},n.onImageChange=function(e){e.target.files[0]&&n.getImagePreview(e.target.files[0]).then((function(t){n.setState(Object(o.a)({},e.target.name,{file:e.target.files[0],preview:t}))}))},n.onAssetsChange=function(){var e=Object(r.a)(c.a.mark((function e(t){var s,r,o,l,u;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s=[],r=Object(i.a)(t.target.files),e.prev=2,r.s();case 4:if((o=r.n()).done){e.next=17;break}if(l=o.value,u=null,"video/mp4"!==l.type){e.next=11;break}u="",e.next=14;break;case 11:return e.next=13,n.getImagePreview(l);case 13:u=e.sent;case 14:s.push({file:l,preview:u,path:null,delete:!1});case 15:e.next=4;break;case 17:e.next=22;break;case 19:e.prev=19,e.t0=e.catch(2),r.e(e.t0);case 22:return e.prev=22,r.f(),e.finish(22);case 25:s.length>0&&n.setState({assets:[].concat(Object(a.a)(n.state.assets),s)});case 26:case"end":return e.stop()}}),e,null,[[2,19,22,25]])})));return function(t){return e.apply(this,arguments)}}(),n.removeAsset=function(e){var t=Object(a.a)(n.state.assets);t.forEach((function(t){t.preview===e&&(t.delete=!0)})),n.setState({assets:Object(a.a)(t)})},n.handleSubmit=function(e){e.preventDefault(),n.setState({isLoading:!0});var t=n.state,s=t.name,c=t.isPublished,a=t.icon,i=t.assets,r=t.script,o=n.props.location.state,l=o.storyID,u=o.seasonID,h=o.episodeID,d=[];s.isEmpty()?Object(O.d)(O.a.WARNING,"Name is required",1500):R.doc(h).update({name:s,isPublished:c}).then((function(){var e="".concat(w,"/stories/").concat(l,"/seasons/").concat(u,"/episodes/").concat(h);a.file&&d.push(n.uploadFileAsPromise(e,a.file,"icon.png")),d.push(n.uploadFileAsPromise(e,new Blob([r],{type:"text/plain"}),"script.txt")),i.forEach((function(t){t.file&&!t.delete?d.push(n.uploadFileAsPromise("".concat(e,"/Assets"),t.file)):!t.file&&t.delete&&d.push(n.deleteFile(t.path))})),Promise.all(d).then((function(e){Object(O.e)(h,s),Object(O.d)(O.a.SUCCESS,"Episode updated successfully!"),n.backToList()})).catch((function(e){
//# sourceMappingURL=24.ac0fcd1e.chunk.js.map