/*! third party licenses: js/vendor.LICENSE.txt */
import{g as i}from"./modulepreload-polyfill-B7YtfYXt.chunk.mjs";var a=(o=>(o[o.Debug=0]="Debug",o[o.Info=1]="Info",o[o.Warn=2]="Warn",o[o.Error=3]="Error",o[o.Fatal=4]="Fatal",o))(a||{}),l=Object.defineProperty,u=(o,e,t)=>e in o?l(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t,g=(o,e,t)=>(u(o,e+"",t),t);class h{constructor(e){g(this,"context"),this.context=e||{}}formatMessage(e,t,s){let r="["+a[t].toUpperCase()+"] ";return s&&s.app&&(r+=s.app+": "),typeof e=="string"?r+e:(r+="Unexpected ".concat(e.name),e.message&&(r+=' "'.concat(e.message,'"')),t===a.Debug&&e.stack&&(r+="\n\nStack trace:\n".concat(e.stack)),r)}log(e,t,s){var r,n;if(!(typeof((r=this.context)==null?void 0:r.level)=="number"&&e<((n=this.context)==null?void 0:n.level)))switch(typeof t=="object"&&(s==null?void 0:s.error)===void 0&&(s.error=t),e){case a.Debug:console.debug(this.formatMessage(t,a.Debug,s),s);break;case a.Info:console.info(this.formatMessage(t,a.Info,s),s);break;case a.Warn:console.warn(this.formatMessage(t,a.Warn,s),s);break;case a.Error:console.error(this.formatMessage(t,a.Error,s),s);break;case a.Fatal:default:console.error(this.formatMessage(t,a.Fatal,s),s);break}}debug(e,t){this.log(a.Debug,e,Object.assign({},this.context,t))}info(e,t){this.log(a.Info,e,Object.assign({},this.context,t))}warn(e,t){this.log(a.Warn,e,Object.assign({},this.context,t))}error(e,t){this.log(a.Error,e,Object.assign({},this.context,t))}fatal(e,t){this.log(a.Fatal,e,Object.assign({},this.context,t))}}function b(o){return new h(o)}var d=Object.defineProperty,f=(o,e,t)=>e in o?d(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t,c=(o,e,t)=>(f(o,typeof e!="symbol"?e+"":e,t),t);class v{constructor(e){c(this,"context"),c(this,"factory"),this.context={},this.factory=e}setApp(e){return this.context.app=e,this}setLogLevel(e){return this.context.level=e,this}setUid(e){return this.context.uid=e,this}detectUser(){const e=i();return e!==null&&(this.context.uid=e.uid),this}detectLogLevel(){const e=this,t=()=>{var s,r;document.readyState==="complete"||document.readyState==="interactive"?(e.context.level=(r=(s=window._oc_config)==null?void 0:s.loglevel)!=null?r:a.Warn,window._oc_debug&&(e.context.level=a.Debug),document.removeEventListener("readystatechange",t)):document.addEventListener("readystatechange",t)};return t(),this}build(){return this.context.level===void 0&&this.detectLogLevel(),this.factory(this.context)}}function x(){return new v(b)}export{x as g};