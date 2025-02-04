import{r as n,j as t,L as b,x as I,z as $,C as F,D as O,b as i}from"./index-Bf0_iwmC.js";import{r as C,U as J,l as K}from"./index-DPkFNSVF.js";const S=(g,w,p)=>{const m=[];let l=g.length+2;return w.forEach(c=>{m.push({id:l++,_id:c._id,url:c.url,priority:c.priority,changeFreq:c.changeFreq,lastmod:c.lastmod,type:p}),c.subCategories.forEach(o=>{m.push({id:l++,_id:o._id,url:o.url,priority:o.priority,changeFreq:o.changeFreq,lastmod:o.lastmod,type:p}),o.subSubCategory.forEach(h=>{m.push({id:l++,_id:h._id,url:h.url,priority:h.priority,changeFreq:h.changeFreq,lastmod:h.lastmod,type:p})})})}),m},W=()=>{const[g,w]=n.useState([]),[p,m]=n.useState([]),[l,c]=n.useState([]),[o,h]=n.useState([]),[x,N]=n.useState([]),[v,d]=n.useState(!0),[f,q]=n.useState(""),j=n.useMemo(()=>f?g.filter(e=>e.url.toLowerCase().includes(f.toLowerCase())):g,[g,f]),P=n.useMemo(()=>[{Header:"URL",accessor:"url"},{Header:"Priority",accessor:"priority"},{Header:"Change Frequency",accessor:"changeFreq"},{Header:"Last Modification",accessor:"lastmod"},{Header:"Options",Cell:({row:e})=>t.jsx("div",{className:"flex gap-4",children:t.jsx("button",{className:"text-blue-500 hover:text-blue-700 transition",children:t.jsx(b,{to:`/sitemap/editSitemap/${e.original._id}/${e.original.type}`,children:t.jsx(I,{})})})}),disableSortBy:!0}],[]),{getTableProps:D,getTableBodyProps:_,headerGroups:R,rows:U,prepareRow:E}=C.useTable({columns:P,data:j},C.useSortBy),H=async()=>{d(!0);try{const a=(await i.get("/api/sitemap/fetchUrlPriorityFreq",{withCredentials:!0})).data.map((s,u)=>({id:u+1,_id:s._id,url:s.url,priority:s.priority,changeFreq:s.changeFreq,lastmod:s.lastmod,type:"data"}));m([...a])}catch(e){console.error(e)}finally{d(!1)}},L=async()=>{d(!0);try{const[e,a]=await Promise.all([i.get("/api/product/fetchUrlPriorityFreq",{withCredentials:!0}),i.get("/api/product/fetchCategoryUrlPriorityFreq",{withCredentials:!0})]),s=e.data.map((r,y)=>({id:y+1,_id:r._id,url:r.url,priority:r.priority,changeFreq:r.changeFreq,lastmod:r.lastmod,type:"products"}));c(s);const u=S(l,a.data,"product-category");c([...s,...u])}catch(e){console.error(e)}finally{d(!1)}},T=async()=>{d(!0);try{const[e,a]=await Promise.all([i.get("/api/services/fetchUrlPriorityFreq",{withCredentials:!0}),i.get("/api/services/fetchCategoryUrlPriorityFreq",{withCredentials:!0})]),s=e.data.map((r,y)=>({id:y+1,_id:r._id,url:r.url,priority:r.priority,changeFreq:r.changeFreq,lastmod:r.lastmod,type:"service"})),u=S(o,a.data,"service-category");h([...s,...u])}catch(e){console.error(e)}finally{d(!1)}},M=async()=>{d(!0);try{const[e,a]=await Promise.all([i.get("/api/news/fetchUrlPriorityFreq",{withCredentials:!0}),i.get("/api/news/fetchCategoryUrlPriorityFreq",{withCredentials:!0})]),s=e.data.map((r,y)=>({id:y+1,_id:r._id,url:r.url,priority:r.priority,changeFreq:r.changeFreq,lastmod:r.lastmod,type:"new"})),u=S(x,a.data,"news-category");N([...s,...u])}catch(e){console.error(e)}finally{d(!1)}},k=async()=>{try{await i.post("/api/sitemap/generateproductsitemap",{productSitemaps:l},{withCredentials:!0}),alert("Sitemap generated successfully!")}catch(e){console.error(e),alert("Failed to generate sitemap.")}},G=async()=>{try{await i.post("/api/sitemap/generateservicesitemap",{serviceSitemaps:o},{withCredentials:!0}),alert("Sitemap generated successfully!")}catch(e){console.error(e),alert("Failed to generate sitemap.")}},A=async()=>{try{await i.post("/api/sitemap/generatenewssitemap",{newsSitemaps:x},{withCredentials:!0}),alert("Sitemap generated successfully!")}catch(e){console.error(e),alert("Failed to generate sitemap.")}},B=async()=>{try{await i.post("/api/sitemap/generatemainssitemap",{dataSitemaps:p},{withCredentials:!0}),alert("Sitemap generated successfully!")}catch(e){console.error(e),alert("Failed to generate sitemap.")}},z=async()=>{try{await i.post("/api/sitemap/generateSitemapIndex",{withCredentials:!0}),alert("Sitemap generated successfully!")}catch(e){console.error(e),alert("Failed to generate sitemap.")}};return n.useEffect(()=>{H(),L(),T(),M()},[]),n.useEffect(()=>{w([...p,...l,...o,...x])},[p,l,o,x]),t.jsxs("div",{className:"p-4 overflow-x-auto",children:[t.jsx("div",{className:"flex justify-between items-center mb-4",children:t.jsx("h1",{className:"text-xl font-bold  text-gray-700 font-serif uppercase",children:"Sitemaps"})}),t.jsx("div",{className:"mb-4",children:t.jsx("input",{type:"text",placeholder:"Search by URL...",value:f,onChange:e=>q(e.target.value),className:"w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 transition duration-300"})}),t.jsx("h2",{className:"text-md font-semibold mb-4",children:"Manage Sitemaps"}),t.jsxs("div",{className:"flex gap-4",children:[t.jsx("button",{className:"px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 transition duration-300",title:"Add",children:t.jsx(b,{to:"/sitemap/createSitemap",children:t.jsx($,{size:15})})}),t.jsx("button",{onClick:z,className:"bg-slate-700 text-white py-2 px-4 rounded",children:"Generate Sitemap"}),t.jsx("button",{onClick:B,className:"bg-slate-700 text-white py-2 px-4 rounded",children:"Generate Main Sitemap"}),t.jsx("button",{onClick:k,className:"bg-slate-700 text-white py-2 px-4 rounded",children:"Generate Product Sitemap"}),t.jsx("button",{onClick:G,className:"bg-slate-700 text-white py-2 px-4 rounded",children:"Generate Service Sitemap"}),t.jsx("button",{onClick:A,className:"bg-slate-700 text-white py-2 px-4 rounded",children:"Generate News Sitemap"})]}),v?t.jsx("div",{className:"flex justify-center",children:t.jsx(J,{animation:K,size:56})}):t.jsx(t.Fragment,{children:j.length===0?t.jsx("div",{className:"flex justify-center items-center",children:t.jsx("iframe",{className:"w-96 h-96",src:"https://lottie.host/embed/1ce6d411-765d-4361-93ca-55d98fefb13b/AonqR3e5vB.json"})}):t.jsxs("table",{className:"w-full mt-4 border-collapse",...D(),children:[t.jsx("thead",{className:"bg-slate-700 hover:bg-slate-800 text-white",children:R.map(e=>t.jsx("tr",{...e.getHeaderGroupProps(),children:e.headers.map(a=>t.jsx("th",{...a.getHeaderProps(a.getSortByToggleProps()),className:"py-2 px-4 border-b border-gray-300 cursor-pointer",children:t.jsxs("div",{className:"flex items-center uppercase font-serif gap-2",children:[t.jsx("span",{children:a.render("Header")}),a.canSort&&t.jsx("span",{className:"ml-1",children:a.isSorted?a.isSortedDesc?t.jsx(F,{}):t.jsx(O,{}):t.jsx(F,{className:"text-gray-400"})})]})}))}))}),t.jsx("tbody",{..._(),children:U.map(e=>(E(e),t.jsx("tr",{...e.getRowProps(),className:"hover:bg-gray-100 transition",children:e.cells.map(a=>t.jsx("td",{...a.getCellProps(),className:"py-2 px-4 border-b border-gray-300",children:a.render("Cell")}))})))})]})})]})};export{W as default};
