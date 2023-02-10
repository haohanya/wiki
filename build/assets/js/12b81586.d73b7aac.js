"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[6538],{9613:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>s});var r=n(9496);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=r.createContext({}),u=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},m=function(e){var t=u(e.components);return r.createElement(p.Provider,{value:t},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},k=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,l=e.originalType,p=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),d=u(n),k=i,s=d["".concat(p,".").concat(k)]||d[k]||c[k]||l;return n?r.createElement(s,a(a({ref:t},m),{},{components:n})):r.createElement(s,a({ref:t},m))}));function s(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var l=n.length,a=new Array(l);a[0]=k;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o[d]="string"==typeof e?e:i,a[1]=o;for(var u=2;u<l;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}k.displayName="MDXCreateElement"},1467:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>a,default:()=>c,frontMatter:()=>l,metadata:()=>o,toc:()=>u});var r=n(4778),i=(n(9496),n(9613));const l={},a="Vim",o={unversionedId:"\u540e\u7aef/Vim",id:"\u540e\u7aef/Vim",title:"Vim",description:"\u57fa\u7840\u547d\u4ee4",source:"@site/docs/\u540e\u7aef/Vim.md",sourceDirName:"\u540e\u7aef",slug:"/\u540e\u7aef/Vim",permalink:"/docs/\u540e\u7aef/Vim",draft:!1,editUrl:"https://github.com/pannanxu/wiki/docs/\u540e\u7aef/Vim.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"OpenFeign",permalink:"/docs/\u540e\u7aef/SpringCloud/SpringCloudOpenFeign"},next:{title:"\u5b89\u88c5",permalink:"/docs/\u540e\u7aef/kubernetes/\u5b89\u88c5"}},p={},u=[{value:"\u57fa\u7840\u547d\u4ee4",id:"\u57fa\u7840\u547d\u4ee4",level:2},{value:"\u5149\u6807\u79fb\u52a8",id:"\u5149\u6807\u79fb\u52a8",level:3},{value:"\u7ffb\u9875",id:"\u7ffb\u9875",level:3},{value:"\u641c\u7d22\u66ff\u6362",id:"\u641c\u7d22\u66ff\u6362",level:3},{value:"\u5220\u9664\u590d\u5236",id:"\u5220\u9664\u590d\u5236",level:3},{value:"\u884c\u53f7",id:"\u884c\u53f7",level:3}],m={toc:u},d="wrapper";function c(e){let{components:t,...n}=e;return(0,i.kt)(d,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"vim"},"Vim"),(0,i.kt)("h2",{id:"\u57fa\u7840\u547d\u4ee4"},"\u57fa\u7840\u547d\u4ee4"),(0,i.kt)("h3",{id:"\u5149\u6807\u79fb\u52a8"},"\u5149\u6807\u79fb\u52a8"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"0")," \u79fb\u52a8\u5230\u5f53\u524d\u884c\u6700\u524d\u9762"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"$")," \u79fb\u52a8\u5230\u5f53\u524d\u884c\u6700\u540e\u9762"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"G")," \u79fb\u52a8\u5f53\u5f53\u524d\u6587\u4ef6\u7684\u6700\u540e\u4e00\u884c"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"nG")," n\u662f\u6570\u5b57\uff0c\u79fb\u52a8\u5230\u5f53\u524d\u6587\u4ef6\u7684\u7b2c\u4e00\u884c"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"gg")," \u79fb\u52a8\u5230\u5f53\u524d\u6587\u4ef6\u7684\u7b2c\u4e00\u884c\uff0c\u76f8\u5f53\u4e8e ",(0,i.kt)("inlineCode",{parentName:"li"},"1G")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"n<enter>"),"  n\u662f\u6570\u5b57\uff0c\u8f93\u5165\u540e\u6309\u56de\u8f66\u8df3\u8f6c\u5230\u5f53\u524d\u884c\u4e0b\u9762n\u884c")),(0,i.kt)("h3",{id:"\u7ffb\u9875"},"\u7ffb\u9875"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"ctrl + f")," \u4e0b\u4e00\u9875"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"ctrl + b")," \u4e0a\u4e00\u9875"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"ctrl + d")," \u4e0b\u534a\u9875"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"ctrl + u")," \u4e0a\u534a\u9875")),(0,i.kt)("h3",{id:"\u641c\u7d22\u66ff\u6362"},"\u641c\u7d22\u66ff\u6362"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"/word")," \u5411\u5149\u6807\u4e0b\u65b9\u641c\u7d22 word \u8fd9\u4e2a\u8bcd, ",(0,i.kt)("inlineCode",{parentName:"li"},"?word")," \u5411\u540e\u641c\u7d22"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"n")," \u7ee7\u7eed\u6267\u884c\u641c\u7d22, ",(0,i.kt)("inlineCode",{parentName:"li"},"N")," \u53cd\u65b9\u5411\u7ee7\u7eed\u6267\u884c\u641c\u7d22")),(0,i.kt)("h3",{id:"\u5220\u9664\u590d\u5236"},"\u5220\u9664\u590d\u5236"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"x, X")," x\u5411\u540e\u5220\u9664\u4e00\u4e2a\u5b57\u7b26\uff0cX\u5411\u524d\u5220\u9664\u4e00\u4e2a\u81ea\u8d1f"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"dd")," \u526a\u5207\u5f53\u524d\u884c\uff0c",(0,i.kt)("inlineCode",{parentName:"li"},"ndd")," \u526a\u5207n\u884c"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"p")," \u7c98\u8d34\u5230\u4e0b\u4e00\u884c\uff0c",(0,i.kt)("inlineCode",{parentName:"li"},"P")," \u7c98\u8d34\u5230\u4e0a\u4e00\u884c"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"yy")," \u590d\u5236\u5f53\u524d\u884c\uff0c",(0,i.kt)("inlineCode",{parentName:"li"},"nyy")," \u590d\u5236n\u884c"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"u")," \u64a4\u9500\u4e0a\u4e00\u6b21\u64cd\u4f5c"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"ctrl + r")," \u91cd\u505a\u4e0a\u4e00\u4e2a\u52a8\u4f5c"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},".")," \u5c0f\u6570\u70b9\uff0c\u91cd\u590d\u4e0a\u4e00\u4e2a\u52a8\u4f5c")),(0,i.kt)("h3",{id:"\u884c\u53f7"},"\u884c\u53f7"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},":set nu")," \u663e\u793a, ",(0,i.kt)("inlineCode",{parentName:"li"},":set nonu")," \u9690\u85cf")))}c.isMDXComponent=!0}}]);