(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,n,t){e.exports=t(39)},37:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(11),o=t.n(u),l=t(2),c=function(e){return r.a.createElement("div",null," rajaa n\xe4ytett\xe4vi\xe4: ",r.a.createElement("input",{value:e.Filter,onChange:e.handleFilterChange}))},i=function(e){return r.a.createElement("form",{onSubmit:e.addPerson},r.a.createElement("div",null," nimi: ",r.a.createElement("input",{value:e.newName,onChange:e.handleNameChange})),r.a.createElement("div",null,"puhelinnumero: ",r.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange})),r.a.createElement("div",null," ",r.a.createElement("button",{type:"submit"},"lis\xe4\xe4")))},s=function(e){var n=e.personsToShow,t=e.removePerson;return n.map(function(e){return r.a.createElement("li",{key:e.name}," ",e.name," ",e.number," ",r.a.createElement("button",{onClick:function(){return t(e.id)}},"poista"))})},m=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"success"},n)},f=t(3),d=t.n(f),h=function(){return d.a.get("/persons").then(function(e){return e.data})},p=function(e){return d.a.post("/persons",e).then(function(e){return e.data})},g=function(e){return d.a.delete("".concat("/persons","/").concat(e)).then(function(e){return e.data})},v=function(e){e.props;var n=Object(a.useState)([]),t=Object(l.a)(n,2),u=t[0],o=t[1],f=Object(a.useState)(""),d=Object(l.a)(f,2),v=d[0],E=d[1],b=Object(a.useState)(""),w=Object(l.a)(b,2),j=w[0],O=w[1],C=Object(a.useState)(""),N=Object(l.a)(C,2),S=N[0],P=N[1],k=Object(a.useState)(null),y=Object(l.a)(k,2),F=y[0],T=y[1];Object(a.useEffect)(function(){console.log("effect"),h().then(function(e){console.log("promise fulfilled"),o(e)})},[]),console.log("render",u.length,"notes");var J=u.filter(function(e){return e.name.includes(S)});return r.a.createElement("div",null,r.a.createElement("h2",null,"Puhelinluettelo"),r.a.createElement(m,{message:F}),r.a.createElement(c,{Filter:S,handleFilterChange:function(e){P(e.target.value)}}),r.a.createElement("h1",null,"lis\xe4\xe4 uusi"),r.a.createElement(i,{addPerson:function(e){e.preventDefault(),console.log("nappia painettu",e.target);var n={name:v,number:j};u.some(function(e){return e.name===v})?window.alert("".concat(v," on jo luettelossa")):p(n).then(function(e){o(u.concat(e)),E(""),T("Lis\xe4ttiin '".concat(n.name,"' ")),setTimeout(function(){T(null)},5e3)})},newName:v,newNumber:j,handleNumberChange:function(e){console.log(e.target.value),O(e.target.value)},handleNameChange:function(e){console.log(e.target.value),E(e.target.value)}}),r.a.createElement("h2",null,"Numerot"),r.a.createElement("ul",null,r.a.createElement(s,{personsToShow:J,removePerson:function(e){console.log("nappia painettu",e);var n=u.find(function(n){return n.id===e});!0===window.confirm("Poistetaanko ".concat(n.name))&&g(e).then(function(){o(u.filter(function(n){return n.id!==e}))})}})))};t(37);o.a.render(r.a.createElement(v,null),document.getElementById("root"))}},[[12,2,1]]]);
//# sourceMappingURL=main.b9489957.chunk.js.map