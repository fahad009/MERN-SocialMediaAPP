(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[8,26,46],{665:function(e,t){!function(e,t){for(var r in t)e[r]=t[r]}(t,function(e){var t={};function r(c){if(t[c])return t[c].exports;var n=t[c]={i:c,l:!1,exports:{}};return e[c].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,c){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:c})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var c=Object.create(null);if(r.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(c,n,function(t){return e[t]}.bind(null,n));return c},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t),r.d(t,"deepObjectsMerge",(function(){return c})),r.d(t,"getColor",(function(){return l})),r.d(t,"getStyle",(function(){return o})),r.d(t,"hexToRgb",(function(){return a})),r.d(t,"hexToRgba",(function(){return d})),r.d(t,"makeUid",(function(){return b})),r.d(t,"omitByKeys",(function(){return j})),r.d(t,"pickByKeys",(function(){return h})),r.d(t,"rgbToHex",(function(){return x}));var c=function e(t,r){for(var c=0,n=Object.keys(r);c<n.length;c++){var s=n[c];r[s]instanceof Object&&Object.assign(r[s],e(t[s],r[s]))}return Object.assign(t||{},r),t},n=function(){for(var e={},t=document.styleSheets,r="",c=t.length-1;c>-1;c--){for(var n=t[c].cssRules,s=n.length-1;s>-1;s--)if(".ie-custom-properties"===n[s].selectorText){r=n[s].cssText;break}if(r)break}return(r=r.substring(r.lastIndexOf("{")+1,r.lastIndexOf("}"))).split(";").forEach((function(t){if(t){var r=t.split(": ")[0],c=t.split(": ")[1];r&&c&&(e["--".concat(r.trim())]=c.trim())}})),e},s=function(){return Boolean(document.documentMode)&&document.documentMode>=10},i=function(e){return e.match(/^--.*/i)},o=function(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body;if(i(e)&&s()){var c=n();t=c[e]}else t=window.getComputedStyle(r,null).getPropertyValue(e).replace(/^\s/,"");return t},l=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body,r="--".concat(e),c=o(r,t);return c||e},a=function(e){if(void 0===e)throw new TypeError("Hex color is not defined");var t,r,c;if(!e.match(/^#(?:[0-9a-f]{3}){1,2}$/i))throw new Error("".concat(e," is not a valid hex color"));return 7===e.length?(t=parseInt(e.slice(1,3),16),r=parseInt(e.slice(3,5),16),c=parseInt(e.slice(5,7),16)):(t=parseInt(e.slice(1,2),16),r=parseInt(e.slice(2,3),16),c=parseInt(e.slice(3,5),16)),"rgba(".concat(t,", ").concat(r,", ").concat(c,")")},d=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;if(void 0===e)throw new TypeError("Hex color is not defined");var r,c,n,s=e.match(/^#(?:[0-9a-f]{3}){1,2}$/i);if(!s)throw new Error("".concat(e," is not a valid hex color"));return 7===e.length?(r=parseInt(e.slice(1,3),16),c=parseInt(e.slice(3,5),16),n=parseInt(e.slice(5,7),16)):(r=parseInt(e.slice(1,2),16),c=parseInt(e.slice(2,3),16),n=parseInt(e.slice(3,5),16)),"rgba(".concat(r,", ").concat(c,", ").concat(n,", ").concat(t/100,")")},b=function(){return"uid-"+Math.random().toString(36).substr(2)},j=function(e,t){for(var r={},c=Object.keys(e),n=0;n<c.length;n++)!t.includes(c[n])&&(r[c[n]]=e[c[n]]);return r},h=function(e,t){for(var r={},c=0;c<t.length;c++)r[t[c]]=e[t[c]];return r},x=function(e){if(void 0===e)throw new TypeError("Hex color is not defined");if("transparent"===e)return"#00000000";var t=e.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);if(!t)throw new Error("".concat(e," is not a valid rgb color"));var r="0".concat(parseInt(t[1],10).toString(16)),c="0".concat(parseInt(t[2],10).toString(16)),n="0".concat(parseInt(t[3],10).toString(16));return"#".concat(r.slice(-2)).concat(c.slice(-2)).concat(n.slice(-2))},m={deepObjectsMerge:c,getColor:l,getStyle:o,hexToRgb:a,hexToRgba:d,makeUid:b,omitByKeys:j,pickByKeys:h,rgbToHex:x};t.default=m}]))},667:function(e,t,r){"use strict";var c=r(72),n=r(180),s=(r(1),r(665)),i=r(668),o=r(27),l=function(e){var t=e.borderColor,r=e.backgroundColor,l=e.pointHoverBackgroundColor,a=e.dataPoints,d=e.label,b=e.pointed,j=Object(n.a)(e,["borderColor","backgroundColor","pointHoverBackgroundColor","dataPoints","label","pointed"]),h=l||("transparent"!==r?r:t),x=[{data:a,borderColor:Object(s.getColor)(t),backgroundColor:Object(s.getColor)(r),pointBackgroundColor:Object(s.getColor)(h),pointHoverBackgroundColor:Object(s.getColor)(h),label:d}],m={scales:{xAxes:[{offset:!0,gridLines:{color:"transparent",zeroLineColor:"transparent"},ticks:{fontSize:2,fontColor:"transparent"}}],yAxes:[{display:!1,ticks:{display:!1,min:Math.min.apply(Math,a)-5,max:Math.max.apply(Math,a)+5}}]},elements:{line:{borderWidth:1},point:{radius:4,hitRadius:10,hoverRadius:4}}},g={scales:{xAxes:[{display:!1}],yAxes:[{display:!1}]},elements:{line:{borderWidth:2},point:{radius:0,hitRadius:10,hoverRadius:4}}},u=function(){var e=b?m:g;return Object.assign({},e,{maintainAspectRatio:!1,legend:{display:!1}})}(),O=Object(s.deepObjectsMerge)(x,j.datasets||{}),p=Object(s.deepObjectsMerge)(u,j.options||{});return Object(o.jsx)(i.c,Object(c.a)(Object(c.a)({},j),{},{datasets:O,options:p,labels:d}))};l.defaultProps={borderColor:"rgba(255,255,255,.55)",backgroundColor:"transparent",dataPoints:[10,22,34,46,58,70,46,23,45,78,34,12],label:"Sales"},t.a=l},672:function(e,t,r){"use strict";var c=r(72),n=r(180),s=(r(1),r(665)),i=r(668),o=r(27),l=function(e){var t=e.backgroundColor,r=e.pointHoverBackgroundColor,l=e.dataPoints,a=e.label,d=(e.pointed,Object(n.a)(e,["backgroundColor","pointHoverBackgroundColor","dataPoints","label","pointed"])),b=[{data:l,backgroundColor:Object(s.getColor)(t),pointHoverBackgroundColor:Object(s.getColor)(r),label:a,barPercentage:.5,categoryPercentage:1}],j={maintainAspectRatio:!1,legend:{display:!1},scales:{xAxes:[{display:!1}],yAxes:[{display:!1}]}};return Object(o.jsx)(i.a,Object(c.a)(Object(c.a)({},d),{},{datasets:b,options:j,labels:a}))};l.defaultProps={backgroundColor:"rgba(0,0,0,.2)",dataPoints:[10,22,34,46,58,70,46,23,45,78,34,12],label:"Sales"},t.a=l},680:function(e,t,r){"use strict";r.r(t);r(1);var c=r(179),n=r(58),s=r(667),i=r(27);t.default=function(e){return e.withCharts?Object(i.jsxs)(c.rb,{children:[Object(i.jsx)(c.u,{sm:"6",lg:"3",children:Object(i.jsxs)(c.Mb,{color:"facebook",rightHeader:"89k",rightFooter:"friends",leftHeader:"459",leftFooter:"feeds",children:[Object(i.jsx)(n.b,{name:"cib-facebook",height:"52",className:"my-4"}),Object(i.jsx)(s.a,{className:"position-absolute w-100 h-100",backgroundColor:"rgba(255,255,255,.1)",dataPoints:[65,59,84,84,51,55,40],label:"Friends",labels:"months"})]})}),Object(i.jsx)(c.u,{sm:"6",lg:"3",children:Object(i.jsxs)(c.Mb,{color:"twitter",rightHeader:"973k",rightFooter:"followers",leftHeader:"1.792",leftFooter:"tweets",children:[Object(i.jsx)(n.b,{name:"cib-twitter",height:"52",className:"my-4"}),Object(i.jsx)(s.a,{className:"position-absolute w-100 h-100",backgroundColor:"rgba(255,255,255,.1)",dataPoints:[1,13,9,17,34,41,38],label:"Followers",labels:"months"})]})}),Object(i.jsx)(c.u,{sm:"6",lg:"3",children:Object(i.jsxs)(c.Mb,{color:"linkedin",rightHeader:"500+",rightFooter:"contracts",leftHeader:"292",leftFooter:"feeds",children:[Object(i.jsx)(n.b,{name:"cib-linkedin",height:"52",className:"my-4"}),Object(i.jsx)(s.a,{className:"position-absolute w-100 h-100",backgroundColor:"rgba(255,255,255,.1)",dataPoints:[78,81,80,45,34,12,40],label:"Contracts",labels:"months"})]})}),Object(i.jsx)(c.u,{sm:"6",lg:"3",children:Object(i.jsxs)(c.Mb,{rightHeader:"12",rightFooter:"events",leftHeader:"4",leftFooter:"meetings",color:"gradient-warning",children:[Object(i.jsx)(n.b,{name:"cil-calendar",height:"52",className:"my-4"}),Object(i.jsx)(s.a,{className:"position-absolute w-100 h-100",backgroundColor:"rgba(255,255,255,.1)",dataPoints:[35,23,56,22,97,23,64],label:"Followers",labels:"months"})]})})]}):Object(i.jsxs)(c.rb,{children:[Object(i.jsx)(c.u,{sm:"6",lg:"3",children:Object(i.jsx)(c.Mb,{color:"facebook",rightHeader:"89k",rightFooter:"friends",leftHeader:"459",leftFooter:"feeds",children:Object(i.jsx)(n.b,{name:"cib-facebook",height:"56",className:"my-4"})})}),Object(i.jsx)(c.u,{sm:"6",lg:"3",children:Object(i.jsx)(c.Mb,{color:"twitter",rightHeader:"973k",rightFooter:"followers",leftHeader:"1.792",leftFooter:"tweets",children:Object(i.jsx)(n.b,{name:"cib-twitter",height:"56",className:"my-4"})})}),Object(i.jsx)(c.u,{sm:"6",lg:"3",children:Object(i.jsx)(c.Mb,{color:"linkedin",rightHeader:"500+",rightFooter:"contracts",leftHeader:"292",leftFooter:"feeds",children:Object(i.jsx)(n.b,{name:"cib-linkedin",height:"56",className:"my-4"})})}),Object(i.jsx)(c.u,{sm:"6",lg:"3",children:Object(i.jsx)(c.Mb,{rightHeader:"12",rightFooter:"events",leftHeader:"4",leftFooter:"meetings",color:"gradient-warning",children:Object(i.jsx)(n.b,{name:"cil-calendar",height:"56",className:"my-4"})})})]})}},681:function(e,t,r){"use strict";r.r(t);r(1);var c=r(179),n=r(58),s=r(667),i=r(672),o=r(27);t.default=function(){return Object(o.jsxs)(c.rb,{children:[Object(o.jsx)(c.u,{sm:"6",lg:"3",children:Object(o.jsx)(c.Nb,{color:"gradient-primary",header:"9.823",text:"Members online",footerSlot:Object(o.jsx)(s.a,{pointed:!0,className:"c-chart-wrapper mt-3 mx-3",style:{height:"70px"},dataPoints:[65,59,84,84,51,55,40],pointHoverBackgroundColor:"primary",label:"Members",labels:"months"}),children:Object(o.jsxs)(c.z,{children:[Object(o.jsx)(c.E,{color:"transparent",children:Object(o.jsx)(n.b,{name:"cil-settings"})}),Object(o.jsxs)(c.D,{className:"pt-0",placement:"bottom-end",children:[Object(o.jsx)(c.C,{children:"Action"}),Object(o.jsx)(c.C,{children:"Another action"}),Object(o.jsx)(c.C,{children:"Something else here..."}),Object(o.jsx)(c.C,{disabled:!0,children:"Disabled action"})]})]})})}),Object(o.jsx)(c.u,{sm:"6",lg:"3",children:Object(o.jsx)(c.Nb,{color:"gradient-info",header:"9.823",text:"Members online",footerSlot:Object(o.jsx)(s.a,{pointed:!0,className:"mt-3 mx-3",style:{height:"70px"},dataPoints:[1,18,9,17,34,22,11],pointHoverBackgroundColor:"info",options:{elements:{line:{tension:1e-5}}},label:"Members",labels:"months"}),children:Object(o.jsxs)(c.z,{children:[Object(o.jsx)(c.E,{caret:!1,color:"transparent",children:Object(o.jsx)(n.b,{name:"cil-location-pin"})}),Object(o.jsxs)(c.D,{className:"pt-0",placement:"bottom-end",children:[Object(o.jsx)(c.C,{children:"Action"}),Object(o.jsx)(c.C,{children:"Another action"}),Object(o.jsx)(c.C,{children:"Something else here..."}),Object(o.jsx)(c.C,{disabled:!0,children:"Disabled action"})]})]})})}),Object(o.jsx)(c.u,{sm:"6",lg:"3",children:Object(o.jsx)(c.Nb,{color:"gradient-warning",header:"9.823",text:"Members online",footerSlot:Object(o.jsx)(s.a,{className:"mt-3",style:{height:"70px"},backgroundColor:"rgba(255,255,255,.2)",dataPoints:[78,81,80,45,34,12,40],options:{elements:{line:{borderWidth:2.5}}},pointHoverBackgroundColor:"warning",label:"Members",labels:"months"}),children:Object(o.jsxs)(c.z,{children:[Object(o.jsx)(c.E,{color:"transparent",children:Object(o.jsx)(n.b,{name:"cil-settings"})}),Object(o.jsxs)(c.D,{className:"pt-0",placement:"bottom-end",children:[Object(o.jsx)(c.C,{children:"Action"}),Object(o.jsx)(c.C,{children:"Another action"}),Object(o.jsx)(c.C,{children:"Something else here..."}),Object(o.jsx)(c.C,{disabled:!0,children:"Disabled action"})]})]})})}),Object(o.jsx)(c.u,{sm:"6",lg:"3",children:Object(o.jsx)(c.Nb,{color:"gradient-danger",header:"9.823",text:"Members online",footerSlot:Object(o.jsx)(i.a,{className:"mt-3 mx-3",style:{height:"70px"},backgroundColor:"rgb(250, 152, 152)",label:"Members",labels:"months"}),children:Object(o.jsxs)(c.z,{children:[Object(o.jsx)(c.E,{caret:!0,className:"text-white",color:"transparent",children:Object(o.jsx)(n.b,{name:"cil-settings"})}),Object(o.jsxs)(c.D,{className:"pt-0",placement:"bottom-end",children:[Object(o.jsx)(c.C,{children:"Action"}),Object(o.jsx)(c.C,{children:"Another action"}),Object(o.jsx)(c.C,{children:"Something else here..."}),Object(o.jsx)(c.C,{disabled:!0,children:"Disabled action"})]})]})})})]})}},723:function(e,t,r){"use strict";r.r(t);r(1);var c=r(179),n=r(680),s=r(681),i=r(667),o=r(672),l=r(58),a=r(27);t.default=function(){return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(s.default,{}),Object(a.jsxs)(c.rb,{children:[Object(a.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(a.jsx)(c.Pb,{color:"success",header:"89.9%",text:"Lorem ipsum...",footer:"Lorem ipsum dolor sit amet enim."})}),Object(a.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(a.jsx)(c.Pb,{color:"info",header:"12.124",text:"Lorem ipsum...",footer:"Lorem ipsum dolor sit amet enim."})}),Object(a.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(a.jsx)(c.Pb,{color:"warning",header:"$98.111,00",text:"Lorem ipsum...",footer:"Lorem ipsum dolor sit amet enim."})}),Object(a.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(a.jsx)(c.Pb,{header:"2 TB",text:"Lorem ipsum...",footer:"Lorem ipsum dolor sit amet enim.",children:Object(a.jsx)(c.pb,{color:"danger",animated:!0,size:"xs",className:"my-3",value:75})})}),Object(a.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(a.jsx)(c.Pb,{inverse:!0,color:"success",variant:"inverse",header:"89.9%",text:"Lorem ipsum...",footer:"Lorem ipsum dolor sit amet enim."})}),Object(a.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(a.jsx)(c.Pb,{inverse:!0,color:"info",variant:"inverse",header:"12.124",text:"Lorem ipsum...",footer:"Lorem ipsum dolor sit amet enim."})}),Object(a.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(a.jsx)(c.Pb,{inverse:!0,color:"warning",variant:"inverse",header:"$98.111,00",text:"Lorem ipsum...",footer:"Lorem ipsum dolor sit amet enim."})}),Object(a.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(a.jsx)(c.Pb,{inverse:!0,color:"danger",variant:"inverse",value:95,header:"2 TB",text:"Lorem ipsum...",footer:"Lorem ipsum dolor sit amet enim."})})]}),Object(a.jsxs)(c.rb,{children:[Object(a.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(a.jsx)(c.Ob,{text:"income",header:"$1.999,50",color:"primary",children:Object(a.jsx)(l.b,{width:24,name:"cil-settings"})})}),Object(a.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(a.jsx)(c.Ob,{text:"income",header:"$1.999,50",color:"info",children:Object(a.jsx)(l.b,{width:24,name:"cil-user"})})}),Object(a.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(a.jsx)(c.Ob,{text:"income",header:"$1.999,50",color:"warning",children:Object(a.jsx)(l.b,{width:24,name:"cil-moon"})})}),Object(a.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(a.jsx)(c.Ob,{text:"income",header:"$1.999,50",color:"danger",children:Object(a.jsx)(l.b,{width:24,name:"cil-bell"})})}),Object(a.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(a.jsx)(c.Ob,{text:"income",header:"$1.999,50",color:"primary",iconPadding:!1,children:Object(a.jsx)(l.b,{width:24,name:"cil-settings"})})}),Object(a.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(a.jsx)(c.Ob,{text:"income",header:"$1.999,50",color:"info",iconPadding:!1,children:Object(a.jsx)(l.b,{width:24,name:"cil-laptop"})})}),Object(a.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(a.jsx)(c.Ob,{text:"income",header:"$1.999,50",color:"warning",iconPadding:!1,children:Object(a.jsx)(l.b,{width:24,name:"cil-moon"})})}),Object(a.jsx)(c.u,{xs:"12",sm:"6",lg:"3",children:Object(a.jsx)(c.Ob,{text:"income",header:"$1.999,50",color:"danger",iconPadding:!1,children:Object(a.jsx)(l.b,{width:24,name:"cil-bell"})})}),Object(a.jsx)(c.u,{xs:"12",sm:"6",lg:"4",children:Object(a.jsx)(c.Ob,{text:"income",header:"$1.999,50",color:"primary",iconPadding:!1,children:Object(a.jsx)(l.b,{width:24,name:"cil-settings",className:"mx-5"})})}),Object(a.jsx)(c.u,{xs:"12",sm:"6",lg:"4",children:Object(a.jsx)(c.Ob,{text:"income",header:"$1.999,50",color:"info",iconPadding:!1,children:Object(a.jsx)(l.b,{width:24,name:"cil-laptop",className:"mx-5"})})}),Object(a.jsx)(c.u,{xs:"12",sm:"6",lg:"4",children:Object(a.jsx)(c.Ob,{text:"income",header:"$1.999,50",color:"warning",iconPadding:!1,footerSlot:Object(a.jsx)(c.l,{className:"card-footer px-3 py-2",children:Object(a.jsxs)(c.Y,{className:"font-weight-bold font-xs btn-block text-muted",href:"https://coreui.io/",rel:"noopener norefferer",target:"_blank",children:["View more",Object(a.jsx)(l.b,{name:"cil-arrow-right",className:"float-right",width:"16"})]})}),children:Object(a.jsx)(l.b,{width:24,name:"cil-moon",className:"mx-5"})})})]}),Object(a.jsx)(n.default,{}),Object(a.jsx)(n.default,{withCharts:!0}),Object(a.jsxs)(c.m,{className:"mb-4",children:[Object(a.jsx)(c.Qb,{header:"87.500",text:"Visitors",color:"gradient-info",children:Object(a.jsx)(l.b,{name:"cil-people",height:"36"})}),Object(a.jsx)(c.Qb,{header:"385",text:"New Clients",color:"gradient-success",children:Object(a.jsx)(l.b,{name:"cil-userFollow",height:"36"})}),Object(a.jsx)(c.Qb,{header:"1238",text:"Products sold",color:"gradient-warning",children:Object(a.jsx)(l.b,{name:"cil-basket",height:"36"})}),Object(a.jsx)(c.Qb,{header:"28%",text:"Returning Visitors",children:Object(a.jsx)(l.b,{name:"cil-chartPie",height:"36"})}),Object(a.jsx)(c.Qb,{header:"5:34:11",text:"Avg. Time",color:"gradient-danger",progressSlot:Object(a.jsx)(c.pb,{color:"danger",size:"xs",value:75,animated:!0,className:"my-3"}),children:Object(a.jsx)(l.b,{name:"cil-speedometer",height:"36"})})]}),Object(a.jsxs)(c.m,{className:"mb-4",children:[Object(a.jsx)(c.Qb,{header:"87.500",text:"Visitors",color:"gradient-info",inverse:!0,children:Object(a.jsx)(l.b,{name:"cil-people",height:"36"})}),Object(a.jsx)(c.Qb,{header:"385",text:"New Clients",color:"gradient-success",inverse:!0,children:Object(a.jsx)(l.b,{name:"cil-userFollow",height:"36"})}),Object(a.jsx)(c.Qb,{header:"1238",text:"Products sold",color:"gradient-warning",inverse:!0,children:Object(a.jsx)(l.b,{name:"cil-basket",height:"36"})}),Object(a.jsx)(c.Qb,{header:"28%",text:"Returning Visitors",color:"gradient-primary",inverse:!0,children:Object(a.jsx)(l.b,{name:"cil-chartPie",height:"36"})}),Object(a.jsx)(c.Qb,{header:"5:34:11",text:"Avg. Time",color:"gradient-danger",inverse:!0,children:Object(a.jsx)(l.b,{name:"cil-speedometer",height:"36"})})]}),Object(a.jsxs)(c.rb,{children:[Object(a.jsx)(c.u,{sm:"6",md:"2",children:Object(a.jsx)(c.Qb,{header:"87.500",text:"Visitors",color:"gradient-info",children:Object(a.jsx)(l.b,{name:"cil-people",height:"36"})})}),Object(a.jsx)(c.u,{sm:"6",md:"2",children:Object(a.jsx)(c.Qb,{header:"385",text:"New Clients",color:"gradient-success",children:Object(a.jsx)(l.b,{name:"cil-userFollow",height:"36"})})}),Object(a.jsx)(c.u,{sm:"6",md:"2",children:Object(a.jsx)(c.Qb,{header:"1238",text:"Products sold",color:"gradient-warning",children:Object(a.jsx)(l.b,{name:"cil-basket",height:"36"})})}),Object(a.jsx)(c.u,{sm:"6",md:"2",children:Object(a.jsx)(c.Qb,{header:"28%",text:"Returning Visitors",color:"gradient-primary",children:Object(a.jsx)(l.b,{name:"cil-chartPie",height:"36"})})}),Object(a.jsx)(c.u,{sm:"6",md:"2",children:Object(a.jsx)(c.Qb,{header:"5:34:11",text:"Avg. Time",color:"gradient-danger",children:Object(a.jsx)(l.b,{name:"cil-speedometer",height:"36"})})}),Object(a.jsx)(c.u,{sm:"6",md:"2",children:Object(a.jsx)(c.Qb,{header:"972",text:"comments",color:"gradient-info",children:Object(a.jsx)(l.b,{name:"cil-speech",height:"36"})})})]}),Object(a.jsxs)(c.rb,{children:[Object(a.jsx)(c.u,{sm:"6",md:"2",children:Object(a.jsx)(c.Qb,{header:"87.500",text:"Visitors",color:"gradient-info",inverse:!0,children:Object(a.jsx)(l.b,{name:"cil-people",height:"36"})})}),Object(a.jsx)(c.u,{sm:"6",md:"2",children:Object(a.jsx)(c.Qb,{header:"385",text:"New Clients",color:"gradient-success",inverse:!0,children:Object(a.jsx)(l.b,{name:"cil-userFollow",height:"36"})})}),Object(a.jsx)(c.u,{sm:"6",md:"2",children:Object(a.jsx)(c.Qb,{header:"1238",text:"Products sold",color:"gradient-warning",inverse:!0,children:Object(a.jsx)(l.b,{name:"cil-basket",height:"36"})})}),Object(a.jsx)(c.u,{sm:"6",md:"2",children:Object(a.jsx)(c.Qb,{header:"28%",text:"Returning Visitors",color:"gradient-primary",inverse:!0,children:Object(a.jsx)(l.b,{name:"cil-chartPie",height:"36"})})}),Object(a.jsx)(c.u,{sm:"6",md:"2",children:Object(a.jsx)(c.Qb,{header:"5:34:11",text:"Avg. Time",color:"gradient-danger",inverse:!0,children:Object(a.jsx)(l.b,{name:"cil-speedometer",height:"36"})})}),Object(a.jsx)(c.u,{sm:"6",md:"2",children:Object(a.jsx)(c.Qb,{header:"972",text:"comments",color:"gradient-info",inverse:!0,children:Object(a.jsx)(l.b,{name:"cil-speech",height:"36"})})})]}),Object(a.jsxs)(c.rb,{children:[Object(a.jsx)(c.u,{sm:"4",lg:"2",children:Object(a.jsx)(c.Rb,{header:"title",text:"1,123",children:Object(a.jsx)(i.a,{style:{height:"40px"},borderColor:"danger"})})}),Object(a.jsx)(c.u,{sm:"4",lg:"2",children:Object(a.jsx)(c.Rb,{header:"title",text:"1,123",children:Object(a.jsx)(i.a,{style:{height:"40px"},borderColor:"primary"})})}),Object(a.jsx)(c.u,{sm:"4",lg:"2",children:Object(a.jsx)(c.Rb,{header:"title",text:"1,123",children:Object(a.jsx)(i.a,{style:{height:"40px"},borderColor:"success"})})}),Object(a.jsx)(c.u,{sm:"4",lg:"2",children:Object(a.jsx)(c.Rb,{header:"title",text:"1,123",children:Object(a.jsx)(o.a,{style:{height:"40px"},backgroundColor:"danger"})})}),Object(a.jsx)(c.u,{sm:"4",lg:"2",children:Object(a.jsx)(c.Rb,{header:"title",text:"1,123",children:Object(a.jsx)(o.a,{style:{height:"40px"},backgroundColor:"primary"})})}),Object(a.jsx)(c.u,{sm:"4",lg:"2",children:Object(a.jsx)(c.Rb,{header:"title",text:"1,123",children:Object(a.jsx)(o.a,{style:{height:"40px"},backgroundColor:"success"})})})]})]})}}}]);
//# sourceMappingURL=8.d44e5e4b.chunk.js.map