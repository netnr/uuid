(()=>{"use strict";var e,t,a,r,o,n={330(e){e.exports={rE:"8.0.22"}}},i={};function l(e){var t=i[e];if(void 0!==t)return t.exports;var a=i[e]={exports:{}};return n[e](a,a.exports,l),a.exports}if(l.m=n,l.d=(e,t)=>{for(var a in t)l.o(t,a)&&!l.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},l.f={},l.e=e=>Promise.all(Object.keys(l.f).reduce((t,a)=>(l.f[a](e,t),t),[])),l.u=e=>"chunks/"+e+"."+({6:"3e97f3b9af1366dd0e6f",230:"bff8d3bad2e787a68fd6",666:"78bf96d7c5e9886ab1b1"})[e]+".js",l.miniCssF=e=>"chunks/"+e+".31e47fd8fa8c0f313200.css",l.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||Function("return this")()}catch(e){if("object"==typeof window)return window}}(),l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},t="netnr:",l.l=(a,r,o,n)=>{if(e[a])return void e[a].push(r);if(void 0!==o)for(var i,s,c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var u=c[d];if(u.getAttribute("src")==a||u.getAttribute("data-webpack")==t+o){i=u;break}}i||(s=!0,(i=document.createElement("script")).charset="utf-8",l.nc&&i.setAttribute("nonce",l.nc),i.setAttribute("data-webpack",t+o),i.src=a),e[a]=[r];var p=(t,r)=>{i.onerror=i.onload=null,clearTimeout(h);var o=e[a];if(delete e[a],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach(e=>e(r)),t)return t(r)},h=setTimeout(p.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=p.bind(null,i.onerror),i.onload=p.bind(null,i.onload),s&&document.head.appendChild(i)},l.r=e=>{"u">typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.p="/","u">typeof document){var s={792:0};l.f.miniCss=(e,t)=>{if(s[e])t.push(s[e]);else 0!==s[e]&&({6:1})[e]&&t.push(s[e]=new Promise((t,a)=>{var r,o=l.miniCssF(e),n=l.p+o;if(((e,t)=>{for(var a=document.getElementsByTagName("link"),r=0;r<a.length;r++){var o=a[r],n=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(n===e||n===t))return o}for(var i=document.getElementsByTagName("style"),r=0;r<i.length;r++){var o=i[r],n=o.getAttribute("data-href");if(n===e||n===t)return o}})(o,n))return t();(r=document.createElement("link")).rel="stylesheet",r.type="text/css",l.nc&&(r.nonce=l.nc),r.onerror=r.onload=o=>{if(r.onerror=r.onload=null,"load"===o.type)t();else{var i=o&&o.type,l=o&&o.target&&o.target.href||n,s=Error("Loading CSS chunk "+e+` failed.
(`+i+": "+l+")");s.name="ChunkLoadError",s.code="CSS_CHUNK_LOAD_FAILED",s.type=i,s.request=l,r.parentNode&&r.parentNode.removeChild(r),a(s)}},r.href=n,document.head.appendChild(r)}).then(()=>{s[e]=0},t=>{throw delete s[e],t}))}}a={792:0},l.f.j=(e,t)=>{var r=l.o(a,e)?a[e]:void 0;if(0!==r)if(r)t.push(r[2]);else{var o=new Promise((t,o)=>r=a[e]=[t,o]);t.push(r[2]=o);var n=l.p+l.u(e),i=Error();l.l(n,t=>{if(l.o(a,e)&&(0!==(r=a[e])&&(a[e]=void 0),r)){var o=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src;i.message="Loading chunk "+e+` failed.
(`+o+": "+n+")",i.name="ChunkLoadError",i.type=o,i.request=n,r[1](i)}},"chunk-"+e,e)}},r=(e,t)=>{var r,o,[n,i,s]=t,c=0;if(n.some(e=>0!==a[e])){for(r in i)l.o(i,r)&&(l.m[r]=i[r]);s&&s(l)}for(e&&e(t);c<n.length;c++)o=n[c],l.o(a,o)&&a[o]&&a[o][0](),a[o]=0},(o=self.webpackChunknetnr=self.webpackChunknetnr||[]).forEach(r.bind(null,0)),o.push=r.bind(null,o.push.bind(o));let c={_abortController:null,init:(e,t,a=document)=>{c.destroy(),c._abortController=new AbortController;var r=c._abortController.signal;a.addEventListener("dragover",e=>{t&&t.contains(e.target)||(e.preventDefault(),e.stopPropagation())},{signal:r}),a.addEventListener("drop",async a=>{if(!(t&&t.contains(a.target))){a.preventDefault();let t=await c.readDataTransferItems(a.dataTransfer.items);t.length&&await e(t,"drag")}},{signal:r}),t&&t.addEventListener("change",async function(){let t=this.files;t.length&&await e(t,"change")},{signal:r}),document.addEventListener("paste",async function(t){if(!["INPUT","TEXTAREA"].includes(t.target.nodeName)){let a=t.clipboardData.items,r=[];for(let e=0;e<a.length;e++){let t=a[e].getAsFile();t&&r.push(t)}r.length&&await e(r,"paste")}},{signal:r})},destroy:()=>{c._abortController&&(c._abortController.abort(),c._abortController=null)},readDataTransferItems:async e=>{let t=[],a=[];for(let r=0;r<e.length;r++){let o=e[r],n=o.webkitGetAsEntry();if(null!=n)t.push(c.readDataTransferItemEntry(n));else{let e=o.getAsFile();e&&a.push(e)}}return(await Promise.all(t)).forEach(e=>{e.length?a=a.concat(e):a.push(e)}),a},readDataTransferItemEntry:(e,t)=>new Promise(a=>{t=t||"",e.isFile?e.file(e=>{""!=t&&(e.fullPath=t+e.name),a(e)}):e.isDirectory&&e.createReader().readEntries(r=>{let o=[];for(let a=0;a<r.length;a++)o.push(c.readDataTransferItemEntry(r[a],t+e.name+"/"));Promise.all(o).then(e=>{let t=[];e.forEach(e=>{e.length?t=t.concat(e):t.push(e)}),a(t)})})}),invokeCanvasToBlob:(e,t,a)=>new Promise(r=>{e.toBlob(e=>{r(e)},t,a)}),invokeImageOnload:(e,t)=>new Promise(a=>{e.onload=()=>a(e),e.src=t}),reader:(e,t="Text",a="utf-8")=>new Promise((r,o)=>{let n=new FileReader;n.onloadend=()=>r(n.result),n.onerror=()=>o(),"Text"==t?n.readAsText(e,a):n[`readAs${t}`](e)})};Object.assign(window,{nrcFile:c});let d={version:l(330).rE,lastFetchDate:null,cookie:function(e,t,a){if(1==arguments.length){let t=document.cookie.match(RegExp("(^| )"+e+"=([^;]*)(;|$)"));return null!=t?t[2]:null}{let r=`${e}=${t};Path=/`;if(a){let e=new Date;e.setTime(e.getTime()+a),r=`${r};Expires=${e.toGMTString()}`}document.cookie=r}},isDark:()=>document.cookie.includes(".theme=dark"),saveTheme:e=>{let t=new Date;t.setFullYear(t.getFullYear()+1),document.cookie=`.theme=${e};Path=/;Expires=${t.toGMTString()}`},isNullOrWhiteSpace:e=>null==e||""==e.toString().trim(),getFileNameWithoutExtension:e=>{var t=e.split(".");return t.length>1&&t.pop(),t.join(".")},UUID:()=>window.crypto&&window.crypto.randomUUID?crypto.randomUUID():URL.createObjectURL(new Blob([])).split("/").pop(),random:(e=99999,t=0)=>Math.floor(Math.random()*(e-t+1)+t),addSeconds:(e,t)=>(e.setSeconds(e.getSeconds()+t),e),addMinutes:(e,t)=>(e.setMinutes(e.getMinutes()+t),e),addHours:(e,t)=>(e.setHours(e.getHours()+t),e),addDays:(e,t)=>(e.setDate(e.getDate()+t),e),addMonths:(e,t)=>(e.setMonth(e.getMonth()+t),e),addYears:(e,t)=>(e.setFullYear(e.getFullYear()+t),e),type:function(e){return({}).toString.call(e).split(" ")[1].replace("]","")},clone:e=>window.structuredClone?window.structuredClone(e):JSON.parse(JSON.stringify(e)),sleep:e=>new Promise(t=>setTimeout(()=>t(),e||1e3)),trimStart:(e,t)=>{for(e=e.toString().trim();e.startsWith(t);)e=e.substring(t.length);return e},trimEnd:(e,t)=>{for(e=e.toString().trim();e.endsWith(t);)e=e.substring(0,e.length-t.length);return e},error:()=>{throw Error("Fake Error")},dispatchEvent:(e,t)=>e.dispatchEvent(new Event(t)),cssvar:(e,t,a)=>{if(null==a)return getComputedStyle(e).getPropertyValue(t);e.style.setProperty(t,a)},xssOf:e=>{let t=window.DOMPurify;return t?t.sanitize(e,{ADD_ATTR:["password-toggle","clearable","variant","target"]}):(console.debug("DOMPurify not found"),e)},htmlOf:e=>String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/"/g,"&#x27;").replace(/\//g,"&#x2F;"),htmlEncode:e=>e.replace(/[\u00A0-\u9999<>\&]/g,e=>"&#"+e.charCodeAt(0)+";"),htmlDecode:e=>{let t=document.createElement("div");return t.innerHTML=e,t.innerText},arrayDistinct:e=>Array.from(new Set(e)),groupBy:(e,t)=>Array.from(new Set(e.map(t))),isDanger:e=>/[^a-zA-Z0-9_]+/.test(e),dangerReplace:e=>e.replace(/[^a-zA-Z0-9_]+/g,""),escapeMarkdown:e=>null==e?"":`${e}`.replace(/[\*\_\[\]\#\+\-\!\`\|]/g,"\\$&").replace(/\n/g,"<br>").replace(/\r/g,""),isRiskFile:e=>{let t=!1;if(d.isNullOrWhiteSpace(e)||e.length>250||e.endsWith("."))t=!0;else{let a=e.split("."),r=a.length>1?a.pop().toLowerCase():"";r.length>10?t=!0:r.length>1&&"exe,msi,bat,sh,php,php3,asa,asp,aspx,css,htm,html,mhtml,js,jse,jsp,jspx,dll,so,jar,war,ear,ps1,psm1,pl,pm,py,pyc,pyo,rb".includes(r)&&(t=!0)}return t},byteLength:(e,t,a=" ...")=>{let r=e=>Array.from(e).reduce((e,t)=>e+(t.charCodeAt(0)>255?2:1),0);if(null==t)return r(e);if(r(e)<=t)return e;let o=t-(a?r(a):0);if(o<=0)return o<0?"":a;let n="",i=0;for(let t of e){let e=t.charCodeAt(0)>255?2:1;if(i+e>o)break;n+=t,i+=e}return n+(a||"")},fromCommaToArray:e=>null==e||""==e.trim()?[]:e.split(","),fromKeyToURLParams:e=>{if("Object"==d.type(e))for(let t in e)(null===e[t]||void 0===e[t])&&(e[t]="");return new URLSearchParams(e).toString()},fromFormToKey:e=>Object.fromEntries(d.fromFormToFormData(e)),fromFormToFormData:e=>{let t=new FormData(e);return e.querySelectorAll("sl-select, sl-input").forEach(e=>{e.name&&("sl-select"===e.tagName.toLowerCase()&&e.hasAttribute("multiple")?t.set(e.name,Array.isArray(e.value)?e.value.join(","):e.value||""):t.set(e.name,e.value||""))}),t},fromKeyToFormData:e=>{let t=new FormData;for(let a in e)null!==e[a]&&t.append(a,e[a]);return t},getUrlParams:(e,t)=>new URLSearchParams(t||location.search).get(e),findParentElement:(e,t)=>{let a=e;for(;null!=a;){if(t(a))return a;a=a.parentElement}return null},readDOM:(e,t,a,r)=>{e.querySelectorAll("*").forEach(e=>{if(e.classList.value.startsWith(t)){let o="dom";e.classList[0].substring(t.length+1).split("-").forEach(e=>o+=e.substring(0,1).toUpperCase()+e.substring(1)),!0!=r&&o in a||(a[o]=e)}})},editDOM:e=>{e.setAttribute("contenteditable",!0),e.setAttribute("spellcheck",!1)},parserDOM:(e,t)=>(t=t||"text/html",new DOMParser().parseFromString(e,t)),fetch:async(e,t)=>{let a={resp:null,result:null,error:null};try{t=t||{method:"GET",Cache:"no-cache"};let r=await fetch(e,t);a.resp=r;try{switch(d.lastFetchDate=r.headers.get("date"),null!=d.lastFetchDate&&(d.lastFetchDate=d.formatDateTime("datetime",d.lastFetchDate)),t.type){case"text":a.result=await r.text();break;case"blob":a.result=await r.blob();break;case"buffer":a.result=await r.arrayBuffer();break;case"reader":a.result=r.body.getReader();break;default:a.result=await r.json()}}catch(e){if(r.ok)throw e}}catch(e){a.error=e}return a},tsLoaded:{},importArray:async e=>{let t=[],a={};for(let r=0;r<e.length;r++){let o=e[r];"Promise"==d.type(o)?t.push(o):(t.push(o.promise),a[r]=o.name)}let r=await Promise.all(t);for(let e in a){let t=r[e];"default"in t&&(t=t.default),Object.assign(window,{[a[e]]:t})}return r},importStyle:async e=>{e=d.mirrorNPM(e);let t=d.tsLoaded[e];return t||(d.tsLoaded[e]=t=new Promise(t=>{let a=!1;if(document.querySelectorAll("link").forEach(t=>{t.href&&t.href.includes(e)&&(a=!0)}),a)t();else{let a=document.createElement("LINK");a.href=e,a.rel="stylesheet","onload"in a?a.onload=()=>{t()}:t(),document.head.appendChild(a)}})),t},importScript:async(e,t)=>{e=d.mirrorNPM(e);let a=d.tsLoaded[e];return a||(d.tsLoaded[e]=a=new Promise((a,r)=>{let o,n=document.scripts;for(let t=0;t<n.length;t++){let a=n[t];if(a.src.includes(e)){o=a;break}}if(o)a();else{let o=document.createElement("SCRIPT");o.src=e,o.type=t||"text/javascript",o.onerror=function(e){r(e)},o.onload=function(){a()},document.head.appendChild(o)}})),a},require:(e,t)=>new Promise(a=>{if(t in d.tsLoaded)a();else{let r=t.split(",");e=e.map(e=>d.mirrorNPM(e)),window.require(e,function(){for(let e=0;e<arguments.length;e++)Object.assign(window,{[r[e].trim()]:arguments[e]});d.tsLoaded[t]=!0,a()})}}),mirrorNPM:e=>{let t=/(https?:\/\/[\w.-]+)\/(.*)@([\d.]+)\/(.*)\.(\w+)/.exec(e);return null!=t&&(e=`https://netnr.eu.org/${t[2]}@${t[3]}/${t[4]}.${t[5]}`),e},tsBottomKeepHeight:40,setHeightFromBottom:(e,t)=>{let a=null==t?d.tsBottomKeepHeight:t,r=e.getBoundingClientRect().top+a;Object.assign(e.style,{height:`calc(100vh - ${r}px)`,minHeight:"200px"})},formatByteSize:function(e,t=2,a=1024){if(null==e||isNaN(e))return e;if(Math.abs(e)<a)return e+" B";let r=1e3==a?["KB","MB","GB","TB","PB","EB","ZB","YB"]:["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],o=-1,n=10**t;do e/=a,++o;while(Math.round(Math.abs(e)*n)/n>=a&&o<r.length-1)return(+e.toFixed(t)).toString()+r[o]},formatDateTime:(e,t)=>{switch(d.type(t)){case"String":case"Number":{let e=new Date(t);isNaN(e)?t.includes("年")&&t.includes("月")&&t.includes("日")&&(e=new Date(t.replace(/年|月/g,"-").replace("日",""))):10==t.length&&e.setHours(0,0,0,0),t=e}break;case"Date":break;default:t=new Date}switch(e=e||"yyyy-MM-dd HH:mm:ss"){case"date":e="yyyy-MM-dd";break;case"time":e="HH:mm:ss";break;case"datetime":e="yyyy-MM-dd HH:mm:ss";break;case"datetime-local":e="yyyy-MM-ddTHH:mm"}return[["yyyy",t.getFullYear()],["MM",t.getMonth()+1],["dd",t.getDate()],["HH",t.getHours()],["mm",t.getMinutes()],["ss",t.getSeconds()],["fff",t.getMilliseconds()]].reduce((e,t)=>e.replace(t[0],`${t[1]}`.padStart(t[0].length,"0")),e)},now:()=>d.formatDateTime("datetime"),downloadBlob:function(e,t){let a=window.URL.createObjectURL(e);d.downloadUrl(a,t)},downloadCanvas:function(e,t,a,r){let o;if(null==a){let e=t.split(".").pop().toLowerCase();"jpg"==e&&(e="jpeg"),a=`image/${e}`}o="image/png"==a?e.toDataURL(a):e.toDataURL(a,r),d.downloadUrl(o,t)},downloadText:function(e,t,a){let r=new Blob([e],{type:a||"text/plain"}),o=window.URL.createObjectURL(r);d.downloadUrl(o,t)},downloadUrl:function(e,t){let a=document.createElement("a");a.href=e,a.download=t,document.body.appendChild(a),a.click(),document.body.removeChild(a)},performance:()=>{if(window.performance){for(let e of window.performance.getEntries())if("PerformanceNavigationTiming"==d.type(e)){console.debug(e);break}}},voice:function(e){if(console.debug(e),"function"==typeof SpeechSynthesisUtterance){let t=new SpeechSynthesisUtterance(e);t.lang="zh-CN",window.speechSynthesis.speak(t)}},notify:async e=>{if("granted"==await Notification.requestPermission())return new Notification(e.title||"消息",e);console.debug(e)},cyrb53:(e,t=0)=>{let a=0xdeadbeef^t,r=0x41c6ce57^t;for(let t=0,o;t<e.length;t++)a=Math.imul(a^(o=e.charCodeAt(t)),0x9e3779b1),r=Math.imul(r^o,0x5f356495);return a=Math.imul(a^a>>>16,0x85ebca6b)^Math.imul(r^r>>>13,0xc2b2ae35),(0x100000000*(2097151&(r=Math.imul(r^r>>>16,0x85ebca6b)^Math.imul(a^a>>>13,0xc2b2ae35)))+(a>>>0)).toString(36).slice(0,6)},clipboard:async e=>{if(navigator.clipboard)return null==e?await navigator.clipboard.readText():await navigator.clipboard.writeText(e);if(null==e)return"不支持 unsupported";{let t=document.createElement("textarea");return t.value=e,t.style.position="fixed",t.style.opacity=0,document.body.appendChild(t),t.select(),window.document.execCommand("Copy"),t.remove(),e}}};Object.assign(window,{nrcBase:d});class u{constructor(e={}){this.db=null,this.name=e.name||"localforage",this.storeName=e.storeName||"keyvaluepairs",this.version=e.version||2}init(){return new Promise((e,t)=>{if(this.db)return void e(this);let a=window.indexedDB.open(this.name,this.version);a.onerror=()=>{t(a.error)},a.onupgradeneeded=()=>{let e=a.result;e.objectStoreNames.contains(this.storeName)||e.createObjectStore(this.storeName)},a.onsuccess=()=>{this.db=a.result,e(this)}})}_performTransaction(e,t){return new Promise((a,r)=>{let o=this.db.transaction(this.storeName,e),n=o.objectStore(this.storeName);o.oncomplete=()=>{a()},o.onerror=e=>{r(e.target.error)},t(n,a,r)})}setItem(e,t){return this._performTransaction("readwrite",(a,r,o)=>{let n=a.put(t,e);n.onsuccess=()=>{r()},n.onerror=()=>{o(n.error)}})}getItem(e){return this._performTransaction("readonly",(t,a,r)=>{let o=t.get(e);o.onsuccess=()=>{a(o.result)},o.onerror=()=>{r(o.error)}})}removeItem(e){return this._performTransaction("readwrite",(t,a,r)=>{let o=t.delete(e);o.onsuccess=()=>{a()},o.onerror=()=>{r(o.error)}})}keys(){return this._performTransaction("readonly",(e,t,a)=>{let r=e.getAllKeys();r.onsuccess=()=>{t(r.result)},r.onerror=()=>{a(r.error)}})}clear(){return this._performTransaction("readwrite",(e,t,a)=>{let r=e.clear();r.onsuccess=()=>{t()},r.onerror=()=>{a(r.error)}})}}Object.assign(window,{nrcIndexedDB:u});let p={init:async()=>{null==p.localforage&&(p.localforage=await new u().init())},localforage:null,getItem:async e=>await p.localforage.getItem(e),setItem:async(e,t)=>await p.localforage.setItem(e,t),removeItem:async e=>await p.localforage.removeItem(e),keys:async()=>await p.localforage.keys(),clear:async()=>await p.localforage.clear(),setCache:async(e,t,a)=>{let r={data:t,flag:a,time:new Date().toLocaleString().split(" ").map(e=>e.split("/").map(e=>e.padStart(2,"0")).join("-")).join(" ")};await p.localforage.setItem(e,r)},getCache:async(e,t)=>{let a=await p.localforage.getItem(e);if(a){if("function"==typeof t?t(a.flag):a.flag==t)return a.data;await p.localforage.removeItem(e)}}};Object.assign(window,{nrcStorage:p});let h={init:async()=>{Element.prototype.getAnimations||(Element.prototype.getAnimations=function(){return[]}),Object.hasOwn||(Object.hasOwn=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}),Object.defineProperty(Array.prototype,"gap",{configurable:!0,writable:!0,enumerable:!1,value:function(e){if(this.length<=1)return[...this];let t=[],a=this.length;for(let r=0;r<a;r++)if(t.push(this[r]),r<a-1){let a="function"==typeof e?e(r,this[r],this[r+1]):e;t.push(a)}return t}}),"function"!=typeof Element.prototype.replaceChildren&&Object.defineProperty(Element.prototype,"replaceChildren",{configurable:!0,writable:!0,value:function(...e){for(;this.firstChild;)this.removeChild(this.firstChild);this.append(...e)}}),Array.prototype.at||Object.defineProperty(Array.prototype,"at",{value:function(e){if(e<0&&(e+=this.length),!(e<0)&&!(e>=this.length))return this[e]},writable:!0,enumerable:!1,configurable:!0}),String.prototype.replaceAll||Object.defineProperty(String.prototype,"replaceAll",{value:function(e,t){if("string"==typeof e)return this.split(e).join(t);if(e instanceof RegExp){if(!e.global)throw TypeError("replaceAll ERROR");return this.replace(e,t)}throw TypeError("replaceAll ERROR")},writable:!0,enumerable:!1,configurable:!0}),window.structuredClone||(window.structuredClone=e=>JSON.parse(JSON.stringify(e))),h.weakRef()},weakRef:()=>{var e;"object"==typeof(e=function(){switch(!0){case"object"==typeof globalThis&&!!globalThis:return globalThis;case"object"==typeof self&&!!self:return self;case"object"==typeof window&&!!window:return window;case"object"==typeof l.g&&!!l.g:return l.g;case"function"==typeof Function:return Function("return this")()}return null}())&&e&&void 0===e.WeakRef&&(e.WeakRef=function(e){function t(t){e.set(this,t)}return t.prototype.deref=function(){return e.get(this)},t}(new WeakMap))},supportStyle:(e,t)=>{var a=document.createElement("div");return a.style[e]=t,a.style.cssText.includes(e)},compressionStream:async()=>{window.CompressionStream||await l.e(230).then(l.bind(l,230))}};Object.assign(window,{nrcPolyfill:h});let m={flagName:"netnr",flagResp:"uuid",flagLibs:"libs",flagSuffix:".md",flagToken:null,flagLocalUsed:!0,flagLocalPath:"/libs/index.json",flagLocalJson:null,flagProxyServer:"https://api.codetabs.com/v1/proxy?quest=",flagProxyUsed:!1,flagTitle:document.title,currentTheme:"light",domLayout:null,domAvatar:null,domUserInfo:null,domSearchInput:null,domSearchDropdown:null,domCardsContainer:null,domSettingsPanel:null,domThemeToggle:null};Object.assign(window,{nrVary:m});let g={init:async()=>{isSecureContext&&!window.webpackHotUpdatenetnr&&navigator.serviceWorker.register("/sw.js").then(e=>console.debug("SW registered: ",e)).catch(e=>console.debug("SW failed: ",e)),await h.init(),g.initTheme(),await l.e(6).then(l.bind(l,6)),p.localforage=await new u({name:"nr-cache"}).init(),p.instanceUser=await new u({name:"nr-user"}).init(),await g.render(),g.bindEvent();let e=(location.hash.length>1?location.hash:location.pathname).substring(1).split("/");if(""!=e[0]&&(m.flagName=e[0]),null!=e[1]&&""!=e[1]&&(m.flagResp=e[1]),null!=e[2]&&""!=e[2]&&(m.flagLibs=e[2]),"#_local"==location.hash)m.flagLocalUsed=!0,await p.setItem("local",m.flagLocalUsed);else{let e=await p.getItem("local");null!=e&&(m.flagLocalUsed=e)}if(m.flagLocalUsed){let e=document.querySelector('[data-action="local"] .uuid-toggle-switch');e&&e.classList.add("active")}let t=await p.getItem("uuid-token-github");null!=t&&t.length>10&&(m.flagToken=t);let a=await p.getItem("proxy");if(null!=a&&(m.flagProxyUsed=a),m.flagProxyUsed){let e=document.querySelector('[data-action="proxy"] .uuid-toggle-switch');e&&e.classList.add("active")}document.getElementById("style0").remove(),m.domLayout.classList.remove("invisible"),await g.load()},initTheme:()=>{let e=d.cookie(".theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches;g.setTheme(e||(t?"dark":"light"))},setTheme:e=>{document.documentElement.setAttribute("data-theme",e),d.saveTheme(e),m.currentTheme=e},toggleTheme:()=>{let e="light"===m.currentTheme?"dark":"light";g.setTheme(e)},toggleDropdown:(e,t)=>{void 0===t&&(t=!e.classList.contains("show")),t?e.classList.add("show"):e.classList.remove("show")},createModal:(e,t,a=[])=>{let r=document.createElement("div");r.className="uuid-modal";let o=a.map(e=>`<button class="uuid-btn ${e.class||""}" data-action="${e.action||""}">${e.text}</button>`).join("");return r.innerHTML=`
            <div class="uuid-modal-content">
                <div class="uuid-modal-header">
                    <h3 class="uuid-modal-title">${e}</h3>
                    <button class="uuid-modal-close" data-action="close-modal">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="uuid-modal-body">
                    ${t}
                </div>
                ${a.length?`<div class="uuid-modal-footer">${o}</div>`:""}
            </div>
        `,document.body.appendChild(r),r.addEventListener("click",e=>{(e.target===r||e.target.closest('[data-action="close-modal"]'))&&g.closeModal(r)}),setTimeout(()=>r.classList.add("show"),10),r},closeModal:e=>{e.classList.remove("show"),setTimeout(()=>e.remove(),300)},showNotification:(e,t="info",a=3e3)=>{let r=document.createElement("div");r.className=`uuid-notification uuid-notification-${t}`,r.textContent=e,Object.assign(r.style,{position:"fixed",top:"20px",right:"20px",padding:"12px 16px",borderRadius:"8px",color:"white",fontSize:"14px",zIndex:"3000",opacity:"0",transform:"translateX(100%)",transition:"all 0.3s ease"});let o={info:"#17a2b8",success:"#28a745",warning:"#ffc107",error:"#dc3545"};r.style.backgroundColor=o[t]||o.info,document.body.appendChild(r),setTimeout(()=>{r.style.opacity="1",r.style.transform="translateX(0)"},10),setTimeout(()=>{r.style.opacity="0",r.style.transform="translateX(100%)",setTimeout(()=>r.remove(),300)},a)},render:async()=>{let e=document.createElement("div");m.domLayout=e,e.className="invisible",e.innerHTML=`
<div class="uuid-container">
    <!-- Header -->
    <header class="uuid-header">
        <div class="uuid-header-content">
            <!-- User Avatar and Info -->
            <div class="uuid-user-section">
                <div class="uuid-avatar-wrapper" data-action="toggle-user-info">
                    <img class="uuid-avatar" src="/favicon.ico" alt="User Avatar">
                </div>
                <div class="uuid-user-info-panel">
                    <!-- User info will be populated here -->
                </div>
            </div>

            <!-- Search Section -->
            <div class="uuid-search-section">
                <div class="uuid-search-wrapper">
                    <input class="uuid-search-input" type="search" placeholder="静默搜索 (Ctrl+K)..." data-search="" />
                    <div class="uuid-search-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                    </div>
                </div>
                <div class="uuid-search-dropdown">
                    <!-- Search results will be populated here -->
                </div>
            </div>

            <!-- Controls Section -->
            <div class="uuid-controls-section">
                <button class="uuid-btn uuid-btn-icon" data-action="reload" title="重新加载">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="23 4 23 10 17 10"></polyline>
                        <polyline points="1 20 1 14 7 14"></polyline>
                        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M22.66 14.36A9 9 0 0 1 8.51 21.64L3 17"></path>
                    </svg>
                </button>
                
                <div class="uuid-settings-dropdown">
                    <button class="uuid-btn uuid-btn-icon" data-action="toggle-settings" title="设置">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </svg>
                    </button>
                    <div class="uuid-settings-panel">
                        <div class="uuid-settings-item" data-action="theme">
                            <span>主题切换</span>
                            <div class="uuid-theme-toggle">
                                <svg class="uuid-theme-icon uuid-theme-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="5"></circle>
                                    <line x1="12" y1="1" x2="12" y2="3"></line>
                                    <line x1="12" y1="21" x2="12" y2="23"></line>
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                    <line x1="1" y1="12" x2="3" y2="12"></line>
                                    <line x1="21" y1="12" x2="23" y2="12"></line>
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                </svg>
                                <svg class="uuid-theme-icon uuid-theme-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="uuid-settings-divider"></div>
                        <div class="uuid-settings-item" data-action="local">
                            <span>本地模式</span>
                            <div class="uuid-toggle-switch">
                                <span class="uuid-toggle-slider"></span>
                            </div>
                        </div>
                        <div class="uuid-settings-item" data-action="proxy">
                            <span>GitHub 代理</span>
                            <div class="uuid-toggle-switch">
                                <span class="uuid-toggle-slider"></span>
                            </div>
                        </div>
                        <div class="uuid-settings-item" data-action="token">
                            <span>GitHub Token</span>
                            <div class="uuid-token-status">
                                <span class="uuid-token-indicator"></span>
                            </div>
                        </div>
                        <div class="uuid-settings-divider"></div>
                        <div class="uuid-settings-item" data-action="convert">
                            <span>转换书签</span>
                        </div>
                        <div class="uuid-settings-item" data-action="about">
                            <span>关于</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="uuid-main">
        <div class="uuid-cards-container">
            <!-- Cards will be populated here -->
        </div>
    </main>
</div>
`,document.body.appendChild(e),m.domAvatar=e.querySelector(".uuid-avatar"),m.domUserInfo=e.querySelector(".uuid-user-info-panel"),m.domSearchInput=e.querySelector(".uuid-search-input"),m.domSearchDropdown=e.querySelector(".uuid-search-dropdown"),m.domCardsContainer=e.querySelector(".uuid-cards-container"),m.domSettingsPanel=e.querySelector(".uuid-settings-panel"),m.domThemeToggle=e.querySelector(".uuid-theme-toggle"),m.domThemeToggle.classList.toggle("dark","dark"===m.currentTheme)},load:async()=>{m.domCardsContainer.innerHTML=`
            <div class="uuid-loading">
                <div class="uuid-loading-spinner"></div>
                <span>正在加载...</span>
            </div>
        `,await g.viewUser(),await g.viewLink();try{let e=await p.instanceUser.getItem(`${m.flagName}:update-time`);e&&Date.now()-e>6048e5&&(await g.reqUser(m.flagName,!0),await g.reqLibs(m.flagName,m.flagResp,m.flagLibs,!0))}catch(e){}},bindEvent:()=>{document.body.addEventListener("click",async function(e){let t=e.target,a=t.closest("[data-action]");a&&g.triggerAction(a.dataset.action,a),t.closest(".uuid-user-section")||g.toggleDropdown(m.domUserInfo,!1),t.closest(".uuid-settings-dropdown")||g.toggleDropdown(m.domSettingsPanel,!1)}),m.domSearchInput.addEventListener("keydown",function(e){if(["ArrowUp","ArrowDown"].includes(e.code))e.preventDefault(),g.searchArrow(e.code);else if("Enter"==e.key){e.preventDefault();let t=m.domSearchDropdown.querySelector(".active");t&&t.click()}}),m.domSearchInput.addEventListener("input",function(){g.searchLink(this.value.trim())}),m.domSearchInput.addEventListener("focus",function(){this.classList.add("focused")}),m.domSearchInput.addEventListener("blur",function(){this.classList.remove("focused")}),document.body.addEventListener("keydown",function(e){if("Escape"===e.code){e.preventDefault(),m.domSearchInput.value="",m.domSearchInput.dataset.search="",m.domSearchInput.placeholder="静默搜索 (Ctrl+K)...",g.searchLink(""),g.toggleDropdown(m.domSearchDropdown,!1),m.domSearchInput.blur();return}if("INPUT"!==document.activeElement.tagName&&"TEXTAREA"!==document.activeElement.tagName)if(e.ctrlKey&&["KeyQ","KeyK"].includes(e.code))e.preventDefault(),m.domSearchInput.focus(),m.domSearchInput.dataset.search="",m.domSearchInput.placeholder="静默搜索 (Ctrl+K)...",g.searchLink("");else if("Backspace"==e.code)e.preventDefault(),m.domSearchInput.dataset.search.length&&(m.domSearchInput.dataset.search=m.domSearchInput.dataset.search.slice(0,-1)),m.domSearchInput.placeholder=m.domSearchInput.dataset.search.length?m.domSearchInput.dataset.search:"静默搜索 (Ctrl+K)...",g.searchLink(m.domSearchInput.dataset.search);else if("Enter"==e.key){if(e.preventDefault(),m.domSearchDropdown.classList.contains("show")){let e=m.domSearchDropdown.querySelector(".active");e&&e.click()}}else["ArrowUp","ArrowDown"].includes(e.code)?(e.preventDefault(),m.domSearchInput.dataset.search.length&&g.searchArrow(e.code)):/^[a-z0-9\.\_\-\/]$/i.test(e.key)&&!e.ctrlKey&&(m.domSearchInput.value="",document.documentElement.scrollTo(0,0),m.domSearchInput.dataset.search+=e.key,m.domSearchInput.placeholder=m.domSearchInput.dataset.search,g.searchLink(m.domSearchInput.dataset.search))})},triggerAction:async(e,t)=>{switch(e){case"toggle-user-info":g.toggleDropdown(m.domUserInfo);break;case"toggle-settings":g.toggleDropdown(m.domSettingsPanel);break;case"theme":g.toggleTheme(),m.domThemeToggle.classList.toggle("dark","dark"===m.currentTheme);break;case"token":{let e=`
                        <div class="uuid-form-group">
                            <label class="uuid-label">GitHub Token</label>
                            <input class="uuid-input" type="password" placeholder="ghp_xxxxxxxxxxxxxxxxxxxx" value="${m.flagToken||""}" />
                            <p style="margin-top: 8px; color: var(--text-secondary); font-size: 14px;">
                                匿名访问限制（60次/小时）<br>
                                <a href="https://github.com/settings/tokens" target="_blank">获取Token</a>
                            </p>
                        </div>
                    `,t=g.createModal("设置 GitHub Token",e,[{text:"取消",action:"close-modal"},{text:"保存",action:"save-token",class:"uuid-btn-primary"}]);t.addEventListener("click",async e=>{if("save-token"===e.target.dataset.action){let e=t.querySelector("input").value.trim();if(""===e)m.flagToken=null,await p.removeItem("uuid-token-github"),g.showNotification("Token已清除","success");else{if(!(e.length>10))return void g.showNotification("Token格式不正确","error");m.flagToken=e,await p.setItem("uuid-token-github",e),g.showNotification("Token已保存","success")}g.closeModal(t)}})}break;case"local":{m.flagName,m.flagResp,new URL(m.flagLocalPath,location).href;let e=`
                        <p>确定要切换到 ${m.flagLocalUsed?"GitHub 线上":"本地"} 模式吗？</p>
                        <div style="margin: 16px 0; padding: 12px; background: var(--bg-secondary); border-radius: 6px; font-size: 14px;">
                            <strong>当前：</strong> ${m.flagLocalUsed?"本地模式":"GitHub 线上模式"}<br>
                            <strong>切换到：</strong> ${m.flagLocalUsed?"GitHub 线上模式":"本地模式"}
                        </div>
                    `;g.createModal("切换模式",e,[{text:"取消",action:"close-modal"},{text:"确定",action:"confirm-local",class:"uuid-btn-primary"}]).addEventListener("click",async e=>{"confirm-local"===e.target.dataset.action&&(m.flagLocalUsed=!m.flagLocalUsed,await p.setItem("local",m.flagLocalUsed),"#_local"===location.hash&&(location.hash=""),location.reload())})}break;case"proxy":m.flagProxyUsed=!m.flagProxyUsed,await p.setItem("proxy",m.flagProxyUsed),t.querySelector(".uuid-toggle-switch").classList.toggle("active",m.flagProxyUsed),g.showNotification(m.flagProxyUsed?"GitHub 代理已启用":"GitHub 代理已禁用","success");break;case"reload":for(let e of(await p.instanceUser.keys()))e.startsWith(`${m.flagName}:`)&&await p.instanceUser.removeItem(e);await g.load();break;case"convert":{let e=`
                        <div class="uuid-form-group">
                            <label class="uuid-label">选择书签文件</label>
                            <input type="file" class="uuid-input" accept=".html" />
                        </div>
                        <div class="uuid-form-group">
                            <label class="uuid-label">转换结果</label>
                            <textarea class="uuid-input uuid-textarea" placeholder="转换结果将在此显示..." readonly></textarea>
                        </div>
                    `,t=g.createModal("转换HTML书签",e,[{text:"关闭",action:"close-modal"}]),a=t.querySelector('input[type="file"]'),r=t.querySelector("textarea");a.addEventListener("change",async e=>{let t=e.target.files[0];if(t)try{let e=await c.reader(t),a=[],o=document.createElement("div");o.innerHTML=e;let n=o.querySelector("h1");n&&a.push("# "+n.innerHTML),g.convertHtml(o,a),r.value=a.join(`\r
`),g.showNotification("转换完成","success")}catch(e){console.error(e),g.showNotification("转换失败","error")}})}break;case"about":{let e=`
                        <div style="line-height: 1.6;">
                            <p><strong>GitHub:</strong> <a href="https://github.com/netnr" target="_blank">https://github.com/netnr</a></p>
                            <p><strong>联系打赏:</strong> <a href="https://zme.ink" target="_blank">https://zme.ink</a></p>
                            <hr style="margin: 16px 0; border: none; border-top: 1px solid var(--border-color);">
                            <p>缓存后可离线使用</p>
                            <hr style="margin: 16px 0; border: none; border-top: 1px solid var(--border-color);">
                            <p>Fork 项目，从浏览器导出书签 HTML，再转换书签为 Markdown，保存到 libs/*.md</p>
                            <p>私有化部署，更新索引文件 libs/index.json，页面再启用 本地 Local</p>
                            <hr style="margin: 16px 0; border: none; border-top: 1px solid var(--border-color);">
                            <p>uuid.fun 于 2028-11-09 8:00 到期，计划不再续费，启用子域名：<a href="https://uu.zme.ink" target="_blank">https://uu.zme.ink</a></p>
                        </div>
                    `;g.createModal("关于",e,[{text:"关闭",action:"close-modal"}])}}},reqUser:async(e,t)=>{let a=`https://api.github.com/users/${e}`,r=`${e}:${a}`,o=await p.instanceUser.getItem(r);return(null==o||t)&&(o=await g.reqServer(a))&&(await p.instanceUser.setItem(r,o),await p.instanceUser.setItem(`${e}:update-time`,Date.now())),o},reqLibs:async(e,t,a,r)=>{let o=`https://api.github.com/repos/${e}/${t}/contents/${a}`,n=`${e}:${o}`,i=await p.instanceUser.getItem(n);return(null==i||r)&&(i=await g.reqServer(o))&&await p.instanceUser.setItem(n,i),i},reqRaw:async e=>{let t=`${m.flagName}:${e}`,a=await p.instanceUser.getItem(t);return null==a&&(a=await g.reqServer(`${e}?_${d.random()}`,{type:"text"}))&&await p.instanceUser.setItem(t,a),a},convertHtml:(e,t)=>{for(let a=0;a<e.children.length;a++){let r=e.children[a];switch(r.nodeName){case"H3":t.push(""),t.push("### "+r.innerHTML);break;case"DL":case"P":g.convertHtml(r,t);break;case"DT":if(1==r.children.length){let e=r.querySelector("a");t.push("- ["+e.innerHTML.replace(/`/g,"\\`")+"]("+e.href+")")}else g.convertHtml(r,t)}}},viewUser:async()=>{let e;if(m.flagLocalUsed?(m.flagLocalJson=await g.reqServer(m.flagLocalPath),m.flagLocalJson?e=m.flagLocalJson.user:g.showNotification("加载失败","error")):e=await g.reqUser(m.flagName),e){m.domAvatar.onerror=function(){m.domAvatar.src="/favicon.ico",m.domAvatar.onerror=null},m.domAvatar.src=e.avatar_url;let t=e.name||e.login,a=e.bio||"",r=e.company||"",o=e.location||"",n=e.blog||"",i=`
                <div class="uuid-user-info-content">
                    <div class="uuid-user-name">
                        <a href="https://github.com/${e.login}" target="_blank">${t}</a>
                    </div>
                    ${a?`<div class="uuid-user-bio">${a}</div>`:""}
                    <div class="uuid-user-details">
                        ${r?`
                            <div class="uuid-user-detail">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M3 21h18"></path>
                                    <path d="M5 21V7l8-4v18"></path>
                                    <path d="M19 21V11l-6-4"></path>
                                </svg>
                                <span>${r}</span>
                            </div>
                        `:""}
                        ${o?`
                            <div class="uuid-user-detail">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                <span>${o}</span>
                            </div>
                        `:""}
                        ${n?`
                            <div class="uuid-user-detail">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                </svg>
                                <a href="${n}" target="_blank">${n}</a>
                            </div>
                        `:""}
                    </div>
                </div>
            `;m.domUserInfo.innerHTML=i,document.title=`${e.login} - ${m.flagTitle}`}},viewLink:async()=>{let e;if(m.flagLocalUsed?m.flagLocalJson&&(e=m.flagLocalJson.libs):e=await g.reqLibs(m.flagName,m.flagResp,m.flagLibs),e){let t=[];for(let a of e)if("file"===a.type&&a.name.endsWith(m.flagSuffix)){let e=a.name.substring(0,a.name.length-m.flagSuffix.length),r=`card-${t.length}`,o=`
                        <div class="uuid-card" id="${r}">
                            <div class="uuid-card-header">
                                <h3 class="uuid-card-title">${e}</h3>
                            </div>
                            <div class="uuid-card-content">
                                <div class="uuid-loading">
                                    <div class="uuid-loading-spinner"></div>
                                    <span>加载中...</span>
                                </div>
                            </div>
                        </div>
                    `;t.push(o)}m.domCardsContainer.innerHTML=t.join("");let a=0;for(let t of e)if("file"===t.type&&t.name.endsWith(m.flagSuffix)){let e=`card-${a}`,r=document.querySelector(`#${e} .uuid-card-content`);try{let e=await g.reqRaw(t.download_url);if(e){let t=(await l.e(666).then(l.bind(l,666))).parse(e),a=document.createElement("div");a.innerHTML=t;let o=[],n=null;a.childNodes.forEach(e=>{e.nodeType===Node.ELEMENT_NODE&&("H3"===e.tagName?(n&&o.push(n),n={title:e.textContent,links:[]}):("UL"===e.tagName||"OL"===e.tagName)&&(n||(n={title:null,links:[]}),e.querySelectorAll("a").forEach(e=>{let t=e.textContent.trim();if(t.includes("http")){let e=t.split(" ");e.length>1&&e[e.length-1].includes("http")&&(t=e.slice(0,-1).join(" "))}n.links.push({title:t,url:e.href})})))}),n&&o.push(n),r.innerHTML=o.map(e=>`
                                <div class="uuid-card-section">
                                    ${e.title?`
                                        <h4 class="uuid-card-section-title">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M9 11l3 3L22 4"></path>
                                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                            </svg>
                                            ${e.title}
                                        </h4>
                                    `:""}
                                    <div class="uuid-links-grid">
                                        ${e.links.map(e=>`
                                            <a href="${e.url}" target="_blank" class="uuid-link">
                                                ${e.title}
                                            </a>
                                        `).join("")}
                                    </div>
                                </div>
                            `).join("")||`
                                <div class="uuid-empty">
                                    <svg class="uuid-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M12 6v6l4 2"></path>
                                    </svg>
                                    <div class="uuid-empty-title">暂无内容</div>
                                    <div class="uuid-empty-description">此文件暂无有效的链接内容</div>
                                </div>
                            `}else r.innerHTML=`
                                <div class="uuid-empty">
                                    <svg class="uuid-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="8" x2="12" y2="12"></line>
                                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                    </svg>
                                    <div class="uuid-empty-title">加载失败</div>
                                    <div class="uuid-empty-description">无法加载此文件的内容</div>
                                </div>
                            `}catch(e){console.error("Error loading card content:",e),r.innerHTML=`
                            <div class="uuid-empty">
                                <svg class="uuid-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                                <div class="uuid-empty-title">加载错误</div>
                                <div class="uuid-empty-description">处理文件内容时出现错误</div>
                            </div>
                        `}a++}m.domCardsContainer.dataset.ended=!0}else m.domCardsContainer.innerHTML=`
                <div class="uuid-empty">
                    <svg class="uuid-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <div class="uuid-empty-title">加载失败</div>
                    <div class="uuid-empty-description">无法获取收藏夹列表</div>
                </div>
            `},searchArrow:e=>{let t=m.domSearchDropdown.querySelectorAll(".uuid-search-item");if(0===t.length)return;let a=m.domSearchDropdown.querySelector(".uuid-search-item.active"),r=-1;t.forEach((e,t)=>{e===a&&(r=t)}),a&&a.classList.remove("active"),"ArrowUp"===e?r=r<=0?t.length-1:r-1:"ArrowDown"===e&&(r=r>=t.length-1?0:r+1),r>=0&&r<t.length&&t[r].classList.add("active")},searchLink:e=>{if(m.domCardsContainer.dataset.ended){let t=[];if(""!==e.trim()){let a=e.toLowerCase(),r=m.domCardsContainer.querySelectorAll("a");for(let e=0;e<r.length;e++){let o=r[e];if(`${o.href},${o.textContent},${o.title||""}`.toLowerCase().includes(a)&&(t.push({url:o.href,title:o.textContent.trim(),element:o}),t.length>=7))break}}if(t.length>0){let e=t.map((e,t)=>`
                    <a href="${e.url}" target="_blank" class="uuid-search-item ${0===t?"active":""}">
                        <div class="uuid-search-item-url">${e.url}</div>
                        <div class="uuid-search-item-title">${e.title}</div>
                    </a>
                `).join("");m.domSearchDropdown.innerHTML=e,g.toggleDropdown(m.domSearchDropdown,!0)}else g.toggleDropdown(m.domSearchDropdown,!1)}},reqServer:async(e,t)=>{t=t||{},null!=m.flagToken&&m.flagToken.length>10&&!e.includes("githubusercontent")&&(t.headers=t.headers||{},t.headers.authorization=`token ${m.flagToken}`),m.flagProxyUsed&&!m.flagLocalUsed&&(e=`${m.flagProxyServer}${encodeURIComponent(e)}`);let a=await d.fetch(e,t);if(a.error)console.error("Network error:",a.error),g.showNotification("网络错误","error");else if(!1==a.resp.ok)403==a.resp.status?g.showNotification("请设置 Token","warning"):g.showNotification(`请求失败 (${a.resp.status})`,"error");else if(a.resp.ok&&a.result)return a.result}};Object.assign(window,{nrWeb:g}),"loading"==document.readyState?document.addEventListener("DOMContentLoaded",g.init):g.init()})();