import{j as n,c as W,f as D,r as o,a as I}from"./app-L0PSAVpr.js";import{b as E,g as R}from"./chunk-KRPLQIP4-fYYjkn2x.js";var _=e=>n.jsx(W.div,{className:"chakra-stack__item",...e,__css:{display:"inline-block",flex:"0 0 auto",minWidth:0,...e.__css}});_.displayName="StackItem";function M(e){const{spacing:t,direction:a}=e,r={column:{my:t,mx:0,borderLeftWidth:0,borderBottomWidth:"1px"},"column-reverse":{my:t,mx:0,borderLeftWidth:0,borderBottomWidth:"1px"},row:{mx:t,my:0,borderLeftWidth:"1px",borderBottomWidth:0},"row-reverse":{mx:t,my:0,borderLeftWidth:"1px",borderBottomWidth:0}};return{"&":E(a,d=>r[d])}}var F=D((e,t)=>{const{isInline:a,direction:r,align:d,justify:b,spacing:c="0.5rem",wrap:g,children:u,divider:l,className:j,shouldWrapChildren:m,...S}=e,p=a?"row":r??"column",x=o.useMemo(()=>M({spacing:c,direction:p}),[c,p]),s=!!l,f=!m&&!s,w=o.useMemo(()=>{const h=R(u);return f?h:h.map((i,y)=>{const v=typeof i.key<"u"?i.key:y,N=y+1===h.length,k=m?n.jsx(_,{children:i},v):i;if(!s)return k;const L=o.cloneElement(l,{__css:x}),B=N?null:L;return n.jsxs(o.Fragment,{children:[k,B]},v)})},[l,x,s,f,m,u]),C=I("chakra-stack",j);return n.jsx(W.div,{ref:t,display:"flex",alignItems:d,justifyContent:b,flexDirection:p,flexWrap:g,gap:s?void 0:c,className:C,...S,children:w})});F.displayName="Stack";export{F as S};
