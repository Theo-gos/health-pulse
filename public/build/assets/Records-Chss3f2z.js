import{q as $,r as g,j as e,W as I}from"./app-BmlF_RbA.js";import{d as N}from"./dayjs.min-SLsZNRmq.js";import{B as t,F as a}from"./chunk-KRPLQIP4-Cq0CMDiE.js";import{I as L}from"./chunk-6CVSDS6C-BFtDh9ci.js";import{S as b}from"./chunk-ZHMYA64R-CyjPC4sz.js";import{_ as C}from"./lodash-erCREplc.js";import{t as G}from"./TestResultList-C0AmWCcA.js";import{S as P}from"./chunk-NEK3OOAM-LMKt4yRd.js";import{C as B}from"./chunk-Q6Q7I7E5-C7lktOM6.js";import{D as Y}from"./DoctorLayout-BdRLqccT.js";import"./chunk-7JBTTEVG-C6-WSWOo.js";import"./chunk-4FCEGNGT-DfQz3Pir.js";import"./defineProperty-DmAPQKcv.js";import"./iconBase-Bj_N-4sb.js";import"./chunk-5FG5SY5K-AVdw-eLA.js";import"./chunk-JARCRF6W-vfP4YpGV.js";import"./Logo-B6Cfnw7m.js";const _=N().second(0).millisecond(0),m={AGE:"age",NAME:"name"},V=(i,l)=>N(i).hour(l.split(":")[0]).minute(l.split(":")[1]).second(0).millisecond(0),K=(i,l)=>{const s={};let o=Number.MAX_SAFE_INTEGER;if(s.patientId=i.patient.id,s.name=i.patient.name,s.age=i.patient.age,i.appointments){const n=i.appointments.reduce((p,E)=>{const A=N(E.detail.date).second(0).millisecond(0),w=Math.abs(A.diff(_));return w<o&&E.doctor.id===l.id&&(o=w,p=E),p},{});s.date=n.detail.date;const c=`${n.detail.start_time.split(":")[0]}:${n.detail.start_time.split(":")[1]}`,u=`${n.detail.end_time.split(":")[0]}:${n.detail.end_time.split(":")[1]}`;s.startTime=c,s.endTime=u}return s},X=(i,l,s="name")=>i.filter(n=>{if(l==="")return n;{const c=n.patient[s];return new RegExp(l,"i").test(c)}});function k({selectManager:i,medicalInfo:l}){const{selected:s,setSelected:o}=i,{auth:n}=$().props,[c,u]=g.useState(""),[p,E]=g.useState(m.NAME),A=Object.values(l),w=X(A,c,p);return e.jsxs(t,{w:"100%",h:"100%",p:"16px",borderRadius:"xl",bg:"#F6F7FA",children:[e.jsx(t,{fontSize:"20px",fontWeight:"bold",borderBottom:"1px solid black",mb:"24px",children:"Patients List"}),e.jsxs(a,{w:"100%",mb:"16px",align:"center",children:[e.jsxs(a,{w:"20%",align:"center",borderRadius:"20px",border:"1px solid #ECEDED",mr:"4px",children:[e.jsx(t,{w:"50%",h:"100%",py:"10px",borderLeftRadius:"20px",_hover:p==m.AGE?{backgroundColor:"#EAF1FA",color:"#1366DE",cursor:"pointer"}:{cursor:"default"},bg:p==m.NAME?"blue.100":"white",color:p==m.NAME?"#1366DE":"gray",fontWeight:p==m.NAME?"bold":"",fontSize:"10px",textAlign:"center",onClick:()=>E(m.NAME),children:"Name"}),e.jsx(t,{w:"50%",h:"100%",py:"10px",borderRightRadius:"20px",_hover:p==m.NAME?{backgroundColor:"#EAF1FA",color:"#1366DE",cursor:"pointer"}:{cursor:"default"},bg:p==m.AGE?"blue.100":"white",color:p==m.AGE?"#1366DE":"gray",fontWeight:p==m.AGE?"bold":"",fontSize:"10px",textAlign:"center",onClick:()=>E(m.AGE),children:"Age"})]}),e.jsx(L,{placeholder:`Type a patient ${p}...`,value:c,onChange:h=>u(h.target.value),size:"md",borderRadius:"xl",bg:"white"})]}),e.jsx(t,{w:"100%",h:"90%",overflowY:"scroll",children:e.jsx(b,{spacing:3,children:w.length>0?w.map(h=>{const S=K(h,n.doctor);if(S){const{patientId:x,name:F,age:R,date:T,startTime:v,endTime:y}=S,r=V(T,v);return e.jsxs(t,{w:"100%",p:"16px",borderRadius:"xl",border:"1px solid gray",_hover:{cursor:"pointer",backgroundColor:"#EAF1FA",color:"#1366DE"},bg:s===x?"#EAF1FA":"transparent",color:s===x?"#1366DE":"black",onClick:()=>o(x),fontSize:"14px",children:[e.jsx(t,{fontWeight:"bold",children:`${F}, ${R} years old`}),r.diff(_)<0?e.jsx(t,{fontSize:"12px",fontWeight:"bold",mt:"4px",children:"Last visit:"}):e.jsx(t,{fontSize:"12px",fontWeight:"bold",mt:"4px",children:"Next Visit:"}),e.jsxs(t,{fontSize:"12px",children:["Date: ",T]}),e.jsxs(t,{fontSize:"12px",children:["Time: ",`${v} - ${y}`]})]},x)}else return e.jsx(e.Fragment,{})}):e.jsx(t,{fontWeight:"bold",ml:"8px",children:"No booked patients"})})})]})}const q=N().second(0).millisecond(0),z={Stable:"black",Fair:"#AF8CFA",Mild:"#FFC999",Severe:"#DE5031"},j={DATE:"date",DOCTOR:"doctor_name"},D={GENERAL:"general",PRESCRIPTION:"prescription"},f={APPOINTMENTS:"appointments",TESTS:"tests"};function U(i){return!isNaN(Date.parse(i))}const W=i=>{const l=i.split("-");return`${l[2]}.${l[1]}.${l[0]}`},H=i=>i.filter(s=>{const o=s.detail.start_time.split(":"),n=N(s.detail.date).hour(Number(o[0])).minute(Number(o[1])).second(0).millisecond(0);return q.diff(n)>0}),O=(i,l="date")=>{const s={};return i.forEach(o=>{const n=o.detail;n.doctor_name=o.doctor.name,s[n[l]]?s[n[l]].push(n):s[n[l]]=[n]}),s};function J({selectManager:i,medicalInfo:l,icd:s}){const[o,n]=g.useState({}),[c,u]=g.useState(D.GENERAL),[p,E]=g.useState({}),[A,w]=g.useState([]),[h,S]=g.useState(f.APPOINTMENTS),[x,F]=g.useState(j.DATE),{get:R}=I(),{selected:T}=i,v=Object.keys(p);g.useEffect(()=>{n(l[T])},[T]),g.useEffect(()=>{C.isEmpty(o)||(w(H(o.appointments)),E(O(o.prescriptions,x)))},[o]),g.useMemo(()=>{C.isEmpty(o)||E(O(o.prescriptions,x))},[x]);const y=r=>{R(route("appointment.note",{appointment:r}))};return C.isEmpty(o)?e.jsx(B,{mx:"auto",mt:"45vh",isIndeterminate:!0,color:"blue.300"}):e.jsxs(t,{w:"100%",h:"100%",p:"16px",borderRadius:"xl",bg:"#F6F7FA",children:[e.jsxs(t,{mb:"24px",children:[e.jsx(t,{fontSize:"36px",fontWeight:"bold",children:"Medical Record"}),e.jsxs(a,{align:"center",justify:"flex-start",textAlign:"center",fontSize:"14px",mt:"16px",children:[e.jsx(t,{p:"2px 6px",_hover:c!=D.GENERAL?{color:"#1366DE",cursor:"pointer"}:{},borderBottom:c==D.GENERAL?"1px solid #1366DE":"1px solid gray",color:c==D.GENERAL?"#1366DE":"gray",onClick:()=>{c!=D.GENERAL&&u(D.GENERAL)},children:"General"}),e.jsx(t,{p:"2px 6px",_hover:c!="prescription"?{color:"#1366DE",cursor:"pointer"}:{},borderBottom:c=="prescription"?"1px solid #1366DE":"1px solid gray",color:c=="prescription"?"#1366DE":"gray",onClick:()=>{c!="prescription"&&u("prescription")},children:"Prescriptions"})]})]}),c==D.GENERAL?e.jsx(t,{w:"100%",h:"82%",overflowY:"scroll",children:e.jsxs(b,{spacing:6,children:[e.jsxs(t,{w:"100%",children:[e.jsx(t,{fontWeight:"bold",ml:"6px",children:"Allergies"}),e.jsxs(P,{mt:"16px",columns:3,spacing:"16px",children:[e.jsxs(t,{h:"10vh",p:"12px",fontSize:"12px",bg:"white",border:"1px solid #EEEFF1",borderRadius:"xl",children:[e.jsx(t,{color:"gray.500",children:"Drug"}),e.jsx(b,{w:"100%",spacing:1,mt:"2px",overflowY:"scroll",children:o.allergies?o.allergies.Drug?o.allergies.Drug.map((r,d)=>e.jsxs(a,{w:"100%",justify:"space-between",align:"center",children:[e.jsx(t,{color:z[r.severity],fontWeight:"bold",children:r.severity}),e.jsx(t,{children:r.name})]},`drug-${d}`)):e.jsx(t,{fontWeight:"bold",children:"No known allergies"}):e.jsx(t,{fontWeight:"bold",children:"No known allergies"})})]}),e.jsxs(t,{h:"10vh",p:"12px",fontSize:"12px",bg:"white",border:"1px solid #EEEFF1",borderRadius:"xl",children:[e.jsx(t,{color:"gray.500",children:"Food"}),e.jsx(b,{w:"100%",spacing:1,mt:"2px",overflowY:"scroll",children:o.allergies?o.allergies.Food?o.allergies.Food.map((r,d)=>e.jsxs(a,{w:"100%",justify:"space-between",align:"center",children:[e.jsx(t,{color:z[r.severity],fontWeight:"bold",children:r.severity}),e.jsx(t,{children:r.name})]},`food-${d}`)):e.jsx(t,{fontWeight:"bold",children:"No known allergies"}):e.jsx(t,{fontWeight:"bold",children:"No known allergies"})})]}),e.jsxs(t,{h:"10vh",p:"12px",fontSize:"12px",bg:"white",border:"1px solid #EEEFF1",borderRadius:"xl",children:[e.jsx(t,{color:"gray.500",children:"Environmental"}),e.jsx(b,{w:"100%",spacing:1,mt:"2px",overflowY:"scroll",children:o.allergies?o.allergies.Environmental?o.allergies.Environmental.map((r,d)=>e.jsxs(a,{w:"100%",justify:"space-between",align:"center",children:[e.jsx(t,{color:z[r.severity],fontWeight:"bold",children:r.severity}),e.jsx(t,{children:r.name})]},`environment-${d}`)):e.jsx(t,{fontWeight:"bold",children:"No known allergies"}):e.jsx(t,{fontWeight:"bold",children:"No known allergies"})})]})]})]}),e.jsxs(t,{w:"100%",h:"28vh",children:[e.jsx(t,{fontWeight:"bold",ml:"6px",children:"Diagnoses"}),e.jsx(P,{mt:"16px",h:"87%",overflowY:"scroll",columns:2,spacing:"4px",children:o.diagnoses.length>0?o.diagnoses.map((r,d)=>e.jsxs(t,{h:"11vh",p:"12px",fontSize:"12px",bg:"white",border:"1px solid #EEEFF1",borderRadius:"xl",children:[e.jsxs(a,{align:"center",justify:"space-between",p:"2px 6px",mb:"4px",fontSize:"11px",children:[e.jsx(t,{bg:s[r.icd_code].color,p:"2px 6px",borderRadius:"md",color:"white",children:r.icd_code}),e.jsx(t,{fontSize:"13px",children:W(r.date)})]}),e.jsx(t,{p:"8px",fontWeight:"bold",children:s[r.icd_code].icd_name})]},d)):e.jsx(t,{pl:"8px",children:"No Available Diagnoses"})})]}),e.jsxs(t,{mt:"24px",w:"100%",children:[e.jsxs(a,{w:"99%",ml:"6px",mb:"8px",align:"center",justify:"space-between",children:[e.jsx(t,{fontWeight:"bold",fontSize:"14px",children:"Visits history"}),e.jsxs(a,{w:"20%",align:"center",borderRadius:"20px",border:"1px solid #ECEDED",children:[e.jsx(t,{w:"50%",h:"100%",p:"2px 4px",borderLeftRadius:"20px",_hover:h==f.TESTS?{backgroundColor:"#EAF1FA",color:"#1366DE",cursor:"pointer"}:{cursor:"default"},bg:h==f.APPOINTMENTS?"blue.100":"white",color:h==f.APPOINTMENTS?"#1366DE":"gray",fontWeight:h==f.APPOINTMENTS?"bold":"",fontSize:"10px",textAlign:"center",onClick:()=>S(f.APPOINTMENTS),children:"Appointments"}),e.jsx(t,{w:"50%",h:"100%",p:"2px 4px",borderRightRadius:"20px",_hover:h==f.APPOINTMENTS?{backgroundColor:"#EAF1FA",color:"#1366DE",cursor:"pointer"}:{cursor:"default"},bg:h==f.TESTS?"blue.100":"white",color:h==f.TESTS?"#1366DE":"gray",fontWeight:h==f.TESTS?"bold":"",fontSize:"10px",textAlign:"center",onClick:()=>S(f.TESTS),children:"Tests"})]})]}),h===f.APPOINTMENTS?A.length>0?e.jsxs(t,{w:"100%",h:"30vh",p:"4px",children:[e.jsxs(a,{align:"center",fontSize:"13px",color:"gray",children:[e.jsx(t,{w:"25%",p:"8px",children:"Date"}),e.jsx(t,{w:"25%",p:"8px",children:"Doctor"}),e.jsx(t,{w:"25%",p:"8px",children:"Specialty"}),e.jsx(t,{w:"15%",textAlign:"center",p:"8px",children:"Note"})]}),e.jsx(t,{w:"100%",h:"90%",overflowY:"scroll",children:e.jsx(b,{spacing:3,children:A.map((r,d)=>e.jsxs(a,{w:"100%",align:"center",fontSize:"12px",color:"black",fontWeight:"bold",children:[e.jsx(t,{w:"25%",p:"8px",borderBottom:"1px solid #D1D1D3",children:r.detail.date}),e.jsx(t,{w:"25%",p:"8px",borderBottom:"1px solid #D1D1D3",children:`Dr. ${r.doctor.name}`}),e.jsx(t,{w:"25%",p:"8px",borderBottom:"1px solid #D1D1D3",children:`${r.doctor.type.charAt(0).toUpperCase()}${r.doctor.type.slice(1)}`}),e.jsx(t,{w:"15%",p:"8px",borderBottom:"1px solid #D1D1D3",textAlign:"center",color:"#1366DE",_hover:{color:"blue",cursor:"pointer"},onClick:()=>y(r.detail.id),children:"Link"})]},`appointment-${d}`))})})]}):e.jsx(t,{children:"No past appointments"}):e.jsx(b,{w:"100%",h:"30vh",spacing:3,p:"4px",overflowY:"scroll",children:e.jsx(G,{data:o})})]})]})}):e.jsxs(b,{w:"100%",h:"82%",overflowY:"scroll",children:[e.jsx(t,{w:"100%",h:"20px",children:e.jsxs(a,{w:"100px",h:"100%",borderRadius:"20px",border:"1px solid #ECEDED",children:[e.jsx(t,{w:"50%",h:"100%",pt:"2px",borderLeftRadius:"20px",_hover:x==j.DOCTOR?{backgroundColor:"#EAF1FA",color:"#1366DE",cursor:"pointer"}:{cursor:"default"},bg:x==j.DATE?"blue.100":"white",color:x==j.DATE?"#1366DE":"gray",fontWeight:x==j.DATE?"bold":"",fontSize:"10px",textAlign:"center",onClick:()=>F(j.DATE),children:"Date"}),e.jsx(t,{w:"50%",h:"100%",pt:"2px",borderRightRadius:"20px",_hover:x==j.DATE?{backgroundColor:"#EAF1FA",color:"#1366DE",cursor:"pointer"}:{cursor:"default"},bg:x==j.DOCTOR?"blue.100":"white",color:x==j.DOCTOR?"#1366DE":"gray",fontWeight:x==j.DOCTOR?"bold":"",fontSize:"10px",textAlign:"center",onClick:()=>F(j.DOCTOR),children:"Doctor"})]})}),v.map(r=>e.jsxs(t,{w:"100%",children:[e.jsx(t,{w:"100%",p:"8px",fontSize:"16px",fontWeight:"bold",borderBottom:"1px solid #ECEDED",children:U(r)?W(r):r}),e.jsx(a,{w:"auto",h:"30vh",p:"8px",align:"center",overflowX:"scroll",children:p[r].map(d=>e.jsxs(t,{mr:"8px",w:"13vw",h:"100%",p:"8px",flex:"0 0 auto",borderRadius:"xl",bg:"white",children:[e.jsxs(a,{w:"100%",h:"25%",p:"4px",borderBottom:"1px solid #ECEDED",justify:"space-between",children:[e.jsxs(t,{w:"50%",children:[e.jsx(t,{fontSize:"11px",color:"gray",children:"Prescription code"}),e.jsx(t,{fontSize:"12px",fontWeight:"bold",children:d.id})]}),e.jsxs(t,{w:"50%",textAlign:"right",children:[e.jsx(t,{fontSize:"11px",color:"gray",children:"Date of issue"}),e.jsx(t,{fontSize:"12px",fontWeight:"bold",children:W(d.date)})]})]}),e.jsxs(t,{w:"100%",h:"25%",p:"8px 4px",borderBottom:"1px solid #ECEDED",children:[e.jsx(t,{fontSize:"11px",color:"gray",children:"Issued by"}),e.jsxs(t,{fontSize:"12px",fontWeight:"bold",children:["Dr. ",d.doctor_name]})]}),e.jsxs(t,{w:"100%",h:"50%",px:"4px",py:"16px",children:[e.jsx(t,{fontSize:"11px",color:"gray",children:"Medication and Dosage"}),e.jsxs(t,{w:"100%",h:"95%",p:"8px",borderLeft:"1px solid green",fontSize:"12px",children:[e.jsx(t,{fontWeight:"bold",children:d.medication_name}),e.jsx(t,{color:"gray",children:`${d.dose}, ${d.pill_per_day}`}),e.jsx(t,{fontSize:"10px",overflow:"hidden",children:d.recommendation})]})]})]},d.id))})]},r))]})]})}const M={};function fe({medical_info:i,icd:l}){const[s,o]=g.useState(0),n={selected:s,setSelected:o};return g.useMemo(()=>{l.forEach(c=>{M[c.icd_code]=c})},[l]),e.jsxs(Y,{state:"records",children:[e.jsx(t,{w:"55%",h:"100%",children:e.jsx(t,{w:"100%",h:"100%",p:"4px 8px",children:s===0?e.jsx(k,{selectManager:n,medicalInfo:i||[]}):e.jsx(J,{selectManager:n,medicalInfo:i||[],icd:M})})}),e.jsx(t,{w:"32%",h:"100%",p:"4px",children:s===0?"":e.jsx(k,{selectManager:n,medicalInfo:i||[]})})]})}export{fe as default};
