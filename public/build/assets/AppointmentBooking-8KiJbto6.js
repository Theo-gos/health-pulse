import{x as ie,f as ee,j as e,c as te,a as se,o as ne,t as ce,r as g,q as oe,W as le}from"./app-B-st9BtI.js";import{P as de}from"./PatientLayout-DIqeC2s8.js";import{u as z,M as ae}from"./index-BrEBPJ0Z.js";import{I}from"./chunk-QINAG4RG-xrxa81z8.js";import{S as C}from"./chunk-ZHMYA64R-DtvKkc4C.js";import{B as s,F as h,a as $,C as N,T as w}from"./chunk-KRPLQIP4-BlAVN8HP.js";import{_ as V}from"./lodash-CvmcnPJT.js";import{d as b}from"./dayjs.min-BznShDkh.js";import{A as P}from"./iconBase-ChLQLo6q.js";import{C as q,a as U}from"./chunk-6RTX462E-DQAbwFTW.js";import{r as E}from"./range-PHbfMuXe.js";import{G}from"./chunk-JARCRF6W-Cq7xPRAG.js";import{u as pe}from"./chunk-7JBTTEVG-Jxzi3SVC.js";import{S as xe}from"./chunk-NEK3OOAM-Dgi7vmsA.js";import{M as he,a as me,b as fe,c as ue}from"./chunk-4FCEGNGT-Z6ZvjLQp.js";import{M as je,a as be}from"./chunk-RAWN7VJ3-Dy4GWyOy.js";import{F as ge}from"./chunk-6CVSDS6C-BmeBEkKM.js";import{F as ye}from"./chunk-VGESXGVT-CeUiVvbi.js";import"./Logo-xk-lhgy1.js";import"./chunk-VDHTZURG-D02qdTm6.js";import"./index-DkwGp1KY.js";import"./index-DdrsuNi1.js";import"./defineProperty-DmAPQKcv.js";var[we,Se]=ie("Card"),A=ee(function(d,x){const{className:r,...i}=d,f=Se();return e.jsx(te.div,{ref:x,className:se("chakra-card__body",r),__css:f.body,...i})}),W=ee(function(d,x){const{className:r,children:i,direction:f="column",justify:n,align:a,...c}=ne(d),l=ce("Card",d);return e.jsx(te.div,{ref:x,className:se("chakra-card",r),__css:{display:"flex",flexDirection:f,justifyContent:n,alignItems:a,position:"relative",minWidth:0,wordWrap:"break-word",...l.container},...c,children:e.jsx(we,{value:l,children:i})})});function Ce({data:o,viewManager:d,dataManager:x}){const[r,i]=g.useState(!1);return z({query:"(max-width: 844px)"})?e.jsx(W,{children:e.jsxs(A,{onClick:()=>{d.changeView("Doctor"),x.changeData("service",o.id)},children:[e.jsx(I,{bg:"blue.100",borderRadius:"xl",src:o.image}),e.jsxs(C,{mt:"20px",spacing:1,children:[e.jsx(s,{color:"#1366DE",fontWeight:"bold",fontSize:"13px",children:o.name}),e.jsx(s,{color:"gray.500",fontSize:"12px",children:"Consultation starting at"}),e.jsxs(s,{fontWeight:"bold",fontSize:"14px",children:[o.price,"VND"]})]})]})}):e.jsxs(W,{position:"relative",onMouseEnter:()=>i(!0),onMouseLeave:()=>i(!1),children:[e.jsxs(A,{children:[e.jsx(I,{bg:"blue.100",borderRadius:"xl",src:o.image}),e.jsxs(C,{mt:"20px",spacing:1,children:[e.jsx(s,{color:"#1366DE",fontWeight:"bold",fontSize:"13px",children:o.name}),e.jsx(s,{color:"gray.500",fontSize:"12px",children:"Consultation starting at"}),e.jsxs(s,{fontWeight:"bold",fontSize:"14px",children:[o.price,"VND"]})]})]}),r?e.jsx(h,{justify:"center",align:"center",position:"absolute",top:0,left:0,right:0,bottom:0,borderRadius:"xl",bg:"linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(255,255,255,0.7591841668307948) 88%)",children:e.jsx(s,{children:e.jsx($,{size:"md",colorScheme:"blue",onClick:()=>{d.changeView("Doctor"),x.changeData("service",o.id)},children:"Book Appointment"})})}):""]})}function ve({data:o,selectedManager:d,dataManager:x,modalManager:r}){const{onOpen:i}=r,{selected:f,changeSelected:n}=d;return z({query:"(max-width: 844px)"})?e.jsx(W,{children:e.jsxs(A,{onClick:()=>{x.changeData("doctor",o.id),i()},children:[e.jsx(h,{justify:"center",w:"100%",children:e.jsx(P,{name:o.name,src:o.avatar,bg:"#1366DE",color:"white",size:"2xl"})}),e.jsxs(C,{mt:"20px",spacing:1,textAlign:"center",children:[e.jsx(s,{color:"#1366DE",fontWeight:"bold",fontSize:"13px",children:o.name}),e.jsx(s,{color:"gray.500",fontSize:"12px",children:`${o.type.charAt(0).toUpperCase()}${o.type.slice(1)}`}),e.jsxs(C,{borderRadius:"md",spacing:1,bg:"blue.100",p:"4px",children:[e.jsx(s,{fontSize:"12px",fontWeight:"bold",children:"Available"}),e.jsx(s,{fontSize:"12px",color:"#1366DE",fontWeight:"bold",children:"Today"})]})]})]})}):e.jsxs(W,{position:"relative",onMouseEnter:()=>n(o.id),onMouseLeave:()=>n(0),children:[e.jsxs(A,{children:[e.jsx(h,{justify:"center",w:"100%",children:e.jsx(P,{name:o.name,src:o.avatar,bg:"#1366DE",color:"white",size:"2xl"})}),e.jsxs(C,{mt:"20px",spacing:1,textAlign:"center",children:[e.jsx(s,{color:"#1366DE",fontWeight:"bold",fontSize:"13px",children:o.name}),e.jsx(s,{color:"gray.500",fontSize:"12px",children:`${o.type.charAt(0).toUpperCase()}${o.type.slice(1)}`}),e.jsxs(C,{borderRadius:"md",spacing:1,bg:"blue.100",p:"4px",children:[e.jsx(s,{fontSize:"12px",fontWeight:"bold",children:"Available"}),e.jsx(s,{fontSize:"12px",color:"#1366DE",fontWeight:"bold",children:"Today"})]})]})]}),f===o.id?e.jsx(h,{justify:"center",align:"center",position:"absolute",top:0,left:0,right:0,bottom:0,borderRadius:"xl",bg:"linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(255,255,255,0.7591841668307948) 88%)",children:e.jsx(s,{children:e.jsx($,{size:"md",colorScheme:"blue",onClick:()=>{x.changeData("doctor",o.id),i()},children:"Book Appointment"})})}):""]})}const Q=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],u=b();let k,p,Y,X,M,J,H;function De({width:o,height:d,dateManager:x,dataManager:r,timeline:i,error:f}){const[n,a]=g.useState(b()),[c,l]=g.useState(-1),{selectedDate:m,setSelectedDate:S}=x,v=g.useRef(null),B=z({query:"(max-width: 844px)"});g.useEffect(()=>{r.changeData("date",m.format("YYYY-MM-DD"))},[m]),g.useMemo(()=>{k=n.year(),p=n.month(),Y=n.daysInMonth(),X=b(`${k}-${p+1}-1`),M=X.day(),J=b(`${k}-${p+1}-${Y}`),H=J.day()},[n]);const F=()=>{a(n.subtract(1,"month"))},R=()=>{a(n.add(1,"month"))},D=()=>{v.current.scrollTop=0};return B?e.jsxs(C,{border:f?"2px solid red":"2px solid #F0F0F1",align:"center",justify:"space-between",borderRadius:"xl",w:o,h:d,children:[e.jsxs(s,{w:"100%",p:"20px 16px 0 16px",borderLeftRadius:"xl",children:[e.jsxs(h,{align:"center",justify:"space-between",color:"black",fontWeight:"bold",fontSize:"12px",w:"100%",mb:"24px",children:[e.jsx(s,{style:{cursor:"pointer"},onClick:F,children:e.jsx(q,{})}),e.jsx(s,{fontWeight:"bold",mr:"4px",children:n.format("MMMM YYYY")}),e.jsx(s,{style:{cursor:"pointer"},onClick:R,children:e.jsx(U,{})})]}),e.jsxs(G,{templateColumns:"repeat(7, 1fr)",gap:0,textAlign:"center",w:"100%",h:"50%",mb:"14px",bg:"transparent",children:[Q.map(t=>e.jsx(s,{fontSize:"11px",children:t},t)),E(M).map(t=>e.jsx(s,{fontSize:"11px"},t)),E(Y).map(t=>e.jsx(h,{justify:"center",children:e.jsx(N,{style:t+1<u.date()&&u.month()==p||u.month()>p?{opacity:.4}:{cursor:"pointer"},_hover:t+1<u.date()&&u.month()==p||u.month()>p?{}:{backgroundColor:"blue.100",color:"white"},size:"27px",bg:m.date()===t+1&&m.month()==p?"blue.100":"transparent",color:m.date()===t+1&&m.month()==p?"white":"black",onClick:()=>{t+1<u.date()&&u.month()==p||S(b(b(`${k}-${p+1}-${t+1}`))),r.changeData("time",{}),l(-1),D()},children:e.jsx(s,{textAlign:"center",fontSize:"11px",children:t+1})})},t)),E(6-H).map(t=>e.jsx(s,{fontSize:"11px"},t))]})]}),e.jsxs(s,{w:"100%",h:"45%",mb:"16px",p:"20px 16px 0 16px",borderRightRadius:"xl",children:[e.jsx(h,{align:"flex-start",justify:"space-between",children:e.jsx(w,{color:"black",fontWeight:"bold",mb:"24px",children:"Timeline"})}),e.jsx(s,{w:"100%",h:"80%",overflow:"scroll",ref:v,children:i.map((t,j)=>e.jsxs(h,{border:"1px solid #BEE3F8",borderRadius:"xl",w:"100%",h:"auto",mb:"6px",fontSize:"10px",children:[e.jsxs(h,{direction:"column",align:"center",justify:"center",color:t.state=="free"?"#1366DE":"black",bg:t.state=="free"?"#BEE3F8":"gray.500",borderLeftRadius:"xl",w:"45px",h:"7vh",py:"3px",style:{cursor:"default"},children:[e.jsx(w,{children:`${t.start_time.split(":")[0]}:${t.start_time.split(":")[1]}`}),e.jsx(w,{children:"-"}),e.jsx(w,{children:`${t.end_time.split(":")[0]}:${t.end_time.split(":")[1]}`})]}),e.jsx(h,{align:"center",p:"13px 15px",h:"7vh",w:"97%",borderRightRadius:"xl",bg:t.state=="free"?c==j?"#E8F0FC":"white":"gray.300",color:c==j?"#1366DE":"black",onClick:()=>{t.state=="free"&&(r.changeData("time",{start_time:t.start_time,end_time:t.end_time}),r.setError("time",""),l(j))},style:t.state=="free"?{cursor:"pointer"}:{cursor:"not-allowed"},_hover:t.state=="free"&&c!=j?{opacity:"0.7",backgroundColor:"#E8F0FC",color:"#1366DE"}:"",children:e.jsx(w,{fontWeight:"bold",children:`${t.state.charAt(0).charAt(0).toUpperCase()}${t.state.slice(1)}`})})]},j))})]})]}):e.jsxs(h,{border:f?"2px solid red":"2px solid #F0F0F1",align:"center",justify:"space-between",borderRadius:"xl",bg:"white",w:o,h:d,children:[e.jsxs(s,{w:"50%",h:"100%",p:"20px 16px 0 16px",borderLeftRadius:"xl",bg:"transparent",children:[e.jsxs(h,{align:"center",justify:"space-between",color:"black",fontWeight:"bold",fontSize:"12px",w:"100%",mb:"24px",children:[e.jsx(s,{style:{cursor:"pointer"},onClick:F,children:e.jsx(q,{})}),e.jsx(s,{fontWeight:"bold",mr:"4px",children:n.format("MMMM YYYY")}),e.jsx(s,{style:{cursor:"pointer"},onClick:R,children:e.jsx(U,{})})]}),e.jsxs(G,{templateColumns:"repeat(7, 1fr)",gap:0,textAlign:"center",w:"100%",h:"65%",mb:"14px",bg:"transparent",children:[Q.map(t=>e.jsx(s,{fontSize:"11px",children:t},t)),E(M).map(t=>e.jsx(s,{fontSize:"11px"},t)),E(Y).map(t=>e.jsx(h,{justify:"center",children:e.jsx(N,{style:t+1<u.date()&&u.month()==p||u.month()>p?{opacity:.4}:{cursor:"pointer"},_hover:t+1<u.date()&&u.month()==p||u.month()>p?{}:{backgroundColor:"blue.100",color:"white"},size:"27px",bg:m.date()===t+1&&m.month()==p?"blue.100":"transparent",color:m.date()===t+1&&m.month()==p?"white":"black",onClick:()=>{t+1<u.date()&&u.month()==p||S(b(b(`${k}-${p+1}-${t+1}`))),r.changeData("time",{}),l(-1),D()},children:e.jsx(s,{textAlign:"center",fontSize:"11px",children:t+1})})},t)),E(6-H).map(t=>e.jsx(s,{fontSize:"11px"},t))]})]}),e.jsxs(s,{w:"50%",h:"100%",p:"20px 16px 0 16px",borderRightRadius:"xl",bg:"white",children:[e.jsx(h,{align:"flex-start",justify:"space-between",children:e.jsx(w,{color:"black",fontWeight:"bold",mb:"24px",children:"Timeline"})}),e.jsx(s,{w:"100%",h:"80%",overflow:"scroll",ref:v,children:i.map((t,j)=>e.jsxs(h,{border:"1px solid #BEE3F8",borderRadius:"xl",w:"100%",h:"auto",mb:"6px",fontSize:"10px",children:[e.jsxs(h,{direction:"column",align:"center",justify:"center",color:t.state=="free"?"#1366DE":"black",bg:t.state=="free"?"#BEE3F8":"gray.500",borderLeftRadius:"xl",w:"45px",h:"7vh",py:"3px",style:{cursor:"default"},children:[e.jsx(w,{children:`${t.start_time.split(":")[0]}:${t.start_time.split(":")[1]}`}),e.jsx(w,{children:"-"}),e.jsx(w,{children:`${t.end_time.split(":")[0]}:${t.end_time.split(":")[1]}`})]}),e.jsx(h,{align:"center",p:"13px 15px",h:"7vh",w:"97%",borderRightRadius:"xl",bg:t.state=="free"?c==j?"#E8F0FC":"white":"gray.300",color:c==j?"#1366DE":"black",onClick:()=>{t.state=="free"&&(r.changeData("time",{start_time:t.start_time,end_time:t.end_time}),r.setError("time",""),l(j))},style:t.state=="free"?{cursor:"pointer"}:{cursor:"not-allowed"},_hover:t.state=="free"&&c!=j?{opacity:"0.7",backgroundColor:"#E8F0FC",color:"#1366DE"}:"",children:e.jsx(w,{fontWeight:"bold",children:`${t.state.charAt(0).charAt(0).toUpperCase()}${t.state.slice(1)}`})})]},j))})]})]})}const K=b();let _=[];const O=(o,d,x)=>{let r=b(d).hour(8).minute(0).second(0).millisecond(0),i=0;const f=x.split(" "),n=Number(f[0]),a=f[1],c=[];for(;r.format("HH:mm:ss")!=="23:00:00";)if(i<o.length){const l=o[i],m=b(`${l.date} ${l.start_time}`).millisecond(0);m.diff(r)==0?(c.push({start_time:l.start_time,end_time:l.end_time,state:"unavailable"}),r=m.add(n,a),i++):b().add(30,"minute").diff(r)>=0?(c.push({start_time:r.format("HH:mm:ss"),end_time:r.add(n,a).format("HH:mm:ss"),state:"unavailable"}),r=r.add(n,a)):(c.push({start_time:r.format("HH:mm:ss"),end_time:r.add(n,a).format("HH:mm:ss"),state:"free"}),r=r.add(n,a))}else b().millisecond(0).add(30,"minute").diff(r)>=0?(c.push({start_time:r.format("HH:mm:ss"),end_time:r.add(n,a).format("HH:mm:ss"),state:"unavailable"}),r=r.add(n,a)):(c.push({start_time:r.format("HH:mm:ss"),end_time:r.add(n,a).format("HH:mm:ss"),state:"free"}),r=r.add(n,a));return c};function Z({data:o,duration:d,bookedAppointments:x,viewManager:r,dataManager:i}){const[,f]=g.useReducer(y=>y+1,0),{message:n}=oe().props,a=z({query:"(max-width: 844px)"}),[c,l]=g.useState(K),m={selectedDate:c,setSelectedDate:l},[S,v]=g.useState(0),B={selected:S,changeSelected:v},{isOpen:F,onOpen:R,onClose:D}=pe(),t={onOpen:R,onClose:D};let j=o;r.view==="Doctor"&&(j=j.filter(y=>y.service_id===i.data.service)),g.useMemo(()=>{if(_=[],i.data.doctor>0)if(x[i.data.doctor]){const L=x[i.data.doctor][c.format("YYYY-MM-DD")];L?_=O(L,c.format("YYYY-MM-DD"),d):_=O([],c.format("YYYY-MM-DD"),d)}else _=O([],c.format("YYYY-MM-DD"),d);f()},[i.data.doctor,n,c]);const T=()=>{v(0),l(K),i.changeData("doctor",0),i.changeData("date",""),D()},re=y=>{y.preventDefault(),V.isEmpty(i.data.time)?i.setError("time","Please pick a time!"):i.post(route("patient.booking.store"),{onSuccess:()=>D()})};return e.jsxs(e.Fragment,{children:[e.jsxs(h,{justify:"space-between",align:"center",fontSize:"34px",children:[a?e.jsx(e.Fragment,{}):e.jsxs(s,{fontWeight:"bold",children:["Choose a ",r.view]}),r.view==="Doctor"?e.jsx(s,{fontSize:"16px",color:"#1366DE",style:{cursor:"pointer"},onClick:()=>{r.changeView("Service"),i.changeData("service",0)},children:"Back to service"}):""]}),e.jsx(xe,{columns:{sm:1,md:2,lg:3},mt:"16px",spacingX:"16px",spacingY:"20px",children:j.map(y=>e.jsx(s,{children:r.view==="Service"?e.jsx(Ce,{data:y,viewManager:r,dataManager:i}):e.jsx(ve,{data:y,selectedManager:B,dataManager:i,modalManager:t})},y.id))}),e.jsxs(he,{isOpen:F,onClose:T,size:"xl",scrollBehavior:"inside",isCentered:!0,children:[e.jsx(me,{}),e.jsxs(je,{children:[e.jsx(ae,{children:"Pick a time"}),e.jsx(fe,{}),e.jsxs("form",{onSubmit:re,children:[e.jsxs(ge,{isInvalid:i.errors.time,children:[e.jsx(ue,{children:e.jsx(s,{w:"100%",h:a?"500px":"350px",children:e.jsx(De,{width:"100%",height:"100%",dateManager:m,dataManager:i,timeline:_,error:i.errors.time})})}),e.jsx(ye,{ml:"5%",children:i.errors.time})]}),e.jsxs(be,{children:[e.jsx($,{variant:"ghost",mr:3,onClick:T,children:"Close"}),e.jsx($,{type:"submit",isDisabled:V.isEmpty(i.data.time),isLoading:i.processing,colorScheme:"blue",children:"Book now"})]})]})]})]})]})}function Qe({bookingData:o}){const d=z({query:"(max-width: 844px)"}),{post:x,data:r,setData:i,errors:f,setError:n,processing:a}=le({service:0,doctor:0,date:"",time:{}}),c={data:r,changeData:i,errors:f,setError:n,post:x,processing:a},[l,m]=g.useState("Service"),S={view:l,changeView:m};return oe().props,e.jsx(de,{state:"none",children:d?e.jsxs(s,{mt:"80px",children:[e.jsx(s,{fontSize:"32px",color:"#1366DE",bg:"#E8F0FC",w:"100%",mx:"auto",py:"20px",textAlign:"center",children:"Book Appointment"}),e.jsx(s,{w:"100%",h:"auto",pt:"10px",children:e.jsx(s,{w:d?"80%":"60%",h:"100%",p:"20px 36px 60px",borderTopRadius:"25px",border:"gray.200",mx:"auto",bg:"white",children:e.jsx(Z,{data:l=="Service"&&o?o.services:o.doctors,bookedAppointments:o?o.bookedAppointments:{},duration:l=="Doctor"?o.services[c.data.service-1].duration:"",viewManager:S,dataManager:c})})})]}):e.jsxs(s,{mt:"80px",children:[e.jsx(s,{fontSize:"32px",color:"#1366DE",w:"fit-content",mx:"auto",my:"36px",children:"Book Appointment"}),e.jsx(s,{w:"100%",h:"auto",pt:"10px",bg:"#E8F0FC",children:e.jsx(s,{w:"60%",h:"100%",p:"20px 36px 60px",borderTopRadius:"25px",border:"gray.200",mx:"auto",bg:"white",children:e.jsx(Z,{data:l=="Service"&&o?o.services:o.doctors,bookedAppointments:o?o.bookedAppointments:{},duration:l=="Doctor"?o.services[c.data.service-1].duration:"",viewManager:S,dataManager:c})})})]})})}export{Qe as default};
