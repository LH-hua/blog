import{T as D}from"./toastui-editor-1a4c2a60.js";import{g as F,d as M}from"./article-fb1a7804.js";import{_ as J,r as O,b as U,o as j,c as o,d as m,e as x,g as t,w as e,y as q,j as _,F as A,p as H,f as k,l as L,t as $,v as z,x as G,h as s}from"./index-1c70507a.js";const y=i=>(z("data-v-3d68053a"),i=i(),G(),i),K={class:"containner"},P=y(()=>s("div",{id:"editor"},null,-1)),Q=y(()=>s("ul",null,[s("li",null,"给你的贴子选择正确的分类"),s("li",null,"鲜明的标题，好的标题更能够吸引人"),s("li",null,"认真的书写你的正文，真诚是表达的前提"),s("li",null,"允许转载，请在末尾给出原文链接")],-1)),R={__name:"new",setup(i){let u;const f=O();let n=U({title:"",captchas_id:"",body:""});const S=a=>{n.captcha_id=a._id},I=()=>{const a=u.getMarkdown();n.body=a;const c=JSON.stringify(n);localStorage.setItem("post",c)},b=async()=>{const a=u.getMarkdown();n.body=a,M(n).then(()=>{localStorage.getItem("post")&&localStorage.clear("post")})},C=()=>{u=new D({el:document.querySelector("#editor"),height:"50vh",initialEditType:"markdown",previewStyle:"vertical",hooks:{addImageBlobHook:(a,c)=>{const r=new FormData;r.append("image",a),q("/api/file/upload-image",r).then(l=>{c(l.data.src,"")})}}})};return j(()=>{localStorage.getItem("post")&&(n=JSON.parse(localStorage.getItem("post"))),C(),F().then(a=>{f.value=a.data})}),(a,c)=>{const r=o("v-toolbar"),l=o("v-col"),T=o("v-chip"),V=o("v-chip-group"),p=o("v-row"),B=o("v-text-field"),v=o("v-card-text"),h=o("v-btn"),g=o("v-card"),w=o("v-sheet"),N=o("v-card-title"),E=o("side-main");return m(),x("div",K,[t(E,null,{main:e(()=>[t(w,{class:"pa-5"},{default:e(()=>[t(r,{color:"white",title:"发起话题"}),t(g,{flat:""},{actions:e(()=>[t(p,null,{default:e(()=>[t(l,{cols:"1"}),t(l,{cols:"11"},{default:e(()=>[t(h,{onClick:I,text:"保 存"}),t(h,{onClick:b,text:"提 交"})]),_:1})]),_:1})]),default:e(()=>[t(v,null,{default:e(()=>[t(p,null,{default:e(()=>[t(l,{cols:"1","align-self":"center"},{default:e(()=>[_("选择话题")]),_:1}),t(l,{cols:"11"},{default:e(()=>[t(V,null,{default:e(()=>[(m(!0),x(A,null,H(f.value,d=>(m(),L(T,{class:"ma-2",variant:"text",label:"",key:d,onClick:W=>S(d)},{default:e(()=>[_($(d.name),1)]),_:2},1032,["onClick"]))),128))]),_:1})]),_:1})]),_:1}),t(p,null,{default:e(()=>[t(l,{cols:"1","align-self":"center"},{default:e(()=>[_("标题")]),_:1}),t(l,{cols:"11"},{default:e(()=>[t(B,{modelValue:k(n).title,"onUpdate:modelValue":c[0]||(c[0]=d=>k(n).title=d),density:"compact",variant:"outlined",placeholder:"一个拥有标识度的标题能够更加的吸引人","hide-details":""},null,8,["modelValue"])]),_:1})]),_:1}),t(p,null,{default:e(()=>[t(l,{cols:"1"},{default:e(()=>[_("正文")]),_:1}),t(l,{cols:"11"},{default:e(()=>[P]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),side:e(()=>[t(w,{class:"pa-5"},{default:e(()=>[t(g,{flat:""},{default:e(()=>[t(N,null,{default:e(()=>[_(" 发帖提示 ")]),_:1}),t(v,null,{default:e(()=>[Q]),_:1})]),_:1})]),_:1})]),_:1})])}}},tt=J(R,[["__scopeId","data-v-3d68053a"]]);export{tt as default};
