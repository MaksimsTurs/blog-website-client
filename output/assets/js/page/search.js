import{j as e,r as a,O as s,Q as t,R as n,K as r,E as o,J as l}from"../react.js";import{u as i}from"./about.js";import{L as c,a as m}from"./home.js";import{T as u,u as d,U as p,_ as x,f as g,A as j,P as h,m as f,n as v,E as N,B as C}from"./admin.js";import{A as D,u as b}from"./database.js";const w="Le",S="Me";function _({removeTag:a,tags:s}){return e.jsx("ul",{className:`${w} flex-row-flex-start-normal-small`,children:s.map((s=>{const t=s.replace(/\-\d*/g,"");return t.trim()?e.jsx("li",{onClick:()=>a(s),className:S,children:t},s):null}))})}const $=function(e){return e.split(/,/).map((e=>0===e.length?e:`${e}-${Math.round(9999*Math.random())}`))},y=function(e){return e.map((e=>e.trim().replace(/\-\d*/g,"")))},L=a.forwardRef((function({placeholder:s,value:t},n){const[r,o]=a.useState(t||[]);return a.useImperativeHandle(n,(()=>({clear:()=>o([]),value:r.filter((e=>e))})),[r]),e.jsxs(a.Fragment,{children:[e.jsx(u,{name:"tags",onInput:e=>{const a=$(e.currentTarget.value);o(a)},placeholder:s,value:y(r).join(", ")}),e.jsx(_,{removeTag:e=>{o((a=>D.removeDuplicates(a,[e])))},tags:r})]})})),T="Z",F="__",I="-_",O="a_",k="b_",M="c_",R="e_";function z({changeSortData:a,sortData:s,sortDataName:t}){return e.jsx(u,{name:t,placeholder:`Find by ${t}...`,value:s[t],onInput:e=>a(t,e.currentTarget.value)})}const E=[{name:"Likes",icon:e.jsx(r,{size:17})},{name:"Views",icon:e.jsx(o,{size:17})},{name:"Comments",icon:e.jsx(l,{size:17})}],P=window.matchMedia("(width <= 930px)").matches;const A=Object.freeze(Object.defineProperty({__proto__:null,default:function(){i({title:"Finden",description:"Hier kannst du posts mit gegebenen sortierung optionen finden."});const[r,o]=a.useState({author:"",content:"",title:""}),[l,u]=a.useState(),D=d(),w=D.get("tag"),S=parseInt(D.get("page")||"0"),_=a.useRef(null),$=a.useRef(),y=!P||b(p["IS-FILTER-MODAL-OPEN"],_),{isPending:A,data:H,error:q,request:U}=x({deps:[`sort-${S}`],noCache:!0,request:async()=>await g.post(`/sort/${S}`,{...r,sortOption:l,tags:$.current?.value},j)}),B=(e,a)=>{o((s=>({...s,[e]:a})))};return e.jsx(a.Fragment,{children:q?e.jsx(h,{error:q}):e.jsxs("div",{style:{height:"100%"},className:"flex-row-normal-normal-medium",children:[e.jsxs("div",{style:{width:"100%",minHeight:"100%"},className:"flex-column-normal-normal-small",children:[P?e.jsx(s,{onClick:()=>{D.set({[p["IS-FILTER-MODAL-OPEN"]]:!0})},className:I}):null,A?e.jsx(f,{}):H&&H.pagesCount>1?e.jsx(v,{pagesCount:H.pagesCount}):null,A?e.jsx(c,{}):H&&0===H.posts.length?e.jsx(N,{option:{flexCenterCenter:!0,height:"FULL"},label:"Nothing found!"}):H&&H.posts.map((a=>e.jsx(m,{post:a,type:"preview"},a._id))),A?e.jsx(f,{}):H&&H.pagesCount>1?e.jsx(v,{pagesCount:H.pagesCount}):null]}),e.jsx("div",{ref:_,className:y?T:`${T} ${F}`,children:e.jsxs("div",{className:"main-content-container flex-column-normal-normal-small",children:[e.jsx("p",{className:O,children:"Sort by"}),e.jsx("div",{className:"flex-column-normal-normal-small",children:E.map((a=>e.jsxs("button",{onClick:()=>{return e=a.name,void u("descending"===l?.[e]?{[e]:"ascending"}:"ascending"===l?.[e]?{[e]:void 0}:{[e]:"descending"});var e},className:l?.[a.name]?`${k} ${M} flex-row-center-center-medium`:`${k} flex-row-center-center-medium`,children:[a.icon,e.jsx("p",{children:a.name}),"descending"===l?.[a.name]?e.jsx(t,{size:14}):"ascending"===l?.[a.name]?e.jsx(n,{size:14}):null]},a.name)))}),e.jsx(z,{changeSortData:B,sortData:r,sortDataName:"content"}),e.jsx(z,{changeSortData:B,sortData:r,sortDataName:"author"}),e.jsx(z,{changeSortData:B,sortData:r,sortDataName:"title"}),e.jsx(L,{ref:$,value:[w||"",...$.current?.value||[]],placeholder:"Find by tags"}),e.jsxs("div",{className:`${R} flex-row-normal-normal-small`,children:[e.jsx(C,{onClick:()=>{0===S?U():D.set({page:0})},label:"Sort"}),e.jsx(C,{onClick:()=>{o({author:"",content:"",title:""}),u(void 0),D.set({page:0}),$.current&&$.current.clear()},label:"Reset"})]})]})})]})})}},Symbol.toStringTag,{value:"Module"}));export{L as T,A as p};
