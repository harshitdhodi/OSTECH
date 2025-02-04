import{r as i,u as k,b as y,j as e,L as n,O as v}from"./index-Bf0_iwmC.js";import{c as b,l as N}from"./halfLogo-Cqwxa5To.js";/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=b("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=b("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),p="/assets/Ostech-DPRmJtip.svg",I=()=>{const[c,r]=i.useState(!1),[a,f]=i.useState(!1),[x,w]=i.useState([]),o=k();i.useEffect(()=>{y.get("/api/menulisting/getAllMenulisting").then(t=>{w(t.data.menuListings)}).catch(t=>{console.error("Error fetching menu items:",t)});const s=()=>{const t=window.scrollY/window.innerHeight*100;f(t>=20)};return window.addEventListener("scroll",s),()=>window.removeEventListener("scroll",s)},[]);const l=o.pathname==="/"||o.pathname==="/home",j=`w-full transition-all duration-300 ${a?"fixed top-0 shadow-lg bg-white":l?"absolute bg-transparent":"absolute bg-white"} z-50`,h=`transition-colors duration-300 font-medium ${a||!l?"text-black hover:text-gray-600":"sm:text-white hover:text-gray-200"}`,u="text-blue-400",m=`transition-colors duration-300 px-6 py-2 rounded-md ${a||!l?"bg-[#1290ca] text-white hover:bg-[#0b2b59]":"bg-white text-black hover:bg-gray-100"}`,d=()=>r(!1);return e.jsxs(e.Fragment,{children:[e.jsx("nav",{className:j,children:e.jsxs("div",{className:"max-w-8xl md:ml-4 mx-auto md:p-1 px-2 py-1 sm:p-5",children:[e.jsxs("div",{className:"flex justify-between items-center lg:gap-28 xl:justify-between md:justify-center w-full h-16 lg:h-20",children:[e.jsx("div",{className:"flex-shrink-0 flex items-center",children:e.jsx(n,{to:"/home",className:"flex items-center",children:l&&a?e.jsx("img",{src:p,alt:"Logo",width:"auto",height:"auto",className:"h-12 sm:h-14 lg:h-16 md:hidden block xl:block transition-all",style:{position:"relative",zIndex:10}}):l?e.jsx("img",{src:N,alt:"Logo2",className:"h-12 sm:h-14 lg:h-16 sm:mb-0 ml-5 md:hidden block xl:block transition-all",style:{position:"relative",zIndex:10}}):e.jsx("img",{src:p,alt:"Logo",className:"h-12 sm:h-14 lg:h-16 md:hidden xl:block transition-all",style:{position:"relative",zIndex:10}})})}),e.jsxs("div",{className:"hidden md:flex items-center mr-5 space-x-6",children:[x.map(s=>{const t=o.pathname===`/${s.pagename.toLowerCase().replace(/\s+/g,"-")}`;return e.jsx(n,{to:`/${s.pagename.toLowerCase().replace(/\s+/g,"-")}`,className:`${h} ${t?u:""} lg:text-[15px] md:text-[13px]  xl:text-lg`,children:s.pagename},s._id)}),e.jsx(n,{to:"/contact-us",className:m,children:"Inquiry"})]}),e.jsx("div",{className:"md:hidden flex items-center",children:e.jsx("button",{onClick:()=>r(!c),className:"focus:outline-none text-black",children:c?e.jsx(g,{className:"h-6 w-6"}):e.jsx(L,{className:`h-6 w-6 ${a?"text-black":l?"text-white":"text-black"}`})})})]}),c&&e.jsxs("div",{className:"md:hidden fixed inset-0 bg-white flex flex-col justify-center z-40",children:[e.jsx("button",{onClick:()=>r(!1),className:"absolute top-4 right-4 text-black focus:outline-none",children:e.jsx(g,{className:"h-6 w-6"})}),e.jsxs("div",{className:"w-full h-full flex flex-col items-center mt-20 space-y-4",children:[x.map(s=>{const t=o.pathname===`/${s.pagename.toLowerCase().replace(/\s+/g,"-")}`;return e.jsx(n,{to:`/${s.pagename.toLowerCase().replace(/\s+/g,"-")}`,className:`${h} ${t?u:""} `,onClick:d,children:s.pagename},s._id)}),e.jsx(n,{to:"/contact-us",className:m,onClick:d,children:e.jsx("p",{className:"font-medium",children:"Inquiry"})}),e.jsx("button",{className:m,onClick:()=>{window.open("/api/image/view/ostech.pdf","_blank"),d()},children:e.jsx("p",{className:"font-medium",children:"Catalogue"})})]})]})]})}),e.jsx(v,{})]})};export{I as default};
