import{r as f,W as w,j as s}from"./app-C1FUXzYO.js";import{V as I,I as n,E as b,L as v,a as E,b as L,c as C}from"./chunk-VDHTZURG-DBDtDYSN.js";import{D as y,H as k}from"./DoctorLoginLayout-lPDTzUhY.js";import{I as l}from"./chunk-FKYN3ZGE-BiFjaW43.js";import{F as d,I as m}from"./chunk-6CVSDS6C-NeQbUJFN.js";import{F as c}from"./chunk-VGESXGVT-BX9OABrS.js";import{a as p}from"./chunk-KRPLQIP4-D5-S-d08.js";import"./chunk-ZHMYA64R-HyBbs1y0.js";import"./Logo-B4iOwqDb.js";import"./chunk-QINAG4RG-DEyUvBIM.js";function O(){const[e,u]=f.useState(!1),{data:a,setData:i,errors:o,setError:t,post:h,processing:x}=w({email:"",password:""}),j=()=>u(!e);function g(r){r.preventDefault(),h(route("login"))}return s.jsxs(y,{children:[s.jsx(k,{my:"10",children:"Log in"}),s.jsx("form",{onSubmit:g,style:{width:"100%"},children:s.jsxs(I,{spacing:"12px",children:[s.jsxs(d,{isInvalid:o.email,children:[s.jsxs(l,{children:[s.jsx(n,{children:s.jsx(b,{})}),s.jsx(m,{id:"email",name:"email",variant:"outline",focusBorderColor:"blue.500",borderColor:"gray.400",placeholder:"Email",value:a.email,onChange:r=>{i("email",r.target.value),t("email","")}})]}),s.jsx(c,{children:o.email})]}),s.jsxs(d,{isInvalid:o.password,children:[s.jsxs(l,{size:"md",children:[s.jsx(n,{children:s.jsx(v,{})}),s.jsx(m,{id:"password",name:"password",variant:"outline",type:e?"text":"password",placeholder:"Enter password",borderColor:"gray.400",value:a.password,onChange:r=>{i("password",r.target.value),t("password","")}}),s.jsx(E,{children:s.jsx(p,{h:"1.75rem",size:"sm",onClick:j,children:e?s.jsx(L,{}):s.jsx(C,{})})})]}),s.jsx(c,{children:o.password})]}),s.jsx(p,{type:"submit",isLoading:x,bg:"blue.400",color:"white",w:"25%",_hover:{background:"blue.500"},children:"Log in"})]})})]})}export{O as default};