import{r as a,E as P,s as S,b as x,j as e}from"./index-Bf0_iwmC.js";const k=()=>{const[n,l]=a.useState(""),[r,i]=a.useState(""),[c,u]=a.useState(null),[d,m]=a.useState(),[p,h]=a.useState(),[f,b]=a.useState([]),{id:g}=P(),j=S();a.useEffect(()=>{N()},[]);const y=t=>{u(t.target.files[0]),m(URL.createObjectURL(t.target.files[0]))},N=async()=>{try{const t=await x.get(`/api/menulisting/getMenulistingById?id=${g}`,{withCredentials:!0}),{count:s,menuListing:o}=t.data;if(l(o.pagename),i(o.alt),h(o.priority),u(o.photo),m(`/api/logo/download/${o.photo}`),s>0){const w=Array.from({length:s},(F,C)=>C+1);b(w)}else b([1])}catch(t){console.error(t)}},v=async t=>{t.preventDefault();try{const s=new FormData;s.append("pagename",n),s.append("alt",r),c&&s.append("photo",c),s.append("priority",p);const o=await x.put(`/api/menulisting/updateMenulisting?id=${g}`,s,{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0});j("/menulisting")}catch(s){console.error(s)}};return e.jsxs("form",{onSubmit:v,className:"p-4",children:[e.jsx("h1",{className:"text-xl font-bold font-serif text-gray-700 uppercase text-center",children:"Edit Menulisting"}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{htmlFor:"pagename",className:"block font-semibold mb-2",children:"Page Name"}),e.jsx("input",{type:"text",id:"pagename",value:n,onChange:t=>l(t.target.value),className:"w-full p-2 border rounded focus:outline-none"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{htmlFor:"alt",className:"block font-semibold mb-2",children:"Alternative Text"}),e.jsx("input",{type:"text",id:"alt",value:r,onChange:t=>i(t.target.value),className:"w-full p-2 border rounded focus:outline-none"})]}),d&&e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{className:"block font-semibold mb-2",children:"Current Photo"}),e.jsx("img",{src:d,alt:"Current",className:"w-56 h-32 object-cover"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{htmlFor:"photo",className:"block font-semibold mb-2",children:"Upload New Photo"}),e.jsx("input",{type:"file",id:"photo",onChange:y,accept:"photo/*",className:"w-full p-2 border rounded focus:outline-none"})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("label",{htmlFor:"priority",className:"block font-semibold mb-2",children:"Priority"}),e.jsx("select",{id:"priority",value:p,onChange:t=>h(Number(t.target.value)),className:"w-full p-2 border rounded focus:outline-none",children:f.map(t=>e.jsx("option",{value:t,children:t},t))})]}),e.jsx("button",{type:"submit",className:"bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none",children:"Save Changes"})]})};export{k as default};
