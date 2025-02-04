import{r as o,s as W,j as t,b as i}from"./index-Bf0_iwmC.js";import{R as F}from"./quill.snow-N0L4fiYi.js";import{Q as Y,B as Z}from"./ReactToastify-C8h-yn_H.js";import"./clsx-B-dksMZM.js";const oe=()=>{const[b,g]=o.useState(""),[H,_]=o.useState(""),[x,f]=o.useState(""),[v,j]=o.useState(""),[N,y]=o.useState(""),[w,C]=o.useState(""),[c,u]=o.useState([]),[S,k]=o.useState(""),[A,P]=o.useState([]),[r,p]=o.useState([]),[L,R]=o.useState([]),[d,m]=o.useState([]),[h,D]=o.useState([]);W();const I=()=>{Z.success("Updated Successfully!")},q=async()=>{try{const s=await i.get("/api/pageHeading/heading?pageType=aboutcompany",{withCredentials:!0}),{heading:e,subheading:a}=s.data;g(e||""),f(a||"")}catch(s){console.error(s)}},U=async()=>{try{await i.put("/api/pageHeading/updateHeading?pageType=aboutcompany",{pagetype:"aboutcompany",heading:b,subheading:x},{withCredentials:!0}),I()}catch(s){console.error(s)}};o.useEffect(()=>{q()},[]);const z=s=>g(s.target.value),Q=s=>f(s.target.value),T={toolbar:[[{font:[]}],["bold","italic","underline","strike","blockquote"],[{header:[1,2,3,4,5,6,!1]}],[{list:"ordered"},{list:"bullet"},{list:"check"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],["link","image","video"],[{direction:"rtl"}],[{color:[]},{background:[]}],[{align:[]}],["clean"]],clipboard:{matchVisual:!1}},$=async()=>{try{const e=(await i.get("/api/aboutcompany/getAboutcompany",{withCredentials:!0})).data.data||{};j(e.title||""),y(e.description||""),C(e.longDescription||[]),P(e.photo||[]),k(e.status||"active"),m(e.alt||[]),D(e.imgtitle||[])}catch(s){console.error("Error fetching mission data:",s)}};o.useEffect(()=>{$()},[]);const V=async s=>{s.preventDefault();const e=new FormData;e.append("title",v),e.append("videoLink",H),e.append("description",N),e.append("longDescription",w),e.append("status",S);const a=[...d,...r],n=[...h,...L];c.forEach(l=>{e.append("photo",l)}),a.forEach(l=>{e.append("alt",l)}),n.forEach(l=>{e.append("imgtitle",l)});try{await i.put("/api/aboutcompany/updateAboutcompany",e,{withCredentials:!0}),I(),u([]),p([]),R([]),await $()}catch(l){console.error("Error updating mission:",l)}},X=s=>{const e=Array.from(s.target.files);u([...c,...e])},B=(s,e)=>{const a=[...d];a[e]=s.target.value,m(a)},O=(s,e)=>{const a=[...h];a[e]=s.target.value,D(a)},G=(s,e)=>{const a=[...r];a[e]=s.target.value,p(a)},J=(s,e)=>{s.preventDefault();const a=[...c];a.splice(e,1),u(a);const n=[...r];n.splice(e,1),p(n)},K=(s,e,a)=>{s.preventDefault(),i.delete(`/api/aboutcompany/image/${e}/${a}`,{withCredentials:!0}).then(n=>{const l=A.filter(M=>M!==e);P(l);const E=[...d];E.splice(a,1),m(E)}).catch(n=>{console.error(n)})};return t.jsxs("div",{children:[t.jsx(Y,{}),t.jsxs("div",{className:"mb-8 border border-gray-200 shadow-lg p-4 rounded m-4 ",children:[t.jsxs("div",{className:"grid grid-cols-2 gap-2 ",children:[t.jsxs("div",{className:"mb-6",children:[t.jsx("label",{className:"block text-gray-700 font-bold mb-2 uppercase font-serif",children:"Heading"}),t.jsx("input",{type:"text",value:b,onChange:z,className:"w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"})]}),t.jsxs("div",{className:"mb-6",children:[t.jsx("label",{className:"block text-gray-700 font-bold mb-2 uppercase font-serif",children:"Sub heading"}),t.jsx("input",{type:"text",value:x,onChange:Q,className:"w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"})]})]}),t.jsx("button",{onClick:U,className:"px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300",children:"Save"})]}),t.jsxs("form",{onSubmit:V,className:"p-4 overflow-x-auto",children:[t.jsx("h1",{className:"text-xl font-bold  text-gray-700 font-serif uppercase text-center",children:"About Company"}),t.jsxs("div",{className:"mb-4",children:[t.jsx("label",{htmlFor:"title",className:"block font-semibold mb-2",children:"Title"}),t.jsx("input",{type:"text",id:"title",value:v,onChange:s=>j(s.target.value),className:"w-full p-2 border rounded focus:outline-none",required:!0})]}),t.jsxs("div",{className:"mb-8",children:[t.jsx("label",{htmlFor:"details",className:"block font-semibold mb-2",children:"Description"}),t.jsx(F,{value:N,onChange:y,modules:T,className:"quill"})]}),t.jsxs("div",{className:"mb-8",children:[t.jsx("label",{htmlFor:"details",className:"block font-semibold mb-2",children:"Long  Description"}),t.jsx(F,{value:w,onChange:C,modules:T,className:"quill"})]}),t.jsxs("div",{className:"mb-4",children:[t.jsx("label",{className:"block font-semibold mb-2",children:"Current Photos"}),t.jsx("div",{className:"flex flex-wrap gap-4",children:A.map((s,e)=>t.jsxs("div",{className:"relative w-56",children:[t.jsx("img",{src:`/api/image/download/${s}`,alt:`Photo ${e+1}`,className:"w-56 h-32 object-cover"}),t.jsxs("label",{htmlFor:`alt-${e}`,className:"block mt-2",children:["Alternative Text :",t.jsx("input",{type:"text",id:`alt-${e}`,value:d[e],onChange:a=>B(a,e),className:"w-full p-2 border rounded focus:outline-none"})]}),t.jsxs("label",{htmlFor:`imgtitle-${e}`,className:"block mt-2",children:["Title Text :",t.jsx("input",{type:"text",id:`imgtitle-${e}`,value:h[e],onChange:a=>O(a,e),className:"w-full p-2 border rounded focus:outline-none"})]}),t.jsx("button",{onClick:a=>K(a,s,e),className:"absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 size-6 flex justify-center items-center",children:t.jsx("span",{className:"text-xs",children:"X"})})]},e))})]}),t.jsxs("div",{className:"mb-4",children:[t.jsx("label",{className:"block font-semibold mb-2",children:"Add New Photos"}),t.jsx("input",{type:"file",onChange:X,multiple:!0,accept:"image/*",className:"p-2 border rounded"}),t.jsx("div",{className:"flex flex-wrap gap-4 mt-4",children:c.map((s,e)=>t.jsxs("div",{className:"relative w-56",children:[t.jsx("img",{src:URL.createObjectURL(s),alt:`New Photo ${e+1}`,className:"w-56 h-32 object-cover"}),t.jsxs("label",{htmlFor:`alt-new-${e}`,className:"block mt-2",children:["Alternative Text :",t.jsx("input",{type:"text",id:`alt-new-${e}`,value:r[e]||"",onChange:a=>G(a,e),className:"w-full p-2 border rounded focus:outline-none"})]}),t.jsx("button",{onClick:a=>J(a,e),className:`absolute top-4 right-2 bg-red-500 text-white rounded-md p-1 size-6 flex\r
                justify-center items-center`,children:t.jsx("span",{className:"text-xs",children:"X"})})]},e))})]}),t.jsxs("div",{className:"mb-4",children:[t.jsx("label",{className:"block font-semibold mb-2",children:"Status"}),t.jsxs("select",{value:S,onChange:s=>k(s.target.value),className:"w-full p-2 border rounded focus:outline-none",children:[t.jsx("option",{value:"active",children:"Active"}),t.jsx("option",{value:"inactive",children:"Inactive"})]})]}),t.jsx("button",{type:"submit",className:"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300",children:"Save Changes"})]})]})};export{oe as default};
