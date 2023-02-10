"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[5375],{9613:(e,n,r)=>{r.d(n,{Zo:()=>p,kt:()=>m});var t=r(9496);function o(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function i(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function s(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?i(Object(r),!0).forEach((function(n){o(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function a(e,n){if(null==e)return{};var r,t,o=function(e,n){if(null==e)return{};var r,t,o={},i=Object.keys(e);for(t=0;t<i.length;t++)r=i[t],n.indexOf(r)>=0||(o[r]=e[r]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)r=i[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=t.createContext({}),l=function(e){var n=t.useContext(c),r=n;return e&&(r="function"==typeof e?e(n):s(s({},n),e)),r},p=function(e){var n=l(e.components);return t.createElement(c.Provider,{value:n},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},f=t.forwardRef((function(e,n){var r=e.components,o=e.mdxType,i=e.originalType,c=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),d=l(r),f=o,m=d["".concat(c,".").concat(f)]||d[f]||u[f]||i;return r?t.createElement(m,s(s({ref:n},p),{},{components:r})):t.createElement(m,s({ref:n},p))}));function m(e,n){var r=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=r.length,s=new Array(i);s[0]=f;var a={};for(var c in n)hasOwnProperty.call(n,c)&&(a[c]=n[c]);a.originalType=e,a[d]="string"==typeof e?e:o,s[1]=a;for(var l=2;l<i;l++)s[l]=r[l];return t.createElement.apply(null,s)}return t.createElement.apply(null,r)}f.displayName="MDXCreateElement"},6360:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>i,metadata:()=>a,toc:()=>l});var t=r(4778),o=(r(9496),r(9613));const i={},s="Redis",a={unversionedId:"\u540e\u7aef/\u6570\u636e\u5e93/Redis",id:"\u540e\u7aef/\u6570\u636e\u5e93/Redis",title:"Redis",description:"",source:"@site/docs/\u540e\u7aef/\u6570\u636e\u5e93/Redis.md",sourceDirName:"\u540e\u7aef/\u6570\u636e\u5e93",slug:"/\u540e\u7aef/\u6570\u636e\u5e93/Redis",permalink:"/docs/\u540e\u7aef/\u6570\u636e\u5e93/Redis",draft:!1,editUrl:"https://github.com/pannanxu/wiki/docs/\u540e\u7aef/\u6570\u636e\u5e93/Redis.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"\u5b89\u88c5",permalink:"/docs/\u540e\u7aef/\u6570\u636e\u5e93/PostgreSQL/\u5b89\u88c5"},next:{title:"\u521b\u5efa\u578b\u6a21\u5f0f",permalink:"/docs/\u540e\u7aef/\u8bbe\u8ba1\u6a21\u5f0f/"}},c={},l=[],p={toc:l},d="wrapper";function u(e){let{components:n,...r}=e;return(0,o.kt)(d,(0,t.Z)({},p,r,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"redis"},"Redis"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},"# gcc --version \u6216\u8005 whereis gcc# \u5982\u679c\u6ca1\u6709\u901a\u8fc7 yum install gcc \u5b89\u88c5  \n  \ncd /usr/local/wget http://download.redis.io/releases/redis-6.2.7.tar.gztar\n\n-xvf redis-6.2.7.tar.gzsudo \n\nln -s /usr/local/redis-6.2.7 redis\n\nmake  \n\nmake install\n\nredis-server --version  \n\nvim redis.conf  \n\n# \u5f00\u542f\u540e\u53f0\u8fd0\u884c  \ndaemonize yes\n# \u8bbe\u7f6e\u5bc6\u7801  \nrequirepass 123456\n# \u5b89\u5168\u6a21\u5f0f,no\u5916\u7f51\u53ef\u8bbf\u95ee\uff0cyes\u4e0d\u53ef\u8bbf\u95ee  \nprotected-mode yes\n# \u5141\u8bb8\u8bbf\u95ee\u7684\u5730\u5740\uff0c\u9ed8\u8ba4\u662f127.0.0.1  \nbind 127.0.0.1\n# \u542f\u52a8\u7aef\u53e3  \nport 6379  \n\n\n# \u542f\u52a8\nredis-server ./redis.conf\n# \u505c\u6b62  \nredis-cli  shutdown  \n# \u6d4b\u8bd5\u8fde\u63a5  \nredis-cli  -h  127.0.0.1 -p 6379\n\n# \u67e5\u770b\u72b6\u6001\nps -ef | grep redis\nps -aux | grep redis\nnetstat -tunple | grep 6379\nlsof -i :6379\n")))}u.isMDXComponent=!0}}]);