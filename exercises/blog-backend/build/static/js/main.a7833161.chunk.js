(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{38:function(e,n,t){"use strict";t.r(n);var r=t(0),c=t(1),o=t(15),a=t.n(o),i=t(6),u=t(3),s=function(e){var n=e.value,t=e.onChange;return Object(r.jsxs)("div",{children:["filter shown with ",Object(r.jsx)("input",{value:n,onChange:t})]})},d=function(e){var n=e.onSubmit,t=e.valueName,c=e.valueNumber,o=e.onNameChange,a=e.onNumberChange;return Object(r.jsxs)("form",{onSubmit:n,children:[Object(r.jsxs)("div",{children:["name: ",Object(r.jsx)("input",{value:t,onChange:o})]}),Object(r.jsxs)("div",{children:["number: ",Object(r.jsx)("input",{value:c,onChange:a})]}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{type:"submit",children:"add"})})]})},b=function(e){var n=e.persons,t=e.onClick;return Object(r.jsx)("div",{children:n.map((function(e){return Object(r.jsxs)("p",{children:[e.name," ",e.number,Object(r.jsx)("button",{onClick:function(){return t(e)},children:"delete"})]},e.id)}))})},j=function(e){var n=e.messageObject;return null===n?null:Object(r.jsx)("div",{style:n.isError?{color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}:{color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},children:n.message})},l=t(4),f=t.n(l),m="/api/persons",h=function(){return f.a.get(m).then((function(e){return e.data}))},O=function(e){return f.a.post(m,e).then((function(e){return e.data}))},g=function(e){return f.a.delete("".concat(m,"/").concat(e))},v=function(e){return f.a.put("".concat(m,"/").concat(e.id),e).then((function(e){return e.data}))},p=function(){var e=Object(c.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1],a=Object(c.useState)(""),l=Object(u.a)(a,2),f=l[0],m=l[1],p=Object(c.useState)(""),x=Object(u.a)(p,2),C=x[0],w=x[1],S=Object(c.useState)(""),k=Object(u.a)(S,2),N=k[0],y=k[1],E=Object(c.useState)(null),B=Object(u.a)(E,2),D=B[0],z=B[1],J=function(){h().then((function(e){o(e)}))};Object(c.useEffect)(J,[]);var L=function(){m(""),w("")},R=function(e){z(e),setTimeout((function(){z(null)}),5e3)},A=t.filter((function(e){return-1!==e.name.toLowerCase().indexOf(N.toLowerCase())}));return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Phonebook"}),Object(r.jsx)(j,{messageObject:D}),Object(r.jsx)(s,{value:N,onChange:function(e){y(e.target.value)}}),Object(r.jsx)("h2",{children:"add a new"}),Object(r.jsx)(d,{onSubmit:function(e){if(e.preventDefault(),t.some((function(e){return e.name===f}))){if(window.confirm("".concat(f," is already added to phonebook, replace the old number with a new one?"))){var n=t.find((function(e){return e.name===f})),r=Object(i.a)(Object(i.a)({},n),{},{number:C});v(r).then((function(e){o(t.map((function(n){return n.id!==e.id?n:e}))),R({message:"Changed ".concat(e.name),isError:!1}),L()})).catch((function(e){J(),R({message:e.response.data.error,isError:!0})}))}}else O({name:f,number:C}).then((function(e){o(t.concat(e)),R({message:"Added ".concat(e.name),isError:!1}),L()})).catch((function(e){R({message:e.response.data.error,isError:!0})}))},valueName:f,onNameChange:function(e){m(e.target.value)},valueNumber:C,onNumberChange:function(e){w(e.target.value)}}),Object(r.jsx)("h2",{children:"Numbers"}),Object(r.jsx)(b,{persons:A,onClick:function(e){window.confirm("Delete ".concat(e.name))&&g(e.id).then((function(){o(t.filter((function(n){return n.id!==e.id}))),R({message:"Deleted ".concat(e.name),isError:!1})}))}})]})};a.a.render(Object(r.jsx)(p,{}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.a7833161.chunk.js.map