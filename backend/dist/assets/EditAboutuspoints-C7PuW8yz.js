import{E as f,s as j,r as a,j as t,b as d}from"./index-Bf0_iwmC.js";import{R as g}from"./quill.snow-N0L4fiYi.js";const k=()=>{const{id:i}=f(),b=j(),[r,o]=a.useState(""),[c,l]=a.useState(""),[u,n]=a.useState("active"),m={toolbar:[[{font:[]}],["bold","italic","underline","strike","blockquote"],[{header:[1,2,3,4,5,6,!1]}],[{list:"ordered"},{list:"bullet"},{list:"check"}],[{script:"sub"},{script:"super"}],[{indent:"-1"},{indent:"+1"}],["link","image","video"],[{direction:"rtl"}],[{color:[]},{background:[]}],[{align:[]}],["clean"]],clipboard:{matchVisual:!1}};a.useEffect(()=>{(async()=>{try{const e=await d.get(`/api/aboutusPoints/getPointsbyId?id=${i}`,{withCredentials:!0}),{title:h,description:x,status:v}=e.data;o(h),l(x),n(v)}catch(e){console.error(e)}})()},[i]);const p=async s=>{s.preventDefault();try{const e={title:r,description:c,status:u};await d.put(`/api/aboutusPoints/updatePoints?id=${i}`,e,{withCredentials:!0}),o(""),l(""),n("active"),b("/pageContent")}catch(e){console.error(e)}};return t.jsxs("form",{onSubmit:p,className:"p-4",children:[t.jsxs("div",{className:"mb-4",children:[t.jsx("label",{htmlFor:"title",className:"block font-semibold mb-2",children:"Title"}),t.jsx("input",{type:"text",id:"title",value:r,onChange:s=>o(s.target.value),className:"w-full p-2 border rounded focus:outline-none",required:!0})]}),t.jsxs("div",{className:"mb-8",children:[t.jsx("label",{htmlFor:"details",className:"block font-semibold mb-2",children:"Description"}),t.jsx(g,{value:c,onChange:l,modules:m,className:"quill"})]}),t.jsxs("div",{className:"mb-4",children:[t.jsx("label",{htmlFor:"status",className:"block font-semibold mb-2",children:"Status"}),t.jsxs("select",{id:"status",value:u,onChange:s=>n(s.target.value),className:"w-full p-2 border rounded focus:outline-none",children:[t.jsx("option",{value:"active",children:"Active"}),t.jsx("option",{value:"inactive",children:"Inactive"})]})]}),t.jsx("button",{type:"submit",className:"bg-blue-500 text-white py-2 px-4 rounded",children:"Update About Us Point"})]})};export{k as default};
