import{_ as y,a as B,k as w,b as I,s as S,q as Y,c as t,d as _,e as p,g as s,w as o,F as C,p as D,l as F,h as l,t as r,j as M,v as N,x as V}from"./index-1c70507a.js";import{h as q}from"./moment-a9aaa855.js";import{g as H,b as L}from"./article-fb1a7804.js";const R=n=>(N("data-v-3cd1a0c1"),n=n(),V(),n),T=["href"],j=R(()=>l("br",null,null,-1)),z={__name:"list",setup(n){B();const i=w(),c=I({data:[],captcha:[]}),m=e=>q(e).format("YYYY-MM-DD HH:mm");function d(e){L(e).then(u=>{c.data=u.data})}return S(()=>i.name,()=>{d({captcha_id:i.params.id})},{immediate:!0,deep:!0}),Y(()=>{d(),H().then(e=>{c.captcha=e.data})}),(e,u)=>{const v=t("v-list-item-title"),h=t("v-list-item-subtitle"),f=t("v-divider"),g=t("v-img"),k=t("v-avatar"),x=t("v-list-item"),b=t("v-list");return _(),p("div",null,[s(b,null,{default:o(()=>[(_(!0),p(C,null,D(c.data,a=>(_(),F(x,{key:a},{prepend:o(()=>[s(k,{size:"50"},{default:o(()=>[s(g,{src:a.auther.avatar},null,8,["src"])]),_:2},1024)]),default:o(()=>[s(v,null,{default:o(()=>[l("a",{href:"/posts/"+a._id,Target:"_blank"},r(a.title),9,T)]),_:2},1024),s(h,null,{default:o(()=>[l("span",null,r(a.auther.username),1),M(" · "+r(m(a.date)),1)]),_:2},1024),j,s(f)]),_:2},1024))),128))]),_:1})])}}},J=y(z,[["__scopeId","data-v-3cd1a0c1"]]);export{J as default};
