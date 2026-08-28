(()=>{"use strict";let e,t,r,a,n;var o={};let i={};function s(e){let t=i[e];if(void 0!==t)return t.exports;let r=i[e]={exports:{}};return o[e](r,r.exports,s),r.exports}if(s.m=o,s.d=(e,t)=>{for(var r in t)s.o(t,r)&&!s.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},s.f={},s.e=e=>Promise.all(Object.keys(s.f).reduce((t,r)=>(s.f[r](e,t),t),[])),s.u=e=>"chunks/"+e+"."+({11:"c82c6cc1ac2d5b59006e",394:"731ce31f2d195cab9458",962:"8fae885f4588091c4e22"})[e]+".js",s.miniCssF=e=>"chunks/"+e+".b71556e578996b490f5f.css",s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||Function("return this")()}catch{if("object"==typeof window)return window}}(),s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},t="netnr:",s.l=(r,a,n,o)=>{let i,l;if(e[r])return void e[r].push(a);if(void 0!==n){let e=document.getElementsByTagName("script");for(var c=0;c<e.length;c++){let a=e[c];if(a.getAttribute("src")==r||a.getAttribute("data-webpack")==t+n){i=a;break}}}i||(l=!0,(i=document.createElement("script")).charset="utf-8",s.nc&&i.setAttribute("nonce",s.nc),i.setAttribute("data-webpack",t+n),i.src=r),e[r]=[a];let d=(t,a)=>{i.onerror=i.onload=null,clearTimeout(u);let n=e[r];if(delete e[r],i.parentNode&&i.parentNode.removeChild(i),n&&n.forEach(e=>e(a)),t)return t(a)},u=setTimeout(d.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=d.bind(null,i.onerror),i.onload=d.bind(null,i.onload),l&&document.head.appendChild(i)},s.r=e=>{Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.p="/","u">typeof document){var l={792:0};s.f.miniCss=(e,t)=>{if(l[e])t.push(l[e]);else 0!==l[e]&&({962:1})[e]&&t.push(l[e]=new Promise((t,r)=>{var a,n=s.miniCssF(e),o=s.p+n;if(((e,t)=>{for(var r=document.getElementsByTagName("link"),a=0;a<r.length;a++){var n=r[a],o=n.getAttribute("data-href")||n.getAttribute("href");if("stylesheet"===n.rel&&(o===e||o===t))return n}for(var i=document.getElementsByTagName("style"),a=0;a<i.length;a++){var n=i[a],o=n.getAttribute("data-href");if(o===e||o===t)return n}})(n,o))return t();(a=document.createElement("link")).rel="stylesheet",a.type="text/css",s.nc&&(a.nonce=s.nc),a.onerror=a.onload=n=>{if(a.onerror=a.onload=null,"load"===n.type)t();else{var i=n&&n.type,s=n&&n.target&&n.target.href||o,l=Error("Loading CSS chunk "+e+` failed.
(`+i+": "+s+")");l.name="ChunkLoadError",l.code="CSS_CHUNK_LOAD_FAILED",l.type=i,l.request=s,a.parentNode&&a.parentNode.removeChild(a),r(l)}},a.href=o,document.head.appendChild(a)}).then(()=>{l[e]=0},t=>{throw delete l[e],t}))}}r={792:0},s.f.j=(e,t)=>{let a=s.o(r,e)?r[e]:void 0;if(0!==a)if(a)t.push(a[2]);else{let n=new Promise((t,n)=>a=r[e]=[t,n]);t.push(a[2]=n);let o=Error();s.l(s.p+s.u(e),t=>{if(s.o(r,e)&&(0!==(a=r[e])&&(r[e]=void 0),a)){let r=t&&("load"===t.type?"missing":t.type),n=t&&t.target&&t.target.src;o.message="Loading chunk "+e+` failed.
(`+r+": "+n+")",o.name="ChunkLoadError",o.type=r,o.request=n,o.event=t,a[1](o)}},"chunk-"+e,e)}},a=(e,t)=>{let[a,n,o]=t;var i,l,c=0;if(a.some(e=>0!==r[e])){for(i in n)s.o(n,i)&&(s.m[i]=n[i]);o&&o(s)}for(e&&e(t);c<a.length;c++)l=a[c],s.o(r,l)&&r[l]&&r[l][0](),r[l]=0},(n=self.webpackChunknetnr=self.webpackChunknetnr||[]).forEach(a.bind(null,0)),n.push=a.bind(null,n.push.bind(n));let c={_abortController:null,init:(e,t,r=document)=>{c.destroy(),c._abortController=new AbortController;var a=c._abortController.signal;r.addEventListener("dragover",e=>{t&&t.contains(e.target)||(e.preventDefault(),e.stopPropagation())},{signal:a}),r.addEventListener("drop",async r=>{if(!(t&&t.contains(r.target))){r.preventDefault();let t=await c.readDataTransferItems(r.dataTransfer.items);t.length&&await e(t,"drag")}},{signal:a}),t&&t.addEventListener("change",async function(){let t=this.files;t.length&&await e(t,"change")},{signal:a}),document.addEventListener("paste",async function(t){if(!["INPUT","TEXTAREA"].includes(t.target.nodeName)){let r=t.clipboardData.items,a=[];for(let e=0;e<r.length;e++){let t=r[e].getAsFile();t&&a.push(t)}a.length&&await e(a,"paste")}},{signal:a})},destroy:()=>{c._abortController&&(c._abortController.abort(),c._abortController=null)},readDataTransferItems:async e=>{let t=[],r=[];for(let a=0;a<e.length;a++){let n=e[a],o=n.webkitGetAsEntry();if(null!=o)t.push(c.readDataTransferItemEntry(o));else{let e=n.getAsFile();e&&r.push(e)}}return(await Promise.all(t)).forEach(e=>{e.length?r=r.concat(e):r.push(e)}),r},readDataTransferItemEntry:(e,t)=>new Promise(r=>{t=t||"",e.isFile?e.file(e=>{""!=t&&(e.fullPath=t+e.name),r(e)}):e.isDirectory&&e.createReader().readEntries(a=>{let n=[];for(let r=0;r<a.length;r++)n.push(c.readDataTransferItemEntry(a[r],t+e.name+"/"));Promise.all(n).then(e=>{let t=[];e.forEach(e=>{e.length?t=t.concat(e):t.push(e)}),r(t)})})}),invokeCanvasToBlob:(e,t,r)=>new Promise(a=>{e.toBlob(e=>{a(e)},t,r)}),invokeImageOnload:(e,t)=>new Promise(r=>{e.onload=()=>r(e),e.src=t}),reader:(e,t="Text",r="utf-8")=>new Promise((a,n)=>{let o=new FileReader;o.onloadend=()=>a(o.result),o.onerror=()=>n(),"Text"==t?o.readAsText(e,r):o[`readAs${t}`](e)})};Object.assign(window,{nrcFile:c});let d={version:"7.0.20",lastFetchDate:null,cookie:function(e,t,r){if(1==arguments.length){let t=document.cookie.match(RegExp("(^| )"+e+"=([^;]*)(;|$)"));return null!=t?t[2]:null}{let a=`${e}=${t};Path=/`;if(r){let e=new Date;e.setTime(e.getTime()+r),a=`${a};Expires=${e.toUTCString()}`}document.cookie=a}},isDark:()=>document.cookie.includes(".theme=dark"),saveTheme:e=>{let t=new Date;t.setFullYear(t.getFullYear()+1),document.cookie=`.theme=${e};Path=/;Expires=${t.toUTCString()}`},isNullOrWhiteSpace:e=>null==e||""==e.toString().trim(),getFileNameWithoutExtension:e=>{var t=e.split(".");return t.length>1&&t.pop(),t.join(".")},UUID:()=>window.crypto&&window.crypto.randomUUID?crypto.randomUUID():URL.createObjectURL(new Blob([])).split("/").pop(),random:(e=99999,t=0)=>Math.floor(Math.random()*(e-t+1)+t),addSeconds:(e,t)=>(e.setSeconds(e.getSeconds()+t),e),addMinutes:(e,t)=>(e.setMinutes(e.getMinutes()+t),e),addHours:(e,t)=>(e.setHours(e.getHours()+t),e),addDays:(e,t)=>(e.setDate(e.getDate()+t),e),addMonths:(e,t)=>(e.setMonth(e.getMonth()+t),e),addYears:(e,t)=>(e.setFullYear(e.getFullYear()+t),e),type:function(e){return({}).toString.call(e).split(" ")[1].replace("]","")},clone:e=>window.structuredClone?window.structuredClone(e):JSON.parse(JSON.stringify(e)),sleep:e=>new Promise(t=>setTimeout(()=>t(),e||1e3)),trimStart:(e,t)=>{for(e=e.toString().trim();e.startsWith(t);)e=e.substring(t.length);return e},trimEnd:(e,t)=>{for(e=e.toString().trim();e.endsWith(t);)e=e.substring(0,e.length-t.length);return e},error:()=>{throw Error("Fake Error")},dispatchEvent:(e,t)=>e.dispatchEvent(new Event(t)),cssvar:(e,t,r)=>{if(null==r)return getComputedStyle(e).getPropertyValue(t);e.style.setProperty(t,r)},xssClean:e=>{let t=window.DOMPurify;return t?t.sanitize(e,{ADD_ATTR:["password-toggle","clearable","variant","target","hoist"]}):(console.debug("DOMPurify not found"),e)},htmlEscape:e=>null==e?"":String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;"),htmlEncode:e=>e.replace(/[\u00A0-\u9999<>\&]/g,e=>"&#"+e.charCodeAt(0)+";"),htmlDecode:e=>{let t=document.createElement("div");return t.innerHTML=e,t.innerText},arrayDistinct:e=>Array.from(new Set(e)),groupBy:(e,t)=>Array.from(new Set(e.map(t))),isDanger:e=>/[^a-zA-Z0-9_]+/.test(e),dangerReplace:e=>e.replace(/[^a-zA-Z0-9_]+/g,""),escapeMarkdown:e=>null==e?"":`${e}`.replace(/[\*\_\[\]\#\+\-\!\`\|]/g,"\\$&").replace(/\n/g,"<br>").replace(/\r/g,""),isRiskFile:e=>{let t=!1;if(d.isNullOrWhiteSpace(e)||e.length>250||e.endsWith("."))t=!0;else{let r=e.split("."),a=r.length>1?r.pop().toLowerCase():"";a.length>10?t=!0:a.length>1&&"exe,msi,bat,sh,php,php3,asa,asp,aspx,css,htm,html,mhtml,js,jse,jsp,jspx,dll,so,jar,war,ear,ps1,psm1,pl,pm,py,pyc,pyo,rb".includes(a)&&(t=!0)}return t},byteLength:(e,t,r=" ...")=>{let a=e=>Array.from(e).reduce((e,t)=>e+(t.charCodeAt(0)>255?2:1),0);if(null==t)return a(e);if(a(e)<=t)return e;let n=t-(r?a(r):0);if(n<=0)return n<0?"":r;let o="",i=0;for(let t of e){let e=t.charCodeAt(0)>255?2:1;if(i+e>n)break;o+=t,i+=e}return o+(r||"")},fromCommaToArray:e=>null==e||""==e.trim()?[]:e.split(","),fromKeyToURLParams:e=>{if("Object"==d.type(e))for(let t in e)(null===e[t]||void 0===e[t])&&(e[t]="");return new URLSearchParams(e).toString()},fromFormToKey:e=>Object.fromEntries(d.fromFormToFormData(e)),fromFormToFormData:e=>{let t=new FormData(e);return e.querySelectorAll("sl-select, sl-input").forEach(e=>{e.name&&("sl-select"===e.tagName.toLowerCase()&&e.hasAttribute("multiple")?t.set(e.name,Array.isArray(e.value)?e.value.join(","):e.value||""):t.set(e.name,e.value||""))}),t},fromKeyToFormData:e=>{let t=new FormData;for(let r in e)null!==e[r]&&t.append(r,e[r]);return t},getUrlParams:(e,t)=>new URLSearchParams(t||location.search).get(e),findParentElement:(e,t)=>{let r=e;for(;null!=r;){if(t(r))return r;r=r.parentElement}return null},readDOM:(e,t,r,a)=>{e.querySelectorAll("*").forEach(e=>{if(e.classList.value.startsWith(t)){let n="dom";e.classList[0].substring(t.length+1).split("-").forEach(e=>n+=e.substring(0,1).toUpperCase()+e.substring(1)),!0!=a&&n in r||(r[n]=e)}})},editDOM:e=>{e.setAttribute("contenteditable",!0),e.setAttribute("spellcheck",!1)},parserDOM:(e,t)=>(t=t||"text/html",new DOMParser().parseFromString(e,t)),fetch:async(e,t)=>{let r={resp:null,result:null,error:null};try{t=t||{method:"GET",cache:"no-cache"};let a=await fetch(e,t);r.resp=a;try{switch(d.lastFetchDate=a.headers.get("date"),null!=d.lastFetchDate&&(d.lastFetchDate=d.formatDateTime("datetime",d.lastFetchDate)),t.type){case"text":r.result=await a.text();break;case"blob":r.result=await a.blob();break;case"buffer":r.result=await a.arrayBuffer();break;case"reader":r.result=a.body.getReader();break;case"response":r.result=a;break;default:r.result=await a.json()}}catch(e){if(a.ok)throw e}}catch(e){r.error=e}return r},streaming:(e,t={})=>({url:e,onEvent:t.onEvent||(()=>{}),headers:t.headers||{},maxRetries:t.maxRetries||3,method:t.method||"GET",abortController:null,isRunning:!1,retryTimes:0,async start(){this.isRunning||(this.isRunning=!0,this.retryTimes=0,await this._connectStream())},async _connectStream(){this.abortController=new AbortController;let e=await d.fetch(this.url,{method:this.method,headers:this.headers,signal:this.abortController.signal,type:"response"});if(e.error)return void this._handleError(e.error);let t=e.resp;if(!t.ok){this.isRunning=!1,this.onEvent({type:"Error",message:`HTTP ${t.status}: ${t.statusText}`,status:t.status,statusText:t.statusText});return}let r=t.body.getReader(),a=new TextDecoder,n="";try{for(;this.isRunning;){let{done:e,value:t}=await r.read();if(e)break;let o=(n+=a.decode(t,{stream:!0})).split(`
`);for(let e of(n=o.pop()||"",o))e.trim()&&await this._processMessage(e)}n.trim()&&await this._processMessage(n)}catch(e){"AbortError"!==e.name&&this._handleError(e)}},async _processMessage(e){try{let t=JSON.parse(e);this.onEvent(t),("Cancel"===t.type||"Error"===t.type||"Done"===t.type)&&(this.isRunning=!1);return}catch(e){this._handleError(Error(`Failed to parse message: ${e.message}`))}},_handleError(e){"AbortError"===e.name?(this.isRunning=!1,this.onEvent({type:"Cancel",message:"Request cancelled"})):this.retryTimes<this.maxRetries?(this.retryTimes++,setTimeout(()=>{this.isRunning&&this._connectStream()},1e3*this.retryTimes)):(this.isRunning=!1,this.onEvent({type:"Error",message:e.message||e.toString(),name:e.name,retries:this.retryTimes}))},stop(){this.isRunning=!1,this.abortController&&(this.abortController.abort(),this.abortController=null)},isActive(){return this.isRunning}}),readNdjsonStream:async(e,t)=>{if(e&&e.error)return e;let r=new TextDecoder,a="";for(;;){let{done:n,value:o}=await e.read();if(n)break;let i=(a+=r.decode(o)).split(`
`);for(let e of(a=i.pop(),i))await t(e)}return await t(a),null},tsLoaded:{},importArray:async e=>{let t=[],r={};for(let a=0;a<e.length;a++){let n=e[a];"Promise"==d.type(n)?t.push(n):(t.push(n.promise),r[a]=n.name)}let a=await Promise.all(t);for(let e in r){let t=a[e];"default"in t&&(t=t.default),Object.assign(window,{[r[e]]:t})}return a},importStyle:async e=>{e=d.mirrorNPM(e);let t=d.tsLoaded[e];return t||(d.tsLoaded[e]=t=new Promise((t,r)=>{let a=!1;if(document.querySelectorAll("link").forEach(t=>{t.href&&t.href.includes(e)&&(a=!0)}),a)t();else{let a=document.createElement("LINK");a.href=e,a.rel="stylesheet","onload"in a?(a.onload=()=>{t()},a.onerror=e=>{r(e)}):t(),document.head.appendChild(a)}})),t},importScript:async(e,t)=>{e=d.mirrorNPM(e);let r=d.tsLoaded[e];return r||(d.tsLoaded[e]=r=new Promise((r,a)=>{let n,o=document.scripts;for(let t=0;t<o.length;t++){let r=o[t];if(r.src.includes(e)){n=r;break}}if(n)r();else{let n=document.createElement("SCRIPT");n.src=e,n.type=t||"text/javascript",n.onerror=function(e){a(e)},n.onload=function(){r()},document.head.appendChild(n)}})),r},require:(e,t)=>new Promise(r=>{if(t in d.tsLoaded)r();else{let a=t.split(",");e=e.map(e=>d.mirrorNPM(e)),window.require(e,function(){for(let e=0;e<arguments.length;e++)Object.assign(window,{[a[e].trim()]:arguments[e]});d.tsLoaded[t]=!0,r()})}}),mirrorNPM:e=>{let t=/(https?:\/\/[\w.-]+)\/(.*)@([\d.]+)\/(.*)\.(\w+)/.exec(e);return null!=t&&(e=`https://netnr.eu.org/${t[2]}@${t[3]}/${t[4]}.${t[5]}`),e},tsBottomKeepHeight:40,setHeightFromBottom:(e,t)=>{let r=null==t?d.tsBottomKeepHeight:t,a=e.getBoundingClientRect().top+r;Object.assign(e.style,{height:`calc(100vh - ${a}px)`,minHeight:"200px"})},formatByteSize:function(e,t=2,r=1024){if(null==e||isNaN(e))return e;if(Math.abs(e)<r)return e+" B";let a=1e3==r?["KB","MB","GB","TB","PB","EB","ZB","YB"]:["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],n=-1,o=10**t;do e/=r,++n;while(Math.round(Math.abs(e)*o)/o>=r&&n<a.length-1)return(+e.toFixed(t)).toString()+a[n]},formatDateTime:(e,t)=>{switch(d.type(t)){case"String":case"Number":{let e=new Date(t);isNaN(e)?t.includes("年")&&t.includes("月")&&t.includes("日")&&(e=new Date(t.replace(/年|月/g,"-").replace("日",""))):10==t.length&&e.setHours(0,0,0,0),t=e}break;case"Date":break;default:t=new Date}switch(e=e||"yyyy-MM-dd HH:mm:ss"){case"date":e="yyyy-MM-dd";break;case"time":e="HH:mm:ss";break;case"datetime":e="yyyy-MM-dd HH:mm:ss";break;case"datetime-local":e="yyyy-MM-ddTHH:mm"}return[["yyyy",t.getFullYear()],["MM",t.getMonth()+1],["dd",t.getDate()],["HH",t.getHours()],["mm",t.getMinutes()],["ss",t.getSeconds()],["fff",t.getMilliseconds()]].reduce((e,t)=>e.replace(t[0],`${t[1]}`.padStart(t[0].length,"0")),e)},now:()=>d.formatDateTime("datetime"),downloadBlob:function(e,t){let r=window.URL.createObjectURL(e);d.downloadUrl(r,t)},downloadCanvas:function(e,t,r,a){let n;if(null==r){let e=t.split(".").pop().toLowerCase();"jpg"==e&&(e="jpeg"),r=`image/${e}`}n="image/png"==r?e.toDataURL(r):e.toDataURL(r,a),d.downloadUrl(n,t)},downloadText:function(e,t,r){let a=new Blob([e],{type:r||"text/plain"}),n=window.URL.createObjectURL(a);d.downloadUrl(n,t)},downloadUrl:function(e,t){let r=document.createElement("a");r.href=e,r.download=t,document.body.appendChild(r),r.click(),document.body.removeChild(r)},performance:()=>{if(window.performance){for(let e of window.performance.getEntries())if("PerformanceNavigationTiming"==d.type(e)){console.debug(e);break}}},voice:function(e){if(console.debug(e),"function"==typeof SpeechSynthesisUtterance){let t=new SpeechSynthesisUtterance(e);t.lang="zh-CN",window.speechSynthesis.speak(t)}},notify:async e=>{if("granted"==await Notification.requestPermission())return new Notification(e.title||"消息",e);console.debug(e)},cyrb53:(e,t=0)=>{let r=0xdeadbeef^t,a=0x41c6ce57^t;for(let t=0,n;t<e.length;t++)r=Math.imul(r^(n=e.charCodeAt(t)),0x9e3779b1),a=Math.imul(a^n,0x5f356495);return r=Math.imul(r^r>>>16,0x85ebca6b)^Math.imul(a^a>>>13,0xc2b2ae35),(0x100000000*(2097151&(a=Math.imul(a^a>>>16,0x85ebca6b)^Math.imul(r^r>>>13,0xc2b2ae35)))+(r>>>0)).toString(36).slice(0,6)},clipboard:async e=>{if(navigator.clipboard)return null==e?await navigator.clipboard.readText():await navigator.clipboard.writeText(e);if(null==e)return"不支持 unsupported";{let t=document.createElement("textarea");return t.value=e,t.style.position="fixed",t.style.opacity=0,document.body.appendChild(t),t.select(),window.document.execCommand("Copy"),t.remove(),e}}};Object.assign(window,{nrcBase:d});class u{constructor(e={}){this.db=null,this.name=e.name||"localforage",this.storeName=e.storeName||"keyvaluepairs",this.version=e.version||null}init(){return this.db?Promise.resolve(this):new Promise((e,t)=>{let r=window.indexedDB.open(this.name);r.onerror=()=>t(r.error),r.onsuccess=()=>{let a=r.result,n=a.version,o=a.objectStoreNames.contains(this.storeName);a.close();let i=window.indexedDB.open(this.name,o?n:n+1);i.onerror=()=>t(i.error),i.onblocked=()=>t(Error(`open blocked: ${this.name}`)),i.onupgradeneeded=()=>{let e=i.result;e.objectStoreNames.contains(this.storeName)||e.createObjectStore(this.storeName)},i.onsuccess=()=>{this.db=i.result,this.db.onversionchange=()=>{try{this.db.close()}catch{}this.db=null},e(this)}},r.onupgradeneeded=()=>{let e=r.result;e.objectStoreNames.contains(this.storeName)||e.createObjectStore(this.storeName)}})}_performTransaction(e,t){return new Promise((r,a)=>{let n=this.db.transaction(this.storeName,e),o=n.objectStore(this.storeName);n.oncomplete=()=>{r()},n.onerror=e=>{a(e.target.error)},t(o,r,a)})}setItem(e,t){return this._performTransaction("readwrite",(r,a,n)=>{let o=r.put(t,e);o.onsuccess=()=>{a()},o.onerror=()=>{n(o.error)}})}getItem(e){return this._performTransaction("readonly",(t,r,a)=>{let n=t.get(e);n.onsuccess=()=>{r(n.result)},n.onerror=()=>{a(n.error)}})}removeItem(e){return this._performTransaction("readwrite",(t,r,a)=>{let n=t.delete(e);n.onsuccess=()=>{r()},n.onerror=()=>{a(n.error)}})}keys(){return this._performTransaction("readonly",(e,t,r)=>{let a=e.getAllKeys();a.onsuccess=()=>{t(a.result)},a.onerror=()=>{r(a.error)}})}clear(){return this._performTransaction("readwrite",(e,t,r)=>{let a=e.clear();a.onsuccess=()=>{t()},a.onerror=()=>{r(a.error)}})}deleteStore(e){let t=e||this.storeName;return new Promise((e,r)=>{this.db&&(this.db.close(),this.db=null);let a=window.indexedDB.open(this.name);a.onerror=()=>r(a.error),a.onsuccess=()=>{let n=a.result,o=n.objectStoreNames.contains(t),i=n.version;if(n.close(),!o)return void e(!1);let s=window.indexedDB.open(this.name,i+1);s.onerror=()=>r(s.error),s.onblocked=()=>r(Error(`deleteStore blocked: ${this.name}`)),s.onupgradeneeded=()=>{let e=s.result;e.objectStoreNames.contains(t)&&e.deleteObjectStore(t)},s.onsuccess=()=>{s.result.close(),e(!0)}}})}}Object.assign(window,{nrcIndexedDB:u});let h={init:async()=>{null==h.localforage&&(h.localforage=await new u().init())},localforage:null,getItem:async e=>await h.localforage.getItem(e),setItem:async(e,t)=>await h.localforage.setItem(e,t),removeItem:async e=>await h.localforage.removeItem(e),keys:async()=>await h.localforage.keys(),clear:async()=>await h.localforage.clear(),setCache:async(e,t,r)=>{let a={data:t,flag:r,time:new Date().toLocaleString().split(" ").map(e=>e.split("/").map(e=>e.padStart(2,"0")).join("-")).join(" ")};await h.localforage.setItem(e,a)},getCache:async(e,t)=>{let r=await h.localforage.getItem(e);if(r){if("function"==typeof t?t(r.flag):r.flag==t)return r.data;await h.localforage.removeItem(e)}}};Object.assign(window,{nrcStorage:h});let p={init:async()=>{if(Element.prototype.getAnimations||(Element.prototype.getAnimations=function(){return[]}),Object.hasOwn||(Object.hasOwn=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}),Promise.withResolvers||(Promise.withResolvers=function(){let e,t;return{promise:new Promise((r,a)=>{e=r,t=a}),resolve:e,reject:t}}),Object.defineProperty(Array.prototype,"gap",{configurable:!0,writable:!0,enumerable:!1,value:function(e){if(this.length<=1)return[...this];let t=[],r=this.length;for(let a=0;a<r;a++)if(t.push(this[a]),a<r-1){let r="function"==typeof e?e(a,this[a],this[a+1]):e;t.push(r)}return t}}),"function"!=typeof Element.prototype.replaceChildren&&Object.defineProperty(Element.prototype,"replaceChildren",{configurable:!0,writable:!0,value:function(...e){for(;this.firstChild;)this.removeChild(this.firstChild);this.append(...e)}}),Array.prototype.at||Object.defineProperty(Array.prototype,"at",{value:function(e){if(e<0&&(e+=this.length),!(e<0)&&!(e>=this.length))return this[e]},writable:!0,enumerable:!1,configurable:!0}),String.prototype.replaceAll||Object.defineProperty(String.prototype,"replaceAll",{value:function(e,t){if("string"==typeof e)return this.split(e).join(t);if(e instanceof RegExp){if(!e.global)throw TypeError("replaceAll ERROR");return this.replace(e,t)}throw TypeError("replaceAll ERROR")},writable:!0,enumerable:!1,configurable:!0}),window.structuredClone||(window.structuredClone=e=>JSON.parse(JSON.stringify(e))),"u">typeof AbortSignal){let e=EventTarget.prototype.addEventListener,t=new AbortController;t.abort();let r=!1;try{document.addEventListener("__",null,{get signal(){return r=!0,t.signal}})}catch(e){}r||(EventTarget.prototype.addEventListener=function(t,r,a){if(null!=a&&"object"==typeof a&&a.signal){var n=a.signal;if(!n.aborted){var o=this,i=Object.assign({},a);delete i.signal,e.call(this,t,r,i),e.call(n,"abort",function(){o.removeEventListener(t,r,a)})}}else e.call(this,t,r,a)})}p.weakRef()},weakRef:()=>{var e;"object"==typeof(e=function(){switch(!0){case"object"==typeof globalThis&&!!globalThis:return globalThis;case"object"==typeof self&&!!self:return self;case"object"==typeof window&&!!window:return window;case"object"==typeof s.g&&!!s.g:return s.g;case"function"==typeof Function:return Function("return this")()}return null}())&&e&&void 0===e.WeakRef&&(e.WeakRef=function(e){function t(t){e.set(this,t)}return t.prototype.deref=function(){return e.get(this)},t}(new WeakMap))},supportStyle:(e,t)=>{var r=document.createElement("div");return r.style[e]=t,r.style.cssText.includes(e)},compressionStream:async()=>{window.CompressionStream||await s.e(11).then(()=>s(11))}};Object.assign(window,{nrcPolyfill:p});let m={flagName:"netnr",flagResp:"uuid",flagLibs:"libs",flagSuffix:".md",flagToken:null,flagLocalUsed:!0,flagLocalPath:"/libs/index.json",flagLocalJson:null,flagProxyServer:"https://www.netnr.eu.org/api/Open/Proxy?url=",flagProxyUsed:!1,flagTitle:document.title,currentTheme:"light",domLayout:null,domAvatar:null,domUserInfo:null,domSearchInput:null,domSearchDropdown:null,domCardsContainer:null,domSettingsPanel:null,domThemeToggle:null};Object.assign(window,{nrVary:m});let g={init:async()=>{isSecureContext&&!window.webpackHotUpdatenetnr&&navigator.serviceWorker.register("/sw.js").then(e=>console.debug("SW registered: ",e)).catch(e=>console.debug("SW failed: ",e)),await p.init(),g.initTheme(),await s.e(962).then(()=>s(962)),h.localforage=await new u({name:"nr-cache"}).init(),h.instanceUser=await new u({name:"nr-user"}).init(),await g.render(),g.bindEvent();let e=(location.hash.length>1?location.hash:location.pathname).substring(1).split("/");if(""!==e[0]&&(m.flagName=e[0]),null!=e[1]&&""!==e[1]&&(m.flagResp=e[1]),null!=e[2]&&""!==e[2]&&(m.flagLibs=e[2]),"#_local"===location.hash)m.flagLocalUsed=!0,await h.setItem("local",m.flagLocalUsed);else{let e=await h.getItem("local");null!=e&&(m.flagLocalUsed=e)}if(m.flagLocalUsed){let e=document.querySelector('[data-action="local"] .uuid-toggle-switch');e&&e.classList.add("active")}let t=await h.getItem("uuid-token-github");null!=t&&t.length>10&&(m.flagToken=t);let r=await h.getItem("proxy");if(null!=r&&(m.flagProxyUsed=r),m.flagProxyUsed){let e=document.querySelector('[data-action="proxy"] .uuid-toggle-switch');e&&e.classList.add("active")}let a=document.getElementById("style0");a&&a.remove(),m.domLayout.classList.remove("invisible"),await g.load()},initTheme:()=>{let e=d.cookie(".theme"),t=window.matchMedia("(prefers-color-scheme: dark)").matches;g.setTheme(e||(t?"dark":"light"))},setTheme:e=>{document.documentElement.setAttribute("data-theme",e),d.saveTheme(e),m.currentTheme=e},toggleTheme:()=>{let e="light"===m.currentTheme?"dark":"light";g.setTheme(e)},toggleDropdown:(e,t)=>{void 0===t&&(t=!e.classList.contains("show")),e.classList.toggle("show",t)},createModal:(e,t,r=[])=>{let a=document.createElement("div");a.className="uuid-modal";let n=r.map(e=>`<button class="uuid-btn ${d.htmlEscape(e.class||"")}" data-action="${d.htmlEscape(e.action||"")}">${d.htmlEscape(e.text)}</button>`).join("");return a.innerHTML=`
            <div class="uuid-modal-content">
                <div class="uuid-modal-header">
                    <h3 class="uuid-modal-title">${d.htmlEscape(e)}</h3>
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
                ${r.length?`<div class="uuid-modal-footer">${n}</div>`:""}
            </div>
        `,document.body.appendChild(a),a.addEventListener("click",e=>{(e.target===a||e.target.closest('[data-action="close-modal"]'))&&g.closeModal(a)}),setTimeout(()=>a.classList.add("show"),10),a},closeModal:e=>{e.classList.remove("show"),setTimeout(()=>e.remove(),300)},showNotification:(e,t="info",r=3e3)=>{let a=document.createElement("div");a.className=`uuid-notification uuid-notification-${t}`,a.textContent=e,document.body.appendChild(a),requestAnimationFrame(()=>{a.classList.add("show")}),setTimeout(()=>{a.classList.remove("show"),setTimeout(()=>a.remove(),300)},r)},render:async()=>{let e=document.createElement("div");m.domLayout=e,e.className="invisible",e.innerHTML=`
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
        `,await g.viewUser(),await g.viewLink();try{let e=await h.instanceUser.getItem(`${m.flagName}:update-time`);e&&Date.now()-e>6048e5&&(await g.reqUser(m.flagName,!0),await g.reqLibs(m.flagName,m.flagResp,m.flagLibs,!0))}catch(e){console.debug("Auto refresh cache failed:",e)}},bindEvent:()=>{document.body.addEventListener("click",async function(e){let t=e.target,r=t.closest("[data-action]");r&&g.triggerAction(r.dataset.action,r),t.closest(".uuid-user-section")||g.toggleDropdown(m.domUserInfo,!1),t.closest(".uuid-settings-dropdown")||g.toggleDropdown(m.domSettingsPanel,!1)}),m.domSearchInput.addEventListener("keydown",function(e){if(["ArrowUp","ArrowDown"].includes(e.code))e.preventDefault(),g.searchArrow(e.code);else if("Enter"===e.key){e.preventDefault();let t=m.domSearchDropdown.querySelector(".active");t&&t.click()}}),m.domSearchInput.addEventListener("input",function(){g.searchLink(this.value.trim())}),m.domSearchInput.addEventListener("focus",function(){this.classList.add("focused")}),m.domSearchInput.addEventListener("blur",function(){this.classList.remove("focused")}),document.body.addEventListener("keydown",function(e){if("Escape"===e.code){e.preventDefault(),m.domSearchInput.value="",g.updateSilentSearch(""),g.toggleDropdown(m.domSearchDropdown,!1),m.domSearchInput.blur();return}if(document.activeElement&&!["INPUT","TEXTAREA"].includes(document.activeElement.tagName))if(e.ctrlKey&&["KeyQ","KeyK"].includes(e.code))e.preventDefault(),m.domSearchInput.focus(),g.updateSilentSearch("");else if("Backspace"===e.code)e.preventDefault(),g.updateSilentSearch(m.domSearchInput.dataset.search.slice(0,-1));else if("Enter"===e.key){if(e.preventDefault(),m.domSearchDropdown.classList.contains("show")){let e=m.domSearchDropdown.querySelector(".active");e&&e.click()}}else["ArrowUp","ArrowDown"].includes(e.code)?(e.preventDefault(),m.domSearchInput.dataset.search.length&&g.searchArrow(e.code)):/^[a-z0-9\.\_\-\/]$/i.test(e.key)&&!e.ctrlKey&&(m.domSearchInput.value="",document.documentElement.scrollTo(0,0),g.updateSilentSearch(m.domSearchInput.dataset.search+e.key))})},triggerAction:async(e,t)=>{switch(e){case"toggle-user-info":g.toggleDropdown(m.domUserInfo);break;case"toggle-settings":g.toggleDropdown(m.domSettingsPanel);break;case"theme":g.toggleTheme(),m.domThemeToggle.classList.toggle("dark","dark"===m.currentTheme);break;case"token":{let e=`
                        <div class="uuid-form-group">
                            <label class="uuid-label">GitHub Token</label>
                            <input class="uuid-input" type="password" placeholder="ghp_xxxxxxxxxxxxxxxxxxxx" value="${d.htmlEscape(m.flagToken||"")}" />
                            <p style="margin-top: 8px; color: var(--text-secondary); font-size: 14px;">
                                匿名访问限制（60次/小时）<br>
                                <a href="https://github.com/settings/tokens" target="_blank">获取Token</a>
                            </p>
                        </div>
                    `,t=g.createModal("设置 GitHub Token",e,[{text:"取消",action:"close-modal"},{text:"保存",action:"save-token",class:"uuid-btn-primary"}]);t.addEventListener("click",async e=>{if("save-token"===e.target.dataset.action){let e=t.querySelector("input").value.trim();if(""===e)m.flagToken=null,await h.removeItem("uuid-token-github"),g.showNotification("Token已清除","success");else{if(!(e.length>10))return void g.showNotification("Token格式不正确","error");m.flagToken=e,await h.setItem("uuid-token-github",e),g.showNotification("Token已保存","success")}g.closeModal(t);let r=document.querySelector(".uuid-token-indicator");r&&r.classList.toggle("active",null!=m.flagToken)}})}break;case"local":{let e=`
                        <p>确定要切换到 ${m.flagLocalUsed?"GitHub 线上":"本地"} 模式吗？</p>
                        <div style="margin: 16px 0; padding: 12px; background: var(--bg-secondary); border-radius: 6px; font-size: 14px;">
                            <strong>当前：</strong> ${m.flagLocalUsed?"本地模式":"GitHub 线上模式"}<br>
                            <strong>切换到：</strong> ${m.flagLocalUsed?"GitHub 线上模式":"本地模式"}
                        </div>
                    `;g.createModal("切换模式",e,[{text:"取消",action:"close-modal"},{text:"确定",action:"confirm-local",class:"uuid-btn-primary"}]).addEventListener("click",async e=>{"confirm-local"===e.target.dataset.action&&(m.flagLocalUsed=!m.flagLocalUsed,await h.setItem("local",m.flagLocalUsed),"#_local"===location.hash&&(location.hash=""),location.reload())})}break;case"proxy":m.flagProxyUsed=!m.flagProxyUsed,await h.setItem("proxy",m.flagProxyUsed),t.querySelector(".uuid-toggle-switch").classList.toggle("active",m.flagProxyUsed),g.showNotification(m.flagProxyUsed?"GitHub 代理已启用":"GitHub 代理已禁用","success");break;case"reload":for(let e of(await h.instanceUser.keys()))e.startsWith(`${m.flagName}:`)&&await h.instanceUser.removeItem(e);await g.load();break;case"convert":{let e=`
                        <div class="uuid-form-group">
                            <label class="uuid-label">选择书签文件</label>
                            <input type="file" class="uuid-input" accept=".html" />
                        </div>
                        <div class="uuid-form-group">
                            <label class="uuid-label">转换结果</label>
                            <textarea class="uuid-input uuid-textarea" placeholder="转换结果将在此显示..." readonly></textarea>
                        </div>
                    `,t=g.createModal("转换HTML书签",e,[{text:"关闭",action:"close-modal"}]),r=t.querySelector('input[type="file"]'),a=t.querySelector("textarea");r.addEventListener("change",async e=>{let t=e.target.files[0];if(t)try{let e=await c.reader(t),r=[],n=document.createElement("div");n.innerHTML=e;let o=n.querySelector("h1");o&&r.push("# "+o.innerHTML),g.convertHtml(n,r),a.value=r.join(`\r
`),g.showNotification("转换完成","success")}catch(e){console.error(e),g.showNotification("转换失败","error")}})}break;case"about":{let e=`
                        <div style="line-height: 1.6;">
                            <p><strong>GitHub:</strong> <a href="https://github.com/netnr" target="_blank">https://github.com/netnr</a></p>
                            <p><strong>联系打赏:</strong> <a href="https://i.netnr.eu.org" target="_blank">https://i.netnr.eu.org</a></p>
                            <hr style="margin: 16px 0; border: none; border-top: 1px solid var(--border-color);">
                            <p>缓存后可离线使用</p>
                            <hr style="margin: 16px 0; border: none; border-top: 1px solid var(--border-color);">
                            <p>Fork 项目，从浏览器导出书签 HTML，再转换书签为 Markdown，保存到 libs/*.md</p>
                            <p>私有化部署，更新索引文件 libs/index.json，页面再启用 本地 Local</p>
                            <hr style="margin: 16px 0; border: none; border-top: 1px solid var(--border-color);">
                            <p>uuid.fun 于 2028-11-09 8:00 到期，计划不再续费，启用子域名：<a href="https://uu.netnr.eu.org" target="_blank">https://uu.netnr.eu.org</a></p>
                        </div>
                    `;g.createModal("关于",e,[{text:"关闭",action:"close-modal"}])}}},reqUser:async(e,t)=>{let r=`https://api.github.com/users/${e}`,a=`${e}:${r}`,n=await h.instanceUser.getItem(a);return(null==n||t)&&(n=await g.reqServer(r))&&(await h.instanceUser.setItem(a,n),await h.instanceUser.setItem(`${e}:update-time`,Date.now())),n},reqLibs:async(e,t,r,a)=>{let n=`https://api.github.com/repos/${e}/${t}/contents/${r}`,o=`${e}:${n}`,i=await h.instanceUser.getItem(o);return(null==i||a)&&(i=await g.reqServer(n))&&await h.instanceUser.setItem(o,i),i},reqRaw:async e=>{let t=`${m.flagName}:${e}`,r=await h.instanceUser.getItem(t);return null==r&&(r=await g.reqServer(`${e}?_${d.random()}`,{type:"text"}))&&await h.instanceUser.setItem(t,r),r},convertHtml:(e,t)=>{for(let r=0;r<e.children.length;r++){let a=e.children[r];switch(a.nodeName){case"H3":t.push(""),t.push("### "+a.innerHTML);break;case"DL":case"P":g.convertHtml(a,t);break;case"DT":if(1===a.children.length){let e=a.querySelector("a");if(e){let r="["+e.innerHTML.replace(/`/g,"\\`")+"]("+e.href;e.title&&(r+=' "'+e.title+'"'),t.push("- "+r+")")}}else g.convertHtml(a,t)}}},viewUser:async()=>{let e;if(m.flagLocalUsed?(m.flagLocalJson=await g.reqServer(m.flagLocalPath),m.flagLocalJson?e=m.flagLocalJson.user:g.showNotification("加载失败","error")):e=await g.reqUser(m.flagName),e){m.domAvatar.onerror=function(){m.domAvatar.src="/favicon.ico",m.domAvatar.onerror=null},m.domAvatar.src=e.avatar_url;let t=d.htmlEscape(e.name||e.login),r=e.bio?d.htmlEscape(e.bio):"",a=e.company?d.htmlEscape(e.company):"",n=e.location?d.htmlEscape(e.location):"",o=e.blog?d.htmlEscape(e.blog):"",i=d.htmlEscape(e.login),s=`
                <div class="uuid-user-info-content">
                    <div class="uuid-user-name">
                        <a href="https://github.com/${i}" target="_blank">${t}</a>
                    </div>
                    ${r?`<div class="uuid-user-bio">${r}</div>`:""}
                    <div class="uuid-user-details">
                        ${a?`
                            <div class="uuid-user-detail">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M3 21h18"></path>
                                    <path d="M5 21V7l8-4v18"></path>
                                    <path d="M19 21V11l-6-4"></path>
                                </svg>
                                <span>${a}</span>
                            </div>
                        `:""}
                        ${n?`
                            <div class="uuid-user-detail">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                <span>${n}</span>
                            </div>
                        `:""}
                        ${o?`
                            <div class="uuid-user-detail">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                </svg>
                                <a href="${o}" target="_blank">${o}</a>
                            </div>
                        `:""}
                    </div>
                </div>
            `;m.domUserInfo.innerHTML=s,document.title=`${e.login} - ${m.flagTitle}`}},emptyState:(e,t,r)=>{let a={empty:'<circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path>',error:'<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'};return`
            <div class="uuid-empty">
                <svg class="uuid-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    ${a[e]||a.error}
                </svg>
                <div class="uuid-empty-title">${d.htmlEscape(t)}</div>
                <div class="uuid-empty-description">${d.htmlEscape(r)}</div>
            </div>
        `},parseSections:e=>{let t=document.createElement("div");t.innerHTML=e;let r=[],a=null;return t.childNodes.forEach(e=>{e.nodeType===Node.ELEMENT_NODE&&("H3"===e.tagName?(a&&r.push(a),a={title:e.textContent,links:[]}):("UL"===e.tagName||"OL"===e.tagName)&&(a||(a={title:null,links:[]}),e.querySelectorAll("a").forEach(e=>{let t=e.textContent.trim();if(t.includes("http")){let e=t.split(/\s+/);e.length>1&&/^https?:\/\//.test(e[e.length-1])&&(t=e.slice(0,-1).join(" "))}a.links.push({title:t,url:e.href,tip:e.title||""})})))}),a&&r.push(a),r},renderSections:e=>e.map(e=>`
            <div class="uuid-card-section">
                ${e.title?`
                    <h4 class="uuid-card-section-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 11l3 3L22 4"></path>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        ${d.htmlEscape(e.title)}
                    </h4>
                `:""}
                <div class="uuid-links-grid">
                    ${e.links.map(e=>`
                        <a href="${d.htmlEscape(e.url)}" target="_blank" class="uuid-link"${e.tip?` title="${d.htmlEscape(e.tip)}"`:""}>
                            ${d.htmlEscape(e.title)}
                        </a>
                    `).join("")}
                </div>
            </div>
        `).join(""),viewLink:async()=>{let e;if(m.flagLocalUsed?m.flagLocalJson&&(e=m.flagLocalJson.libs):e=await g.reqLibs(m.flagName,m.flagResp,m.flagLibs),e){let t=e.filter(e=>"file"===e.type&&e.name.endsWith(m.flagSuffix)),r=t.map((e,t)=>{let r=e.name.substring(0,e.name.length-m.flagSuffix.length);return`
                    <div class="uuid-card" id="card-${t}">
                        <div class="uuid-card-header">
                            <h3 class="uuid-card-title">${d.htmlEscape(r)}</h3>
                        </div>
                        <div class="uuid-card-content">
                            <div class="uuid-loading">
                                <div class="uuid-loading-spinner"></div>
                                <span>加载中...</span>
                            </div>
                        </div>
                    </div>
                `});m.domCardsContainer.innerHTML=r.join("");let a=await s.e(394).then(()=>s(394));for(let e=0;e<t.length;e++){let r=t[e],n=document.querySelector(`#card-${e} .uuid-card-content`);try{let t=await g.reqRaw(r.download_url);if(t){let r=g.parseSections(a.parse(t));n.innerHTML=g.renderSections(r)||g.emptyState("empty","暂无内容","此文件暂无有效的链接内容");let o=r.reduce((e,t)=>e+t.links.length,0),i=document.querySelector(`#card-${e} .uuid-card-title`);i&&o>0&&(i.innerHTML+=` <span class="uuid-card-count">(${o})</span>`)}else n.innerHTML=g.emptyState("error","加载失败","无法加载此文件的内容")}catch(e){console.error("Error loading card content:",e),n.innerHTML=g.emptyState("error","加载错误","处理文件内容时出现错误")}}m.domCardsContainer.dataset.ended=!0}else m.domCardsContainer.innerHTML=g.emptyState("error","加载失败","无法获取收藏夹列表")},updateSilentSearch:e=>{m.domSearchInput.dataset.search=e,m.domSearchInput.placeholder=e.length?e:"静默搜索 (Ctrl+K)...",g.searchLink(e)},searchArrow:e=>{let t=m.domSearchDropdown.querySelectorAll(".uuid-search-item");if(0===t.length)return;let r=Array.from(t),a=r.findIndex(e=>e.classList.contains("active"));a>=0&&r[a].classList.remove("active"),"ArrowUp"===e?a=a<=0?t.length-1:a-1:"ArrowDown"===e&&(a=a>=t.length-1?0:a+1),a>=0&&a<t.length&&r[a].classList.add("active")},searchLink:e=>{if(m.domCardsContainer.dataset.ended){let t=[];if(""!==e.trim()){let r=e.toLowerCase(),a=m.domCardsContainer.querySelectorAll("a");for(let e=0;e<a.length;e++){let n=a[e];if(`${n.href},${n.textContent},${n.title||""}`.toLowerCase().includes(r)&&(t.push({url:n.href,title:n.textContent.trim(),tip:n.title||""}),t.length>=7))break}}if(t.length>0){let e=t.map((e,t)=>`
                    <a href="${d.htmlEscape(e.url)}" target="_blank" class="uuid-search-item ${0===t?"active":""}"${e.tip?` title="${d.htmlEscape(e.tip)}"`:""}>
                        <div class="uuid-search-item-url">${d.htmlEscape(e.url)}</div>
                        <div class="uuid-search-item-title">${d.htmlEscape(e.title)}</div>
                    </a>
                `).join("");m.domSearchDropdown.innerHTML=e,g.toggleDropdown(m.domSearchDropdown,!0)}else g.toggleDropdown(m.domSearchDropdown,!1)}},reqServer:async(e,t)=>{t=t||{},null!=m.flagToken&&m.flagToken.length>10&&!e.includes("githubusercontent")&&(t.headers=t.headers||{},t.headers.authorization=`token ${m.flagToken}`),m.flagProxyUsed&&!m.flagLocalUsed&&(e=`${m.flagProxyServer}${encodeURIComponent(e)}`);let r=await d.fetch(e,t);if(r.error)console.error("Network error:",r.error),g.showNotification("网络错误","error");else if(r.resp.ok){if(r.result)return r.result}else 403===r.resp.status?g.showNotification("请设置 Token","warning"):g.showNotification(`请求失败 (${r.resp.status})`,"error")}};Object.assign(window,{nrWeb:g}),"loading"==document.readyState?document.addEventListener("DOMContentLoaded",g.init):g.init()})();