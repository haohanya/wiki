"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[9570],{3905:(e,l,n)=>{n.d(l,{Zo:()=>s,kt:()=>c});var t=n(7294);function a(e,l,n){return l in e?Object.defineProperty(e,l,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[l]=n,e}function r(e,l){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);l&&(t=t.filter((function(l){return Object.getOwnPropertyDescriptor(e,l).enumerable}))),n.push.apply(n,t)}return n}function i(e){for(var l=1;l<arguments.length;l++){var n=null!=arguments[l]?arguments[l]:{};l%2?r(Object(n),!0).forEach((function(l){a(e,l,n[l])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(l){Object.defineProperty(e,l,Object.getOwnPropertyDescriptor(n,l))}))}return e}function p(e,l){if(null==e)return{};var n,t,a=function(e,l){if(null==e)return{};var n,t,a={},r=Object.keys(e);for(t=0;t<r.length;t++)n=r[t],l.indexOf(n)>=0||(a[n]=e[n]);return a}(e,l);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(t=0;t<r.length;t++)n=r[t],l.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var o=t.createContext({}),u=function(e){var l=t.useContext(o),n=l;return e&&(n="function"==typeof e?e(l):i(i({},l),e)),n},s=function(e){var l=u(e.components);return t.createElement(o.Provider,{value:l},e.children)},d="mdxType",k={inlineCode:"code",wrapper:function(e){var l=e.children;return t.createElement(t.Fragment,{},l)}},m=t.forwardRef((function(e,l){var n=e.components,a=e.mdxType,r=e.originalType,o=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),d=u(n),m=a,c=d["".concat(o,".").concat(m)]||d[m]||k[m]||r;return n?t.createElement(c,i(i({ref:l},s),{},{components:n})):t.createElement(c,i({ref:l},s))}));function c(e,l){var n=arguments,a=l&&l.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=m;var p={};for(var o in l)hasOwnProperty.call(l,o)&&(p[o]=l[o]);p.originalType=e,p[d]="string"==typeof e?e:a,i[1]=p;for(var u=2;u<r;u++)i[u]=n[u];return t.createElement.apply(null,i)}return t.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8738:(e,l,n)=>{n.r(l),n.d(l,{assets:()=>o,contentTitle:()=>i,default:()=>k,frontMatter:()=>r,metadata:()=>p,toc:()=>u});var t=n(7462),a=(n(7294),n(3905));const r={},i="Linux",p={unversionedId:"\u540e\u7aef/Linux",id:"\u540e\u7aef/Linux",title:"Linux",description:"\u6587\u672c\u64cd\u4f5c",source:"@site/docs/\u540e\u7aef/Linux.md",sourceDirName:"\u540e\u7aef",slug:"/\u540e\u7aef/Linux",permalink:"/docs/\u540e\u7aef/Linux",draft:!1,editUrl:"https://github.com/pannanxu/wiki/docs/\u540e\u7aef/Linux.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"NIO",permalink:"/docs/\u540e\u7aef/JDK/Nio"},next:{title:"MacOS \u73af\u5883\u914d\u7f6e",permalink:"/docs/\u540e\u7aef/MacOsM1"}},o={},u=[{value:"\u6587\u672c\u64cd\u4f5c",id:"\u6587\u672c\u64cd\u4f5c",level:2},{value:"grep",id:"grep",level:3},{value:"\u8bed\u6cd5",id:"\u8bed\u6cd5",level:4},{value:"\u4f7f\u7528\u793a\u4f8b",id:"\u4f7f\u7528\u793a\u4f8b",level:4},{value:"cat",id:"cat",level:3},{value:"\u8bed\u6cd5",id:"\u8bed\u6cd5-1",level:4},{value:"\u4f7f\u7528\u793a\u4f8b",id:"\u4f7f\u7528\u793a\u4f8b-1",level:4},{value:"tail",id:"tail",level:3},{value:"\u8bed\u6cd5",id:"\u8bed\u6cd5-2",level:4},{value:"\u4f7f\u7528\u793a\u4f8b",id:"\u4f7f\u7528\u793a\u4f8b-2",level:4},{value:"\u6587\u4ef6\u64cd\u4f5c",id:"\u6587\u4ef6\u64cd\u4f5c",level:2},{value:"find",id:"find",level:3},{value:"\u8bed\u6cd5",id:"\u8bed\u6cd5-3",level:4},{value:"\u4f7f\u7528\u793a\u4f8b",id:"\u4f7f\u7528\u793a\u4f8b-3",level:4},{value:"\u6743\u9650",id:"\u6743\u9650",level:3},{value:"\u78c1\u76d8",id:"\u78c1\u76d8",level:3},{value:"df\uff1a\u5217\u51fa\u6587\u4ef6\u7cfb\u7edf\u7684\u6574\u4f53\u78c1\u76d8\u4f7f\u7528\u91cf",id:"df\u5217\u51fa\u6587\u4ef6\u7cfb\u7edf\u7684\u6574\u4f53\u78c1\u76d8\u4f7f\u7528\u91cf",level:4},{value:"du\uff1a\u68c0\u67e5\u78c1\u76d8\u7a7a\u95f4\u4f7f\u7528\u91cf\uff08disk used\uff09",id:"du\u68c0\u67e5\u78c1\u76d8\u7a7a\u95f4\u4f7f\u7528\u91cfdisk-used",level:4},{value:"fdisk\uff1a\u78c1\u76d8\u5206\u533a",id:"fdisk\u78c1\u76d8\u5206\u533a",level:4},{value:"\u7ba1\u7406\u8fdb\u7a0b",id:"\u7ba1\u7406\u8fdb\u7a0b",level:2},{value:"\u66f4\u65b0yum\u6e90",id:"\u66f4\u65b0yum\u6e90",level:2},{value:"\u67e5\u770b\u7aef\u53e3\u5360\u7528",id:"\u67e5\u770b\u7aef\u53e3\u5360\u7528",level:2},{value:"\u5173\u95ed\u8fdb\u7a0b",id:"\u5173\u95ed\u8fdb\u7a0b",level:2},{value:"\u9632\u706b\u5899",id:"\u9632\u706b\u5899",level:2},{value:"\u67e5\u770b\u9632\u706b\u5899\u72b6\u6001",id:"\u67e5\u770b\u9632\u706b\u5899\u72b6\u6001",level:3},{value:"\u5f00\u542f\u9632\u706b\u5899",id:"\u5f00\u542f\u9632\u706b\u5899",level:3},{value:"\u91cd\u542f\u9632\u706b\u5899",id:"\u91cd\u542f\u9632\u706b\u5899",level:3},{value:"\u67e5\u770b\u67d0\u4e2a\u7aef\u53e3\u662f\u5426\u653e\u884c",id:"\u67e5\u770b\u67d0\u4e2a\u7aef\u53e3\u662f\u5426\u653e\u884c",level:3},{value:"\u653e\u884c\u6307\u5b9a\u7aef\u53e3",id:"\u653e\u884c\u6307\u5b9a\u7aef\u53e3",level:3},{value:"\u5220\u9664\u6307\u5b9a\u7aef\u53e3",id:"\u5220\u9664\u6307\u5b9a\u7aef\u53e3",level:3},{value:"\u91cd\u65b0\u8f7d\u5165\u914d\u7f6e",id:"\u91cd\u65b0\u8f7d\u5165\u914d\u7f6e",level:3},{value:"JDK \u73af\u5883\u53d8\u91cf",id:"jdk-\u73af\u5883\u53d8\u91cf",level:2},{value:"Java \u8fd0\u884c\u811a\u672c platform.sh",id:"java-\u8fd0\u884c\u811a\u672c-platformsh",level:2},{value:"\u7b80\u5355\u542f\u52a8jar",id:"\u7b80\u5355\u542f\u52a8jar",level:2},{value:"\u540e\u53f0\u542f\u52a8",id:"\u540e\u53f0\u542f\u52a8",level:3},{value:"\u67e5\u770b\u65e5\u5fd7",id:"\u67e5\u770b\u65e5\u5fd7",level:3},{value:"SSH",id:"ssh",level:2}],s={toc:u},d="wrapper";function k(e){let{components:l,...n}=e;return(0,a.kt)(d,(0,t.Z)({},s,n,{components:l,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"linux"},"Linux"),(0,a.kt)("h2",{id:"\u6587\u672c\u64cd\u4f5c"},"\u6587\u672c\u64cd\u4f5c"),(0,a.kt)("h3",{id:"grep"},"grep"),(0,a.kt)("p",null,"\u7528\u4e8e\u641c\u7d22\u6587\u4ef6\u7684\u5185\u5bb9"),(0,a.kt)("h4",{id:"\u8bed\u6cd5"},"\u8bed\u6cd5"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"# text: \u9700\u8981\u641c\u7d22\u7684\u6587\u672c\n# file: \u9700\u8981\u641c\u7d22\u7684\u6587\u4ef6\ngrep [option] <text> <file> \n")),(0,a.kt)("p",null,"option\u53ef\u9009\u53c2\u6570\u5982\u4e0b"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-i"),"\u5ffd\u7565\u5927\u5c0f\u5199"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-n"),"\u663e\u793a\u884c\u53f7"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-v"),"\u641c\u7d22\u9664\u4e86 ",(0,a.kt)("inlineCode",{parentName:"li"},"text"),"\u4e4b\u5916\u7684\u6587\u672c\u884c"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-r"),"\u9012\u5f52\u67e5\u627e"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-E"),"\u6b63\u5219\u8868\u8fbe\u5f0f",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-E text")," \u5b8c\u5168\u5339\u914d"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-E ^text"),"\u5339\u914d\u4ee5text\u5f00\u5934\u7684\u6587\u672c\u884c"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-E [tT]ext"),"\u5339\u914dtext \u6216 Text \u7684\u6587\u672c\u884c")))),(0,a.kt)("h4",{id:"\u4f7f\u7528\u793a\u4f8b"},"\u4f7f\u7528\u793a\u4f8b"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"grep hello /usr/local/log.log\ngrep -n hello /usr/local/log.log\ngrep -E ^hello /usr/local/log.log\n")),(0,a.kt)("h3",{id:"cat"},"cat"),(0,a.kt)("p",null,"\u67e5\u770b\u6587\u4ef6\u5185\u5bb9"),(0,a.kt)("h4",{id:"\u8bed\u6cd5-1"},"\u8bed\u6cd5"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"cat [option] <file>\n")),(0,a.kt)("p",null,"\u5e38\u7528option\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-b"),"\u5bf9\u975e\u7a7a\u683c\u8f93\u51fa\u884c\u53f7"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-n"),"\u5bf9\u5185\u5bb9\u8f93\u51fa\u884c\u53f7")),(0,a.kt)("h4",{id:"\u4f7f\u7528\u793a\u4f8b-1"},"\u4f7f\u7528\u793a\u4f8b"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"cat logs.log\ncat -b logs.log\ncat --n logs.log\n")),(0,a.kt)("h3",{id:"tail"},"tail"),(0,a.kt)("p",null,"\u663e\u793a\u6587\u4ef6\u6700\u540e\u51e0\u884c\u5185\u5bb9"),(0,a.kt)("h4",{id:"\u8bed\u6cd5-2"},"\u8bed\u6cd5"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"tail [option] <file>\n")),(0,a.kt)("p",null,"option\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-n 10"),"\u663e\u793a10\u884c")),(0,a.kt)("h4",{id:"\u4f7f\u7528\u793a\u4f8b-2"},"\u4f7f\u7528\u793a\u4f8b"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"tail logs.log\ntail -n 100 logs.log\n")),(0,a.kt)("h2",{id:"\u6587\u4ef6\u64cd\u4f5c"},"\u6587\u4ef6\u64cd\u4f5c"),(0,a.kt)("h3",{id:"find"},"find"),(0,a.kt)("p",null,"\u67e5\u627e\u6587\u4ef6"),(0,a.kt)("h4",{id:"\u8bed\u6cd5-3"},"\u8bed\u6cd5"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"find [option] <path> [exp]\n")),(0,a.kt)("p",null,"option\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-name"),"\u6309\u7167\u6587\u4ef6\u540d\u79f0\u67e5\u8be2"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-type"),"\u6309\u7167\u6587\u4ef6\u7c7b\u578b\u67e5\u8be2")),(0,a.kt)("h4",{id:"\u4f7f\u7528\u793a\u4f8b-3"},"\u4f7f\u7528\u793a\u4f8b"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"# \u67e5\u8be2\u5f53\u524d\u76ee\u5f55\u4e0b\u4ee5.log\u7ed3\u5c3e\u7684\u6587\u4ef6\nfind . -name *.log\n# \u67e5\u8be2\u5f53\u524d\u76ee\u5f55\u4e0b\u4e0d\u4ee5.log\u7ed3\u5c3e\u7684\u6587\u4ef6\nfind . ! -name *.log\n")),(0,a.kt)("h3",{id:"\u6743\u9650"},"\u6743\u9650"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"chown"),"\uff08change owner\uff09\u4fee\u6539\u6240\u5c5e\u7528\u6237\u4e0e\u7ec4",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"chown [-R] \u7528\u6237\u540d \u6587\u4ef6\u540d")," "),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"chown [-R] \u7528\u6237\u540d:\u7528\u6237\u7ec4 \u6587\u4ef6\u540d")))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"chmod"),"\uff08change mode\uff09\u4fee\u6539\u7528\u6237\u6743\u9650",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"chmod [-R] xyz \u6587\u4ef6\u6216\u76ee\u5f55")))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"chgrp")," \u4fee\u6539\u6587\u4ef6\u7528\u6237\u7ec4",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"chgrp [-R] \u7ec4\u540d \u6587\u4ef6\u540d")," ")))),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"-R")," \u8868\u793a\u9012\u5f52\u4fee\u6539\u5b50\u76ee\u5f55\u6240\u6709\u7684\u6587\u4ef6"),(0,a.kt)("h3",{id:"\u78c1\u76d8"},"\u78c1\u76d8"),(0,a.kt)("h4",{id:"df\u5217\u51fa\u6587\u4ef6\u7cfb\u7edf\u7684\u6574\u4f53\u78c1\u76d8\u4f7f\u7528\u91cf"},"df\uff1a\u5217\u51fa\u6587\u4ef6\u7cfb\u7edf\u7684\u6574\u4f53\u78c1\u76d8\u4f7f\u7528\u91cf"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"df -h\n")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"df [-ahikHTm] [\u76ee\u5f55\u6216\u6587\u4ef6\u540d]"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-a")," \u5217\u51fa\u6240\u6709\u7684\u6587\u4ef6\u7cfb\u7edf"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-k")," \u4ee5 ",(0,a.kt)("inlineCode",{parentName:"li"},"kbytes")," \u7684\u5bb9\u91cf\u663e\u793a"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-m")," \u4ee5 ",(0,a.kt)("inlineCode",{parentName:"li"},"mbytes")," \u7684\u5bb9\u91cf\u663e\u793a"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-h")," \u4ee5\u4eba\u4eec\u8f83\u6613\u9605\u8bfb\u7684 GBytes, MBytes, KBytes \u7b49\u683c\u5f0f\u81ea\u884c\u663e\u793a")))),(0,a.kt)("h4",{id:"du\u68c0\u67e5\u78c1\u76d8\u7a7a\u95f4\u4f7f\u7528\u91cfdisk-used"},"du\uff1a\u68c0\u67e5\u78c1\u76d8\u7a7a\u95f4\u4f7f\u7528\u91cf\uff08disk used\uff09"),(0,a.kt)("h4",{id:"fdisk\u78c1\u76d8\u5206\u533a"},"fdisk\uff1a\u78c1\u76d8\u5206\u533a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"fdisk [-l] \u88c5\u7f6e\u540d\u79f0"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-l")," \uff1a\u8f93\u51fa\u540e\u9762\u63a5\u7684\u88c5\u7f6e\u6240\u6709\u7684\u5206\u533a\u5185\u5bb9\u3002\u82e5\u4ec5\u6709 fdisk -l \u65f6\uff0c \u5219\u7cfb\u7edf\u5c06\u4f1a\u628a\u6574\u4e2a\u7cfb\u7edf\u5185\u80fd\u591f\u641c\u5bfb\u5230\u7684\u88c5\u7f6e\u7684\u5206\u533a\u5747\u5217\u51fa\u6765\u3002")))),(0,a.kt)("h2",{id:"\u7ba1\u7406\u8fdb\u7a0b"},"\u7ba1\u7406\u8fdb\u7a0b"),(0,a.kt)("h2",{id:"\u66f4\u65b0yum\u6e90"},"\u66f4\u65b0yum\u6e90"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"yum clean all\nyum makecache\nyum update -y\n")),(0,a.kt)("h2",{id:"\u67e5\u770b\u7aef\u53e3\u5360\u7528"},"\u67e5\u770b\u7aef\u53e3\u5360\u7528"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"netstat -lnp|grep 80\n")),(0,a.kt)("h2",{id:"\u5173\u95ed\u8fdb\u7a0b"},"\u5173\u95ed\u8fdb\u7a0b"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"kill -9 18874\n")),(0,a.kt)("h2",{id:"\u9632\u706b\u5899"},"\u9632\u706b\u5899"),(0,a.kt)("h3",{id:"\u67e5\u770b\u9632\u706b\u5899\u72b6\u6001"},"\u67e5\u770b\u9632\u706b\u5899\u72b6\u6001"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"systemctl status firewalld.service\n")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"running\u4ee3\u8868\u9632\u706b\u5899\u6b63\u5728\u8fd0\u884c\u4e2d")),(0,a.kt)("h3",{id:"\u5f00\u542f\u9632\u706b\u5899"},"\u5f00\u542f\u9632\u706b\u5899"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"systemctl start firewalld.service\n")),(0,a.kt)("h3",{id:"\u91cd\u542f\u9632\u706b\u5899"},"\u91cd\u542f\u9632\u706b\u5899"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"systemctl restart firewalld.service\n")),(0,a.kt)("h3",{id:"\u67e5\u770b\u67d0\u4e2a\u7aef\u53e3\u662f\u5426\u653e\u884c"},"\u67e5\u770b\u67d0\u4e2a\u7aef\u53e3\u662f\u5426\u653e\u884c"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"firewall-cmd --query-port=\u7aef\u53e3\u53f7/tcp\n")),(0,a.kt)("h3",{id:"\u653e\u884c\u6307\u5b9a\u7aef\u53e3"},"\u653e\u884c\u6307\u5b9a\u7aef\u53e3"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"firewall-cmd --zone=public --add-port=\u7aef\u53e3\u53f7/tcp --permanent\n")),(0,a.kt)("h3",{id:"\u5220\u9664\u6307\u5b9a\u7aef\u53e3"},"\u5220\u9664\u6307\u5b9a\u7aef\u53e3"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"firewall-cmd --zone=public --remove-port=80/tcp --permanent\n")),(0,a.kt)("h3",{id:"\u91cd\u65b0\u8f7d\u5165\u914d\u7f6e"},"\u91cd\u65b0\u8f7d\u5165\u914d\u7f6e"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u4fee\u6539\u9632\u706b\u5899\u540e\u4e00\u5b9a\u8981\u91cd\u8f7d\u914d\u7f6e")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"firewall-cmd --reload\n")),(0,a.kt)("h2",{id:"jdk-\u73af\u5883\u53d8\u91cf"},"JDK \u73af\u5883\u53d8\u91cf"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"vi /etc/profile\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-properties"},"JAVA_HOME=/usr/java/jdk1.8.0_11\nJRE_HOME=${JAVA_HOME}/jre\nCLASSPATH=.:${JAVA_HOME}/lib:${JAVA_HOME}/lib\nPATH=${JAVA_HOME}/bin:$PATH\n\n-- jre\nJRE_HOME=/usr/local/jre1.8.0_351\nCLASSPATH=.:${JRE_HOME}/lib/rt.jar:${JRE_HOME}/lib/ext\nPATH=${JRE_HOME}/bin:$PATH\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"source /etc/profile\n")),(0,a.kt)("h2",{id:"java-\u8fd0\u884c\u811a\u672c-platformsh"},"Java \u8fd0\u884c\u811a\u672c platform.sh"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'# \u7a0b\u5e8fjar\u5305\u5730\u5740\nAPP_NAME_PLATFORM=/root/app/halo.jar\n# \u8f93\u51fa\u65e5\u5fd7\u5730\u5740\nAPP_LOG_FILE_PATH=/root/app/log/halo.out\n\n# \u63d0\u793a\u4fe1\u606f\nusage() {\n    echo "sh platform.sh [(start | stop | restart | status | log)]"\n    exit 1\n}\n\n# \u68c0\u67e5\u7a0b\u5e8f\u662f\u5426\u5728\u8fd0\u884c\nis_exist() {\n    pid=`ps -ef|grep $APP_NAME_PLATFORM|grep -v grep|awk \'{print $2}\' `\n    if [ -z "${pid}" ]\n    then\n        return 1\n    else\n        return 0\n    fi\n}\n\n# \u542f\u52a8\nstart() {\n    is_exist\n    if [ $? -eq "0" ]\n    then\n        echo "${APP_NAME_PLATFORM} is already running. pid=${pid} ."\n    else\n        nohup java -jar $APP_NAME_PLATFORM Xms=512m -Xmx=1024m > $APP_LOG_FILE_PATH 2>&1 &\n        echo "${APP_NAME_PLATFORM} \u5df2\u542f\u52a8."\n    fi\n}\n\n# \u72b6\u6001\nstatus() {\n    is_exist\n    if [ $? -eq "0" ]\n    then\n        echo "${APP_NAME_PLATFORM} \u6b63\u5728\u8fd0\u884c"\n    else\n        echo "${APP_NAME_PLATFORM} \u672a\u542f\u52a8"\n    fi\n}\n\n# \u505c\u6b62\nstop() {\n    is_exist\n    if [ $? -eq "0" ]\n    then\n        kill -9 $pid\n        echo "${APP_NAME_PLATFORM} \u5df2\u505c\u6b62."\n    else\n        echo "${APP_NAME_PLATFORM} \u5df2\u505c\u6b62"\n    fi\n}\n\n# \u67e5\u770b\u65e5\u5fd7\nlog() {\n    is_exist\n    if [ $? -eq "0" ]\n    then\n        tail -f $APP_LOG_FILE_PATH\n    else\n        echo "${APP_NAME_PLATFORM} \u672a\u542f\u52a8"\n    fi\n}\n\n# \u90e8\u7f72\u9879\u76ee\ndeploy() {\n    stop\n    start\n}\n\n# \u91cd\u542f\nrestart() {\n    stop\n    start\n}\n\n# \u6839\u636e\u8f93\u5165\u53c2\u6570,\u9009\u62e9\u6267\u884c\u5bf9\u5e94\u65b9\u6cd5,\u4e0d\u8f93\u5165\u5219\u6267\u884c\u4f7f\u7528\u8bf4\u660e\ncase "$1" in\n"start") start\n;;\n"stop") stop\n;;\n"status") status\n;;\n"restart") restart\n;;\n"deploy") deploy\n;;\n"log") log\n;;\n*) usage\n;;\nesac\n')),(0,a.kt)("h2",{id:"\u7b80\u5355\u542f\u52a8jar"},"\u7b80\u5355\u542f\u52a8jar"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"java -jar xxx.jar\n")),(0,a.kt)("h3",{id:"\u540e\u53f0\u542f\u52a8"},"\u540e\u53f0\u542f\u52a8"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"nohup java -jar xxx.jar Xms=512m -Xmx=1024m > xxx.out 2>&1 &\n")),(0,a.kt)("h3",{id:"\u67e5\u770b\u65e5\u5fd7"},"\u67e5\u770b\u65e5\u5fd7"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"tail -f xxx.out\n")),(0,a.kt)("h2",{id:"ssh"},"SSH"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'# \u4e00\u8def\u56de\u8f66\nssh-keygen -t rsa -P ""\n# \u5c06 \u516c\u94a5\u62f7\u8d1d\u5230 authorized_keys\ncat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys\nchmod 700 ~/.ssh\nchmod 600 ~/.ssh/authorized_keys\n# \u7136\u540e\u4f7f\u7528 id_rsa \u767b\u9646\nssh root@ip -i id_rsa\n')))}k.isMDXComponent=!0}}]);