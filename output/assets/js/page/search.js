import{u as e,r as a,j as t,p as s,A as n,q as r,H as o,E as l,o as i}from"../react.js";import{T as c,u as m,_ as u,f as d,c as g,d as p,e as x,E as h}from"./admin.js";import{E as j,L as f,a as N,B as v}from"./home.js";function T(t,s){const[n,r]=e();return a.useEffect((()=>{s.current?.addEventListener("click",(e=>{e.target===e.currentTarget&&r((e=>(e.set(t,String(!e.get(t))),e)))}))}),[]),JSON.parse(n.get(t)||"false")}const D={"LOGIN-MODAL":"login-modal","REGISTRATE-MODAL":"registrate-modal","IS-SIDE-MENU-OPEN":"is-side-menu-open","IS-EDIT-USER-MODAL-OPEN":"is-edit-user-modal-open","IS-FILTER-MODAL-OPEN":"is-filter-modal-open"},E={tag_list:"Ic",tag_item:"Jc"};function S({removeTag:e,tags:a}){return t.jsx("ul",{className:`${E.tag_list} flex-row-flex-start-normal-small`,children:a.map((a=>{const s=a.replace(/\-\d*/g,"");return s.trim()?t.jsx("li",{onClick:()=>e(a),className:E.tag_item,children:s},a):null}))})}const O={createTagArray:function(e){return e.split(/,/).map((e=>0===e.length?e:`${e}-${Math.round(9999*Math.random())}`))},removeTagKeys:function(e){return e.map((e=>e.trim().replace(/\-\d*/g,"")))}};function C({getTags:e,placeholder:s,value:n}){const[r,o]=a.useState(n||[]);return t.jsxs(a.Fragment,{children:[t.jsx(c,{name:"tags",onInput:a=>{const t=O.createTagArray(a.currentTarget.value);o(t),e(O.removeTagKeys(t))},placeholder:s,value:O.removeTagKeys(r).join(", ")}),t.jsx(S,{removeTag:a=>{o((t=>{const s=function(e,a){let t=[];for(let s=0;s<e.length;s++)e[s]!==a&&t.push(e[s]);return t}(t,a);return e(s),s}))},tags:r})]})}const I="A",L="B",y="C",$="D",w="E",A="F",M="H";function _({changeSortData:e,sortData:a,sortDataName:s}){return t.jsx(c,{name:s,placeholder:`Find by ${s}...`,value:a[s],onInput:a=>e(s,a.currentTarget.value)})}const b=Object.freeze(Object.defineProperty({__proto__:null,default:function(){const e=m(),c=e.get("tag"),E=a.useRef(c?[c]:[]),S=a.useRef(null),O=window.matchMedia("(width <= 930px)").matches,b=!O||T(D["IS-FILTER-MODAL-OPEN"],S),[R,F]=a.useState({author:"",content:"",title:""}),[P,k]=a.useState(),z=parseInt(e.get("page")||"0"),K=[{name:"Likes",icon:t.jsx(o,{size:17})},{name:"Views",icon:t.jsx(l,{size:17})},{name:"Comments",icon:t.jsx(i,{size:17})}],{isPending:q,data:B,error:H,request:U}=u({deps:[`sort-${z}`],noCache:!0,request:async()=>await d.post(`/sort/${z}`,{...R,sortOption:P,tags:E.current},{Authorization:`Bearer ${g.getOne("PR_TOKEN")}`})}),G=(e,a)=>{F((t=>({...t,[e]:a})))};return t.jsx(a.Fragment,{children:H?t.jsx(j,{code:H.code,message:H.message}):t.jsxs("div",{style:{height:"100%"},className:"flex-row-normal-normal-medium",children:[t.jsxs("div",{style:{width:"100%",minHeight:"100%"},className:"flex-column-normal-normal-small",children:[O?t.jsx(s,{onClick:()=>{e.set({[D["IS-FILTER-MODAL-OPEN"]]:!0})},className:y}):null,q?t.jsx(p,{}):B&&B.pagesCount>=1?t.jsx(x,{pagesCount:B.pagesCount}):null,q?t.jsx(f,{}):B&&0===B.posts.length?t.jsx(h,{option:{flexCenterCenter:!0,height:"FULL"},label:"Nothing found!"}):B&&B.posts.map((e=>t.jsx(N,{post:e,type:"preview"},e._id))),q?t.jsx(p,{}):B&&B.pagesCount>=1?t.jsx(x,{pagesCount:B.pagesCount}):null]}),t.jsx("div",{ref:S,className:b?I:`${I} ${L}`,children:t.jsxs("div",{className:"main-content-container flex-column-normal-normal-small",children:[t.jsx("p",{className:$,children:"Sort by"}),t.jsx("div",{className:"flex-column-normal-normal-small",children:K.map((e=>t.jsxs("button",{onClick:()=>{return a=e.name,void k("descending"===P?.[a]?{[a]:"ascending"}:"ascending"===P?.[a]?{[a]:void 0}:{[a]:"descending"});var a},className:P?.[e.name]?`${w} ${A} flex-row-center-center-medium`:`${w} flex-row-center-center-medium`,children:[e.icon,t.jsx("p",{children:e.name}),"descending"===P?.[e.name]?t.jsx(n,{size:14}):"ascending"===P?.[e.name]?t.jsx(r,{size:14}):null]},e.name)))}),t.jsx(_,{changeSortData:G,sortData:R,sortDataName:"content"}),t.jsx(_,{changeSortData:G,sortData:R,sortDataName:"author"}),t.jsx(_,{changeSortData:G,sortData:R,sortDataName:"title"}),t.jsx(C,{getTags:e=>{E.current=e},placeholder:"Find by tags"}),t.jsxs("div",{className:`${M} flex-row-normal-normal-small`,children:[t.jsx(v,{onClick:()=>{0===z?U():e.set({page:0})},label:"Sort"}),t.jsx(v,{onClick:()=>{F({author:"",content:"",title:""}),k(void 0),e.set({page:0})},label:"Reset"})]})]})})]})})}},Symbol.toStringTag,{value:"Module"}));export{D as M,C as T,b as p,T as u};
