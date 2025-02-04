import{r as l,E,s as T,b as h,j as t}from"./index-Bf0_iwmC.js";import{R as F}from"./quill.snow-N0L4fiYi.js";const z=()=>{const[p,m]=l.useState(""),[b,f]=l.useState(""),[c,x]=l.useState([]),{id:u}=E(),[j,N]=l.useState([]),[d,v]=l.useState([]),[r,i]=l.useState([]),w=T();l.useEffect(()=>{P()},[]);const P=async()=>{try{const e=(await h.get(`/api/infrastructure/getInfrastructureById?id=${u}`,{withCredentials:!0})).data.data;m(e.title),f(e.description),N(e.photo),i(e.alt)}catch(s){console.error(s)}},y={toolbar:[[{font:[]}],["bold","italic","underline","strike","blockquote"],[{header:[1,2,3,4,5,6,!1]}],[{list:"ordered"},{list:"bullet"},{list:"check"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],["link","image","video"],[{direction:"rtl"}],[{color:[]},{background:[]}],[{align:[]}],["clean"]],clipboard:{matchVisual:!1}},C=async s=>{s.preventDefault();try{const e=new FormData;e.append("title",p),e.append("description",b);const a=[...r,...d];c.forEach(n=>{e.append("photo",n)}),a.forEach(n=>{e.append("alt",n)});const o=await h.put(`/api/infrastructure/updateInfrastructure?id=${u}`,e,{headers:{"Content-Type":"multipart/form-data"},withCredentials:!0});w("/infrastructure")}catch(e){console.error(e)}},A=s=>{const e=Array.from(s.target.files);x([...c,...e])},k=(s,e)=>{const a=[...r];a[e]=s.target.value,i(a)},$=(s,e)=>{const a=[...d];a[e]=s.target.value,v(a)},I=(s,e,a)=>{s.preventDefault(),h.delete(`/api/infrastructure/${u}/image/${e}/${a}`,{withCredentials:!0}).then(o=>{const n=j.filter(S=>S!==e);N(n);const g=[...r];g.splice(a,1),i(g)}).catch(o=>{console.error(o)})},D=(s,e)=>{s.preventDefault();const a=[...c];a.splice(e,1),x(a);const o=[...r];o.splice(e,1),i(o)};return t.jsxs("form",{onSubmit:C,className:"p-4",children:[t.jsx("h1",{className:"text-xl font-bold font-serif text-gray-700 uppercase text-center",children:"Edit Infrastructure"}),t.jsxs("div",{className:"mb-4",children:[t.jsx("label",{htmlFor:"title",className:"block font-semibold mb-2",children:"Title"}),t.jsx("input",{type:"text",id:"title",value:p,onChange:s=>m(s.target.value),className:"w-full p-2 border rounded focus:outline-none",required:!0})]}),t.jsxs("div",{className:"mb-4",children:[t.jsx("label",{htmlFor:"description",className:"block font-semibold mb-2",children:"Description"}),t.jsx(F,{value:b,onChange:f,modules:y,className:"quill"})]}),t.jsxs("div",{className:"mb-4",children:[t.jsx("label",{className:"block font-semibold mb-2",children:"Current Photos"}),t.jsx("div",{className:"flex flex-wrap gap-4",children:j.map((s,e)=>t.jsxs("div",{className:"relative w-56",children:[t.jsx("img",{src:`/api/infrastructure/download/${s}`,alt:`Photo ${e+1}`,className:"w-56 h-32 object-cover"}),t.jsxs("label",{htmlFor:`alt-${e}`,className:"block mt-2",children:["Alternative Text:",t.jsx("input",{type:"text",id:`alt-${e}`,value:r[e],onChange:a=>k(a,e),className:"w-full p-2 border rounded focus:outline-none"})]}),t.jsx("button",{onClick:a=>I(a,s,e),className:"absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 size-6 flex justify-center items-center",children:t.jsx("span",{className:"text-xs",children:"X"})})]},e))})]}),t.jsxs("div",{className:"mb-4",children:[t.jsx("label",{className:"block font-semibold mb-2",children:"Add New Photos"}),t.jsx("input",{type:"file",onChange:A,multiple:!0,accept:"image/*",className:"p-2 border rounded"}),t.jsx("div",{className:"flex gap-4 mt-4",children:c.map((s,e)=>t.jsxs("div",{className:"relative w-56",children:[t.jsx("img",{src:URL.createObjectURL(s),alt:`New Photo ${e+1}`,className:"w-56 h-32 object-cover"}),t.jsxs("label",{htmlFor:`alt-new-${e}`,className:"block mt-2",children:["Alternative Text :",t.jsx("input",{type:"text",id:`alt-new-${e}`,value:d[e]||"",onChange:a=>$(a,e),className:"w-full p-2 border rounded focus:outline-none"})]}),t.jsx("button",{onClick:a=>D(a,e),className:`absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 size-6 flex\r
                justify-center items-center`,children:t.jsx("span",{className:"text-xs",children:"X"})})]},e))})]}),t.jsx("div",{className:"mt-4",children:t.jsx("button",{type:"submit",className:"bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none",children:"Save Changes"})})]})};export{z as default};
