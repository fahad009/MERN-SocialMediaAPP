(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[28],{664:function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));var a=r(181);function s(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var r=[],a=!0,s=!1,i=void 0;try{for(var n,d=e[Symbol.iterator]();!(a=(n=d.next()).done)&&(r.push(n.value),!t||r.length!==t);a=!0);}catch(o){s=!0,i=o}finally{try{a||null==d.return||d.return()}finally{if(s)throw i}}return r}}(e,t)||Object(a.a)(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},675:function(e,t,r){"use strict";t.a=[{id:0,name:"John Doe",registered:"2018/01/01",role:"Guest",status:"Pending"},{id:1,name:"Samppa Nori",registered:"2018/01/01",role:"Member",status:"Active"},{id:2,name:"Estavan Lykos",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:3,name:"Chetan Mohamed",registered:"2018/02/01",role:"Admin",status:"Inactive"},{id:4,name:"Derick Maximinus",registered:"2018/03/01",role:"Member",status:"Pending"},{id:5,name:"Friderik D\xe1vid",registered:"2018/01/21",role:"Staff",status:"Active"},{id:6,name:"Yiorgos Avraamu",registered:"2018/01/01",role:"Member",status:"Active"},{id:7,name:"Avram Tarasios",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:8,name:"Quintin Ed",registered:"2018/02/01",role:"Admin",status:"Inactive"},{id:9,name:"En\xe9as Kwadwo",registered:"2018/03/01",role:"Member",status:"Pending"},{id:10,name:"Agapetus Tade\xe1\u0161",registered:"2018/01/21",role:"Staff",status:"Active"},{id:11,name:"Carwyn Fachtna",registered:"2018/01/01",role:"Member",status:"Active"},{id:12,name:"Nehemiah Tatius",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:13,name:"Ebbe Gemariah",registered:"2018/02/01",role:"Admin",status:"Inactive"},{id:14,name:"Eustorgios Amulius",registered:"2018/03/01",role:"Member",status:"Pending"},{id:15,name:"Leopold G\xe1sp\xe1r",registered:"2018/01/21",role:"Staff",status:"Active"},{id:16,name:"Pompeius Ren\xe9",registered:"2018/01/01",role:"Member",status:"Active"},{id:17,name:"Pa\u0109jo Jadon",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:18,name:"Micheal Mercurius",registered:"2018/02/01",role:"Admin",status:"Inactive"},{id:19,name:"Ganesha Dubhghall",registered:"2018/03/01",role:"Member",status:"Pending"},{id:20,name:"Hiroto \u0160imun",registered:"2018/01/21",role:"Staff",status:"Active"},{id:21,name:"Vishnu Serghei",registered:"2018/01/01",role:"Member",status:"Active"},{id:22,name:"Zbyn\u011bk Phoibos",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:23,name:"Aulus Agmundr",registered:"2018/01/01",role:"Member",status:"Pending"},{id:42,name:"Ford Prefect",registered:"2001/05/25",role:"Alien",status:"Don't panic!"}]},724:function(e,t,r){"use strict";r.r(t);var a=r(664),s=r(1),i=r(25),n=r(179),d=r(675),o=r(27),u=function(e){switch(e){case"Active":return"success";case"Inactive":return"secondary";case"Pending":return"warning";case"Banned":return"danger";default:return"primary"}};t.default=function(){var e=Object(i.g)(),t=Object(i.h)().search.match(/page=([0-9]+)/,""),r=Number(t&&t[1]?t[1]:1),c=Object(s.useState)(r),l=Object(a.a)(c,2),m=l[0],g=l[1];return Object(s.useEffect)((function(){r!==m&&g(r)}),[r,m]),Object(o.jsx)(n.rb,{children:Object(o.jsx)(n.u,{xl:6,children:Object(o.jsxs)(n.j,{children:[Object(o.jsxs)(n.n,{children:["Users",Object(o.jsx)("small",{className:"text-muted",children:" example"})]}),Object(o.jsxs)(n.k,{children:[Object(o.jsx)(n.y,{items:d.a,fields:[{key:"name",_classes:"font-weight-bold"},"registered","role","status"],hover:!0,striped:!0,itemsPerPage:5,activePage:m,clickableRows:!0,onRowClick:function(t){return e.push("/users/".concat(t.id))},scopedSlots:{status:function(e){return Object(o.jsx)("td",{children:Object(o.jsx)(n.b,{color:u(e.status),children:e.status})})}}}),Object(o.jsx)(n.nb,{activePage:m,onActivePageChange:function(t){r!==t&&e.push("/users?page=".concat(t))},pages:5,doubleArrows:!1,align:"center"})]})]})})})}}}]);
//# sourceMappingURL=28.103b3766.chunk.js.map