import{j as e,r as c,q as C}from"./app-C1FUXzYO.js";import{P}from"./PatientLayout-CEdTjMh3.js";import{_ as O}from"./lodash-tVGgKksc.js";import{d as m}from"./dayjs.min-BOU8cSsw.js";import{B as r,F as x}from"./chunk-KRPLQIP4-D5-S-d08.js";import{S as g}from"./chunk-NEK3OOAM-OAh5-6t1.js";import{t as N}from"./TestResultList-VIlLU8_y.js";import{S as a}from"./chunk-ZHMYA64R-HyBbs1y0.js";import"./Logo-B4iOwqDb.js";import"./iconBase-DPmk0zYD.js";import"./chunk-VDHTZURG-DBDtDYSN.js";import"./chunk-FKYN3ZGE-BiFjaW43.js";import"./chunk-5FG5SY5K-DCNg9cSu.js";import"./chunk-4FCEGNGT-BVStUQ5B.js";import"./defineProperty-DmAPQKcv.js";import"./chunk-6CVSDS6C-NeQbUJFN.js";import"./chunk-VGESXGVT-BX9OABrS.js";import"./chunk-RAWN7VJ3-CmhlEJKP.js";import"./index-Bku8Mxew.js";import"./index-DdrsuNi1.js";import"./chunk-JARCRF6W-BrJdULZn.js";import"./chunk-7JBTTEVG-1xPeE8DN.js";m();function F(i){return!isNaN(Date.parse(i))}const D=i=>{const s=i.split("-");return`${s[2]}.${s[1]}.${s[0]}`};function f({appointmentKeys:i,appointments:s}){return i.length>0?i.map(t=>e.jsxs(r,{w:"100%",children:[e.jsx(r,{w:"100%",p:"8px",fontSize:"16px",fontWeight:"bold",borderBottom:"1px solid #ECEDED",children:F(t)?D(t):`Dr. ${t}`}),e.jsx(g,{columns:{sm:1,md:2,lg:3},w:"100%",mt:"16px",spacingX:"16px",spacingY:"20px",children:s[t].map(o=>e.jsxs(r,{mr:"8px",w:"100%",h:"100%",p:"8px",flex:"0 0 auto",borderRadius:"xl",bg:"blue.100",children:[e.jsxs(x,{w:"100%",h:"25%",p:"4px",borderBottom:"1px solid #ECEDED",justify:"space-between",children:[e.jsxs(r,{w:"50%",children:[e.jsx(r,{fontSize:"11px",color:"gray",children:"App. #"}),e.jsx(r,{fontSize:"12px",fontWeight:"bold",children:o.id})]}),e.jsxs(r,{w:"50%",textAlign:"right",children:[e.jsx(r,{fontSize:"11px",color:"gray",children:"Date"}),e.jsx(r,{fontSize:"12px",fontWeight:"bold",children:D(o.date)})]})]}),e.jsxs(r,{w:"100%",h:"25%",p:"8px 4px",borderBottom:"1px solid #ECEDED",children:[e.jsx(r,{fontSize:"11px",color:"gray",children:"Booked doctor"}),e.jsxs(r,{fontSize:"12px",fontWeight:"bold",children:["Dr. ",o.doctor_name]})]}),e.jsxs(r,{w:"100%",h:"50%",px:"4px",py:"16px",children:[e.jsx(r,{fontSize:"11px",color:"gray",children:"Time"}),e.jsxs(r,{w:"100%",h:"95%",fontSize:"12px",children:[e.jsxs(x,{w:"100%",align:"center",children:[e.jsx(r,{w:"25%",fontWeight:"bold",children:"From:"}),e.jsx(r,{children:o.start_time})]}),e.jsxs(x,{w:"100%",align:"center",children:[e.jsx(r,{w:"25%",fontWeight:"bold",children:"To:"}),e.jsx(r,{children:o.end_time})]})]})]})]},o.id))})]},t)):e.jsx(r,{fontSize:"16px",fontWeight:"bold",textAlign:"center",w:"100%",children:"No available appointments."})}m();function z(i){return!isNaN(Date.parse(i))}const S=i=>{const s=i.split("-");return`${s[2]}.${s[1]}.${s[0]}`};function W({prescriptionKeys:i,prescriptions:s}){return i.length>0?i.map(t=>e.jsxs(r,{w:"100%",children:[e.jsx(r,{w:"100%",p:"8px",fontSize:"16px",fontWeight:"bold",borderBottom:"1px solid #ECEDED",children:z(t)?S(t):`Dr. ${t}`}),e.jsx(g,{columns:{sm:1,md:2,lg:3},w:"100%",mt:"16px",spacingX:"16px",spacingY:"20px",children:s[t].map(o=>e.jsxs(r,{mr:"8px",w:"100%",h:"100%",p:"8px",flex:"0 0 auto",borderRadius:"xl",bg:"blue.100",children:[e.jsxs(x,{w:"100%",h:"25%",p:"4px",borderBottom:"1px solid #ECEDED",justify:"space-between",children:[e.jsxs(r,{w:"50%",children:[e.jsx(r,{fontSize:"11px",color:"gray",children:"Pres. #"}),e.jsx(r,{fontSize:"12px",fontWeight:"bold",children:o.id})]}),e.jsxs(r,{w:"50%",textAlign:"right",children:[e.jsx(r,{fontSize:"11px",color:"gray",children:"Date"}),e.jsx(r,{fontSize:"12px",fontWeight:"bold",children:S(o.date)})]})]}),e.jsxs(r,{w:"100%",h:"25%",p:"8px 4px",borderBottom:"1px solid #ECEDED",children:[e.jsx(r,{fontSize:"11px",color:"gray",children:"Issued By"}),e.jsxs(r,{fontSize:"12px",fontWeight:"bold",children:["Dr. ",o.doctor_name]})]}),e.jsxs(r,{w:"100%",h:"50%",px:"4px",py:"16px",children:[e.jsx(r,{fontSize:"11px",color:"gray",children:"Medication and Dosage"}),e.jsxs(r,{w:"100%",h:"95%",p:"8px",borderLeft:"1px solid green",fontSize:"12px",children:[e.jsx(r,{fontWeight:"bold",children:o.medication_name}),e.jsx(r,{color:"gray",children:`${o.dose}, ${o.pill_per_day}`}),e.jsx(r,{fontSize:"10px",overflow:"hidden",children:o.recommendation})]})]})]},o.id))})]},t)):e.jsx(r,{fontSize:"16px",fontWeight:"bold",textAlign:"center",w:"100%",children:"No available prescriptions."})}const h={APPOINTMENTS:"appointments",PRESCRIPTIONS:"prescriptions",RECORD:"record"},d={DATE:"date",DOCTOR:"doctor_name"},y=(i,s="date")=>{const t={};return i.forEach(o=>{const n=o.detail;n.doctor_name=o.doctor.name,t[n[s]]?t[n[s]].push(n):t[n[s]]=[n]}),t};function v({tabManager:i,medicalInfo:s}){const[t,o]=c.useState(d.DATE),[n,j]=c.useState({}),w=Object.keys(n),[R,b]=c.useState(e.jsx(f,{medicalInfo:s})),T=R,{tab:p,setTab:M}=i;return c.useEffect(()=>{!O.isEmpty(s)&&p!==h.RECORD&&j(y(s[p],t))},[p,t]),c.useMemo(()=>{if(p!==h.RECORD)switch(p){case h.APPOINTMENTS:b(e.jsx(f,{appointmentKeys:w,appointments:n}));break;case h.PRESCRIPTIONS:b(e.jsx(W,{prescriptionKeys:w,prescriptions:n}));break;default:b(e.jsx(f,{medicalInfo:s}));break}},[p,n]),e.jsxs(e.Fragment,{children:[e.jsx(r,{w:"100%",h:"20px",mt:"20px",children:e.jsxs(x,{w:"100px",h:"100%",borderRadius:"20px",border:"1px solid #ECEDED",children:[e.jsx(r,{w:"50%",h:"100%",pt:"2px",borderLeftRadius:"20px",_hover:t==d.DOCTOR?{backgroundColor:"#EAF1FA",color:"#1366DE",cursor:"pointer"}:{cursor:"default"},bg:t==d.DATE?"blue.100":"white",color:t==d.DATE?"#1366DE":"gray",fontWeight:t==d.DATE?"bold":"",fontSize:"10px",textAlign:"center",onClick:()=>o(d.DATE),children:"Date"}),e.jsx(r,{w:"50%",h:"100%",pt:"2px",borderRightRadius:"20px",_hover:t==d.DATE?{backgroundColor:"#EAF1FA",color:"#1366DE",cursor:"pointer"}:{cursor:"default"},bg:t==d.DOCTOR?"blue.100":"white",color:t==d.DOCTOR?"#1366DE":"gray",fontWeight:t==d.DOCTOR?"bold":"",fontSize:"10px",textAlign:"center",onClick:()=>o(d.DOCTOR),children:"Doctor"})]})}),e.jsx(r,{w:"100%",h:"70vh",mt:"20px",overflowY:"scroll",onScroll:A=>A.stopPropagation(),children:T})]})}m();const u={},E={Stable:"black",Fair:"#AF8CFA",Mild:"#FFC999",Severe:"#DE5031"},_=i=>{const s=i.split("-");return`${s[2]}.${s[1]}.${s[0]}`};function $({medicalInfo:i,icd:s}){return c.useMemo(()=>{s.forEach(t=>{u[t.icd_code]=t})},[s]),e.jsx(r,{w:"100%",h:"60vh",mt:"20px",overflowY:"scroll",children:e.jsxs(a,{spacing:6,children:[e.jsxs(r,{w:"100%",children:[e.jsx(r,{fontWeight:"bold",ml:"6px",children:"Allergies"}),e.jsxs(g,{mt:"16px",columns:3,spacing:"16px",children:[e.jsxs(r,{p:"12px",fontSize:"12px",bg:"white",border:"1px solid #EEEFF1",borderRadius:"xl",children:[e.jsx(r,{color:"gray.500",children:"Drug"}),e.jsx(a,{w:"100%",mt:"2px",spacing:1,children:i.allergies?i.allergies.Drug?i.allergies.Drug.map((t,o)=>e.jsxs(x,{w:"100%",justify:"space-between",align:"center",children:[e.jsx(r,{color:E[t.severity],fontWeight:"bold",children:t.severity}),e.jsx(r,{children:t.name})]},`drug-${o}`)):e.jsx(r,{fontWeight:"bold",children:"No known allergies"}):e.jsx(r,{fontWeight:"bold",children:"No known allergies"})})]}),e.jsxs(r,{p:"12px",fontSize:"12px",bg:"white",border:"1px solid #EEEFF1",borderRadius:"xl",children:[e.jsx(r,{color:"gray.500",children:"Food"}),e.jsx(a,{w:"100%",mt:"2px",spacing:1,children:i.allergies?i.allergies.Food?i.allergies.Food.map((t,o)=>e.jsxs(x,{w:"100%",justify:"space-between",align:"center",children:[e.jsx(r,{color:E[t.severity],fontWeight:"bold",children:t.severity}),e.jsx(r,{children:t.name})]},`food-${o}`)):e.jsx(r,{fontWeight:"bold",children:"No known allergies"}):e.jsx(r,{fontWeight:"bold",children:"No known allergies"})})]}),e.jsxs(r,{p:"12px",fontSize:"12px",bg:"white",border:"1px solid #EEEFF1",borderRadius:"xl",children:[e.jsx(r,{color:"gray.500",children:"Environmental"}),e.jsx(a,{w:"100%",mt:"2px",spacing:1,children:i.allergies?i.allergies.Environmental?i.allergies.Environmental.map((t,o)=>e.jsxs(x,{w:"100%",justify:"space-between",align:"center",children:[e.jsx(r,{color:E[t.severity],fontWeight:"bold",children:t.severity}),e.jsx(r,{children:t.name})]},`environment-${o}`)):e.jsx(r,{fontWeight:"bold",children:"No known allergies"}):e.jsx(r,{fontWeight:"bold",children:"No known allergies"})})]})]})]}),e.jsxs(r,{w:"100%",h:"28vh",children:[e.jsx(r,{fontWeight:"bold",ml:"6px",children:"Diagnoses"}),e.jsx(g,{mt:"16px",h:"87%",overflowY:"scroll",columns:2,spacing:"4px",children:i.diagnoses.length>0?i.diagnoses.map((t,o)=>e.jsxs(r,{h:"11vh",p:"12px",fontSize:"12px",bg:"white",border:"1px solid #EEEFF1",borderRadius:"xl",children:[e.jsxs(x,{align:"center",justify:"space-between",p:"2px 6px",mb:"4px",fontSize:"11px",children:[e.jsx(r,{bg:u[t.icd_code].color,p:"2px 6px",borderRadius:"md",color:"white",children:t.icd_code}),e.jsx(r,{fontSize:"13px",children:_(t.date)})]}),e.jsx(r,{p:"8px",fontWeight:"bold",children:u[t.icd_code].icd_name})]},o)):e.jsx(r,{pl:"8px",children:"No Available Diagnoses"})})]}),e.jsxs(r,{w:"100%",h:"28vh",children:[e.jsx(r,{fontWeight:"bold",ml:"6px",children:"Test Results"}),e.jsx(a,{w:"100%",h:"90%",mt:"18px",spacing:2,overflowY:"scroll",children:e.jsx(N,{data:i,width:"70%"})})]})]})})}const l={APPOINTMENTS:"appointments",PRESCRIPTIONS:"prescriptions",RECORD:"record"};function le({medicalInfo:i,icd:s}){const{data:t}=C().props,[o,n]=c.useState(l.APPOINTMENTS),j={tab:o,setTab:n};return c.useEffect(()=>{t&&n(t)},[t]),e.jsx(P,{state:"patient",children:e.jsxs(r,{mt:"80px",children:[e.jsx(r,{fontSize:"32px",color:"#1366DE",w:"fit-content",mx:"auto",my:"36px",children:"Patient"}),e.jsx(r,{w:"100%",h:"auto",pt:"10px",bg:"#E8F0FC",children:e.jsxs(r,{w:"60%",h:"100%",p:"20px 36px 60px",borderTopRadius:"25px",border:"gray.200",mx:"auto",bg:"white",children:[e.jsxs(x,{justify:"space-between",align:"center",fontSize:"34px",children:[e.jsxs(r,{fontWeight:"bold",children:["Your ",o]}),e.jsxs(x,{w:"40%",h:"100%",borderRadius:"20px",border:"1px solid #ECEDED",children:[e.jsx(r,{w:"50%",h:"100%",pt:"2px",borderLeftRadius:"20px",_hover:o!==l.APPOINTMENTS?{backgroundColor:"#EAF1FA",color:"#1366DE",cursor:"pointer"}:{cursor:"default"},bg:o===l.APPOINTMENTS?"blue.100":"white",color:o===l.APPOINTMENTS?"#1366DE":"gray",fontWeight:o===l.APPOINTMENTS?"bold":"",fontSize:"10px",textAlign:"center",onClick:()=>n(l.APPOINTMENTS),children:"Appointments"}),e.jsx(r,{w:"50%",h:"100%",pt:"2px",_hover:o!==l.PRESCRIPTIONS?{backgroundColor:"#EAF1FA",color:"#1366DE",cursor:"pointer"}:{cursor:"default"},bg:o===l.PRESCRIPTIONS?"blue.100":"white",color:o===l.PRESCRIPTIONS?"#1366DE":"gray",fontWeight:o===l.PRESCRIPTIONS?"bold":"",fontSize:"10px",textAlign:"center",onClick:()=>n(l.PRESCRIPTIONS),children:"Prescriptions"}),e.jsx(r,{w:"50%",h:"100%",pt:"2px",borderRightRadius:"20px",_hover:o!==l.RECORD?{backgroundColor:"#EAF1FA",color:"#1366DE",cursor:"pointer"}:{cursor:"default"},bg:o===l.RECORD?"blue.100":"white",color:o===l.RECORD?"#1366DE":"gray",fontWeight:o===l.RECORD?"bold":"",fontSize:"10px",textAlign:"center",onClick:()=>n(l.RECORD),children:"Record"})]})]}),o!==l.RECORD?e.jsx(v,{tabManager:j,medicalInfo:i}):e.jsx($,{medicalInfo:i,icd:s})]})})]})})}export{le as default};