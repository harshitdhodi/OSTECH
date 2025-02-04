import{r as a,s as le,j as e,t as ie,v as H,w as ne,L as M,x as oe,y as ce,b as i,z as de,A as ue,B as pe,C as T,D as he}from"./index-Bf0_iwmC.js";import{r as A,U as xe,l as me}from"./index-DPkFNSVF.js";import{Q as ge,B as be}from"./ReactToastify-C8h-yn_H.js";import{M as P}from"./index-D-LDOxyL.js";import{R as fe}from"./quill.snow-N0L4fiYi.js";import"./clsx-B-dksMZM.js";import"./index-D5MXH53t.js";P.setAppElement("#root");const Fe=()=>{const[m,g]=a.useState(""),[b,f]=a.useState(""),[d,U]=a.useState([]),[E,j]=a.useState(!0),[u,B]=a.useState(""),[v,R]=a.useState(null),[y,p]=a.useState(""),[I,L]=a.useState(!1),[r,n]=a.useState(0),[o,D]=a.useState(0),[c,z]=a.useState("All"),[h,N]=a.useState(null),[O,S]=a.useState(!1),w=le(),C=5,$=()=>{be.success("Updated Successfully!")},q=a.useMemo(()=>d.filter(s=>c==="Meta Available"?s.metatitle&&s.metatitle.length>0||s.metadescription&&s.metadescription.length>0:c==="Meta Unavailable"?!s.metatitle||s.metatitle.length===0||!s.metadescription||s.metadescription.length===0:!0).filter(s=>s.title.toLowerCase().includes(u.toLowerCase())),[d,u,c]),Q=a.useMemo(()=>[{Header:"ID",accessor:"id"},{Header:"Category",accessor:"categoryName",Cell:({row:s})=>e.jsx("span",{className:"hover:text-blue-500 cursor-pointer",onClick:()=>w(`/services/editServices/${s.original.slug}`),children:s.original.categoryName})},{Header:"Title",accessor:"title",Cell:({row:s})=>e.jsx("span",{className:"hover:text-blue-500 cursor-pointer",onClick:()=>w(`/services/editServices/${s.original.slug}`),children:s.original.title})},{Header:"Photo",accessor:"photo",Cell:({value:s})=>{const t=Array.isArray(s)&&s.length>0?s[0]:null;return t?e.jsx("img",{src:`/api/image/download/${t}`,alt:"Service",className:" w-32 h-20 object-cover"}):null},disableSortBy:!0},{Header:"Status",accessor:"status",Cell:({value:s})=>s==="active"?e.jsx(ie,{className:"text-green-500"}):e.jsx(H,{className:"text-red-500"}),disableSortBy:!0},{Header:"Options",Cell:({row:s})=>e.jsxs("div",{className:"flex gap-4",children:[e.jsx("button",{className:"text-blue-500 hover:text-blue-700 transition",onClick:()=>X(s.original),children:e.jsx(ne,{})}),e.jsx("button",{className:"text-blue-500 hover:text-blue-700 transition",children:e.jsxs(M,{to:`/services/editServices/${s.original.slug}`,children:["  ",e.jsx(oe,{})]})}),e.jsx("button",{className:"text-red-500 hover:text-red-700 transition",onClick:()=>Y(s.original.slug),children:e.jsx(ce,{})})]}),disableSortBy:!0}],[]),{getTableProps:G,getTableBodyProps:V,headerGroups:W,rows:J,prepareRow:K}=A.useTable({columns:Q,data:q},A.useSortBy),F=async()=>{j(!0);try{const s=await i.get(`/api/services/getService?page=${r+1}`,{withCredentials:!0}),t=s.data.data.map((l,re)=>({...l,Icon:l.icons,id:r*C+re+1}));U(t),D(Math.ceil(s.data.total/C))}catch(s){console.error(s)}finally{j(!1)}},X=s=>{N(s),S(!0)},x=()=>{S(!1),N(null)},Y=async s=>{try{const t=await i.delete(`/api/services/deleteService?slugs=${s}`,{withCredentials:!0});window.location.href="/services",F()}catch(t){console.error(t)}};a.useEffect(()=>{F()},[r]);const Z=async()=>{try{const s=await i.get("/api/pageHeading/heading?pageType=service",{withCredentials:!0}),{heading:t,subheading:l}=s.data;g(t||""),f(l||"")}catch(s){console.error(s)}},_=async()=>{try{await i.put("/api/pageHeading/updateHeading?pageType=service",{pagetype:"service",heading:m,subheading:b},{withCredentials:!0}),$()}catch(s){console.error(s)}};a.useEffect(()=>{Z()},[]);const ee=s=>g(s.target.value),se=s=>f(s.target.value);function te(){i.get("/api/services/exportService",{responseType:"blob",withCredentials:!0}).then(s=>{const t=window.URL.createObjectURL(new Blob([s.data])),l=document.createElement("a");l.href=t,l.download="Services.xlsx",document.body.appendChild(l),l.click(),window.URL.revokeObjectURL(t),document.body.removeChild(l)}).catch(s=>{console.error("Error exporting products:",s),alert("Failed to export products")})}const ae=s=>{R(s.target.files[0])},k=async()=>{if(!v){p("Please select a file to upload.");return}const s=new FormData;s.append("file",v);try{const t=await i.post("/api/services/importService",s,{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0});p(t.data.message)}catch(t){console.error("Error uploading file:",t),p("Failed to upload file.")}};return e.jsxs("div",{className:"p-4 overflow-x-auto",children:[e.jsx(ge,{}),e.jsxs("div",{className:"mb-8 border border-gray-200 shadow-lg p-4 rounded ",children:[e.jsxs("div",{className:"grid md:grid-cols-2 md:gap-2 grid-cols-1",children:[e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{className:"block text-gray-700 font-bold mb-2 uppercase font-serif",children:"Heading"}),e.jsx("input",{type:"text",value:m,onChange:ee,className:"w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{className:"block text-gray-700 font-bold mb-2 uppercase font-serif",children:"Sub heading"}),e.jsx("input",{type:"text",value:b,onChange:se,className:"w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"})]})]}),e.jsx("button",{onClick:_,className:"px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300",children:"Save"})]}),e.jsxs("div",{className:"flex md:flex-row flex-col justify-between md:items-center mb-4",children:[e.jsx("h1",{className:"text-xl font-bold  text-gray-700 font-serif uppercase",children:"Services"}),e.jsxs("div",{className:"flex gap-2 md:flex-row flex-col md:mt-0 mt-4",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("select",{className:"px-2 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300",value:c,onChange:s=>z(s.target.value),children:[e.jsx("option",{value:"All",children:"All"}),e.jsx("option",{value:"Meta Available",children:"Meta Available"}),e.jsx("option",{value:"Meta Unavailable",children:"Meta Unavailable"})]}),e.jsx("button",{className:"px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300",children:e.jsx(M,{to:"/services/createServices",children:e.jsx(de,{size:15})})}),e.jsx("button",{onClick:te,className:"px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300",children:e.jsx(ue,{size:15})}),e.jsx("button",{onClick:()=>{k(),L(!0)},className:"px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300",children:e.jsx(pe,{size:15})})]}),e.jsx("div",{children:I&&e.jsxs("div",{className:" mt-2 p-2 bg-white border border-gray-200 rounded shadow-md",children:[e.jsx("input",{type:"file",onChange:ae,className:"mb-2"}),e.jsx("button",{onClick:k,className:"px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300",children:"Upload"}),y&&e.jsx("p",{children:y})]})})]})]}),e.jsx("div",{className:"mb-4",children:e.jsx("input",{type:"text",placeholder:"Search by title...",value:u,onChange:s=>B(s.target.value),className:"w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"})}),e.jsx("h2",{className:"text-md font-semibold mb-4",children:"Manage your service"}),E?e.jsx("div",{className:"flex justify-center",children:e.jsx(xe,{animation:me,size:56})}):e.jsx(e.Fragment,{children:d.length==0?e.jsx("div",{className:"flex justify-center items-center",children:e.jsx("iframe",{className:"w-96 h-96",src:"https://lottie.host/embed/1ce6d411-765d-4361-93ca-55d98fefb13b/AonqR3e5vB.json"})}):e.jsxs("table",{className:"w-full mt-4 border-collapse",...G(),children:[e.jsx("thead",{className:"bg-slate-700 hover:bg-slate-800 text-white",children:W.map(s=>e.jsx("tr",{...s.getHeaderGroupProps(),children:s.headers.map(t=>e.jsx("th",{...t.getHeaderProps(t.getSortByToggleProps()),className:"py-2 px-4 border-b border-gray-300 cursor-pointer uppercase font-serif",children:e.jsxs("div",{className:"flex items-center gap-2 ",children:[e.jsx("span",{children:t.render("Header")}),t.canSort&&e.jsx("span",{className:"ml-1",children:t.isSorted?t.isSortedDesc?e.jsx(T,{}):e.jsx(he,{}):e.jsx(T,{className:"text-gray-400"})})]})}))}))}),e.jsx("tbody",{...V(),children:J.map(s=>(K(s),e.jsx("tr",{...s.getRowProps(),className:"border-b border-gray-300 hover:bg-gray-100 transition duration-150 ",children:s.cells.map(t=>e.jsx("td",{...t.getCellProps(),className:"py-2 px-4 ",children:t.render("Cell")}))})))})]})}),e.jsxs("div",{className:"mt-4 flex justify-center",children:[e.jsx("button",{onClick:()=>n(0),disabled:r===0,className:"mr-2 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition",children:"<<"})," ",e.jsx("button",{onClick:()=>n(r-1),disabled:r===0,className:"mr-2 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition",children:"<"})," ",e.jsx("button",{onClick:()=>n(r+1),disabled:r+1>=o,className:"mr-2 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition",children:">"})," ",e.jsx("button",{onClick:()=>n(o-1),disabled:r+1>=o,className:"mr-2 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition",children:">>"})," ",e.jsxs("span",{children:["Page"," ",e.jsxs("strong",{children:[r+1," of ",o]})," "]})]}),e.jsx(P,{isOpen:O,onRequestClose:x,contentLabel:"Banner Details",className:"fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50",children:e.jsxs("div",{className:"bg-white p-8 rounded shadow-lg w-96 relative",children:[e.jsx("button",{onClick:x,className:"absolute top-5 right-5 text-gray-500 hover:text-gray-700",children:e.jsx(H,{size:20})}),e.jsx("h2",{className:"text-xl font-bold mb-4 font-serif",children:"Service"}),h&&e.jsxs("div",{className:"",children:[e.jsxs("div",{className:"flex mt-2",children:[e.jsx("p",{className:"mr-2 font-semibold font-serif",children:"Title :"}),e.jsx("p",{children:h.title})]}),e.jsxs("label",{className:"mr-2 mt-2 font-semibold font-serif",children:[" Description :",e.jsx(fe,{readOnly:!0,value:h.details,modules:{toolbar:!1},theme:"bubble",className:"quill"})]})]}),e.jsx("button",{onClick:x,className:"mt-4 px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300",children:"Close"})]})})]})};export{Fe as default};
