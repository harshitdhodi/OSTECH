import{r as a,s as M,j as e,t as _,v as O,L as j,x as q,y as G,b as o,z as Q,C as f,D as W}from"./index-Bf0_iwmC.js";import{r as y,U as J,l as K}from"./index-DPkFNSVF.js";import{Q as V,B as X}from"./ReactToastify-C8h-yn_H.js";import"./clsx-B-dksMZM.js";const te=()=>{const[u,h]=a.useState(""),[p,x]=a.useState(""),[i,N]=a.useState([]),[v,g]=a.useState(!0),[r,n]=a.useState(0),[l,C]=a.useState(0),[d,w]=a.useState(""),S=M(),m=5,P=a.useMemo(()=>i.filter(s=>s.partnerName.toLowerCase().includes(d.toLowerCase())),[i,d]),H=()=>{X.success("Updated Successfully!")},k=a.useMemo(()=>[{Header:"ID",accessor:"id"},{Header:"Client Name",accessor:"partnerName",Cell:({row:s})=>e.jsx("span",{className:"hover:text-blue-500 cursor-pointer",onClick:()=>S(`/clients/editClients/${s.original._id}`),children:s.original.partnerName})},{Header:"Photo",accessor:"photo",Cell:({value:s})=>{const t=Array.isArray(s)&&s.length>0?s[0]:null;return t?e.jsx("img",{src:`/api/image/download/${t}`,alt:"logo",className:"w-fit h-20"}):null},disableSortBy:!0},{Header:"URL",accessor:"url",Cell:({value:s})=>e.jsx("a",{href:s,target:"_blank",rel:"noopener noreferrer",className:"hover:text-blue-500",children:s}),disableSortBy:!0},{Header:"Status",accessor:"status",Cell:({value:s})=>s==="active"?e.jsx(_,{className:"text-green-500"}):e.jsx(O,{className:"text-red-500"}),disableSortBy:!0},{Header:"Options",Cell:({row:s})=>e.jsxs("div",{className:"flex gap-4",children:[e.jsx("button",{className:"text-blue-500 hover:text-blue-700 transition",children:e.jsxs(j,{to:`/clients/editClients/${s.original._id}`,children:["  ",e.jsx(q,{})]})}),e.jsx("button",{className:"text-red-500 hover:text-red-700 transition",onClick:()=>L(s.original._id),children:e.jsx(G,{})})]}),disableSortBy:!0}],[]),{getTableProps:T,getTableBodyProps:B,headerGroups:F,rows:A,prepareRow:E}=y.useTable({columns:k,data:P},y.useSortBy),b=async s=>{g(!0);try{const t=await o.get(`/api/partner/getPartners?page=${s+1}`,{withCredentials:!0}),c=t.data.data.map((z,I)=>({...z,id:s*m+I+1}));N(c),C(Math.ceil(t.data.total/m))}catch(t){console.error(t)}finally{g(!1)}},L=async s=>{try{const t=await o.delete(`/api/partner/deletePartner?id=${s}`,{withCredentials:!0});b(r)}catch(t){console.error(t)}};a.useEffect(()=>{b(r)},[r]);const D=async()=>{try{const s=await o.get("/api/pageHeading/heading?pageType=partner",{withCredentials:!0}),{heading:t,subheading:c}=s.data;h(t||""),x(c||"")}catch(s){console.error(s)}},R=async()=>{try{await o.put("/api/pageHeading/updateHeading?pageType=partner",{pagetype:"partner",heading:u,subheading:p},{withCredentials:!0}),H()}catch(s){console.error(s)}};a.useEffect(()=>{D()},[]);const U=s=>h(s.target.value),$=s=>x(s.target.value);return e.jsxs("div",{className:"p-4 overflow-x-auto",children:[e.jsx(V,{}),e.jsxs("div",{className:"mb-8 border border-gray-200 shadow-lg p-4 rounded ",children:[e.jsxs("div",{className:"grid md:grid-cols-2 md:gap-2 grid-cols-1",children:[e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{className:"block text-gray-700 font-bold mb-2 uppercase font-serif",children:"Heading"}),e.jsx("input",{type:"text",value:u,onChange:U,className:"w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{className:"block text-gray-700 font-bold mb-2 uppercase font-serif",children:"Sub heading"}),e.jsx("input",{type:"text",value:p,onChange:$,className:"w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"})]})]}),e.jsx("button",{onClick:R,className:"px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300",children:"Save"})]}),e.jsxs("div",{className:"flex justify-between items-center mb-4",children:[e.jsx("h1",{className:"text-xl font-bold  text-gray-700 font-serif uppercase",children:"Our Clients"}),e.jsx("button",{className:"px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300",children:e.jsx(j,{to:"/clients/createClients",children:e.jsx(Q,{size:15})})})]}),e.jsx("div",{className:"mb-4",children:e.jsx("input",{type:"text",placeholder:"Search by client name...",value:d,onChange:s=>w(s.target.value),className:"w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"})}),e.jsx("h2",{className:"text-md font-semibold mb-4",children:"Manage your clients"}),v?e.jsx("div",{className:"flex justify-center",children:e.jsx(J,{animation:K,size:56})}):e.jsx(e.Fragment,{children:i.length==0?e.jsx("div",{className:"flex justify-center items-center",children:e.jsx("iframe",{className:"w-96 h-96",src:"https://lottie.host/embed/1ce6d411-765d-4361-93ca-55d98fefb13b/AonqR3e5vB.json"})}):e.jsxs("table",{className:"w-full mt-4 border-collapse",...T(),children:[e.jsx("thead",{className:"bg-slate-700 hover:bg-slate-800 text-white",children:F.map(s=>e.jsx("tr",{...s.getHeaderGroupProps(),children:s.headers.map(t=>e.jsx("th",{...t.getHeaderProps(t.getSortByToggleProps()),className:"py-2 px-4 border-b border-gray-300 cursor-pointer uppercase font-serif",children:e.jsxs("div",{className:"flex items-center gap-2 ",children:[e.jsx("span",{children:t.render("Header")}),t.canSort&&e.jsx("span",{className:"ml-1",children:t.isSorted?t.isSortedDesc?e.jsx(f,{}):e.jsx(W,{}):e.jsx(f,{className:"text-gray-400"})})]})}))}))}),e.jsx("tbody",{...B(),children:A.map(s=>(E(s),e.jsx("tr",{...s.getRowProps(),className:"border-b border-gray-300 hover:bg-gray-100 transition duration-150 ",children:s.cells.map(t=>e.jsx("td",{...t.getCellProps(),className:"py-2 px-4 ",children:t.render("Cell")}))})))})]})}),e.jsxs("div",{className:"mt-4 flex justify-center",children:[e.jsx("button",{onClick:()=>n(0),disabled:r===0,className:"mr-2 px-3 py-1 bg-slate-700 text-white rounded hover:bg-slate-900 transition",children:"<<"})," ",e.jsx("button",{onClick:()=>n(r-1),disabled:r===0,className:"mr-2 px-3 py-1 bg-slate-700 text-white rounded hover:bg-slate-900 transition",children:"<"})," ",e.jsx("button",{onClick:()=>n(r+1),disabled:r+1>=l,className:"mr-2 px-3 py-1 bg-slate-700 text-white rounded hover:bg-slate-900 transition",children:">"})," ",e.jsx("button",{onClick:()=>n(l-1),disabled:r+1>=l,className:"mr-2 px-3 py-1 bg-slate-700 text-white rounded hover:bg-slate-900 transition",children:">>"})," ",e.jsxs("span",{children:["Page"," ",e.jsxs("strong",{children:[r+1," of ",l]})," "]})]})]})};export{te as default};
