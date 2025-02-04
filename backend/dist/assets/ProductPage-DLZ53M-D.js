import{r as a,s as O,b as M,j as s,L as H}from"./index-Bf0_iwmC.js";import{C as T,a as B,b as E,c as R}from"./Card-BIkNT0KS.js";import{B as f,C as z,a as G,b as U}from"./Collapsible-xmatBL6T.js";import{C as V}from"./chevron-down-BeKBAZkz.js";import{B as q}from"./Banner-DlDYYfzO.js";import{F as J}from"./Footer-Dif14Q2k.js";import"./clsx-B-dksMZM.js";import"./halfLogo-Cqwxa5To.js";const h=()=>s.jsx("div",{className:"animate-pulse",children:s.jsx("div",{className:"h-full w-full bg-gray-200 rounded"})});function K(){const[n,N]=a.useState(""),[o,p]=a.useState("All"),[c,g]=a.useState([]),[i,m]=a.useState([]),[b,v]=a.useState(1),[D,I]=a.useState(null),[u,C]=a.useState(!0),j=6,P=O(),k=a.useCallback(async()=>{try{const r=(await M.get("/api/product/getAllProducts")).data.data.reduce((l,d)=>{const w=d.categoryName||"Uncategorized";return l[w]||(l[w]={id:d.categories[0],products:[]}),l[w].products.push(d),l},{});g(Object.entries(r).map(([l,d])=>({name:l,id:d.id,products:d.products})))}catch(e){console.error("Error fetching product categories:",e)}},[]),S=a.useCallback(async()=>{C(!0);try{const e=o==="All"?"/api/product/getAllProductsByPriority":`/api/product/getProductsByCategories?categoryIds=${o}`,r=await(await fetch(e)).json();console.log(r);const l=Array.isArray(r)?r:r.data?r.data:[];m(l),v(1)}catch(e){console.error("Error fetching products:",e)}finally{C(!1)}},[o]);a.useEffect(()=>{k()},[k]),a.useEffect(()=>{S()},[S]);const x=a.useMemo(()=>i.filter(e=>{const t=o==="All"||e.categoryId===o||Array.isArray(e.categories),r=e.title.toLowerCase().includes(n.toLowerCase()),l=e.isVisible!==!1;return t&&r&&l}),[i,o,n]),L=a.useMemo(()=>{const e=b*j,t=e-j;return x.slice(t,e)},[x,b]),_=Math.ceil(x.length/j),A=a.useCallback((e,t)=>{P(`/${t}`)},[P]),$=a.useCallback(e=>{v(e),window.scrollTo({top:0,behavior:"smooth"})},[]),y=a.useCallback(e=>{p(e)},[]),F=a.useCallback(e=>{I(e)},[]);return s.jsxs("div",{className:"container mx-auto px-4 py-8",children:[s.jsxs("div",{className:"flex flex-col gap-2 overflow-x-auto md:hidden bg-[#1290ca]/20 p-4 rounded-lg",children:[s.jsx(f,{onClick:()=>y("All"),variant:o==="All"?"default":"outline",className:"flex-shrink-0 bg-white",children:"All"}),c.map(e=>s.jsx(f,{onClick:()=>y(e._id),variant:o===e._id?"default":"outline",className:"flex-shrink-0 bg-white text-black",children:e.category||e.name},e._id||e.name))]}),s.jsxs("div",{className:"flex flex-col md:flex-row gap-6",children:[s.jsxs("aside",{className:"hidden scrollbar-hide overflow-auto md:block xl:w-[20%] w-full md:w-1/4 bg-[#0d233f] p-5 rounded-none sticky top-[10%] h-screen",children:[s.jsx("h2",{className:"text-2xl font-bold text-[#ffffff] text-center mb-4",children:"Product Categories"}),s.jsx("div",{className:"space-y-3 mt-10",children:s.jsx("div",{className:"flex flex-col justify-center",children:u?Array(5).fill(0).map((e,t)=>s.jsx("div",{className:"my-3",children:s.jsx(h,{className:"h-12 w-full bg-gray-200"})},t)):c.length>0?c.map(e=>s.jsxs(z,{children:[s.jsxs(G,{className:"flex my-3 items-center justify-between w-full font-medium text-left text-gray-700 bg-white text-[16px] hover:bg-gray-100 rounded-md cursor-pointer shadow hover:shadow-lg hover:translate-y-[-3px] transform transition-all duration-300 shadow-[#0b0f14] hover:shadow-[#3a4b5f]",children:[s.jsx("div",{className:"flex-grow cursor-pointer",onClick:()=>y(e.id),children:e.category||e.name}),s.jsx("div",{className:"",children:s.jsx(V,{className:"h-6 w-4 mr-2"})})]}),s.jsx(U,{className:"mt-2 space-y-2",children:(e.products||[]).map(t=>s.jsx(H,{to:`/${t.slug}`,onClick:()=>F(t._id),children:s.jsx(f,{variant:"ghost",className:`w-full shadow hover:shadow-lg hover:translate-y-[-3px] transform transition-all duration-300 
                  shadow-[#0b0f14] hover:shadow-[#3a4b5f] justify-start text-[13px] hover:bg-white bg-gray-200 m-1 pl-4 
                  ${D===t._id?"bg-white":""}`,children:t.title})},t._id))})]},e._id||e.name)):s.jsx("p",{className:"text-white text-center",children:"No categories available"})})})]}),s.jsxs("main",{className:"flex-1 overflow-auto",children:[s.jsx("div",{className:"grid grid-cols-1 xl:m-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8",children:u?Array(6).fill(0).map((e,t)=>s.jsxs(T,{className:"mx-4",children:[s.jsx(B,{className:"p-0",children:s.jsx(h,{className:"aspect-[4/3] w-full"})}),s.jsxs(E,{className:"px-4 py-4",children:[s.jsx(h,{className:"h-6 w-3/4 mb-2"}),s.jsx(h,{className:"h-4 w-1/2 mb-2"}),s.jsx(h,{className:"h-20 w-full"})]})]},t)):L.map(e=>{var t;return s.jsxs(T,{className:"mx-4 flex flex-col transition-shadow duration-300 hover:shadow-lg hover:shadow-[#1290ca] shadow-[#1290ca]/20",children:[s.jsx(B,{className:"p-0",children:s.jsx("div",{onClick:()=>{var r;return A((r=c.find(l=>l._id===e.categories[0]))==null?void 0:r.category,e.slug)},className:"cursor-pointer aspect-[4/3] relative overflow-hidden",children:s.jsx("img",{src:`/api/image/download/${e.photo[0]||"default-image.jpg"}`,alt:e.title,className:"w-full h-full object-cover hover:scale-105 transition-transform duration-300"})})}),s.jsxs(E,{onClick:()=>{var r;return A((r=c.find(l=>l._id===e.categories[0]))==null?void 0:r.category,e.slug)},className:"flex-1 p-4 py-6 cursor-pointer",children:[s.jsx(R,{className:"text-lg sm:text-xl mb-2 line-clamp-2 hover:text-[#1290ca]",children:e.title}),s.jsx("p",{className:"text-sm text-gray-500 mb-3",children:(t=c.find(r=>r._id===e.categories[0]))==null?void 0:t.category}),s.jsx("div",{className:"text-gray-600 text-sm line-clamp-3",dangerouslySetInnerHTML:{__html:e.homeDetail}})]})]},e._id)})}),!u&&x.length===0&&s.jsx("p",{className:"text-center text-gray-500 mt-8",role:"alert",children:"No products found. Try a different search term or category."}),_>1&&!u&&s.jsx("div",{className:"flex justify-center gap-2 mt-8",children:Array.from({length:_},(e,t)=>s.jsx(f,{onClick:()=>$(t+1),className:`px-4 my-3 py-2 rounded-md text-sm transition-colors duration-300 ${b===t+1?"bg-[#1d84b4] text-black border border-[#0f3242]":"bg-black text-[#0f3242] hover:bg-[#f0f4f8] hover:text-[#1290ca] border border-[#d1d5db]"}`,children:t+1},t+1))})]})]})]})}const ae=()=>{const[n,N]=a.useState({backgroundImage:"",title:"",imgTitle:""}),[o,p]=a.useState(null);return a.useEffect(()=>{(async()=>{try{const i=(await M.get("/api/banner/getBannersBySection?section=Products")).data.banners;if(i&&i.length>0){const m=i[0];N({backgroundImage:`/api/image/download/${m.photo[0]}`,title:m.title,imgTitle:m.imgTitle})}}catch(g){console.error("Error fetching banner data:",g)}})()},[]),s.jsxs("div",{className:"pt-[4%]",children:[s.jsx(q,{backgroundImage:n.backgroundImage,title:n.title,imgTitle:n.imgTitle}),s.jsx(K,{filterParams:o,setFilterParams:p}),s.jsx(J,{})]})};export{ae as default};
