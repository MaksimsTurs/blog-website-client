const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/js/page/home.js","assets/js/react.js","assets/js/__commonjsHelpers__.js","assets/js/page/admin.js","assets/css/page/admin.css","assets/css/page/home.css","assets/js/page/post.js","assets/css/page/post.css","assets/js/page/write-new.js","assets/js/page/search.js","assets/css/page/search.css","assets/js/page/website-settings.js","assets/css/page/website-settings.css","assets/css/page/write-new.css","assets/js/page/user.js","assets/css/page/user.css"])))=>i.map(i=>d[i]);
import{j as e,r as s,X as a,I as t,L as r,J as n,K as i,Q as o,a as l,x as m,R as c,V as d,s as h,W as x,i as u,Y as j,Z as p,_ as f,$ as _,a0 as g}from"./react.js";import{g as w,F as N,T as y,h as v,i as b,u as E,a as S,d as L,m as P,n as R,R as $}from"./page/admin.js";import{a as O,b as A,w as k}from"./page/website-settings.js";import{c as I,W as M}from"./page/write-new.js";import{b as z,I as D,P as T,u as C,E as U,L as V}from"./page/home.js";import{u as W,M as F}from"./page/search.js";import{P as J}from"./page/post.js";import{U as q,a as B}from"./page/user.js";import"./__commonjsHelpers__.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver((e=>{for(const a of e)if("childList"===a.type)for(const e of a.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&s(e)})).observe(document,{childList:!0,subtree:!0})}function s(e){if(e.ep)return;e.ep=!0;const s=function(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?s.credentials="include":"anonymous"===e.crossOrigin?s.credentials="omit":s.credentials="same-origin",s}(e);fetch(e.href,s)}}();const G={},Y=function(e,s,a){let t=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const e=document.querySelector("meta[property=csp-nonce]"),a=e?.nonce||e?.getAttribute("nonce");t=Promise.all(s.map((e=>{if((e=function(e){return"/"+e}(e))in G)return;G[e]=!0;const s=e.endsWith(".css"),t=s?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${t}`))return;const r=document.createElement("link");return r.rel=s?"stylesheet":"modulepreload",s||(r.as="script",r.crossOrigin=""),r.href=e,a&&r.setAttribute("nonce",a),document.head.appendChild(r),s?new Promise(((s,a)=>{r.addEventListener("load",s),r.addEventListener("error",(()=>a(new Error(`Unable to preload CSS for ${e}`))))})):void 0})))}return t.then((()=>e())).catch((e=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=e,window.dispatchEvent(s),!s.defaultPrevented)throw e}))},H=A({reducer:O({creator:I,websiteSetting:k})}),K="_",Q="a",X="b",Z="c",ee="d",se="e",ae="f",te={loader_container:"O_",loader_element_animation:"P_",loader:"Q_",loader_button:"R_",loader_avatar:"S_"};function re(){return e.jsxs("div",{className:te.loader_container,children:[e.jsx("div",{className:`${te.loader_element_animation} ${te.loader_button}`}),e.jsx("div",{className:`${te.loader_element_animation} ${te.loader_button}`}),e.jsx("div",{className:`${te.loader_element_animation} ${te.loader_avatar}`})]})}const ne={authorization_modal_container:"la",authorization_modal_body:"ma",authorization_modal_container_hidden:"na"};function ie(){const a=z(),t=s.useRef(null),r=W(F["LOGIN-MODAL"],t),{submit:n,reset:i,formState:{errors:o}}=w([["email","isPattern:^[^\\s@]+@[^\\s@]+.[^\\s@]+$:Email is incorrect!"],["name",["isMax:12:Name is to long!","isMin:3:Name is to short!"]],["password","isMin:8:Password is to short!"]]);return a.clearError(),e.jsx("div",{ref:t,className:r?ne.authorization_modal_container:ne.authorization_modal_container_hidden,children:e.jsxs(N,{errors:a.error?.message?[a.error.message]:[],className:ne.authorization_modal_body,onSubmit:n((e=>{a.create({apiURL:"/login",body:e,redirectURL:"/",setToken:!0}),i()})),isPending:a.isLoading,buttonLabel:"Log in",children:[e.jsx(y,{name:"name",errors:o,placeholder:"Write you name here..."}),e.jsx(y,{name:"email",type:"email",errors:o,placeholder:"Write you email here..."}),e.jsx(y,{name:"password",type:"password",errors:o,placeholder:"Write you password here..."})]})})}function oe(){const a=s.useRef(null),t=W(F["REGISTRATE-MODAL"],a),r=z(),{submit:n,reset:i,formState:{errors:o}}=w([["email","isPattern:^[^\\s@]+@[^\\s@]+.[^\\s@]+$:Email is incorrect!"],["name",["isMax:12:Name is to long!","isMin:3:Name is to short!"]],["password",["isMin:8:Password is to short!","isEqualWith:confirmPassword:Passwords does match!"]],["confirmPassword",["isMin:8:Password is to short!"]]]);return r.clearError(),e.jsx("div",{ref:a,className:t?ne.authorization_modal_container:ne.authorization_modal_container_hidden,children:e.jsxs(N,{isPending:r.isLoading,buttonLabel:"Registrate",errors:r.error?.message?[r.error.message]:[],className:ne.authorization_modal_body,onSubmit:n((e=>{const s=b(e);0===s.get("avatar").size&&s.set("avatar",function(e){const s=220,a=["#166bfd","#0e49ad","#3266bf","#0c3d91","#0040e3","#265be0","#1f45a3","#0235b3","#2268c9","#1b529e","#F48023","#bf641b","#9e5f2c","#b57948","#b86725","#fa8c32","#ff7300","#c74d06","#ed6e24","#bf6836"],t=document.createElement("canvas"),r=t.getContext("2d");return t.width=s,t.height=s,r.fillStyle=a[Math.floor(Math.random()*a.length-1)],r.fillRect(0,0,s,s),r.font="100px Arial",r.fillStyle="white",r.textBaseline="middle",r.fillText(e[0],s/3.1,110),t.toDataURL("image/webp",50).replace("data:image/webp;base64,","")}(e.name)),r.create({apiURL:"/registrate",body:s,redirectURL:"/",setToken:!0}),i()})),children:[e.jsx(y,{errors:o,name:"name",placeholder:"You name"}),e.jsx(y,{errors:o,name:"email",placeholder:"You e-mail",type:"email"}),e.jsx(y,{errors:o,name:"password",placeholder:"You password",type:"password"}),e.jsx(y,{errors:o,name:"confirmPassword",placeholder:"Confirm you password",type:"password"}),e.jsx(v,{name:"avatar",label:"Chose you avatar!"})]})})}function le(){const s=z(),i=E(),o=JSON.parse(i.get(F["IS-SIDE-MENU-OPEN"])||"false"),l=e=>{let s=!1;const a=JSON.parse(i.get(`${e}-modal`)||"false");s="login"===e?JSON.parse(i.get(F["REGISTRATE-MODAL"])||"false"):JSON.parse(i.get(F["LOGIN-MODAL"])||"false"),s||i.set({[`${e}-modal`]:!a})};return e.jsxs(e.Fragment,{children:[e.jsx(ie,{}),e.jsx(oe,{}),e.jsxs("header",{className:`${ee} flex-row-center-space-between-none`,children:[e.jsxs("div",{style:{width:"100%"},className:"flex-row-center-normal-none",children:[e.jsx("button",{onClick:()=>{const e=JSON.parse(i.get(F["IS-SIDE-MENU-OPEN"])||"false");i.set({[F["IS-SIDE-MENU-OPEN"]]:!e})},className:Z,children:o?e.jsx(a,{}):e.jsx(t,{})}),e.jsx(r,{className:X,to:"/",children:"Ruzzkyi Mir"})]}),s.isAuthPending?e.jsx(re,{}):s.user?e.jsx("section",{className:`${Q} flex-row-center-center-medium`,children:e.jsx(r,{className:ae,to:`/user/${s.user._id}`,children:e.jsx(D,{styles:{loader:{width:"2rem",height:"2rem"}},src:s.user.avatar,alt:s.user.name})})}):e.jsxs("section",{className:`${K} flex-row-center-normal-none`,children:[e.jsx("button",{className:"flex-row-center-center-none",onClick:()=>l("registrate"),children:e.jsxs("section",{className:`${se} flex-row-center-normal-medium`,children:[e.jsx(n,{}),"Registrate"]})}),e.jsx("button",{onClick:()=>l("login"),children:"Login"})]})]})]})}const me="V";function ce(){const[a,t]=s.useState(0===window.scrollX);s.useEffect((()=>{document.addEventListener("scroll",(()=>{t(0===document.body.getBoundingClientRect().top)}))}),[]);const r=e=>{const s="top"===e?0:document.body.scrollHeight;window.scrollTo({behavior:"smooth",top:s})};return e.jsx("div",{className:`${me} flex-row-center-center-none`,children:a?e.jsx(i,{onClick:()=>r("bottom")}):e.jsx(o,{onClick:()=>r("top")})})}const de="o",he="p",xe="q",ue="r",je="t",pe="u",fe="v",_e="w",ge={side_menu_loader_container:"da",side_menu_loader_item:"ea",loader:"fa"};function we(){return e.jsxs("div",{className:ge.side_menu_loader_container,children:[e.jsx("div",{className:ge.side_menu_loader_item}),e.jsx("div",{className:ge.side_menu_loader_item}),e.jsx("div",{className:ge.side_menu_loader_item}),e.jsx("div",{className:ge.side_menu_loader_item})]})}function Ne(){const{pathname:s}=l(),a=E(),t=z(),i=S(),o=m((e=>e.creator)),j=/[\#\[\]\{\}\(\)]/g,p=s.search(/post/)>-1,f=window.matchMedia("(width <= 830px)").matches,_=!f||JSON.parse(a.get("is-side-menu-open")||"false"),g=[{title:"Home",path:"/",icon:e.jsx(c,{})},{title:"Search",path:"/search",icon:e.jsx(d,{})},{title:"Settings",path:"/setting",icon:e.jsx(h,{})}];i.role(["Admin"]).permited()&&g.push({title:"Admin",path:"/admin/post",icon:e.jsx(x,{})},{title:"Write post",path:"/write-post",icon:e.jsx(u,{})}),i.role(["Creator"]).permited()&&g.push({title:"Write post",path:"/write-post",icon:e.jsx(u,{})});const w=e=>{a.set({[`${e}-modal`]:!JSON.parse(a.get(`${e}-modal`)||"false")}),a.remove(["is-side-menu-open"])};return e.jsx("div",{style:p&&f?{paddingLeft:"0rem"}:void 0,className:de,children:e.jsxs("aside",{className:`${f?he:""}  ${_?ue:`${xe} ${ue}`} flex-column-normal-normal-medium`,children:[f&&t.user?e.jsxs("div",{className:"flex-column-normal-normal-none",children:[e.jsx("p",{className:je,children:"User"}),e.jsxs(r,{to:`/user/${t.user?._id}`,className:"flex-row-center-normal-medium",children:[e.jsx(D,{classNames:{img:fe},src:t.user?.avatar,alt:t.user?.name||"User avatar"}),e.jsx("p",{children:t.user?.name})]})]}):f&&e.jsxs(e.Fragment,{children:[e.jsxs("button",{className:"flex-row-center-normal-medium",onClick:()=>w("login"),children:[e.jsx(n,{}),e.jsx("p",{children:"Login"})]}),e.jsxs("button",{className:"flex-row-center-normal-medium",onClick:()=>w("registrate"),children:[e.jsx(n,{}),e.jsx("p",{children:"Registrate"})]})]}),e.jsxs("div",{className:"flex-column-normal-normal-none",children:[e.jsx("p",{className:je,children:"Menu"}),t.isAuthPending?e.jsx(we,{}):e.jsx("section",{className:"flex-column-normal-normal-small",children:g.map((a=>e.jsxs(r,{className:s.split("/")[1]===a.path.split("/")[1]?`${_e} flex-row-center-normal-medium`:"flex-row-center-normal-medium",to:a.path,children:[a.icon,e.jsx("p",{className:pe,children:a.title})]},a.title)))})]}),o.contentDraft.length>0&&e.jsxs("div",{className:"flex-column-normal-normal-none",children:[e.jsx("p",{className:je,children:"Draft"}),e.jsx("section",{className:"flex-column-normal-normal-small",children:o.contentDraft.slice(0,5).map((s=>e.jsx(r,{className:pe,to:`/write-post?draft-id=${s._id}`,children:s.content.replace(j,"").trim()},s._id)))})]})]})})}function ye(){return e.jsxs("div",{style:{width:"100%"},className:"flex-row-normal-normal-medium",children:[e.jsxs("div",{style:{width:"100%"},className:"flex-column-normal-normal-medium",children:[e.jsx(T,{}),e.jsx(L,{}),e.jsx(T,{}),e.jsx(T,{}),e.jsx(L,{})]}),e.jsx(J,{})]})}const ve="x",be="y";function Ee(){return C({title:"Finden",description:"Hier kannst du posts mit gegebenen sortierung optionen finden."}),e.jsxs("div",{className:`${ve} flex-row-normal-normal-medium`,children:[e.jsxs("div",{style:{width:"100%"},className:"flex-column-normal-normal-small",children:[e.jsx(L,{}),e.jsx(T,{}),e.jsx(T,{}),e.jsx(T,{})]}),e.jsxs("div",{style:{height:"fit-content"},className:"main-content-container flex-column-normal-normal-medium",children:[e.jsxs("div",{className:"flex-row-normal-normal-medium",children:[e.jsx("div",{style:{width:"5rem"},className:be}),e.jsx("div",{style:{width:"5rem"},className:be}),e.jsx("div",{style:{width:"5rem"},className:be})]}),e.jsxs("div",{className:"flex-column-normal-normal-medium",children:[e.jsx("div",{style:{width:"100%"},className:be}),e.jsx("div",{style:{width:"100%"},className:be}),e.jsx("div",{style:{width:"100%"},className:be}),e.jsx("div",{style:{width:"100%"},className:be})]}),e.jsxs("div",{className:"flex-row-normal-normal-medium",children:[e.jsx("div",{style:{width:"50%"},className:be}),e.jsx("div",{style:{width:"50%"},className:be})]})]})]})}function Se(){return e.jsxs("div",{style:{width:"100%"},className:"flex-column-center-center-medium",children:[e.jsx(q,{}),e.jsx(B,{})]})}const Le="h",Pe="i";function Re(){return C({title:"Admin panel"}),e.jsxs("div",{style:{width:"100%"},className:"flex-row-normal-normal-none",children:[e.jsxs("div",{style:{paddingRight:"11rem",width:"100%"},className:"flex-column-normal-normal-medium",children:[e.jsx(L,{}),e.jsx(P,{}),e.jsx(L,{})]}),e.jsxs("div",{className:`${Le} flex-column-normal-normal-medium`,children:[e.jsx("div",{style:{width:"100%",height:"2rem"},className:Pe}),e.jsx("div",{style:{width:"100%",height:"2rem"},className:Pe}),e.jsx("div",{style:{width:"100%",height:"2rem"},className:Pe}),e.jsx("div",{style:{width:"100%",height:"2rem"},className:Pe})]})]})}function $e({exeptetRoles:a,children:t}){const r=S().role(a).permited();return e.jsx(s.Fragment,{children:r?t:e.jsx(U,{code:403,message:"You have no permission to view this page!"})})}const Oe=s.lazy((()=>Y((()=>import("./page/home.js").then((e=>e.p))),__vite__mapDeps([0,1,2,3,4,5])))),Ae=s.lazy((()=>Y((()=>import("./page/post.js").then((e=>e.p))),__vite__mapDeps([6,1,2,3,4,0,5,7])))),ke=s.lazy((()=>Y((()=>import("./page/write-new.js").then((e=>e.p))),__vite__mapDeps([8,1,2,3,4,9,0,5,10,11,12,13])))),Ie=s.lazy((()=>Y((()=>import("./page/search.js").then((e=>e.p))),__vite__mapDeps([9,1,2,3,4,0,5,10])))),Me=s.lazy((()=>Y((()=>import("./page/user.js").then((e=>e.p))),__vite__mapDeps([14,1,2,3,4,0,5,9,10,15])))),ze=s.lazy((()=>Y((()=>import("./page/admin.js").then((e=>e.p))),__vite__mapDeps([3,1,2,4])))),De=s.lazy((()=>Y((()=>import("./page/website-settings.js").then((e=>e.p))),__vite__mapDeps([11,1,2,3,4,12])))),Te=()=>{const a=m((e=>e.websiteSetting));return document.getElementById("root").style.fontFamily=a.font,e.jsxs(s.Fragment,{children:[e.jsx(le,{}),e.jsxs("div",{className:"flex-row-normal-normal-medium",style:{padding:"0rem 1.5rem 0rem 1rem",flexGrow:"1"},children:[e.jsx(Ne,{}),e.jsxs("main",{children:[e.jsxs(_,{children:[e.jsx(g,{path:"/",element:e.jsx(s.Suspense,{fallback:e.jsx(V,{}),children:e.jsx(Oe,{})})}),e.jsx(g,{path:"/post/:id",element:e.jsx(s.Suspense,{fallback:e.jsx(ye,{}),children:e.jsx(Ae,{})})}),e.jsx(g,{path:"/search",element:e.jsx(s.Suspense,{fallback:e.jsx(Ee,{}),children:e.jsx(Ie,{})})}),e.jsx(g,{path:"/user/:id",element:e.jsx(s.Suspense,{fallback:e.jsx(Se,{}),children:e.jsx(Me,{})})}),e.jsx(g,{path:"/setting",element:e.jsx(s.Suspense,{fallback:"loading",children:e.jsx(De,{})})}),e.jsx(g,{path:"*",element:e.jsx(U,{code:404,message:"Page not found!",underText:"Site there you search is not implemented or not exist!"})}),e.jsx(g,{path:"/write-post",element:e.jsx(s.Suspense,{fallback:e.jsx(M,{}),children:e.jsx($e,{exeptetRoles:["Admin","Creator"],children:e.jsx(ke,{})})})}),e.jsx(g,{path:"/admin/:tab",element:e.jsx(s.Suspense,{fallback:e.jsx(Re,{}),children:e.jsx($e,{exeptetRoles:["Admin"],children:e.jsx(ze,{})})})})]}),e.jsx(ce,{})]})]})]})};j(document.getElementById("root")).render(e.jsx(p,{children:e.jsx(R,{children:e.jsx($,{children:e.jsx(f,{store:H,children:e.jsx(Te,{})})})})}));
