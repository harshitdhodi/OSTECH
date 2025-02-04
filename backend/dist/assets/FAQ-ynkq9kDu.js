import{r as a,s as J,j as e,t as K,v,w as X,L as w,x as Y,y as Z,b as o,z as ee,C,D as se}from"./index-Bf0_iwmC.js";import{r as S,U as te,l as ae}from"./index-DPkFNSVF.js";import{Q as re,B as ne}from"./ReactToastify-C8h-yn_H.js";import{M as q}from"./index-D-LDOxyL.js";import{R as le}from"./quill.snow-N0L4fiYi.js";import"./clsx-B-dksMZM.js";import"./index-D5MXH53t.js";q.setAppElement("#root");const me=()=>{const[x,h]=a.useState(""),[m,p]=a.useState(""),[i,F]=a.useState([]),[A,g]=a.useState(!0),[r,n]=a.useState(0),[l,H]=a.useState(0),[d,k]=a.useState(""),[c,b]=a.useState(null),[Q,f]=a.useState(!1),T=J(),P=()=>{ne.success("Updated Successfully!")},j=5,M=a.useMemo(()=>i.filter(s=>s.question.toLowerCase().includes(d.toLowerCase())),[i,d]),B=a.useMemo(()=>[{Header:"ID",accessor:"id"},{Header:"Question",accessor:"question",Cell:({row:s})=>e.jsx("span",{className:"hover:text-blue-500 cursor-pointer",onClick:()=>T(`/faq/editFAQ/${s.original._id}`),children:s.original.question})},{Header:"Status",accessor:"status",Cell:({value:s})=>s==="active"?e.jsx(K,{className:"text-green-500"}):e.jsx(v,{className:"text-red-500"}),disableSortBy:!0},{Header:"Options",Cell:({row:s})=>e.jsxs("div",{className:"flex  gap-4",children:[e.jsx("button",{className:"text-gray-600 hover:text-gray-800 transition",onClick:()=>O(s.original),children:e.jsx(X,{})}),e.jsx("button",{className:"text-blue-500 hover:text-blue-700 transition",children:e.jsx(w,{to:`/faq/editFAQ/${s.original._id}`,children:e.jsx(Y,{})})}),e.jsx("button",{className:"text-red-500 hover:text-red-700 transition",onClick:()=>I(s.original._id),children:e.jsx(Z,{})})]}),disableSortBy:!0}],[]),{getTableProps:E,getTableBodyProps:R,headerGroups:D,rows:L,prepareRow:z}=S.useTable({columns:B,data:M},S.useSortBy),O=s=>{b(s),f(!0)},y=()=>{f(!1),b(null)},N=async s=>{g(!0);try{const t=await o.get(`/api/faq/getFAQ?page=${s+1}`,{withCredentials:!0}),u=t.data.data.map((V,W)=>({...V,id:s*j+W+1}));F(u),H(Math.ceil(t.data.total/j))}catch(t){console.error(t)}finally{g(!1)}},I=async s=>{try{const t=await o.delete(`/api/faq/deleteFaq?id=${s}`,{withCredentials:!0});N(r)}catch(t){console.error(t)}};a.useEffect(()=>{N(r)},[r]);const U=async()=>{try{const s=await o.get("/api/pageHeading/heading?pageType=faq",{withCredentials:!0}),{heading:t,subheading:u}=s.data;h(t||""),p(u||"")}catch(s){console.error(s)}},$=async()=>{try{await o.put("/api/pageHeading/updateHeading?pageType=faq",{pagetype:"faq",heading:x,subheading:m},{withCredentials:!0}),P()}catch(s){console.error(s)}};a.useEffect(()=>{U()},[]);const _=s=>h(s.target.value),G=s=>p(s.target.value);return e.jsxs("div",{className:"p-4 overflow-x-auto",children:[e.jsx(re,{}),e.jsxs("div",{className:"mb-8 border border-gray-200 shadow-lg p-4 rounded ",children:[e.jsxs("div",{className:"grid md:grid-cols-2 md:gap-2 grid-cols-1",children:[e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{className:"block text-gray-700 font-bold mb-2 uppercase font-serif",children:"Heading"}),e.jsx("input",{type:"text",value:x,onChange:_,className:"w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"})]}),e.jsxs("div",{className:"mb-6",children:[e.jsx("label",{className:"block text-gray-700 font-bold mb-2 uppercase font-serif",children:"Sub heading"}),e.jsx("input",{type:"text",value:m,onChange:G,className:"w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"})]})]}),e.jsx("button",{onClick:$,className:"px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition  duration-300 font-serif",children:"Save"})]}),e.jsxs("div",{className:"flex justify-between items-center mb-4",children:[e.jsx("h1",{className:"text-xl font-bold text-gray-700 font-serif uppercase",children:"FAQs"}),e.jsx("button",{className:"px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300 font-serif",children:e.jsx(w,{to:"/faq/createFAQ",children:e.jsx(ee,{size:15})})})]}),e.jsx("div",{className:"mb-4",children:e.jsx("input",{type:"text",placeholder:"Search by question...",value:d,onChange:s=>k(s.target.value),className:"w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"})}),e.jsx("h2",{className:"text-md font-semibold mb-4",children:"Manage FAQs"}),A?e.jsx("div",{className:"flex justify-center",children:e.jsx(te,{animation:ae,size:56})}):e.jsx(e.Fragment,{children:i.length==0?e.jsx("div",{className:"flex justify-center items-center",children:e.jsx("iframe",{className:"w-96 h-96",src:"https://lottie.host/embed/1ce6d411-765d-4361-93ca-55d98fefb13b/AonqR3e5vB.json"})}):e.jsxs("table",{className:"w-full mt-4 border-collapse",...E(),children:[e.jsx("thead",{className:"bg-slate-700 hover:bg-slate-800 text-white",children:D.map(s=>e.jsx("tr",{...s.getHeaderGroupProps(),children:s.headers.map(t=>e.jsx("th",{...t.getHeaderProps(t.getSortByToggleProps()),className:"py-2 px-4 border-b border-gray-300 cursor-pointer",children:e.jsxs("div",{className:"flex items-center uppercase font-serif  gap-2 ",children:[e.jsx("span",{className:"",children:t.render("Header")}),t.canSort&&e.jsx("span",{className:"ml-1",children:t.isSorted?t.isSortedDesc?e.jsx(C,{}):e.jsx(se,{}):e.jsx(C,{className:"text-gray-400"})})]})}))}))}),e.jsx("tbody",{...R(),children:L.map(s=>(z(s),e.jsx("tr",{...s.getRowProps(),className:"border-b border-gray-300 hover:bg-gray-100 transition duration-150 ",children:s.cells.map(t=>e.jsx("td",{...t.getCellProps(),className:"py-2 px-4",children:t.render("Cell")}))})))})]})}),e.jsxs("div",{className:"mt-4 flex justify-center",children:[e.jsx("button",{onClick:()=>n(0),disabled:r===0,className:"mr-2 px-3 py-1 bg-slate-700 rounded hover:bg-slate-900 transition text-white",children:"<<"})," ",e.jsx("button",{onClick:()=>n(r-1),disabled:r===0,className:"mr-2 px-3 py-1  bg-slate-700 rounded hover:bg-slate-900 transition text-white",children:"<"})," ",e.jsx("button",{onClick:()=>n(r+1),disabled:r+1>=l,className:"mr-2 px-3 py-1  bg-slate-700 rounded hover:bg-slate-900 transition text-white",children:">"})," ",e.jsx("button",{onClick:()=>n(l-1),disabled:r+1>=l,className:"mr-2 px-3 py-1  bg-slate-700 rounded hover:bg-slate-900 transition text-white",children:">>"})," ",e.jsxs("span",{children:["Page"," ",e.jsxs("strong",{children:[r+1," of ",l]})," "]})]}),e.jsx(q,{isOpen:Q,onRequestClose:y,contentLabel:"Banner Details",className:"fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50",children:e.jsxs("div",{className:"bg-white p-8 rounded shadow-lg w-96 relative",children:[e.jsx("button",{onClick:y,className:"absolute top-5 right-5 text-gray-500 hover:text-gray-700",children:e.jsx(v,{size:20})}),e.jsx("h2",{className:"text-xl font-bold font-serif mb-4",children:"FAQ"}),c&&e.jsxs("div",{className:"",children:[e.jsxs("div",{className:"flex mt-2",children:[e.jsx("p",{className:"mr-2 font-semibold font-serif",children:"Qusetion :"}),e.jsx("p",{children:c.question})]}),e.jsxs("div",{className:" mt-2",children:[e.jsx("p",{className:"mr-2 font-semibold font-serif",children:"Answer :"}),e.jsx(le,{readOnly:!0,value:c.answer,modules:{toolbar:!1},theme:"bubble",className:"quill"})]})]})]})})]})};export{me as default};
