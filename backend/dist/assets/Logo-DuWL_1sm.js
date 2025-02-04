import{r as l,b as i,j as a}from"./index-Bf0_iwmC.js";const j=[{type:"headerColor",label:"Header Color"},{type:"headerWhite",label:"Header White"},{type:"footerColor",label:"Footer Color"},{type:"footerWhite",label:"Footer White"},{type:"favicon",label:"Favicon"}],N=()=>{const[r,p]=l.useState({}),[d,m]=l.useState({}),[o,h]=l.useState({});l.useEffect(()=>{n()},[]);const n=async()=>{try{const e=await i.get("/api/logo",{withCredentials:!0}),t={};e.data.forEach(s=>{t[s.type]=s}),p(t)}catch(e){console.error(e)}},x=(e,t)=>{const s=Array.from(e.target.files);h(c=>({...c,[t]:s})),s.map(c=>URL.createObjectURL(c))},u=(e,t)=>{m(s=>({...s,[t]:e.target.value}))},f=async e=>{try{if(!o[e]||o[e].length===0){console.error("No logo files selected");return}const t=new FormData;o[e].forEach(s=>{t.append("photo",s)}),t.append("alt",d[e]),t.append("type",e),await i.post("/api/logo",t,{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0}),n(),m(s=>({...s,[e]:""})),h(s=>({...s,[e]:""}))}catch(t){console.error(t)}},b=async(e,t)=>{try{await i.delete(`/api/logo/${e}`,{withCredentials:!0}),n()}catch(s){console.error(s)}};return a.jsxs("div",{className:"p-4 min-h-screen",children:[a.jsx("h1",{className:"text-xl font-bold  text-gray-700 font-serif uppercase mb-8 text-center",children:"MANAGE LOGOS"}),j.map(e=>a.jsxs("div",{className:"mb-6 flex flex-col md:flex-row gap-2 bg-gray-200 justify-around rounded-md",children:[a.jsxs("div",{children:[a.jsx("h2",{className:"text-xl font-medium mb-2 mt-4 font-serif",children:e.label}),a.jsx("input",{type:"file",onChange:t=>x(t,e.type),className:"mb-4 mt-8"}),a.jsxs("div",{className:"mb-4",children:[a.jsx("label",{htmlFor:`alt-${e.type}`,className:"block font-semibold mb-2",children:"Alternative Text"}),a.jsx("input",{type:"text",id:`alt-${e.type}`,value:d[e.type]||"",onChange:t=>u(t,e.type),className:"p-2 border rounded focus:outline-none",required:!0})]}),a.jsx("button",{onClick:()=>f(e.type),className:"bg-blue-500 text-white py-2 px-4 rounded mr-4 mb-2",children:"Upload"})]}),a.jsx("div",{className:"max-w-96",children:r[e.type]&&a.jsxs("div",{className:" p-4 mt-6",children:[a.jsx("img",{src:`/api/logo/download/${r[e.type].photo}`,alt:"Logo",className:" "}),a.jsxs("div",{className:"mt-4",children:[a.jsx("label",{htmlFor:`alt-${r[e.type]._id}`,className:"block font-semibold mb-2",children:"Alternative Text"}),a.jsx("input",{type:"text",id:`alt-${r[e.type]._id}`,value:r[e.type].alt,readOnly:!0,className:"p-2 border rounded focus:outline-none"})]}),a.jsx("button",{onClick:()=>b(r[e.type].photo,e.type),className:"bg-red-500 text-white py-2 px-4 rounded mr-4 mt-4",children:"Delete"})]},r[e.type]._id)})]},e.type))]})};export{N as default};
