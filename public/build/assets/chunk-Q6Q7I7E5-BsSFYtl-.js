import{j as s,c as f,s as l,f as b}from"./app-3mzWtfnt.js";var p=r=>s.jsx(f.circle,{cx:50,cy:50,r:42,fill:"transparent",...r});p.displayName="Circle";function C(r,e,a){return(r-e)*100/(a-e)}var N=l({"0%":{strokeDasharray:"1, 400",strokeDashoffset:"0"},"50%":{strokeDasharray:"400, 400",strokeDashoffset:"-100"},"100%":{strokeDasharray:"400, 400",strokeDashoffset:"-260"}}),w=l({"0%":{transform:"rotate(0deg)"},"100%":{transform:"rotate(360deg)"}});l({"0%":{left:"-40%"},"100%":{left:"100%"}});l({from:{backgroundPosition:"1rem 0"},to:{backgroundPosition:"0 0"}});function I(r){const{value:e=0,min:a,max:t,valueText:d,getValueText:o,isIndeterminate:n,role:u="progressbar"}=r,c=C(e,a,t);return{bind:{"data-indeterminate":n?"":void 0,"aria-valuemax":t,"aria-valuemin":a,"aria-valuenow":n?void 0:e,"aria-valuetext":(()=>{if(e!=null)return typeof o=="function"?o(e,c):d})(),role:u},percent:c,value:e}}var x=r=>{const{size:e,isIndeterminate:a,...t}=r;return s.jsx(f.svg,{viewBox:"0 0 100 100",__css:{width:e,height:e,animation:a?`${w} 2s linear infinite`:void 0},...t})};x.displayName="Shape";var S=b((r,e)=>{var a;const{size:t="48px",max:d=100,min:o=0,valueText:n,getValueText:u,value:c,capIsRound:k,children:g,thickness:h="10px",color:y="#0078d4",trackColor:D="#edebe9",isIndeterminate:i,...P}=r,v=I({min:o,max:d,value:c,valueText:n,getValueText:u,isIndeterminate:i}),m=i?void 0:((a=v.percent)!=null?a:0)*2.64,_=m==null?void 0:`${m} ${264-m}`,j=i?{css:{animation:`${N} 1.5s linear infinite`}}:{strokeDashoffset:66,strokeDasharray:_,transitionProperty:"stroke-dasharray, stroke",transitionDuration:"0.6s",transitionTimingFunction:"ease"},T={display:"inline-block",position:"relative",verticalAlign:"middle",fontSize:t};return s.jsxs(f.div,{ref:e,className:"chakra-progress",...v.bind,...P,__css:T,children:[s.jsxs(x,{size:t,isIndeterminate:i,children:[s.jsx(p,{stroke:D,strokeWidth:h,className:"chakra-progress__track"}),s.jsx(p,{stroke:y,strokeWidth:h,className:"chakra-progress__indicator",strokeLinecap:k?"round":void 0,opacity:v.value===0&&!i?0:void 0,...j})]}),g]})});S.displayName="CircularProgress";export{S as C};
