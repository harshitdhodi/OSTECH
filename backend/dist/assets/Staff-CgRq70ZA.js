import{r as t,s as R,j as e,t as U,v as O,L as j,x as q,y as G,b as i,z as J,C as y,D as Q}from"./index-Bf0_iwmC.js";import{r as N,U as W,l as Y}from"./index-DPkFNSVF.js";import{Q as K,B as V}from"./ReactToastify-C8h-yn_H.js";import"./clsx-B-dksMZM.js";const ae=()=>{const[h,x]=t.useState(""),[m,p]=t.useState(""),[l,v]=t.useState([]),[S,g]=t.useState(!0),[r,n]=t.useState(0),[o,C]=t.useState(0),[d,w]=t.useState(""),b=5,c=R(),T=t.useMemo(()=>l.filter(s=>s.name.toLowerCase().includes(d.toLowerCase())),[l,d]),H=()=>{V.success("Updated Successfully!")},k=t.useMemo(()=>[{Header:"ID",accessor:"id"},{Header:"Employee ID",accessor:"S_id",Cell:({row:s})=>e.jsx("span",{className:"hover:text-blue-500 cursor-pointer",onClick:()=>c(`/ourTeam/editTeam/${s.original._id}`),children:s.original.S_id})},{Header:"Name",accessor:"name",Cell:({row:s})=>e.jsx("span",{className:"hover:text-blue-500 cursor-pointer",onClick:()=>c(`/ourTeam/editTeam/${s.original._id}`),children:s.original.name})},{Header:"Photo",accessor:"photo",Cell:({value:s})=>{const a=Array.isArray(s)&&s.length>0?s[0]:null;return a?e.jsx("img",{src:`/api/image/download/${a}`,alt:"Service",className:"w-32 h-20 object-cover"}):null},disableSortBy:!0},{Header:"Job Title",accessor:"jobTitle",Cell:({row:s})=>e.jsx("span",{className:"hover:text-blue-500 cursor-pointer",onClick:()=>c(`/ourTeam/editTeam/${s.original._id}`),children:s.original.jobTitle})},{Header:"Status",accessor:"status",Cell:({value:s})=>s==="active"?e.jsx(U,{className:"text-green-500"}):e.jsx(O,{className:"text-red-500"}),disableSortBy:!0},{Header:"Options",Cell:({row:s})=>e.jsxs("div",{className:"flex  gap-4",children:[e.jsx("button",{className:"text-blue-500 hover:text-blue-700 transition",children:e.jsx(j,{to:`/ourTeam/editTeam/${s.original._id}`,children:e.jsx(q,{})})}),e.jsx("button",{className:"text-red-500 hover:text-red-700 transition",onClick:()=>_(s.original._id),children:e.jsx(G,{})})]}),disableSortBy:!0}],[]),{getTableProps:P,getTableBodyProps:B,headerGroups:F,rows:A,prepareRow:E}=N.useTable({columns:k,data:T},N.useSortBy),f=async s=>{g(!0);try{const a=await i.get(`/api/staff/getStaff?page=${s+1}`,{withCredentials:!0}),u=a.data.data.map((z,M)=>({...z,id:s*b+M+1}));v(u),C(Math.ceil(a.data.total/b))}catch(a){console.error(a)}finally{g(!1)}},_=async s=>{try{const a=await i.delete(`/api/staff/deleteStaff?id=${s}`,{withCredentials:!0});f(r)}catch(a){console.error(a)}};t.useEffect(()=>{f(r)},[r]);const $=async()=>{try{const s=await i.get("/api/pageHeading/heading?pageType=ourStaff",{withCredentials:!0}),{heading:a,subheading:u}=s.data;x(a||""),p(u||"")}catch(s){console.error(s)}},D=async()=>{try{await i.put("/api/pageHeading/updateHeading?pageType=ourStaff",{pagetype:"ourStaff",heading:h,subheading:m},{withCredentials:!0}),H()}catch(s){console.error(s)}};t.useEffect(()=>{$()},[]);const I=s=>x(s.target.value),L=s=>p(s.target.value);return e.jsxs("div",{className:"p-4 overflow-x-auto",children:[e.jsx(K,{}),e.jsxs("div",{className:"mb-8 border border-gray-200 shadow-lg p-4 rounded ",children:[e.jsxs("div",{className:"grid md:grid-cols-2 md:gap-2 grid-cols-1",children:[e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{className:"block text-gray-700 font-bold mb-2 uppercase font-serif",children:"Heading"}),e.jsx("input",{type:"text",value:h,onChange:I,className:"w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{className:"block text-gray-700 font-bold mb-2 uppercase font-serif",children:"Sub heading"}),e.jsx("input",{type:"text",value:m,onChange:L,className:"w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"})]})]}),e.jsx("button",{onClick:D,className:"px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300 font-serif",children:"Save"})]}),e.jsxs("div",{className:"flex justify-between items-center mb-4",children:[e.jsx("h1",{className:"text-xl font-bold  text-gray-700 font-serif uppercase",children:"Our Team"}),e.jsx("button",{className:"px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300 font-serif",children:e.jsx(j,{to:"/ourTeam/createTeam",children:e.jsx(J,{size:15})})})]}),e.jsx("div",{className:"mb-4",children:e.jsx("input",{type:"text",placeholder:"Search by name...",value:d,onChange:s=>w(s.target.value),className:"w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"})}),e.jsx("h2",{className:"text-md font-semibold mb-4",children:"Manage Your Staff"}),S?e.jsx("div",{className:"flex justify-center",children:e.jsx(W,{animation:Y,size:56})}):e.jsx(e.Fragment,{children:l.length==0?e.jsx("div",{className:"flex justify-center items-center",children:e.jsx("iframe",{className:"w-96 h-96",src:"https://lottie.host/embed/1ce6d411-765d-4361-93ca-55d98fefb13b/AonqR3e5vB.json"})}):e.jsxs("table",{className:"w-full mt-4 border-collapse",...P(),children:[e.jsx("thead",{className:"bg-slate-700 hover:bg-slate-800 text-white",children:F.map(s=>e.jsx("tr",{...s.getHeaderGroupProps(),children:s.headers.map(a=>e.jsx("th",{...a.getHeaderProps(a.getSortByToggleProps()),className:"py-2 px-4 border-b border-gray-300 cursor-pointer uppercase font-serif",children:e.jsxs("div",{className:"flex items-center  gap-2",children:[e.jsx("span",{children:a.render("Header")}),a.canSort&&e.jsx("span",{className:"ml-1",children:a.isSorted?a.isSortedDesc?e.jsx(y,{}):e.jsx(Q,{}):e.jsx(y,{className:"text-gray-400"})})]})}))}))}),e.jsx("tbody",{...B(),children:A.map(s=>(E(s),e.jsx("tr",{...s.getRowProps(),className:"border-b border-gray-300 hover:bg-gray-100 transition duration-150 justify-center ",children:s.cells.map(a=>e.jsx("td",{...a.getCellProps(),className:"py-2 px-4 ",children:a.render("Cell")}))})))})]})}),e.jsxs("div",{className:"mt-4 flex justify-center",children:[e.jsx("button",{onClick:()=>n(0),disabled:r===0,className:"mr-2 px-3 py-1 bg-slate-700 text-white  hover:bg-slate-900 rounded transition",children:"<<"})," ",e.jsx("button",{onClick:()=>n(r-1),disabled:r===0,className:"mr-2 px-3 py-1 bg-slate-700 text-white  hover:bg-slate-900 rounded transition",children:"<"})," ",e.jsx("button",{onClick:()=>n(r+1),disabled:r+1>=o,className:"mr-2 px-3 py-1 bg-slate-700 text-white  hover:bg-slate-900 rounded transition",children:">"})," ",e.jsx("button",{onClick:()=>n(o-1),disabled:r+1>=o,className:"mr-2 px-3 py-1 bg-slate-700 text-white rounded hover:bg-slate-900  transition",children:">>"})," ",e.jsxs("strong",{children:[r+1," of ",o]})," "]})]})};export{ae as default};
