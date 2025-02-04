import{r,s as g,j as e,b as f}from"./index-Bf0_iwmC.js";const h=()=>{const[s,u]=r.useState(""),[a,i]=r.useState(""),[c,d]=r.useState(null),[o,b]=r.useState(""),l=g(),m=async t=>{t.preventDefault();const n=new FormData;n.append("title",s),n.append("subtitle",a),n.append("images",c),n.append("videoLink",o);try{await f.post("/api/banner1/create",n,{headers:{"Content-Type":"multipart/form-data"}}),alert("Content created successfully!"),l("/youtub-banner")}catch(p){console.error("Error creating content:",p),alert("Failed to create content.")}};return e.jsxs("div",{className:"container mx-auto mt-8",children:[e.jsx("h1",{className:"text-2xl font-bold mb-4",children:"Add New Content"}),e.jsxs("form",{onSubmit:m,className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block font-medium",children:"Title"}),e.jsx("input",{type:"text",value:s,onChange:t=>u(t.target.value),className:"w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200",required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block font-medium",children:"Subtitle"}),e.jsx("input",{type:"text",value:a,onChange:t=>i(t.target.value),className:"w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200",required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block font-medium",children:"Image"}),e.jsx("input",{type:"file",onChange:t=>d(t.target.files[0]),className:"w-full px-4 py-2 border border-gray-300 rounded focus:outline-none",accept:"image/*",required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block font-medium",children:"Video Link"}),e.jsx("input",{type:"url",value:o,onChange:t=>b(t.target.value),className:"w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200",required:!0})]}),e.jsxs("div",{children:[e.jsx("button",{type:"submit",className:"bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200",children:"Submit"}),e.jsx("button",{type:"button",onClick:()=>l("/content-list"),className:"ml-4 bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-200",children:"Cancel"})]})]})]})};export{h as default};
