import{W as B,j as t,r as b}from"./app-B-st9BtI.js";import{C as Y,a as D}from"./chunk-6RTX462E-DQAbwFTW.js";import{d as c}from"./dayjs.min-BznShDkh.js";import{w as R,a as C}from"./weekOfYear-B7xNju7V.js";import{D as M,B as k}from"./DoctorLayout-Dyh4Qz7G.js";import{G as _}from"./iconBase-ChLQLo6q.js";import{G as l}from"./chunk-JARCRF6W-Cq7xPRAG.js";import{S as T}from"./chunk-ZHMYA64R-DtvKkc4C.js";import{G as p}from"./chunk-ZPFGWTBB-DwjZvVs4.js";import{F as g,B as o}from"./chunk-KRPLQIP4-BlAVN8HP.js";import{C as v}from"./chunk-Q6Q7I7E5-B8Zb2bBP.js";import"./Logo-xk-lhgy1.js";function I(e){return _({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z"},child:[]}]})(e)}const h=c(),O={active:"blue.100",done:"green.100",canceled:"red.100"},z=e=>{let a=0;return e>10&&e<=20&&(a=1),e>20&&e<=40?a=2:e>40&&(a=3),a},S=(e,a)=>{e=e.split(":"),a=a.split(":");const r=new Date(0,0,0,e[0],e[1],0);let d=new Date(0,0,0,a[0],a[1],0).getTime()-r.getTime();const x=Math.floor(d/1e3/60/60);d-=x*1e3*60*60;const i=Math.floor(d/1e3/60);return x*3+z(i)},u=(e,a,r="8:00")=>{let s=r;return e.map((d,x)=>{const i=[],f=S(s,d.start_time),n=S(d.start_time,d.end_time),m=d.start_time.split(":"),F=d.end_time.split(":"),w=d.patient.name.split(" ");return s=d.end_time,f&&i.push(t.jsx(p,{rowSpan:f},`empty-${x}`)),i.push(t.jsx(p,{borderRadius:"md",bg:O[d.status],p:"4px 4px",rowSpan:n,children:n===1?d.status==="active"?t.jsxs(g,{justify:"space-between",children:[t.jsx(o,{color:"black",fontWeight:"bold",children:`${w[0].charAt(0).toUpperCase()}. ${w[1]}`}),t.jsx(o,{children:`${m[0]}:${m[1]}`})]}):t.jsxs(g,{justify:"space-between",children:[t.jsx(o,{color:"black",fontWeight:"bold",children:d.status}),t.jsx(o,{children:`${m[0]}:${m[1]}`})]}):t.jsxs(T,{spacing:2,h:"100%",p:"4px 4px",children:[t.jsxs(g,{w:"100%",justify:"space-between",align:"center",children:[t.jsx(o,{color:"black",fontWeight:"bold",fontSize:"13px",children:`${d.patient.name} (${d.status})`}),d.status!=="canceled"?t.jsx(I,{style:{cursor:"pointer"},title:"Go to appointment note",onClick:()=>a(d.id)}):t.jsx(t.Fragment,{})]}),t.jsx(o,{children:`${m[0]}:${m[1]} > ${F[0]}:${F[1]}`})]})},x)),F[1]>=40&&(s=`${Number(F[0])+1}:00:00`,i.push(t.jsx(p,{rowSpan:1},`empty-${x}-ex`))),i})};function G({data:e,date:a}){const{get:r}=B(),s=d=>{r(route("appointment.note",{appointment:d},{forceFormData:!0}))};return t.jsxs(t.Fragment,{children:[t.jsx(l,{templateRows:"repeat(45, 1fr)",gap:.5,borderBottomRadius:"md",bg:h.date()===a.date()?"#F2F7FF":"transparent",w:"14.26%",h:"100%",pl:"1px",children:e.Monday?u(e.Monday,s):""}),t.jsx(l,{templateRows:"repeat(45, 1fr)",gap:.5,bg:h.date()===a.add(1,"day").date()?"#F2F7FF":"transparent",w:"14.26%",h:"100%",pl:"1px",children:e.Tuesday?u(e.Tuesday,s):""}),t.jsx(l,{templateRows:"repeat(45, 1fr)",gap:.5,borderBottomRadius:"md",bg:h.date()===a.add(2,"day").date()?"#F2F7FF":"transparent",w:"14.26%",h:"100%",pl:"1px",children:e.Wednesday?u(e.Wednesday,s):""}),t.jsx(l,{templateRows:"repeat(45, 1fr)",gap:.5,borderBottomRadius:"md",bg:h.date()===a.add(3,"day").date()?"#F2F7FF":"transparent",w:"14.26%",h:"100%",pl:"1px",children:e.Thursday?u(e.Thursday,s):""}),t.jsx(l,{templateRows:"repeat(45, 1fr)",gap:.5,borderBottomRadius:"md",bg:h.date()===a.add(4,"day").date()?"#F2F7FF":"transparent",w:"14.26%",h:"100%",pl:"1px",children:e.Friday?u(e.Friday,s):""}),t.jsx(l,{templateRows:"repeat(45, 1fr)",gap:.5,borderBottomRadius:"md",bg:h.date()===a.add(5,"day").date()?"#F2F7FF":"transparent",w:"14.26%",h:"100%",pl:"1px",children:e.Saturday?u(e.Saturday,s):""}),t.jsx(l,{templateRows:"repeat(45, 1fr)",gap:.5,borderBottomRadius:"md",bg:h.date()===a.add(6,"day").date()?"#F2F7FF":"transparent",w:"14.26%",h:"100%",pl:"1px",children:e.Sunday?u(e.Sunday,s):""})]})}c.extend(R);c.extend(C);const $=[],y=c();let W=8;for(let e=0;e<=45;e++){const a=e%3===0?t.jsx(p,{fontSize:"11px",rowSpan:1,children:`${W++}:00`},e):t.jsx(p,{rowSpan:1},e);$.push(a)}const j=(e,a)=>new Date(e).toLocaleDateString(a,{weekday:"short"});function X({appointments:e,startDate:a}){const[r,s]=b.useState(c(a).weekday(1)),[d,x]=b.useState(e),{get:i,processing:f,data:n,setData:m}=B({start_date:r.format("YYYY-MM-DD"),end_date:r.add(6,"day").format("YYYY-MM-DD")}),F=()=>{n.start_date=c(n.start_date).subtract(1,"week").format("YYYY-MM-DD"),n.end_date=c(n.end_date).subtract(1,"week").format("YYYY-MM-DD"),i(route("doctor.appointments"))},w=()=>{n.start_date=c(n.start_date).add(1,"week").format("YYYY-MM-DD"),n.end_date=c(n.end_date).add(1,"week").format("YYYY-MM-DD"),i(route("doctor.appointments"))};return t.jsx(M,{state:"appointments",children:t.jsx(o,{h:"100%",children:t.jsxs(o,{w:"87vw",h:"100%",p:"8px 32px",fontSize:"14px",children:[t.jsxs(g,{align:"center",justify:"flex-start",mb:"8px",children:[t.jsx(o,{border:"1px solid gray",borderRadius:"md",p:"1px 10px",mr:"6px",style:{cursor:"pointer"},_hover:{backgroundColor:"blue.400",color:"white"},onClick:()=>{n.start_date="",n.end_date="",i(route("doctor.appointments"))},color:"#1366DE",children:"Today"}),t.jsx(o,{mx:"6px",children:t.jsx(k,{})}),t.jsxs(g,{align:"center",justify:"space-evenly",ml:"6px",children:[t.jsx(o,{style:{cursor:"pointer"},onClick:F,children:t.jsx(Y,{})}),t.jsx(o,{fontWeight:"bold",fontSize:"14px",mr:"4px",children:r.format("MMMM YYYY")}),t.jsx(o,{children:"/"}),t.jsx(o,{fontSize:"13px",color:"gray.400",ml:"4px",children:`week ${r.week()}`}),t.jsx(o,{style:{cursor:"pointer"},onClick:w,children:t.jsx(D,{})})]})]}),t.jsxs(g,{w:"100%",h:"95%",mt:"16px",p:"8px",borderRadius:"md",overflow:"scroll",fontSize:"12px",children:[t.jsx(l,{templateRows:"repeat(45, 1fr)",w:"2%",height:"1225px",mt:"24px",pr:"40px",borderRight:"1px solid #708CBB",children:$}),t.jsxs(o,{w:"98%",children:[t.jsxs(l,{templateColumns:"repeat(7, 1fr)",gap:0,w:"100%",h:"4%",textAlign:"center",children:[t.jsx(p,{borderBottom:"1px solid #708CBB",borderTopRadius:"md",w:"100%",bg:y.date()===r.date()?"#F2F7FF":"transparent",children:`${j(r.toISOString())} ${r.date()}`}),t.jsx(p,{borderBottom:"1px solid #708CBB",borderTopRadius:"md",w:"100%",bg:y.date()===r.add(1,"day").date()?"#F2F7FF":"transparent",children:`${j(r.add(1,"day").toISOString())} ${r.add(1,"day").date()}`}),t.jsx(p,{borderBottom:"1px solid #708CBB",borderTopRadius:"md",w:"100%",bg:y.date()===r.add(2,"day").date()?"#F2F7FF":"transparent",children:`${j(r.add(2,"day").toISOString())} ${r.add(2,"day").date()}`}),t.jsx(p,{borderBottom:"1px solid #708CBB",borderTopRadius:"md",w:"100%",bg:y.date()===r.add(3,"day").date()?"#F2F7FF":"transparent",children:`${j(r.add(3,"day").toISOString())} ${r.add(3,"day").date()}`}),t.jsx(p,{borderBottom:"1px solid #708CBB",borderTopRadius:"md",w:"100%",bg:y.date()===r.add(4,"day").date()?"#F2F7FF":"transparent",children:`${j(r.add(4,"day").toISOString())} ${r.add(4,"day").date()}`}),t.jsx(p,{borderBottom:"1px solid #708CBB",borderTopRadius:"md",w:"100%",bg:y.date()===r.add(5,"day").date()?"#F2F7FF":"transparent",children:`${j(r.add(5,"day").toISOString())} ${r.add(5,"day").date()}`}),t.jsx(p,{borderBottom:"1px solid #708CBB",borderTopRadius:"md",w:"100%",bg:y.date()===r.add(6,"day").date()?"#F2F7FF":"transparent",children:`${j(r.add(6,"day").toISOString())} ${r.add(6,"day").date()}`})]}),t.jsx(g,{w:"100%",h:"1225px",children:!f&&d?t.jsx(G,{data:d,date:r}):t.jsx(v,{mx:"auto",mt:"45vh",isIndeterminate:!0,color:"blue.300"})})]})]})]})})})}export{X as default};