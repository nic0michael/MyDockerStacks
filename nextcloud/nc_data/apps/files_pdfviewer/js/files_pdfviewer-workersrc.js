(()=>{var e={7737:(e,t,r)=>{const n=r(5503),{MAX_LENGTH:i,MAX_SAFE_INTEGER:s}=r(5519),{safeRe:o,t:a}=r(8238),c=r(4433),{compareIdentifiers:E}=r(3242);class l{constructor(e,t){if(t=c(t),e instanceof l){if(e.loose===!!t.loose&&e.includePrerelease===!!t.includePrerelease)return e;e=e.version}else if("string"!=typeof e)throw new TypeError(`Invalid version. Must be a string. Got type "${typeof e}".`);if(e.length>i)throw new TypeError(`version is longer than ${i} characters`);n("SemVer",e,t),this.options=t,this.loose=!!t.loose,this.includePrerelease=!!t.includePrerelease;const r=e.trim().match(t.loose?o[a.LOOSE]:o[a.FULL]);if(!r)throw new TypeError(`Invalid Version: ${e}`);if(this.raw=e,this.major=+r[1],this.minor=+r[2],this.patch=+r[3],this.major>s||this.major<0)throw new TypeError("Invalid major version");if(this.minor>s||this.minor<0)throw new TypeError("Invalid minor version");if(this.patch>s||this.patch<0)throw new TypeError("Invalid patch version");r[4]?this.prerelease=r[4].split(".").map((e=>{if(/^[0-9]+$/.test(e)){const t=+e;if(t>=0&&t<s)return t}return e})):this.prerelease=[],this.build=r[5]?r[5].split("."):[],this.format()}format(){return this.version=`${this.major}.${this.minor}.${this.patch}`,this.prerelease.length&&(this.version+=`-${this.prerelease.join(".")}`),this.version}toString(){return this.version}compare(e){if(n("SemVer.compare",this.version,this.options,e),!(e instanceof l)){if("string"==typeof e&&e===this.version)return 0;e=new l(e,this.options)}return e.version===this.version?0:this.compareMain(e)||this.comparePre(e)}compareMain(e){return e instanceof l||(e=new l(e,this.options)),E(this.major,e.major)||E(this.minor,e.minor)||E(this.patch,e.patch)}comparePre(e){if(e instanceof l||(e=new l(e,this.options)),this.prerelease.length&&!e.prerelease.length)return-1;if(!this.prerelease.length&&e.prerelease.length)return 1;if(!this.prerelease.length&&!e.prerelease.length)return 0;let t=0;do{const r=this.prerelease[t],i=e.prerelease[t];if(n("prerelease compare",t,r,i),void 0===r&&void 0===i)return 0;if(void 0===i)return 1;if(void 0===r)return-1;if(r!==i)return E(r,i)}while(++t)}compareBuild(e){e instanceof l||(e=new l(e,this.options));let t=0;do{const r=this.build[t],i=e.build[t];if(n("build compare",t,r,i),void 0===r&&void 0===i)return 0;if(void 0===i)return 1;if(void 0===r)return-1;if(r!==i)return E(r,i)}while(++t)}inc(e,t,r){switch(e){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",t,r);break;case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",t,r);break;case"prepatch":this.prerelease.length=0,this.inc("patch",t,r),this.inc("pre",t,r);break;case"prerelease":0===this.prerelease.length&&this.inc("patch",t,r),this.inc("pre",t,r);break;case"major":0===this.minor&&0===this.patch&&0!==this.prerelease.length||this.major++,this.minor=0,this.patch=0,this.prerelease=[];break;case"minor":0===this.patch&&0!==this.prerelease.length||this.minor++,this.patch=0,this.prerelease=[];break;case"patch":0===this.prerelease.length&&this.patch++,this.prerelease=[];break;case"pre":{const e=Number(r)?1:0;if(!t&&!1===r)throw new Error("invalid increment argument: identifier is empty");if(0===this.prerelease.length)this.prerelease=[e];else{let n=this.prerelease.length;for(;--n>=0;)"number"==typeof this.prerelease[n]&&(this.prerelease[n]++,n=-2);if(-1===n){if(t===this.prerelease.join(".")&&!1===r)throw new Error("invalid increment argument: identifier already exists");this.prerelease.push(e)}}if(t){let n=[t,e];!1===r&&(n=[t]),0===E(this.prerelease[0],t)?isNaN(this.prerelease[1])&&(this.prerelease=n):this.prerelease=n}break}default:throw new Error(`invalid increment argument: ${e}`)}return this.raw=this.format(),this.build.length&&(this.raw+=`+${this.build.join(".")}`),this}}e.exports=l},2426:(e,t,r)=>{const n=r(7737);e.exports=(e,t)=>new n(e,t).major},7488:(e,t,r)=>{const n=r(7737);e.exports=(e,t,r=!1)=>{if(e instanceof n)return e;try{return new n(e,t)}catch(e){if(!r)return null;throw e}}},7907:(e,t,r)=>{const n=r(7488);e.exports=(e,t)=>{const r=n(e,t);return r?r.version:null}},5519:e=>{const t=Number.MAX_SAFE_INTEGER||9007199254740991;e.exports={MAX_LENGTH:256,MAX_SAFE_COMPONENT_LENGTH:16,MAX_SAFE_BUILD_LENGTH:250,MAX_SAFE_INTEGER:t,RELEASE_TYPES:["major","premajor","minor","preminor","patch","prepatch","prerelease"],SEMVER_SPEC_VERSION:"2.0.0",FLAG_INCLUDE_PRERELEASE:1,FLAG_LOOSE:2}},5503:(e,t,r)=>{var n=r(4155);const i="object"==typeof n&&n.env&&n.env.NODE_DEBUG&&/\bsemver\b/i.test(n.env.NODE_DEBUG)?(...e)=>console.error("SEMVER",...e):()=>{};e.exports=i},3242:e=>{const t=/^[0-9]+$/,r=(e,r)=>{const n=t.test(e),i=t.test(r);return n&&i&&(e=+e,r=+r),e===r?0:n&&!i?-1:i&&!n?1:e<r?-1:1};e.exports={compareIdentifiers:r,rcompareIdentifiers:(e,t)=>r(t,e)}},4433:e=>{const t=Object.freeze({loose:!0}),r=Object.freeze({});e.exports=e=>e?"object"!=typeof e?t:e:r},8238:(e,t,r)=>{const{MAX_SAFE_COMPONENT_LENGTH:n,MAX_SAFE_BUILD_LENGTH:i,MAX_LENGTH:s}=r(5519),o=r(5503),a=(t=e.exports={}).re=[],c=t.safeRe=[],E=t.src=[],l=t.t={};let h=0;const u="[a-zA-Z0-9-]",p=[["\\s",1],["\\d",s],[u,i]],I=(e,t,r)=>{const n=(e=>{for(const[t,r]of p)e=e.split(`${t}*`).join(`${t}{0,${r}}`).split(`${t}+`).join(`${t}{1,${r}}`);return e})(t),i=h++;o(e,i,t),l[e]=i,E[i]=t,a[i]=new RegExp(t,r?"g":void 0),c[i]=new RegExp(n,r?"g":void 0)};I("NUMERICIDENTIFIER","0|[1-9]\\d*"),I("NUMERICIDENTIFIERLOOSE","\\d+"),I("NONNUMERICIDENTIFIER",`\\d*[a-zA-Z-]${u}*`),I("MAINVERSION",`(${E[l.NUMERICIDENTIFIER]})\\.(${E[l.NUMERICIDENTIFIER]})\\.(${E[l.NUMERICIDENTIFIER]})`),I("MAINVERSIONLOOSE",`(${E[l.NUMERICIDENTIFIERLOOSE]})\\.(${E[l.NUMERICIDENTIFIERLOOSE]})\\.(${E[l.NUMERICIDENTIFIERLOOSE]})`),I("PRERELEASEIDENTIFIER",`(?:${E[l.NUMERICIDENTIFIER]}|${E[l.NONNUMERICIDENTIFIER]})`),I("PRERELEASEIDENTIFIERLOOSE",`(?:${E[l.NUMERICIDENTIFIERLOOSE]}|${E[l.NONNUMERICIDENTIFIER]})`),I("PRERELEASE",`(?:-(${E[l.PRERELEASEIDENTIFIER]}(?:\\.${E[l.PRERELEASEIDENTIFIER]})*))`),I("PRERELEASELOOSE",`(?:-?(${E[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${E[l.PRERELEASEIDENTIFIERLOOSE]})*))`),I("BUILDIDENTIFIER",`${u}+`),I("BUILD",`(?:\\+(${E[l.BUILDIDENTIFIER]}(?:\\.${E[l.BUILDIDENTIFIER]})*))`),I("FULLPLAIN",`v?${E[l.MAINVERSION]}${E[l.PRERELEASE]}?${E[l.BUILD]}?`),I("FULL",`^${E[l.FULLPLAIN]}$`),I("LOOSEPLAIN",`[v=\\s]*${E[l.MAINVERSIONLOOSE]}${E[l.PRERELEASELOOSE]}?${E[l.BUILD]}?`),I("LOOSE",`^${E[l.LOOSEPLAIN]}$`),I("GTLT","((?:<|>)?=?)"),I("XRANGEIDENTIFIERLOOSE",`${E[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`),I("XRANGEIDENTIFIER",`${E[l.NUMERICIDENTIFIER]}|x|X|\\*`),I("XRANGEPLAIN",`[v=\\s]*(${E[l.XRANGEIDENTIFIER]})(?:\\.(${E[l.XRANGEIDENTIFIER]})(?:\\.(${E[l.XRANGEIDENTIFIER]})(?:${E[l.PRERELEASE]})?${E[l.BUILD]}?)?)?`),I("XRANGEPLAINLOOSE",`[v=\\s]*(${E[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${E[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${E[l.XRANGEIDENTIFIERLOOSE]})(?:${E[l.PRERELEASELOOSE]})?${E[l.BUILD]}?)?)?`),I("XRANGE",`^${E[l.GTLT]}\\s*${E[l.XRANGEPLAIN]}$`),I("XRANGELOOSE",`^${E[l.GTLT]}\\s*${E[l.XRANGEPLAINLOOSE]}$`),I("COERCEPLAIN",`(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`),I("COERCE",`${E[l.COERCEPLAIN]}(?:$|[^\\d])`),I("COERCEFULL",E[l.COERCEPLAIN]+`(?:${E[l.PRERELEASE]})?`+`(?:${E[l.BUILD]})?(?:$|[^\\d])`),I("COERCERTL",E[l.COERCE],!0),I("COERCERTLFULL",E[l.COERCEFULL],!0),I("LONETILDE","(?:~>?)"),I("TILDETRIM",`(\\s*)${E[l.LONETILDE]}\\s+`,!0),t.tildeTrimReplace="$1~",I("TILDE",`^${E[l.LONETILDE]}${E[l.XRANGEPLAIN]}$`),I("TILDELOOSE",`^${E[l.LONETILDE]}${E[l.XRANGEPLAINLOOSE]}$`),I("LONECARET","(?:\\^)"),I("CARETTRIM",`(\\s*)${E[l.LONECARET]}\\s+`,!0),t.caretTrimReplace="$1^",I("CARET",`^${E[l.LONECARET]}${E[l.XRANGEPLAIN]}$`),I("CARETLOOSE",`^${E[l.LONECARET]}${E[l.XRANGEPLAINLOOSE]}$`),I("COMPARATORLOOSE",`^${E[l.GTLT]}\\s*(${E[l.LOOSEPLAIN]})$|^$`),I("COMPARATOR",`^${E[l.GTLT]}\\s*(${E[l.FULLPLAIN]})$|^$`),I("COMPARATORTRIM",`(\\s*)${E[l.GTLT]}\\s*(${E[l.LOOSEPLAIN]}|${E[l.XRANGEPLAIN]})`,!0),t.comparatorTrimReplace="$1$2$3",I("HYPHENRANGE",`^\\s*(${E[l.XRANGEPLAIN]})\\s+-\\s+(${E[l.XRANGEPLAIN]})\\s*$`),I("HYPHENRANGELOOSE",`^\\s*(${E[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${E[l.XRANGEPLAINLOOSE]})\\s*$`),I("STAR","(<|>)?=?\\s*\\*"),I("GTE0","^\\s*>=\\s*0\\.0\\.0\\s*$"),I("GTE0PRE","^\\s*>=\\s*0\\.0\\.0-0\\s*$")},4155:e=>{var t,r,n=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function o(e){if(t===setTimeout)return setTimeout(e,0);if((t===i||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(r){try{return t.call(null,e,0)}catch(r){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:i}catch(e){t=i}try{r="function"==typeof clearTimeout?clearTimeout:s}catch(e){r=s}}();var a,c=[],E=!1,l=-1;function h(){E&&a&&(E=!1,a.length?c=a.concat(c):l=-1,c.length&&u())}function u(){if(!E){var e=o(h);E=!0;for(var t=c.length;t;){for(a=c,c=[];++l<t;)a&&a[l].run();l=-1,t=c.length}a=null,E=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===s||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{return r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function I(){}n.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];c.push(new p(e,t)),1!==c.length||E||o(u)},p.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.browser=!0,n.env={},n.argv=[],n.version="",n.versions={},n.on=I,n.addListener=I,n.once=I,n.off=I,n.removeListener=I,n.removeAllListeners=I,n.emit=I,n.prependListener=I,n.prependOnceListener=I,n.listeners=function(e){return[]},n.binding=function(e){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(e){throw new Error("process.chdir is not supported")},n.umask=function(){return 0}}},t={};function r(n){var i=t[n];if(void 0!==i)return i.exports;var s=t[n]={exports:{}};return e[n](s,s.exports,r),s.exports}(()=>{"use strict";var e=r(7907),t=r(2426);class n{bus;constructor(r){"function"==typeof r.getVersion&&e(r.getVersion())?t(r.getVersion())!==t(this.getVersion())&&console.warn("Proxying an event bus of version "+r.getVersion()+" with "+this.getVersion()):console.warn("Proxying an event bus with an unknown or invalid version"),this.bus=r}getVersion(){return"3.3.1"}subscribe(e,t){this.bus.subscribe(e,t)}unsubscribe(e,t){this.bus.unsubscribe(e,t)}emit(e,t){this.bus.emit(e,t)}}class i{handlers=new Map;getVersion(){return"3.3.1"}subscribe(e,t){this.handlers.set(e,(this.handlers.get(e)||[]).concat(t))}unsubscribe(e,t){this.handlers.set(e,(this.handlers.get(e)||[]).filter((e=>e!==t)))}emit(e,t){(this.handlers.get(e)||[]).forEach((e=>{try{e(t)}catch(e){console.error("could not invoke event listener",e)}}))}}let s,o=null;function a(){return null!==o?o:"undefined"==typeof window?new Proxy({},{get:()=>()=>console.error("Window not available, EventBus can not be established!")}):(window.OC?._eventBus&&void 0===window._nc_event_bus&&(console.warn("found old event bus instance at OC._eventBus. Update your version!"),window._nc_event_bus=window.OC._eventBus),o=void 0!==window?._nc_event_bus?new n(window._nc_event_bus):window._nc_event_bus=new i,o)}const c=[];var E,l;let h;E="csrf-token-update",l=e=>{s=e.token,c.forEach((e=>{try{e(s)}catch(e){console.error("error updating CSRF token observer",e)}}))},a().subscribe(E,l);const u=(e,t)=>e?e.getAttribute(t):null;var p=(e=>(e[e.Debug=0]="Debug",e[e.Info=1]="Info",e[e.Warn=2]="Warn",e[e.Error=3]="Error",e[e.Fatal=4]="Fatal",e))(p||{}),I=Object.defineProperty,d=(e,t,r)=>(((e,t,r)=>{t in e?I(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r})(e,"symbol"!=typeof t?t+"":t,r),r);class f{constructor(e){d(this,"context"),this.context=e||{}}formatMessage(e,t,r){let n="["+p[t].toUpperCase()+"] ";return r&&r.app&&(n+=r.app+": "),"string"==typeof e?n+e:(n+="Unexpected ".concat(e.name),e.message&&(n+=' "'.concat(e.message,'"')),t===p.Debug&&e.stack&&(n+="\n\nStack trace:\n".concat(e.stack)),n)}log(e,t,r){var n,i;if(!("number"==typeof(null==(n=this.context)?void 0:n.level)&&e<(null==(i=this.context)?void 0:i.level)))switch("object"==typeof t&&void 0===(null==r?void 0:r.error)&&(r.error=t),e){case p.Debug:console.debug(this.formatMessage(t,p.Debug,r),r);break;case p.Info:console.info(this.formatMessage(t,p.Info,r),r);break;case p.Warn:console.warn(this.formatMessage(t,p.Warn,r),r);break;case p.Error:console.error(this.formatMessage(t,p.Error,r),r);break;case p.Fatal:default:console.error(this.formatMessage(t,p.Fatal,r),r)}}debug(e,t){this.log(p.Debug,e,Object.assign({},this.context,t))}info(e,t){this.log(p.Info,e,Object.assign({},this.context,t))}warn(e,t){this.log(p.Warn,e,Object.assign({},this.context,t))}error(e,t){this.log(p.Error,e,Object.assign({},this.context,t))}fatal(e,t){this.log(p.Fatal,e,Object.assign({},this.context,t))}}function L(e){return new f(e)}var R=Object.defineProperty,N=(e,t,r)=>(((e,t,r)=>{t in e?R(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r})(e,"symbol"!=typeof t?t+"":t,r),r);class O{constructor(e){N(this,"context"),N(this,"factory"),this.context={},this.factory=e}setApp(e){return this.context.app=e,this}setLogLevel(e){return this.context.level=e,this}setUid(e){return this.context.uid=e,this}detectUser(){const e=function(){if(void 0!==h)return h;const e=document?.getElementsByTagName("head")[0];if(!e)return null;const t=u(e,"data-user");return null===t?(h=null,h):(h={uid:t,displayName:u(e,"data-user-displayname"),isAdmin:!!window._oc_isadmin},h)}();return null!==e&&(this.context.uid=e.uid),this}detectLogLevel(){const e=this,t=()=>{var r,n;"complete"===document.readyState||"interactive"===document.readyState?(e.context.level=null!=(n=null==(r=window._oc_config)?void 0:r.loglevel)?n:p.Warn,window._oc_debug&&(e.context.level=p.Debug),document.removeEventListener("readystatechange",t)):document.addEventListener("readystatechange",t)};return t(),this}build(){return void 0===this.context.level&&this.detectLogLevel(),this.factory(this.context)}}function A(){return new O(L)}const m=A().setApp("Files_PDFViewer").detectUser().build();window.location===window.parent.location&&(window.location.href="/");const w=window.location.search,g=new URLSearchParams(w).get("canDownload");document.addEventListener("DOMContentLoaded",(function(){const e=document.getElementsByTagName("head")[0];if(PDFViewerApplicationOptions.set("disablePreferences",!0),PDFViewerApplicationOptions.set("externalLinkTarget",2),PDFViewerApplicationOptions.set("isEvalSupported",!1),PDFViewerApplicationOptions.set("workerSrc",e.getAttribute("data-workersrc")),PDFViewerApplicationOptions.set("cMapUrl",e.getAttribute("data-cmapurl")),PDFViewerApplicationOptions.set("sandboxBundleSrc",e.getAttribute("data-sandbox")),PDFViewerApplicationOptions.set("enablePermissions",!0),PDFViewerApplicationOptions.set("imageResourcesPath","./js/pdfjs/web/images/"),PDFViewerApplicationOptions.set("enableScripting",!0===e.getAttribute("data-enableScripting")),"0"===g){const e=window.document.querySelector(".pdfViewer");e&&e.classList.add("disabledTextSelection"),PDFViewerApplication&&(PDFViewerApplication.download=function(){},delete PDFViewerApplication.supportsPrinting,PDFViewerApplication.supportsPrinting=!1,PDFViewerApplication.beforePrint=function(){}),m.info("Download, print and user interaction disabled")}else m.info("Download and print available");m.debug("Initialized files_pdfviewer",PDFViewerApplicationOptions.getAll())}),!0)})()})();
//# sourceMappingURL=files_pdfviewer-workersrc.js.map?v=a3ce546e52451b70e375