import{f as x,j as l,c as i,a as b,t as C,o as E,n as I,r as f,w as P}from"./app-3mzWtfnt.js";import{u as z}from"./chunk-6CVSDS6C-C4rspNSS.js";var v=x(function(o,s){const{children:t,placeholder:n,className:r,...c}=o;return l.jsxs(i.select,{...c,ref:s,className:b("chakra-select",r),children:[n&&l.jsx("option",{value:"",children:n}),t]})});v.displayName="SelectField";function F(e,o){const s={},t={};for(const[n,r]of Object.entries(e))o.includes(n)?s[n]=r:t[n]=r;return[s,t]}var H=x((e,o)=>{var s;const t=C("Select",e),{rootProps:n,placeholder:r,icon:c,color:a,height:_,h:d,minH:h,minHeight:y,iconColor:u,iconSize:p,...j}=E(e),[g,N]=F(j,P),m=z(N),w={width:"100%",height:"fit-content",position:"relative",color:a},k={paddingEnd:"2rem",...t.field,_focus:{zIndex:"unset",...(s=t.field)==null?void 0:s._focus}};return l.jsxs(i.div,{className:"chakra-select__wrapper",__css:w,...g,...n,children:[l.jsx(v,{ref:o,height:d??_,minH:h??y,placeholder:r,...m,__css:k,children:e.children}),l.jsx(S,{"data-disabled":I(m.disabled),...(u||a)&&{color:u||a},__css:t.icon,...p&&{fontSize:p},children:c})]})});H.displayName="Select";var M=e=>l.jsx("svg",{viewBox:"0 0 24 24",...e,children:l.jsx("path",{fill:"currentColor",d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"})}),R=i("div",{baseStyle:{position:"absolute",display:"inline-flex",alignItems:"center",justifyContent:"center",pointerEvents:"none",top:"50%",transform:"translateY(-50%)"}}),S=e=>{const{children:o=l.jsx(M,{}),...s}=e,t=f.cloneElement(o,{role:"presentation",className:"chakra-select__icon",focusable:!1,"aria-hidden":!0,style:{width:"1em",height:"1em",color:"currentColor"}});return l.jsx(R,{...s,className:"chakra-select__icon-wrapper",children:f.isValidElement(o)?t:null})};S.displayName="SelectIcon";export{H as S};
