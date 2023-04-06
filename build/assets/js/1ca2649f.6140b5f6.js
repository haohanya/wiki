"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[3948],{9613:(e,n,t)=>{t.d(n,{Zo:()=>s,kt:()=>k});var l=t(9496);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);n&&(l=l.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,l)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,l,a=function(e,n){if(null==e)return{};var t,l,a={},r=Object.keys(e);for(l=0;l<r.length;l++)t=r[l],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(l=0;l<r.length;l++)t=r[l],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var p=l.createContext({}),u=function(e){var n=l.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},s=function(e){var n=u(e.components);return l.createElement(p.Provider,{value:n},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var n=e.children;return l.createElement(l.Fragment,{},n)}},m=l.forwardRef((function(e,n){var t=e.components,a=e.mdxType,r=e.originalType,p=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),d=u(t),m=a,k=d["".concat(p,".").concat(m)]||d[m]||c[m]||r;return t?l.createElement(k,i(i({ref:n},s),{},{components:t})):l.createElement(k,i({ref:n},s))}));function k(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var r=t.length,i=new Array(r);i[0]=m;var o={};for(var p in n)hasOwnProperty.call(n,p)&&(o[p]=n[p]);o.originalType=e,o[d]="string"==typeof e?e:a,i[1]=o;for(var u=2;u<r;u++)i[u]=t[u];return l.createElement.apply(null,i)}return l.createElement.apply(null,t)}m.displayName="MDXCreateElement"},7049:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>i,default:()=>c,frontMatter:()=>r,metadata:()=>o,toc:()=>u});var l=t(4778),a=(t(9496),t(9613));const r={},i="Sentinel",o={unversionedId:"\u540e\u7aef/SpringCloud/SpringCloudAlibabaSentinel",id:"\u540e\u7aef/SpringCloud/SpringCloudAlibabaSentinel",title:"Sentinel",description:"\u4ec0\u4e48\u662fSentinel",source:"@site/docs/\u540e\u7aef/SpringCloud/SpringCloudAlibabaSentinel.md",sourceDirName:"\u540e\u7aef/SpringCloud",slug:"/\u540e\u7aef/SpringCloud/SpringCloudAlibabaSentinel",permalink:"/docs/\u540e\u7aef/SpringCloud/SpringCloudAlibabaSentinel",draft:!1,editUrl:"https://github.com/pannanxu/wiki/docs/\u540e\u7aef/SpringCloud/SpringCloudAlibabaSentinel.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Nacos",permalink:"/docs/\u540e\u7aef/SpringCloud/SpringCloudAlibabaNacos"},next:{title:"Config",permalink:"/docs/\u540e\u7aef/SpringCloud/SpringCloudConfig"}},p={},u=[{value:"\u4ec0\u4e48\u662fSentinel",id:"\u4ec0\u4e48\u662fsentinel",level:2},{value:"Sentinel\u7279\u6027",id:"sentinel\u7279\u6027",level:3},{value:"Sentinel\u57fa\u672c\u6982\u5ff5",id:"sentinel\u57fa\u672c\u6982\u5ff5",level:2},{value:"\u8d44\u6e90",id:"\u8d44\u6e90",level:3},{value:"\u89c4\u5219",id:"\u89c4\u5219",level:3},{value:"Sentinel \u529f\u80fd\u548c\u8bbe\u8ba1\u7406\u5ff5",id:"sentinel-\u529f\u80fd\u548c\u8bbe\u8ba1\u7406\u5ff5",level:2},{value:"\u6d41\u91cf\u63a7\u5236",id:"\u6d41\u91cf\u63a7\u5236",level:3},{value:"\u4ec0\u4e48\u662f\u6d41\u91cf\u63a7\u5236",id:"\u4ec0\u4e48\u662f\u6d41\u91cf\u63a7\u5236",level:4},{value:"\u6d41\u91cf\u63a7\u5236\u8bbe\u8ba1\u7406\u5ff5",id:"\u6d41\u91cf\u63a7\u5236\u8bbe\u8ba1\u7406\u5ff5",level:4},{value:"\u7194\u65ad\u964d\u7ea7",id:"\u7194\u65ad\u964d\u7ea7",level:3},{value:"\u4ec0\u4e48\u662f\u7194\u65ad\u964d\u7ea7",id:"\u4ec0\u4e48\u662f\u7194\u65ad\u964d\u7ea7",level:4},{value:"\u7194\u65ad\u964d\u7ea7\u8bbe\u8ba1\u7406\u5ff5",id:"\u7194\u65ad\u964d\u7ea7\u8bbe\u8ba1\u7406\u5ff5",level:4},{value:"\u7cfb\u7edf\u81ea\u9002\u5e94\u4fdd\u62a4",id:"\u7cfb\u7edf\u81ea\u9002\u5e94\u4fdd\u62a4",level:3},{value:"Sentinel \u662f\u5982\u4f55\u5de5\u4f5c\u7684",id:"sentinel-\u662f\u5982\u4f55\u5de5\u4f5c\u7684",level:2},{value:"Sentinel Dashboard\u5b89\u88c5",id:"sentinel-dashboard\u5b89\u88c5",level:2},{value:"\u4e0b\u8f7d",id:"\u4e0b\u8f7d",level:3},{value:"\u542f\u52a8",id:"\u542f\u52a8",level:3},{value:"\u4f7f\u7528Sentinel",id:"\u4f7f\u7528sentinel",level:2},{value:"\u642d\u5efa\u5de5\u7a0b",id:"\u642d\u5efa\u5de5\u7a0b",level:3},{value:"\u6d4b\u8bd5",id:"\u6d4b\u8bd5",level:3}],s={toc:u},d="wrapper";function c(e){let{components:n,...t}=e;return(0,a.kt)(d,(0,l.Z)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"sentinel"},"Sentinel"),(0,a.kt)("h2",{id:"\u4ec0\u4e48\u662fsentinel"},"\u4ec0\u4e48\u662fSentinel"),(0,a.kt)("p",null,"\u968f\u7740\u5fae\u670d\u52a1\u7684\u6d41\u884c\uff0c\u670d\u52a1\u548c\u670d\u52a1\u4e4b\u95f4\u7684\u7a33\u5b9a\u6027\u53d8\u5f97\u8d8a\u6765\u8d8a\u91cd\u8981\u3002Sentinel \u662f\u9762\u5411\u5206\u5e03\u5f0f\u670d\u52a1\u67b6\u6784\u7684\u6d41\u91cf\u63a7\u5236\u7ec4\u4ef6\uff0c\u4e3b\u8981\u4ee5\u6d41\u91cf\u4e3a\u5207\u5165\u70b9\uff0c\u4ece\u9650\u6d41\u3001\u6d41\u91cf\u6574\u5f62\u3001\u7194\u65ad\u964d\u7ea7\u3001\u7cfb\u7edf\u8d1f\u8f7d\u4fdd\u62a4\u3001\u70ed\u70b9\u9632\u62a4\u7b49\u591a\u4e2a\u7ef4\u5ea6\u6765\u5e2e\u52a9\u5f00\u53d1\u8005\u4fdd\u969c\u5fae\u670d\u52a1\u7684\u7a33\u5b9a\u6027\u3002"),(0,a.kt)("h3",{id:"sentinel\u7279\u6027"},"Sentinel\u7279\u6027"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"\u4e30\u5bcc\u7684\u5e94\u7528\u573a\u666f"),"\uff1aSentinel \u627f\u63a5\u4e86\u963f\u91cc\u5df4\u5df4\u8fd1 10 \u5e74\u7684\u53cc\u5341\u4e00\u5927\u4fc3\u6d41\u91cf\u7684\u6838\u5fc3\u573a\u666f\uff0c\u4f8b\u5982\u79d2\u6740\uff08\u5373\u7a81\u53d1\u6d41\u91cf\u63a7\u5236\u5728\u7cfb\u7edf\u5bb9\u91cf\u53ef\u4ee5\u627f\u53d7\u7684\u8303\u56f4\uff09\u3001\u6d88\u606f\u524a\u5cf0\u586b\u8c37\u3001\u96c6\u7fa4\u6d41\u91cf\u63a7\u5236\u3001\u5b9e\u65f6\u7194\u65ad\u4e0b\u6e38\u4e0d\u53ef\u7528\u5e94\u7528\u7b49\u3002"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"\u5b8c\u5907\u7684\u5b9e\u65f6\u76d1\u63a7"),"\uff1aSentinel \u540c\u65f6\u63d0\u4f9b\u5b9e\u65f6\u7684\u76d1\u63a7\u529f\u80fd\u3002\u60a8\u53ef\u4ee5\u5728\u63a7\u5236\u53f0\u4e2d\u770b\u5230\u63a5\u5165\u5e94\u7528\u7684\u5355\u53f0\u673a\u5668\u79d2\u7ea7\u6570\u636e\uff0c\u751a\u81f3 500 \u53f0\u4ee5\u4e0b\u89c4\u6a21\u7684\u96c6\u7fa4\u7684\u6c47\u603b\u8fd0\u884c\u60c5\u51b5\u3002"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"\u5e7f\u6cdb\u7684\u5f00\u6e90\u751f\u6001"),"\uff1aSentinel \u63d0\u4f9b\u5f00\u7bb1\u5373\u7528\u7684\u4e0e\u5176\u5b83\u5f00\u6e90\u6846\u67b6/\u5e93\u7684\u6574\u5408\u6a21\u5757\uff0c\u4f8b\u5982\u4e0e Spring Cloud\u3001Dubbo\u3001gRPC \u7684\u6574\u5408\u3002\u60a8\u53ea\u9700\u8981\u5f15\u5165\u76f8\u5e94\u7684\u4f9d\u8d56\u5e76\u8fdb\u884c\u7b80\u5355\u7684\u914d\u7f6e\u5373\u53ef\u5feb\u901f\u5730\u63a5\u5165 Sentinel\u3002"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"\u5b8c\u5584\u7684 SPI \u6269\u5c55\u70b9"),"\uff1aSentinel \u63d0\u4f9b\u7b80\u5355\u6613\u7528\u3001\u5b8c\u5584\u7684 SPI \u6269\u5c55\u63a5\u53e3\u3002\u60a8\u53ef\u4ee5\u901a\u8fc7\u5b9e\u73b0\u6269\u5c55\u63a5\u53e3\u6765\u5feb\u901f\u5730\u5b9a\u5236\u903b\u8f91\u3002\u4f8b\u5982\u5b9a\u5236\u89c4\u5219\u7ba1\u7406\u3001\u9002\u914d\u52a8\u6001\u6570\u636e\u6e90\u7b49\u3002")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Sentinel \u7684\u4e3b\u8981\u7279\u6027\uff1a")),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/50505538-2c484880-0aaf-11e9-9ffc-cbaaef20be2b.png",alt:"img"})),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Sentinel \u7684\u5f00\u6e90\u751f\u6001\uff1a")),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/84338449-a9497e00-abce-11ea-8c6a-473fe477b9a1.png",alt:"Sentinel-opensource-eco"})),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Sentinel \u5206\u4e3a\u4e24\u4e2a\u90e8\u5206:")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u6838\u5fc3\u5e93\uff08Java \u5ba2\u6237\u7aef\uff09\u4e0d\u4f9d\u8d56\u4efb\u4f55\u6846\u67b6/\u5e93\uff0c\u80fd\u591f\u8fd0\u884c\u4e8e\u6240\u6709 Java \u8fd0\u884c\u65f6\u73af\u5883\uff0c\u540c\u65f6\u5bf9 Dubbo / Spring Cloud \u7b49\u6846\u67b6\u4e5f\u6709\u8f83\u597d\u7684\u652f\u6301\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u63a7\u5236\u53f0\uff08Dashboard\uff09\u57fa\u4e8e Spring Boot \u5f00\u53d1\uff0c\u6253\u5305\u540e\u53ef\u4ee5\u76f4\u63a5\u8fd0\u884c\uff0c\u4e0d\u9700\u8981\u989d\u5916\u7684 Tomcat \u7b49\u5e94\u7528\u5bb9\u5668\u3002")),(0,a.kt)("h2",{id:"sentinel\u57fa\u672c\u6982\u5ff5"},"Sentinel\u57fa\u672c\u6982\u5ff5"),(0,a.kt)("h3",{id:"\u8d44\u6e90"},"\u8d44\u6e90"),(0,a.kt)("p",null,"\u8d44\u6e90\u662f Sentinel \u7684\u5173\u952e\u6982\u5ff5\u3002\u5b83\u53ef\u4ee5\u662f Java \u5e94\u7528\u7a0b\u5e8f\u4e2d\u7684\u4efb\u4f55\u5185\u5bb9\uff0c\u4f8b\u5982\uff0c\u7531\u5e94\u7528\u7a0b\u5e8f\u63d0\u4f9b\u7684\u670d\u52a1\uff0c\u6216\u7531\u5e94\u7528\u7a0b\u5e8f\u8c03\u7528\u7684\u5176\u5b83\u5e94\u7528\u63d0\u4f9b\u7684\u670d\u52a1\uff0c\u751a\u81f3\u53ef\u4ee5\u662f\u4e00\u6bb5\u4ee3\u7801\u3002\u5728\u63a5\u4e0b\u6765\u7684\u6587\u6863\u4e2d\uff0c\u6211\u4eec\u90fd\u4f1a\u7528\u8d44\u6e90\u6765\u63cf\u8ff0\u4ee3\u7801\u5757\u3002"),(0,a.kt)("p",null,"\u53ea\u8981\u901a\u8fc7 Sentinel API \u5b9a\u4e49\u7684\u4ee3\u7801\uff0c\u5c31\u662f\u8d44\u6e90\uff0c\u80fd\u591f\u88ab Sentinel \u4fdd\u62a4\u8d77\u6765\u3002\u5927\u90e8\u5206\u60c5\u51b5\u4e0b\uff0c\u53ef\u4ee5\u4f7f\u7528\u65b9\u6cd5\u7b7e\u540d\uff0cURL\uff0c\u751a\u81f3\u670d\u52a1\u540d\u79f0\u4f5c\u4e3a\u8d44\u6e90\u540d\u6765\u6807\u793a\u8d44\u6e90\u3002"),(0,a.kt)("h3",{id:"\u89c4\u5219"},"\u89c4\u5219"),(0,a.kt)("p",null,"\u56f4\u7ed5\u8d44\u6e90\u7684\u5b9e\u65f6\u72b6\u6001\u8bbe\u5b9a\u7684\u89c4\u5219\uff0c\u53ef\u4ee5\u5305\u62ec\u6d41\u91cf\u63a7\u5236\u89c4\u5219\u3001\u7194\u65ad\u964d\u7ea7\u89c4\u5219\u4ee5\u53ca\u7cfb\u7edf\u4fdd\u62a4\u89c4\u5219\u3002\u6240\u6709\u89c4\u5219\u53ef\u4ee5\u52a8\u6001\u5b9e\u65f6\u8c03\u6574\u3002"),(0,a.kt)("h2",{id:"sentinel-\u529f\u80fd\u548c\u8bbe\u8ba1\u7406\u5ff5"},"Sentinel \u529f\u80fd\u548c\u8bbe\u8ba1\u7406\u5ff5"),(0,a.kt)("h3",{id:"\u6d41\u91cf\u63a7\u5236"},"\u6d41\u91cf\u63a7\u5236"),(0,a.kt)("h4",{id:"\u4ec0\u4e48\u662f\u6d41\u91cf\u63a7\u5236"},"\u4ec0\u4e48\u662f\u6d41\u91cf\u63a7\u5236"),(0,a.kt)("p",null,"\u6d41\u91cf\u63a7\u5236\u5728\u7f51\u7edc\u4f20\u8f93\u4e2d\u662f\u4e00\u4e2a\u5e38\u7528\u7684\u6982\u5ff5\uff0c\u5b83\u7528\u4e8e\u8c03\u6574\u7f51\u7edc\u5305\u7684\u53d1\u9001\u6570\u636e\u3002\u7136\u800c\uff0c\u4ece\u7cfb\u7edf\u7a33\u5b9a\u6027\u89d2\u5ea6\u8003\u8651\uff0c\u5728\u5904\u7406\u8bf7\u6c42\u7684\u901f\u5ea6\u4e0a\uff0c\u4e5f\u6709\u975e\u5e38\u591a\u7684\u8bb2\u7a76\u3002\u4efb\u610f\u65f6\u95f4\u5230\u6765\u7684\u8bf7\u6c42\u5f80\u5f80\u662f\u968f\u673a\u4e0d\u53ef\u63a7\u7684\uff0c\u800c\u7cfb\u7edf\u7684\u5904\u7406\u80fd\u529b\u662f\u6709\u9650\u7684\u3002\u6211\u4eec\u9700\u8981\u6839\u636e\u7cfb\u7edf\u7684\u5904\u7406\u80fd\u529b\u5bf9\u6d41\u91cf\u8fdb\u884c\u63a7\u5236\u3002Sentinel \u4f5c\u4e3a\u4e00\u4e2a\u8c03\u914d\u5668\uff0c\u53ef\u4ee5\u6839\u636e\u9700\u8981\u628a\u968f\u673a\u7684\u8bf7\u6c42\u8c03\u6574\u6210\u5408\u9002\u7684\u5f62\u72b6"),(0,a.kt)("h4",{id:"\u6d41\u91cf\u63a7\u5236\u8bbe\u8ba1\u7406\u5ff5"},"\u6d41\u91cf\u63a7\u5236\u8bbe\u8ba1\u7406\u5ff5"),(0,a.kt)("p",null,"\u6d41\u91cf\u63a7\u5236\u6709\u4ee5\u4e0b\u51e0\u4e2a\u89d2\u5ea6:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u8d44\u6e90\u7684\u8c03\u7528\u5173\u7cfb\uff0c\u4f8b\u5982\u8d44\u6e90\u7684\u8c03\u7528\u94fe\u8def\uff0c\u8d44\u6e90\u548c\u8d44\u6e90\u4e4b\u95f4\u7684\u5173\u7cfb\uff1b"),(0,a.kt)("li",{parentName:"ul"},"\u8fd0\u884c\u6307\u6807\uff0c\u4f8b\u5982 QPS\u3001\u7ebf\u7a0b\u6c60\u3001\u7cfb\u7edf\u8d1f\u8f7d\u7b49\uff1b"),(0,a.kt)("li",{parentName:"ul"},"\u63a7\u5236\u7684\u6548\u679c\uff0c\u4f8b\u5982\u76f4\u63a5\u9650\u6d41\u3001\u51b7\u542f\u52a8\u3001\u6392\u961f\u7b49\u3002")),(0,a.kt)("p",null,"Sentinel \u7684\u8bbe\u8ba1\u7406\u5ff5\u662f\u8ba9\u60a8\u81ea\u7531\u9009\u62e9\u63a7\u5236\u7684\u89d2\u5ea6\uff0c\u5e76\u8fdb\u884c\u7075\u6d3b\u7ec4\u5408\uff0c\u4ece\u800c\u8fbe\u5230\u60f3\u8981\u7684\u6548\u679c\u3002"),(0,a.kt)("h3",{id:"\u7194\u65ad\u964d\u7ea7"},"\u7194\u65ad\u964d\u7ea7"),(0,a.kt)("h4",{id:"\u4ec0\u4e48\u662f\u7194\u65ad\u964d\u7ea7"},"\u4ec0\u4e48\u662f\u7194\u65ad\u964d\u7ea7"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"java -Dserver.port=8800 -jar sentinel-dashboard-1.8.0.jar")),(0,a.kt)("p",null,"Sentinel \u548c Hystrix \u7684\u539f\u5219\u662f\u4e00\u81f4\u7684: \u5f53\u68c0\u6d4b\u5230\u8c03\u7528\u94fe\u8def\u4e2d\u67d0\u4e2a\u8d44\u6e90\u51fa\u73b0\u4e0d\u7a33\u5b9a\u7684\u8868\u73b0\uff0c\u4f8b\u5982\u8bf7\u6c42\u54cd\u5e94\u65f6\u95f4\u957f\u6216\u5f02\u5e38\u6bd4\u4f8b\u5347\u9ad8\u7684\u65f6\u5019\uff0c\u5219\u5bf9\u8fd9\u4e2a\u8d44\u6e90\u7684\u8c03\u7528\u8fdb\u884c\u9650\u5236\uff0c\u8ba9\u8bf7\u6c42\u5feb\u901f\u5931\u8d25\uff0c\u907f\u514d\u5f71\u54cd\u5230\u5176\u5b83\u7684\u8d44\u6e90\u800c\u5bfc\u81f4\u7ea7\u8054\u6545\u969c\u3002"),(0,a.kt)("h4",{id:"\u7194\u65ad\u964d\u7ea7\u8bbe\u8ba1\u7406\u5ff5"},"\u7194\u65ad\u964d\u7ea7\u8bbe\u8ba1\u7406\u5ff5"),(0,a.kt)("p",null,"\u5728\u9650\u5236\u7684\u624b\u6bb5\u4e0a\uff0cSentinel \u548c Hystrix \u91c7\u53d6\u4e86\u5b8c\u5168\u4e0d\u4e00\u6837\u7684\u65b9\u6cd5\u3002"),(0,a.kt)("p",null,"Hystrix \u901a\u8fc7 ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/Netflix/Hystrix/wiki/How-it-Works#benefits-of-thread-pools"},"\u7ebf\u7a0b\u6c60\u9694\u79bb")," \u7684\u65b9\u5f0f\uff0c\u6765\u5bf9\u4f9d\u8d56\uff08\u5728 Sentinel \u7684\u6982\u5ff5\u4e2d\u5bf9\u5e94 ",(0,a.kt)("em",{parentName:"p"},"\u8d44\u6e90"),"\uff09\u8fdb\u884c\u4e86\u9694\u79bb\u3002\u8fd9\u6837\u505a\u7684\u597d\u5904\u662f\u8d44\u6e90\u548c\u8d44\u6e90\u4e4b\u95f4\u505a\u5230\u4e86\u6700\u5f7b\u5e95\u7684\u9694\u79bb\u3002\u7f3a\u70b9\u662f\u9664\u4e86\u589e\u52a0\u4e86\u7ebf\u7a0b\u5207\u6362\u7684\u6210\u672c\uff08\u8fc7\u591a\u7684\u7ebf\u7a0b\u6c60\u5bfc\u81f4\u7ebf\u7a0b\u6570\u76ee\u8fc7\u591a\uff09\uff0c\u8fd8\u9700\u8981\u9884\u5148\u7ed9\u5404\u4e2a\u8d44\u6e90\u505a\u7ebf\u7a0b\u6c60\u5927\u5c0f\u7684\u5206\u914d\u3002"),(0,a.kt)("p",null,"Sentinel \u5bf9\u8fd9\u4e2a\u95ee\u9898\u91c7\u53d6\u4e86\u4e24\u79cd\u624b\u6bb5:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u901a\u8fc7\u5e76\u53d1\u7ebf\u7a0b\u6570\u8fdb\u884c\u9650\u5236")),(0,a.kt)("p",null,"\u548c\u8d44\u6e90\u6c60\u9694\u79bb\u7684\u65b9\u6cd5\u4e0d\u540c\uff0cSentinel \u901a\u8fc7\u9650\u5236\u8d44\u6e90\u5e76\u53d1\u7ebf\u7a0b\u7684\u6570\u91cf\uff0c\u6765\u51cf\u5c11\u4e0d\u7a33\u5b9a\u8d44\u6e90\u5bf9\u5176\u5b83\u8d44\u6e90\u7684\u5f71\u54cd\u3002\u8fd9\u6837\u4e0d\u4f46\u6ca1\u6709\u7ebf\u7a0b\u5207\u6362\u7684\u635f\u8017\uff0c\u4e5f\u4e0d\u9700\u8981\u60a8\u9884\u5148\u5206\u914d\u7ebf\u7a0b\u6c60\u7684\u5927\u5c0f\u3002\u5f53\u67d0\u4e2a\u8d44\u6e90\u51fa\u73b0\u4e0d\u7a33\u5b9a\u7684\u60c5\u51b5\u4e0b\uff0c\u4f8b\u5982\u54cd\u5e94\u65f6\u95f4\u53d8\u957f\uff0c\u5bf9\u8d44\u6e90\u7684\u76f4\u63a5\u5f71\u54cd\u5c31\u662f\u4f1a\u9020\u6210\u7ebf\u7a0b\u6570\u7684\u9010\u6b65\u5806\u79ef\u3002\u5f53\u7ebf\u7a0b\u6570\u5728\u7279\u5b9a\u8d44\u6e90\u4e0a\u5806\u79ef\u5230\u4e00\u5b9a\u7684\u6570\u91cf\u4e4b\u540e\uff0c\u5bf9\u8be5\u8d44\u6e90\u7684\u65b0\u8bf7\u6c42\u5c31\u4f1a\u88ab\u62d2\u7edd\u3002\u5806\u79ef\u7684\u7ebf\u7a0b\u5b8c\u6210\u4efb\u52a1\u540e\u624d\u5f00\u59cb\u7ee7\u7eed\u63a5\u6536\u8bf7\u6c42\u3002"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u901a\u8fc7\u54cd\u5e94\u65f6\u95f4\u5bf9\u8d44\u6e90\u8fdb\u884c\u964d\u7ea7")),(0,a.kt)("p",null,"\u9664\u4e86\u5bf9\u5e76\u53d1\u7ebf\u7a0b\u6570\u8fdb\u884c\u63a7\u5236\u4ee5\u5916\uff0cSentinel \u8fd8\u53ef\u4ee5\u901a\u8fc7\u54cd\u5e94\u65f6\u95f4\u6765\u5feb\u901f\u964d\u7ea7\u4e0d\u7a33\u5b9a\u7684\u8d44\u6e90\u3002\u5f53\u4f9d\u8d56\u7684\u8d44\u6e90\u51fa\u73b0\u54cd\u5e94\u65f6\u95f4\u8fc7\u957f\u540e\uff0c\u6240\u6709\u5bf9\u8be5\u8d44\u6e90\u7684\u8bbf\u95ee\u90fd\u4f1a\u88ab\u76f4\u63a5\u62d2\u7edd\uff0c\u76f4\u5230\u8fc7\u4e86\u6307\u5b9a\u7684\u65f6\u95f4\u7a97\u53e3\u4e4b\u540e\u624d\u91cd\u65b0\u6062\u590d\u3002"),(0,a.kt)("h3",{id:"\u7cfb\u7edf\u81ea\u9002\u5e94\u4fdd\u62a4"},"\u7cfb\u7edf\u81ea\u9002\u5e94\u4fdd\u62a4"),(0,a.kt)("p",null,"Sentinel \u540c\u65f6\u63d0\u4f9b\u7cfb\u7edf\u7ef4\u5ea6\u7684\u81ea\u9002\u5e94\u4fdd\u62a4\u80fd\u529b\u3002\u9632\u6b62\u96ea\u5d29\uff0c\u662f\u7cfb\u7edf\u9632\u62a4\u4e2d\u91cd\u8981\u7684\u4e00\u73af\u3002\u5f53\u7cfb\u7edf\u8d1f\u8f7d\u8f83\u9ad8\u7684\u65f6\u5019\uff0c\u5982\u679c\u8fd8\u6301\u7eed\u8ba9\u8bf7\u6c42\u8fdb\u5165\uff0c\u53ef\u80fd\u4f1a\u5bfc\u81f4\u7cfb\u7edf\u5d29\u6e83\uff0c\u65e0\u6cd5\u54cd\u5e94\u3002\u5728\u96c6\u7fa4\u73af\u5883\u4e0b\uff0c\u7f51\u7edc\u8d1f\u8f7d\u5747\u8861\u4f1a\u628a\u672c\u5e94\u8fd9\u53f0\u673a\u5668\u627f\u8f7d\u7684\u6d41\u91cf\u8f6c\u53d1\u5230\u5176\u5b83\u7684\u673a\u5668\u4e0a\u53bb\u3002\u5982\u679c\u8fd9\u4e2a\u65f6\u5019\u5176\u5b83\u7684\u673a\u5668\u4e5f\u5904\u5728\u4e00\u4e2a\u8fb9\u7f18\u72b6\u6001\u7684\u65f6\u5019\uff0c\u8fd9\u4e2a\u589e\u52a0\u7684\u6d41\u91cf\u5c31\u4f1a\u5bfc\u81f4\u8fd9\u53f0\u673a\u5668\u4e5f\u5d29\u6e83\uff0c\u6700\u540e\u5bfc\u81f4\u6574\u4e2a\u96c6\u7fa4\u4e0d\u53ef\u7528\u3002"),(0,a.kt)("p",null,"\u9488\u5bf9\u8fd9\u4e2a\u60c5\u51b5\uff0cSentinel \u63d0\u4f9b\u4e86\u5bf9\u5e94\u7684\u4fdd\u62a4\u673a\u5236\uff0c\u8ba9\u7cfb\u7edf\u7684\u5165\u53e3\u6d41\u91cf\u548c\u7cfb\u7edf\u7684\u8d1f\u8f7d\u8fbe\u5230\u4e00\u4e2a\u5e73\u8861\uff0c\u4fdd\u8bc1\u7cfb\u7edf\u5728\u80fd\u529b\u8303\u56f4\u4e4b\u5185\u5904\u7406\u6700\u591a\u7684\u8bf7\u6c42\u3002"),(0,a.kt)("h2",{id:"sentinel-\u662f\u5982\u4f55\u5de5\u4f5c\u7684"},"Sentinel \u662f\u5982\u4f55\u5de5\u4f5c\u7684"),(0,a.kt)("p",null,"Sentinel \u7684\u4e3b\u8981\u5de5\u4f5c\u673a\u5236\u5982\u4e0b\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u5bf9\u4e3b\u6d41\u6846\u67b6\u63d0\u4f9b\u9002\u914d\u6216\u8005\u663e\u793a\u7684 API\uff0c\u6765\u5b9a\u4e49\u9700\u8981\u4fdd\u62a4\u7684\u8d44\u6e90\uff0c\u5e76\u63d0\u4f9b\u8bbe\u65bd\u5bf9\u8d44\u6e90\u8fdb\u884c\u5b9e\u65f6\u7edf\u8ba1\u548c\u8c03\u7528\u94fe\u8def\u5206\u6790\u3002"),(0,a.kt)("li",{parentName:"ul"},"\u6839\u636e\u9884\u8bbe\u7684\u89c4\u5219\uff0c\u7ed3\u5408\u5bf9\u8d44\u6e90\u7684\u5b9e\u65f6\u7edf\u8ba1\u4fe1\u606f\uff0c\u5bf9\u6d41\u91cf\u8fdb\u884c\u63a7\u5236\u3002\u540c\u65f6\uff0cSentinel \u63d0\u4f9b\u5f00\u653e\u7684\u63a5\u53e3\uff0c\u65b9\u4fbf\u60a8\u5b9a\u4e49\u53ca\u6539\u53d8\u89c4\u5219\u3002"),(0,a.kt)("li",{parentName:"ul"},"Sentinel \u63d0\u4f9b\u5b9e\u65f6\u7684\u76d1\u63a7\u7cfb\u7edf\uff0c\u65b9\u4fbf\u60a8\u5feb\u901f\u4e86\u89e3\u76ee\u524d\u7cfb\u7edf\u7684\u72b6\u6001\u3002")),(0,a.kt)("h2",{id:"sentinel-dashboard\u5b89\u88c5"},"Sentinel Dashboard\u5b89\u88c5"),(0,a.kt)("h3",{id:"\u4e0b\u8f7d"},"\u4e0b\u8f7d"),(0,a.kt)("p",null,"\u70b9\u51fb\u4e0b\u8f7d",(0,a.kt)("a",{parentName:"p",href:"https://github.com/alibaba/Sentinel/releases/download/v1.8.0/sentinel-dashboard-1.8.0.jar"},"sentinel-dashboard-1.8.0.jar")),(0,a.kt)("h3",{id:"\u542f\u52a8"},"\u542f\u52a8"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"java -Dserver.port=8800 -jar sentinel-dashboard-1.8.0.jar"),(0,a.kt)("p",{parentName:"blockquote"},"\u6ce8\u610f\uff1aSentinel\u63a7\u5236\u53f0\u9700\u8981JDK1.8\u53ca\u4ee5\u4e0a\u7248\u672c\u624d\u884c\n\u89e3\u91ca\uff1a-Dserver.port=8800\uff1a\u6307\u5b9aSentinel\u63a7\u5236\u53f0\u7aef\u53e3\u4e3a8800")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},"java -Dserver.port=8800 -jar sentinel-dashboard-1.8.0.jar\n")),(0,a.kt)("p",null,"\u542f\u52a8\u6210\u529f\u4e4b\u540e\uff0c\u8bbf\u95eehttp://localhost:8800/"),(0,a.kt)("p",null,"\u5728Sentinel1.6\u7248\u672c\u4e4b\u540e\u90fd\u52a0\u5165\u4e86\u9274\u6743\u6a21\u5757\uff0c\u9ed8\u8ba4\u8d26\u53f7\u5bc6\u7801\u4e3a\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"sentinel")),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201006191258217.png",alt:"image-20201006191258217"})),(0,a.kt)("p",null,"\u767b\u9646\u6210\u529f\u540e\u5373\u53ef\u770b\u5230\u5982\u4e0b\u754c\u9762\uff0c\u6b63\u5982\u4f60\u6240\u89c1\uff0c\u4ec0\u4e48\u90fd\u6ca1\u6709\u3002"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201006191423993.png",alt:"image-20201006191423993"})),(0,a.kt)("h2",{id:"\u4f7f\u7528sentinel"},"\u4f7f\u7528Sentinel"),(0,a.kt)("h3",{id:"\u642d\u5efa\u5de5\u7a0b"},"\u642d\u5efa\u5de5\u7a0b"),(0,a.kt)("p",null,"\u6839\u636e\u4e0a\u4e00\u7bc7\u7684\u9879\u76ee\u7ed3\u6784\uff0c\u521b\u5efa\u4e00\u4e2a\u5b50\u6a21\u5757"),(0,a.kt)("p",null,"spring-cloud-alibaba-sentinel"),(0,a.kt)("p",null,"pom"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-xml"}," <dependencies>\n     \x3c!-- spring boot web --\x3e\n     <dependency>\n         <groupId>org.springframework.boot</groupId>\n         <artifactId>spring-boot-starter-web</artifactId>\n     </dependency>\n \n     \x3c!-- sentinel --\x3e\n     <dependency>\n         <groupId>com.alibaba.cloud</groupId>\n         <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>\n     </dependency>\n </dependencies>\n")),(0,a.kt)("p",null,"application.yml"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yml"}," server:\n   port: 6677\n spring:\n   application:\n     name: spring-cloud-alibaba-sentinel\n   cloud:\n     sentinel:\n       transport:\n         dashboard: 127.0.0.1:8800\n         port: 8719\n")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u8fd9\u91cc\u7684",(0,a.kt)("inlineCode",{parentName:"p"},"${spring.cloud.sentinel.transport.port}"),"\u7aef\u53e3\u4f1a\u5728\u5bf9\u5e94\u7684\u673a\u5668\u4e0a\u542f\u52a8\u4e00\u4e2aHttp Server\uff0c\u8be5Server\u4f1a\u548cSentinel\u63a7\u5236\u53f0\u505a\u4ea4\u4e92\u3002\n\u6bd4\u5982\uff1a\u5728Sentinel\u63a7\u5236\u53f0\u6dfb\u52a0\u4e86\u4e00\u4e2a\u9650\u6d41\u89c4\u5219\uff0c\u4f1a\u628a\u89c4\u5219\u6570\u636epush\u7ed9\u8fd9\u4e2aHttp Server\u63a5\u6536\uff0cHttp Server\u518d\u5c06\u89c4\u5219\u6ce8\u518c\u5230Sentinel\u4e2d")),(0,a.kt)("p",null,"DemoController"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},' package io.mvvm.controller;\n \n import org.springframework.web.bind.annotation.GetMapping;\n import org.springframework.web.bind.annotation.RestController;\n \n @RestController\n public class DemoController {\n \n     @GetMapping("/demo")\n     public String demo(){\n         return "hello";\n     }\n \n }\n')),(0,a.kt)("h3",{id:"\u6d4b\u8bd5"},"\u6d4b\u8bd5"),(0,a.kt)("p",null,"\u8bbf\u95eehttp://localhost:6677/demo\u540e\u6d4f\u89c8\u5668\u4e2d\u6253\u5370\u4e86\uff1ahello"),(0,a.kt)("p",null,"\u6211\u4eec\u518d\u56de\u5230Sentinel \u63a7\u5236\u53f0\u4e2d\uff0c\u53d1\u73b0\u73b0\u5728\u5df2\u7ecf\u6709\u4e86\u6570\u636e"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20201006193128833.png",alt:"image-20201006193128833"})),(0,a.kt)("p",null,"Git\u5730\u5740\uff1a",(0,a.kt)("a",{parentName:"p",href:"https://gitee.com/aumu/spring-cloud-alibaba-demo"},"https://gitee.com/aumu/spring-cloud-alibaba-demo")))}c.isMDXComponent=!0}}]);