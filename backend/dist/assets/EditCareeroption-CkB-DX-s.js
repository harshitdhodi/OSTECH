import{r as l,E as O,s as U,b as m,j as t}from"./index-Bf0_iwmC.js";import{R as y}from"./quill.snow-N0L4fiYi.js";const Q=()=>{const[h,p]=l.useState(""),[b,x]=l.useState(""),[f,j]=l.useState(""),[v,g]=l.useState(""),[n,N]=l.useState([]),[w,C]=l.useState("active"),{id:d}=O(),[P,D]=l.useState([]),[i,k]=l.useState([]),[c,u]=l.useState([]),q=U(),A={toolbar:[[{font:[]}],["bold","italic","underline","strike","blockquote"],[{header:[1,2,3,4,5,6,!1]}],[{list:"ordered"},{list:"bullet"},{list:"check"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],["link","image","video"],[{direction:"rtl"}],[{color:[]},{background:[]}],[{align:[]}],["clean"]],clipboard:{matchVisual:!1}};l.useEffect(()=>{$()},[]);const $=async()=>{try{const e=(await m.get(`/api/careeroption/getCareeroptionById?id=${d}`,{withCredentials:!0})).data;p(e.title),x(e.requirement),j(e.shortDescription),g(e.longDescription),D(e.photo),C(e.status),u(e.alt)}catch(s){console.error(s)}},E=async s=>{s.preventDefault();try{const e=new FormData;e.append("title",h),e.append("requirement",b),e.append("shortDescription",f),e.append("longDescription",v),e.append("status",w);const a=[...c,...i];n.forEach(r=>{e.append("photo",r)}),a.forEach(r=>{e.append("alt",r)});const o=await m.put(`/api/careeroption/updateCareeroption?id=${d}`,e,{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0});q("/careeroption")}catch(e){console.error(e)}},F=s=>{const e=Array.from(s.target.files);N([...n,...e])},R=(s,e)=>{const a=[...c];a[e]=s.target.value,u(a)},T=(s,e)=>{const a=[...i];a[e]=s.target.value,k(a)},I=(s,e,a)=>{s.preventDefault(),m.delete(`/api/careeroption/${d}/image/${e}/${a}`,{withCredentials:!0}).then(o=>{const r=P.filter(z=>z!==e);D(r);const S=[...c];S.splice(a,1),u(S)}).catch(o=>{console.error(o)})},L=(s,e)=>{s.preventDefault();const a=[...n];a.splice(e,1),N(a);const o=[...i];o.splice(e,1),k(o)};return t.jsxs("form",{onSubmit:E,className:"p-4",children:[t.jsx("h1",{className:"text-xl font-bold font-serif text-gray-700 uppercase text-center",children:"Edit Career Option"}),t.jsxs("div",{className:"mb-4",children:[t.jsx("label",{htmlFor:"title",className:"block font-semibold mb-2",children:"Title"}),t.jsx("input",{type:"text",id:"title",value:h,onChange:s=>p(s.target.value),className:"w-full p-2 border rounded focus:outline-none",required:!0})]}),t.jsxs("div",{className:"mb-4",children:[t.jsx("label",{htmlFor:"requirement",className:"block font-semibold mb-2",children:"Requirement"}),t.jsx("textarea",{id:"requirement",value:b,onChange:s=>x(s.target.value),className:"w-full p-2 border rounded focus:outline-none",required:!0})]}),t.jsxs("div",{className:"mb-8",children:[t.jsx("label",{htmlFor:"details",className:"block font-semibold mb-2",children:"Short Description"}),t.jsx(y,{value:f,onChange:j,modules:A,className:"quill"})]}),t.jsxs("div",{className:"mb-8",children:[t.jsx("label",{htmlFor:"details",className:"block font-semibold mb-2",children:"Long Description"}),t.jsx(y,{value:v,onChange:g,modules:A,className:"quill"})]}),t.jsxs("div",{className:"mb-4",children:[t.jsx("label",{className:"block font-semibold mb-2",children:"Current Photos"}),t.jsx("div",{className:"flex flex-wrap gap-4",children:P.map((s,e)=>t.jsxs("div",{className:"relative w-56",children:[t.jsx("img",{src:`/api/image/download/${s}`,alt:`Photo ${e+1}`,className:"w-56 h-32 object-cover"}),t.jsxs("label",{htmlFor:`alt-${e}`,className:"block mt-2",children:["Alternative Text:",t.jsx("input",{type:"text",id:`alt-${e}`,value:c[e],onChange:a=>R(a,e),className:"w-full p-2 border rounded focus:outline-none"})]}),t.jsx("button",{onClick:a=>I(a,s,e),className:"absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 size-6 flex justify-center items-center",children:t.jsx("span",{className:"text-xs",children:"X"})})]},e))})]}),t.jsxs("div",{className:"mb-4",children:[t.jsx("label",{className:"block font-semibold mb-2",children:"Add New Photos"}),t.jsx("input",{type:"file",onChange:F,multiple:!0,accept:"image/*",className:"p-2 border rounded"}),t.jsx("div",{className:"flex flex-wrap gap-4 mt-4",children:n.map((s,e)=>t.jsxs("div",{className:"relative w-56",children:[t.jsx("img",{src:URL.createObjectURL(s),alt:`New Photo ${e+1}`,className:"w-56 h-32 object-cover"}),t.jsxs("label",{htmlFor:`alt-new-${e}`,className:"block mt-2",children:["Alternative Text:",t.jsx("input",{type:"text",id:`alt-new-${e}`,value:i[e]||"",onChange:a=>T(a,e),className:"w-full p-2 border rounded focus:outline-none"})]}),t.jsx("button",{onClick:a=>L(a,e),className:"absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 size-6 flex justify-center items-center",children:t.jsx("span",{className:"text-xs",children:"X"})})]},e))})]}),t.jsxs("div",{className:"mb-4",children:[t.jsx("label",{htmlFor:"status",className:"block font-semibold mb-2",children:"Status"}),t.jsxs("select",{id:"status",value:w,onChange:s=>C(s.target.value),className:"w-full p-2 border rounded focus:outline-none",children:[t.jsx("option",{value:"active",children:"Active"}),t.jsx("option",{value:"inactive",children:"Inactive"})]})]}),t.jsx("div",{className:"mt-4",children:t.jsx("button",{type:"submit",className:"bg-blue-500 text-white p-2 rounded hover:bg-blue-600",children:"Save"})})]})};export{Q as default};
