if(!self.define){let e,i={};const s=(s,r)=>(s=new URL(s+".js",r).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(r,t)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(i[n])return;let o={};const p=e=>s(e,n),l={module:{uri:n},exports:o,require:p};i[n]=Promise.all(r.map((e=>l[e]||p(e)))).then((e=>(t(...e),o)))}}define(["./workbox-5b385ed2"],(function(e){"use strict";e.setCacheNameDetails({prefix:"ithkapp"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/ithkapp/apple-touch-icon.png",revision:"94d5475d6e0fc5ed045d28203dff6179"},{url:"/ithkapp/css/app.27f4566e.css",revision:null},{url:"/ithkapp/img/cursor.png",revision:"a3325af1781ba785a36407588173617b"},{url:"/ithkapp/index.html",revision:"c1b1480958a44ef2ce845465b79583f6"},{url:"/ithkapp/js/app.69b603cf.js",revision:null},{url:"/ithkapp/js/chunk-vendors.1aff1083.js",revision:null},{url:"/ithkapp/manifest.json",revision:"d286426445ef09fb73f50fd547d64795"},{url:"/ithkapp/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
