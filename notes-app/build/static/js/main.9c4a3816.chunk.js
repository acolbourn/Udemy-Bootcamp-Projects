(this["webpackJsonpusing-pre-built-react-components"]=this["webpackJsonpusing-pre-built-react-components"]||[]).push([[0],{31:function(e,t,n){e.exports=n(42)},42:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),r=n(7),c=n.n(r),u=n(12),o=n(17),i=n(23),m=n.n(i);var E=function(){return l.a.createElement("header",null,l.a.createElement("h1",null,l.a.createElement(m.a,null),"Keeper"))};var f=function(){var e=(new Date).getFullYear();return l.a.createElement("footer",null,l.a.createElement("p",null,"Copyright \u24d2 ",e))},s=n(25),p=n.n(s);var v=function(e){return l.a.createElement("div",{className:"note"},l.a.createElement("h1",null,e.title),l.a.createElement("p",null,e.content),l.a.createElement("button",{onClick:function(){e.onDelete(e.id)}},l.a.createElement(p.a,null)))},d=n(5),b=n(26),h=n(27),j=n.n(h),O=n(57),g=n(58);var k=function(e){var t=Object(a.useState)({title:"",content:""}),n=Object(o.a)(t,2),r=n[0],c=n[1];function u(e){var t=e.target,n=t.name,a=t.value;c((function(e){return Object(b.a)({},e,Object(d.a)({},n,a))}))}var i=Object(a.useState)(!1),m=Object(o.a)(i,2),E=m[0],f=m[1];return l.a.createElement("div",null,l.a.createElement("form",{className:"create-note"},E&&l.a.createElement("input",{name:"title",onChange:u,value:r.title,placeholder:"Title"}),l.a.createElement("textarea",{onClick:function(){f(!0)},name:"content",onChange:u,value:r.content,placeholder:"Take a note...",rows:E?3:1}),E&&l.a.createElement(g.a,{in:!0},l.a.createElement(O.a,{onClick:function(t){e.onAdd(r),c({title:"",content:""}),t.preventDefault()}},l.a.createElement(j.a,null)))))};var C=function(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=t[0],r=t[1];function c(e){r((function(t){return t.filter((function(t,n){return n!==e}))}))}return l.a.createElement("div",null,l.a.createElement(E,null),l.a.createElement(k,{onAdd:function(e){r((function(t){return[].concat(Object(u.a)(t),[e])}))}}),n.map((function(e,t){return l.a.createElement(v,{key:t,id:t,title:e.title,content:e.content,onDelete:c})})),l.a.createElement(f,null))};c.a.render(l.a.createElement(C,null),document.getElementById("root"))}},[[31,1,2]]]);
//# sourceMappingURL=main.9c4a3816.chunk.js.map