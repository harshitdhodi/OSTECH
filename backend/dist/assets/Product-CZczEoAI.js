import{r as a,s as de,j as e,J as ce,w as I,t as ue,v as T,L as E,x as xe,y as he,b as d,z as pe,A as me,B as ge,C as B,D as be}from"./index-Bf0_iwmC.js";import{r as U,U as fe,l as je}from"./index-DPkFNSVF.js";import{Q as ye,B as ve}from"./ReactToastify-C8h-yn_H.js";import{M as L}from"./index-D-LDOxyL.js";import{R as Ne}from"./quill.snow-N0L4fiYi.js";import"./clsx-B-dksMZM.js";import"./index-D5MXH53t.js";L.setAppElement("#root");const Ae=()=>{const[p,R]=a.useState([]),[D,f]=a.useState(!0),[m,z]=a.useState(""),[j,y]=a.useState(""),[v,N]=a.useState(""),[w,$]=a.useState(null),[C,g]=a.useState(""),[O,q]=a.useState(!1),[l,c]=a.useState(0),[i,P]=a.useState(0),[u,Q]=a.useState("All"),[x,S]=a.useState(null),[_,F]=a.useState(!1),k=de(),n=5,G=()=>{ve.success("Updated Successfully!")},h=a.useMemo(()=>p.filter(t=>u==="Meta Available"?t.metatitle&&t.metatitle.length>0||t.metadescription&&t.metadescription.length>0:u==="Meta Unavailable"?!t.metatitle||t.metatitle.length===0&&!t.metadescription||t.metadescription.length===0:!0).filter(t=>t.title.toLowerCase().includes(m.toLowerCase())),[p,m,u]),M=a.useMemo(()=>{const t=l*n,s=t+n;return h.slice(t,s)},[l,n,h]);a.useEffect(()=>{P(Math.ceil(h.length/n))},[h,n]);const J=a.useMemo(()=>[{Header:"ID",accessor:"autoIncrementId"},{Header:"Category",accessor:"categoryName",Cell:({row:t})=>e.jsx("span",{className:"hover:text-blue-500 cursor-pointer",onClick:()=>k(`/product/editProduct/${t.original.slug}`),children:t.original.categoryName})},{Header:"Title",accessor:"title",Cell:({row:t})=>e.jsx("span",{className:"hover:text-blue-500 cursor-pointer",onClick:()=>k(`/product/editProduct/${t.original.slug}`),children:t.original.title})},{Header:"Photo",accessor:"photo",Cell:({value:t})=>{const s=Array.isArray(t)&&t.length>0?t[0]:null;return s?e.jsx("img",{src:`/api/image/download/${s}`,alt:"Banner",className:" w-fit h-20"}):null},disableSortBy:!0},{Header:"Catalogue",accessor:"catalogue",Cell:({value:t})=>e.jsxs("div",{className:"flex gap-4",children:[e.jsx("a",{className:"text-green-500 hover:text-green-700 transition",href:`/api/product/download/${t}`,children:e.jsx(ce,{size:20})}),e.jsx("button",{className:"text-blue-500 hover:text-blue-700 transition",onClick:()=>Z(t),children:e.jsx(I,{size:20})})]}),disableSortBy:!0},{Header:"Status",accessor:"status",Cell:({value:t})=>t==="active"?e.jsx(ue,{className:"text-green-500"}):e.jsx(T,{className:"text-red-500"}),disableSortBy:!0},{Header:"Options",Cell:({row:t})=>e.jsxs("div",{className:"flex gap-4",children:[e.jsx("button",{className:"text-blue-500 hover:text-blue-700 transition",onClick:()=>ae(t.original),children:e.jsx(I,{})}),e.jsx("button",{className:"text-blue-500 hover:text-blue-700 transition",children:e.jsx(E,{to:`/product/editProduct/${t.original.slug}`,children:e.jsx(xe,{})})}),e.jsx("button",{className:"text-red-500 hover:text-red-700 transition",onClick:()=>ee(t.original.slug),children:e.jsx(he,{})})]}),disableSortBy:!0}],[]),{getTableProps:V,getTableBodyProps:W,headerGroups:K,rows:X,prepareRow:Y}=U.useTable({columns:J,data:M},U.useSortBy),Z=t=>{window.open(`/api/product/view/${t}`)},A=async t=>{f(!0);try{const s=await d.get("/api/product/getAllProducts",{params:{page:t+1,limit:n},withCredentials:!0}),r=s.data.data.map((o,ie)=>({...o,autoIncrementId:t*n+ie+1}));R(r),P(Math.ceil(s.data.total/n))}catch(s){console.error(s)}finally{f(!1)}},ee=async t=>{try{await d.delete(`/api/product/deleteProduct?slugs=${t}`,{withCredentials:!0}),window.location.href="/product",A()}catch(s){console.error(s)}};a.useEffect(()=>{A(l)},[l]);const te=async()=>{try{const t=await d.get("/api/pageHeading/heading?pageType=product",{withCredentials:!0}),{heading:s,subheading:r}=t.data;y(s||""),N(r||"")}catch(t){console.error(t)}},se=async()=>{try{await d.put("/api/pageHeading/updateHeading?pageType=product",{pagetype:"product",heading:j,subheading:v},{withCredentials:!0}),G()}catch(t){console.error(t)}};a.useEffect(()=>{te()},[]);const ae=t=>{S(t),F(!0)},b=()=>{F(!1),S(null)},re=t=>y(t.target.value),le=t=>N(t.target.value);function oe(){d.get("/api/product/exportProduct",{responseType:"blob",withCredentials:!0}).then(t=>{const s=window.URL.createObjectURL(new Blob([t.data])),r=document.createElement("a");r.href=s,r.download="products.xlsx",document.body.appendChild(r),r.click(),window.URL.revokeObjectURL(s),document.body.removeChild(r)}).catch(t=>{console.error("Error exporting products:",t),alert("Failed to export products")})}const ne=t=>{$(t.target.files[0])},H=async()=>{if(!w){g("Please select a file to upload.");return}const t=new FormData;t.append("file",w);try{const s=await d.post("/api/product/importProduct",t,{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0});g(s.data.message)}catch(s){console.error("Error uploading file:",s),g("Failed to upload file.")}};return e.jsxs("div",{className:"p-4 overflow-x-auto",children:[e.jsx(ye,{}),e.jsxs("div",{className:"mb-8 border border-gray-200 shadow-lg p-4 rounded ",children:[e.jsxs("div",{className:"grid md:grid-cols-2  md:gap-2 grid-cols-1",children:[e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{className:"block text-gray-700 font-bold mb-2 uppercase font-serif",children:"Heading"}),e.jsx("input",{type:"text",value:j,onChange:re,className:"w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{className:"block text-gray-700 font-bold mb-2 uppercase font-serif",children:"Sub heading"}),e.jsx("input",{type:"text",value:v,onChange:le,className:"w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"})]})]}),e.jsx("button",{onClick:se,className:"px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300",children:"Save"})]}),e.jsxs("div",{className:"flex md:flex-row flex-col justify-between md:items-center mb-4",children:[e.jsx("h1",{className:"text-xl font-bold  text-gray-700 font-serif uppercase",children:"Products"}),e.jsxs("div",{className:"flex gap-2 md:flex-row flex-col md:mt-0 mt-4",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("select",{className:"px-2 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300",value:u,onChange:t=>Q(t.target.value),children:[e.jsx("option",{value:"All",children:"All"}),e.jsx("option",{value:"Meta Available",children:"Meta Available"}),e.jsx("option",{value:"Meta Unavailable",children:"Meta Unavailable"})]}),e.jsx("button",{className:"px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300",title:"Add",children:e.jsx(E,{to:"/product/createProduct",children:e.jsx(pe,{size:15})})}),e.jsx("button",{onClick:oe,className:"px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300",title:"Export",children:e.jsx(me,{size:15})}),e.jsx("button",{onClick:()=>{H(),q(!0)},className:"px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300",title:"Import",children:e.jsx(ge,{size:15})})]}),e.jsx("div",{children:O&&e.jsxs("div",{className:" mt-2 p-2 bg-white border border-gray-200 rounded shadow-md",children:[e.jsx("input",{type:"file",onChange:ne,className:"mb-2"}),e.jsx("button",{onClick:H,className:"px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300",children:"Upload"}),C&&e.jsx("p",{children:C})]})})]})]}),e.jsx("div",{className:"mb-4",children:e.jsx("input",{type:"text",placeholder:"Search by title...",value:m,onChange:t=>z(t.target.value),className:"w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"})}),e.jsx("h2",{className:"text-md font-semibold mb-4",children:"Manage your Products"}),D?e.jsx("div",{className:"flex justify-center",children:e.jsx(fe,{animation:je,size:56})}):e.jsx(e.Fragment,{children:p.length==0?e.jsx("div",{className:"flex justify-center items-center",children:e.jsx("iframe",{className:"w-96 h-96",src:"https://lottie.host/embed/1ce6d411-765d-4361-93ca-55d98fefb13b/AonqR3e5vB.json"})}):e.jsxs("table",{className:"w-full mt-4 border-collapse",...V(),children:[e.jsx("thead",{className:" bg-slate-700 hover:bg-slate-800 text-white",children:K.map(t=>e.jsx("tr",{...t.getHeaderGroupProps(),children:t.headers.map(s=>e.jsx("th",{...s.getHeaderProps(s.getSortByToggleProps()),className:"py-2 px-4 border-b border-gray-300 cursor-pointer uppercase font-serif",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("span",{children:s.render("Header")}),s.canSort&&e.jsx("span",{className:"ml-1",children:s.isSorted?s.isSortedDesc?e.jsx(B,{}):e.jsx(be,{}):e.jsx(B,{className:"text-gray-400"})})]})}))}))}),e.jsx("tbody",{...W(),children:M.map((t,s)=>{const r=X[s];return Y(r),e.jsx("tr",{className:"border-b border-gray-300 hover:bg-gray-100 transition duration-150",children:r.cells.map(o=>e.jsx("td",{className:"py-2 px-4",children:o.render("Cell")},o.column.id))},t._id)})})]})}),e.jsxs("div",{className:"mt-4 flex justify-center items-center gap-2",children:[e.jsx("button",{onClick:()=>c(0),disabled:l===0,className:"px-3 py-1 bg-slate-700 text-white rounded hover:bg-slate-900 transition disabled:bg-gray-300 disabled:cursor-not-allowed",children:"First"}),e.jsx("button",{onClick:()=>c(l-1),disabled:l===0,className:"px-3 py-1 bg-slate-700 text-white rounded hover:bg-slate-900 transition disabled:bg-gray-300 disabled:cursor-not-allowed",children:"Previous"}),e.jsx("div",{className:"flex items-center gap-1",children:i>0&&Array.from({length:Math.min(i,5)},(t,s)=>{let o=Math.max(0,Math.min(l-2,i-5))+s;return o<i?e.jsx("button",{onClick:()=>c(o),className:`px-3 py-1 rounded transition ${l===o?"bg-slate-900 text-white":"bg-slate-700 text-white hover:bg-slate-800"}`,children:o+1},o):null})}),e.jsx("button",{onClick:()=>c(l+1),disabled:l+1>=i,className:"px-3 py-1 bg-slate-700 text-white rounded hover:bg-slate-900 transition disabled:bg-gray-300 disabled:cursor-not-allowed",children:"Next"}),e.jsx("button",{onClick:()=>c(i-1),disabled:l+1>=i,className:"px-3 py-1 bg-slate-700 text-white rounded hover:bg-slate-900 transition disabled:bg-gray-300 disabled:cursor-not-allowed",children:"Last"})]}),e.jsx(L,{isOpen:_,onRequestClose:b,contentLabel:"Banner Details",className:"fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50",children:e.jsxs("div",{className:"bg-white p-8 rounded shadow-lg w-96 relative",children:[e.jsx("button",{onClick:b,className:"absolute top-5 right-5 text-gray-500 hover:text-gray-700",children:e.jsx(T,{size:20})}),e.jsx("h2",{className:"text-xl font-bold mb-4 font-serif",children:"Product"}),x&&e.jsxs("div",{children:[e.jsxs("div",{className:"flex mt-2",children:[e.jsx("p",{className:"mr-2 font-semibold font-serif",children:"Category :"}),e.jsx("p",{children:x.categoryName})]}),e.jsxs("div",{className:"flex mt-2",children:[e.jsx("p",{className:"mr-2 font-semibold font-serif",children:"Title :"}),e.jsx("p",{children:x.title})]}),e.jsxs("div",{className:"mt-2",children:[e.jsx("p",{className:"mr-2 font-semibold font-serif",children:"Description :"}),e.jsx(Ne,{readOnly:!0,value:x.details,modules:{toolbar:!1},theme:"bubble",className:"quill"})]})]}),e.jsx("button",{onClick:b,className:"mt-4 px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300",children:"Close"})]})})]})};export{Ae as default};
