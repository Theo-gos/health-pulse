import{r as w,W as f,j as s}from"./app-L0PSAVpr.js";import{V as I,I as n,E as b,L as v,a as E,b as C,c as L}from"./chunk-VDHTZURG-DSmPYxby.js";import{D as y,H as k}from"./DoctorLoginLayout-CysubTXS.js";import{I as l}from"./chunk-FKYN3ZGE-DOOEPOXc.js";import{F as d,I as m,a as c}from"./chunk-6CVSDS6C-B9zz3TE0.js";import{a as p}from"./chunk-KRPLQIP4-fYYjkn2x.js";import"./chunk-ZHMYA64R-IzX89jau.js";import"./Logo-CaItQl7L.js";import"./chunk-QINAG4RG-3I5Xmz84.js";function M(){const[o,u]=w.useState(!1),{data:a,setData:i,errors:e,setError:t,post:h,processing:x}=f({email:"",password:""}),j=()=>u(!o);function g(r){r.preventDefault(),h(route("login"))}return s.jsxs(y,{children:[s.jsx(k,{my:"10",children:"Log in"}),s.jsx("form",{onSubmit:g,style:{width:"100%"},children:s.jsxs(I,{spacing:"12px",children:[s.jsxs(d,{isInvalid:e.email,children:[s.jsxs(l,{children:[s.jsx(n,{children:s.jsx(b,{})}),s.jsx(m,{id:"email",name:"email",variant:"outline",focusBorderColor:"blue.500",borderColor:"gray.400",placeholder:"Email",value:a.email,onChange:r=>{i("email",r.target.value),t("email","")}})]}),s.jsx(c,{children:e.email})]}),s.jsxs(d,{isInvalid:e.password,children:[s.jsxs(l,{size:"md",children:[s.jsx(n,{children:s.jsx(v,{})}),s.jsx(m,{id:"password",name:"password",variant:"outline",type:o?"text":"password",placeholder:"Enter password",borderColor:"gray.400",value:a.password,onChange:r=>{i("password",r.target.value),t("password","")}}),s.jsx(E,{children:s.jsx(p,{h:"1.75rem",size:"sm",onClick:j,children:o?s.jsx(C,{}):s.jsx(L,{})})})]}),s.jsx(c,{children:e.password})]}),s.jsx(p,{type:"submit",disabled:x,bg:"blue.400",color:"white",w:"25%",_hover:{background:"blue.500"},children:"Log in"})]})})]})}export{M as default};
