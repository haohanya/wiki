"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[4188],{9613:(e,t,l)=>{l.d(t,{Zo:()=>u,kt:()=>k});var a=l(9496);function n(e,t,l){return t in e?Object.defineProperty(e,t,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[t]=l,e}function r(e,t){var l=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),l.push.apply(l,a)}return l}function i(e){for(var t=1;t<arguments.length;t++){var l=null!=arguments[t]?arguments[t]:{};t%2?r(Object(l),!0).forEach((function(t){n(e,t,l[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(l)):r(Object(l)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(l,t))}))}return e}function p(e,t){if(null==e)return{};var l,a,n=function(e,t){if(null==e)return{};var l,a,n={},r=Object.keys(e);for(a=0;a<r.length;a++)l=r[a],t.indexOf(l)>=0||(n[l]=e[l]);return n}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)l=r[a],t.indexOf(l)>=0||Object.prototype.propertyIsEnumerable.call(e,l)&&(n[l]=e[l])}return n}var o=a.createContext({}),s=function(e){var t=a.useContext(o),l=t;return e&&(l="function"==typeof e?e(t):i(i({},t),e)),l},u=function(e){var t=s(e.components);return a.createElement(o.Provider,{value:t},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var l=e.components,n=e.mdxType,r=e.originalType,o=e.parentName,u=p(e,["components","mdxType","originalType","parentName"]),m=s(l),c=n,k=m["".concat(o,".").concat(c)]||m[c]||d[c]||r;return l?a.createElement(k,i(i({ref:t},u),{},{components:l})):a.createElement(k,i({ref:t},u))}));function k(e,t){var l=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=l.length,i=new Array(r);i[0]=c;var p={};for(var o in t)hasOwnProperty.call(t,o)&&(p[o]=t[o]);p.originalType=e,p[m]="string"==typeof e?e:n,i[1]=p;for(var s=2;s<r;s++)i[s]=l[s];return a.createElement.apply(null,i)}return a.createElement.apply(null,l)}c.displayName="MDXCreateElement"},7691:(e,t,l)=>{l.r(t),l.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>p,toc:()=>s});var a=l(4778),n=(l(9496),l(9613));const r={},i="Git",p={unversionedId:"\u540e\u7aef/Git",id:"\u540e\u7aef/Git",title:"Git",description:"\u57fa\u64cd",source:"@site/docs/\u540e\u7aef/Git.md",sourceDirName:"\u540e\u7aef",slug:"/\u540e\u7aef/Git",permalink:"/docs/\u540e\u7aef/Git",draft:!1,editUrl:"https://github.com/pannanxu/wiki/docs/\u540e\u7aef/Git.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Flawable",permalink:"/docs/\u540e\u7aef/Flowable"},next:{title:"BIO",permalink:"/docs/\u540e\u7aef/JDK/Bio"}},o={},s=[{value:"\u57fa\u64cd",id:"\u57fa\u64cd",level:2},{value:"\u7528\u6237\u540d &amp; \u90ae\u7bb1",id:"\u7528\u6237\u540d--\u90ae\u7bb1",level:3},{value:"\u652f\u6301\u4e2d\u6587\u8def\u5f84",id:"\u652f\u6301\u4e2d\u6587\u8def\u5f84",level:3},{value:"\u67e5\u770bGit\u914d\u7f6e",id:"\u67e5\u770bgit\u914d\u7f6e",level:3},{value:"\u62c9\u53d6\u4ed3\u5e93",id:"\u62c9\u53d6\u4ed3\u5e93",level:3},{value:"\u6dfb\u52a0\u6587\u4ef6\u5230\u7d22\u5f15\u533a",id:"\u6dfb\u52a0\u6587\u4ef6\u5230\u7d22\u5f15\u533a",level:3},{value:"\u521b\u5efa\u63d0\u4ea4",id:"\u521b\u5efa\u63d0\u4ea4",level:3},{value:"\u521b\u5efa\u5206\u652f",id:"\u521b\u5efa\u5206\u652f",level:3},{value:"\u5207\u6362\u5206\u652f",id:"\u5207\u6362\u5206\u652f",level:3},{value:"\u67e5\u770b\u672c\u5730\u4ed3\u5e93\u5bf9\u5e94\u7684\u8fdc\u7a0b\u4ed3\u5e93\u5730\u5740",id:"\u67e5\u770b\u672c\u5730\u4ed3\u5e93\u5bf9\u5e94\u7684\u8fdc\u7a0b\u4ed3\u5e93\u5730\u5740",level:3},{value:"\u5c06\u672c\u5730\u5206\u652f\u4e0e\u8fdc\u7a0b\u5206\u652f\u5efa\u7acb\u5173\u7cfb",id:"\u5c06\u672c\u5730\u5206\u652f\u4e0e\u8fdc\u7a0b\u5206\u652f\u5efa\u7acb\u5173\u7cfb",level:3},{value:"\u4ee3\u7801\u540c\u6b65",id:"\u4ee3\u7801\u540c\u6b65",level:3},{value:"\u67e5\u770b\u5f53\u524d\u4ee3\u7801\u5e93\u7684\u6587\u4ef6\u4fee\u6539\u72b6\u6001\u5217\u8868",id:"\u67e5\u770b\u5f53\u524d\u4ee3\u7801\u5e93\u7684\u6587\u4ef6\u4fee\u6539\u72b6\u6001\u5217\u8868",level:3},{value:"\u5c06\u672c\u5730\u63d0\u4ea4\u63a8\u9001\u81f3\u8fdc\u7aef",id:"\u5c06\u672c\u5730\u63d0\u4ea4\u63a8\u9001\u81f3\u8fdc\u7aef",level:3},{value:"\u5c06dev\u5206\u652f\u5408\u5e76\u5230master",id:"\u5c06dev\u5206\u652f\u5408\u5e76\u5230master",level:3},{value:"\u62c9\u53d6\u8fdc\u7a0b\u67d0\u4e00\u4e2a\u5206\u652f",id:"\u62c9\u53d6\u8fdc\u7a0b\u67d0\u4e00\u4e2a\u5206\u652f",level:3},{value:"\u6807\u7b7e",id:"\u6807\u7b7e",level:3},{value:"\u4ee3\u7801\u5408\u5e76(merge) &amp; \u53d8\u57fa(rebase)",id:"\u4ee3\u7801\u5408\u5e76merge--\u53d8\u57farebase",level:2},{value:"\u5408\u5e76 pr",id:"\u5408\u5e76-pr",level:3},{value:"Stash",id:"stash",level:2},{value:"reset",id:"reset",level:2},{value:"pull",id:"pull",level:2},{value:"\u5c06\u8fdc\u7a0b(origin)\u6307\u5b9a\u5206\u652f \u62c9\u53d6\u5230 \u672c\u5730\u6307\u5b9a\u5206\u652f",id:"\u5c06\u8fdc\u7a0borigin\u6307\u5b9a\u5206\u652f-\u62c9\u53d6\u5230-\u672c\u5730\u6307\u5b9a\u5206\u652f",level:3},{value:"\u5c06\u8fdc\u7a0b\u6307\u5b9a\u5206\u652f \u62c9\u53d6\u5230 \u5f53\u524d\u5206\u652f",id:"\u5c06\u8fdc\u7a0b\u6307\u5b9a\u5206\u652f-\u62c9\u53d6\u5230-\u5f53\u524d\u5206\u652f",level:3},{value:"\u5c06 <code>\u672c\u5730\u7684</code> <code>\u5f53\u524d\u5206\u652f</code> \u4e0e <code>\u8fdc\u7a0b\u5206\u652f\u540c\u540d\u7684</code> \u62c9\u53d6\u5230 <code>\u672c\u5730\u5f53\u524d\u5206\u652f</code>\u4e0a",id:"\u5c06-\u672c\u5730\u7684-\u5f53\u524d\u5206\u652f-\u4e0e-\u8fdc\u7a0b\u5206\u652f\u540c\u540d\u7684-\u62c9\u53d6\u5230-\u672c\u5730\u5f53\u524d\u5206\u652f\u4e0a",level:3},{value:"push",id:"push",level:2},{value:"\u5c06\u672c\u5730\u5f53\u524d\u5206\u652f \u63a8\u9001\u5230 \u8fdc\u7a0b\u6307\u5b9a\u5206\u652f\u4e0a",id:"\u5c06\u672c\u5730\u5f53\u524d\u5206\u652f-\u63a8\u9001\u5230-\u8fdc\u7a0b\u6307\u5b9a\u5206\u652f\u4e0a",level:3},{value:"\u5c06\u672c\u5730\u5f53\u524d\u5206\u652f \u63a8\u9001\u5230 \u4e0e\u672c\u5730\u5f53\u524d\u5206\u652f\u540c\u540d\u7684\u8fdc\u7a0b\u5206\u652f\u4e0a",id:"\u5c06\u672c\u5730\u5f53\u524d\u5206\u652f-\u63a8\u9001\u5230-\u4e0e\u672c\u5730\u5f53\u524d\u5206\u652f\u540c\u540d\u7684\u8fdc\u7a0b\u5206\u652f\u4e0a",level:3},{value:"\u5c06\u672c\u5730\u5f53\u524d\u5206\u652f \u63a8\u9001\u5230 \u4e0e\u672c\u5730\u5f53\u524d\u5206\u652f\u540c\u540d\u7684\u8fdc\u7a0b\u5206\u652f\u4e0a",id:"\u5c06\u672c\u5730\u5f53\u524d\u5206\u652f-\u63a8\u9001\u5230-\u4e0e\u672c\u5730\u5f53\u524d\u5206\u652f\u540c\u540d\u7684\u8fdc\u7a0b\u5206\u652f\u4e0a-1",level:3},{value:"\u5de5\u4f5c\u6d41",id:"\u5de5\u4f5c\u6d41",level:2},{value:".gitignore",id:"gitignore",level:2},{value:"\u5e38\u7528\u914d\u7f6e",id:"\u5e38\u7528\u914d\u7f6e",level:3}],u={toc:s},m="wrapper";function d(e){let{components:t,...l}=e;return(0,n.kt)(m,(0,a.Z)({},u,l,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"git"},"Git"),(0,n.kt)("h2",{id:"\u57fa\u64cd"},"\u57fa\u64cd"),(0,n.kt)("h3",{id:"\u7528\u6237\u540d--\u90ae\u7bb1"},"\u7528\u6237\u540d & \u90ae\u7bb1"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},'# \u8bf7\u66ff\u6362\u4f60\u7684\u7528\u6237\u540d\ngit config [--global] user.name "Your Name"      \n# \u8bf7\u66ff\u6362\u4f60\u81ea\u5df1\u7684\u90ae\u7bb1\ngit config [--global] user.email your@email\n')),(0,n.kt)("h3",{id:"\u652f\u6301\u4e2d\u6587\u8def\u5f84"},"\u652f\u6301\u4e2d\u6587\u8def\u5f84"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"git config [--global] core.quotepath false\n")),(0,n.kt)("h3",{id:"\u67e5\u770bgit\u914d\u7f6e"},"\u67e5\u770bGit\u914d\u7f6e"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"git config [--global] --list\n")),(0,n.kt)("h3",{id:"\u62c9\u53d6\u4ed3\u5e93"},"\u62c9\u53d6\u4ed3\u5e93"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"git clone <\u4ed3\u5e93\u5730\u5740>\n")),(0,n.kt)("h3",{id:"\u6dfb\u52a0\u6587\u4ef6\u5230\u7d22\u5f15\u533a"},"\u6dfb\u52a0\u6587\u4ef6\u5230\u7d22\u5f15\u533a"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"git add MacOS\u73af\u5883\u914d\u7f6e.md\n")),(0,n.kt)("h3",{id:"\u521b\u5efa\u63d0\u4ea4"},"\u521b\u5efa\u63d0\u4ea4"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},'git commit -m -s "Initial commit" [--amend]\n')),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"--amend")," \u5408\u5e76\u4e0a\u4e00\u6b21\u672apush\u7684 commit \u8bb0\u5f55")),(0,n.kt)("h3",{id:"\u521b\u5efa\u5206\u652f"},"\u521b\u5efa\u5206\u652f"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"git checkout -b <branch> <start-point>\n")),(0,n.kt)("h3",{id:"\u5207\u6362\u5206\u652f"},"\u5207\u6362\u5206\u652f"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"git checkout master\n")),(0,n.kt)("h3",{id:"\u67e5\u770b\u672c\u5730\u4ed3\u5e93\u5bf9\u5e94\u7684\u8fdc\u7a0b\u4ed3\u5e93\u5730\u5740"},"\u67e5\u770b\u672c\u5730\u4ed3\u5e93\u5bf9\u5e94\u7684\u8fdc\u7a0b\u4ed3\u5e93\u5730\u5740"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"git remote -v\n")),(0,n.kt)("h3",{id:"\u5c06\u672c\u5730\u5206\u652f\u4e0e\u8fdc\u7a0b\u5206\u652f\u5efa\u7acb\u5173\u7cfb"},"\u5c06\u672c\u5730\u5206\u652f\u4e0e\u8fdc\u7a0b\u5206\u652f\u5efa\u7acb\u5173\u7cfb"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"git branch -u origin/master\n")),(0,n.kt)("h3",{id:"\u4ee3\u7801\u540c\u6b65"},"\u4ee3\u7801\u540c\u6b65"),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"\u548c\u8fdc\u7a0b\u5206\u652f\u540c\u6b65, \u82e5\u548c\u8fdc\u7a0b\u5206\u652f\u504f\u79bb, \u6267\u884c\u5408\u5e76\u4ee5\u5b8c\u6210\u66f4\u65b0")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"git pull\n")),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"\u548c\u8fdc\u7a0b\u5206\u652f\u540c\u6b65, \u82e5\u548c\u8fdc\u7a0b\u5206\u652f\u504f\u79bb, \u5c06\u672c\u5730\u5dee\u5f02\u63d0\u4ea4\u53d8\u57fa\u5230\u8fdc\u7a0b\u5206\u652f, \u4ee5\u5b8c\u6210\u66f4\u65b0")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"git pull --rebase\n")),(0,n.kt)("h3",{id:"\u67e5\u770b\u5f53\u524d\u4ee3\u7801\u5e93\u7684\u6587\u4ef6\u4fee\u6539\u72b6\u6001\u5217\u8868"},"\u67e5\u770b\u5f53\u524d\u4ee3\u7801\u5e93\u7684\u6587\u4ef6\u4fee\u6539\u72b6\u6001\u5217\u8868"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"git status\n")),(0,n.kt)("h3",{id:"\u5c06\u672c\u5730\u63d0\u4ea4\u63a8\u9001\u81f3\u8fdc\u7aef"},"\u5c06\u672c\u5730\u63d0\u4ea4\u63a8\u9001\u81f3\u8fdc\u7aef"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"git push\n")),(0,n.kt)("h3",{id:"\u5c06dev\u5206\u652f\u5408\u5e76\u5230master"},"\u5c06dev\u5206\u652f\u5408\u5e76\u5230master"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"git checkout master\ngit merge dev\n")),(0,n.kt)("p",null,"\u7b80\u5199"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-gitexclude"},"git merge dev master\n")),(0,n.kt)("h3",{id:"\u62c9\u53d6\u8fdc\u7a0b\u67d0\u4e00\u4e2a\u5206\u652f"},"\u62c9\u53d6\u8fdc\u7a0b\u67d0\u4e00\u4e2a\u5206\u652f"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"git fetch origin(\u6e90) \u5206\u652f\u540d\u79f0\n")),(0,n.kt)("h3",{id:"\u6807\u7b7e"},"\u6807\u7b7e"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"# \u521b\u5efa\u4e00\u4e2a v1.0 \u7684\u6807\u7b7e\uff0c\u8bf4\u660e\u662f\uff1a\u7248\u672c 1.0\ngit tag -a v1.0 -m '\u7248\u672c 1.0'\n# \u5217\u51fatag\u5217\u8868\ngit tag\n# \u5339\u914d\u51fa \u4ee5 v1. \u5f00\u5934\u7684\u6807\u7b7e\ngit tag -l 'v1.*'\n# \u67e5\u770b\u6807\u7b7e\u7684\u4fe1\u606f\ngit show v1.0\n# \u63a8\u9001\u6807\u7b7e\u5230\u670d\u52a1\u5668\u4e2d git push origin --tags\u63a8\u9001\u6240\u6709\u6807\u7b7e\ngit push origin v1.0\n")),(0,n.kt)("h2",{id:"\u4ee3\u7801\u5408\u5e76merge--\u53d8\u57farebase"},"\u4ee3\u7801\u5408\u5e76(merge) & \u53d8\u57fa(rebase)"),(0,n.kt)("h3",{id:"\u5408\u5e76-pr"},"\u5408\u5e76 pr"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"# \u6dfb\u52a0\u63d0\u4ea4 pr \u7684\u4ed3\u5e93\u5730\u5740\ngit remote add guqing https://github.com/guqing/halo.git\n# \u52a0\u8f7d\u4ed3\u5e93\u4fe1\u606f\ngit fetch guqing\n# \u5408\u5e76\u6307\u5b9a\u5206\u652f\ngit cherry-pick  <commitId>\n")),(0,n.kt)("h2",{id:"stash"},"Stash"),(0,n.kt)("p",null,"Stash \u5c06\u5df2\u4fee\u6539\u7684\u4ee3\u7801\u653e\u5165\u6682\u5b58\u533a"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"git stash save 'Hello' [--keep-index]\ngit stash list\ngit stash apply 'stash@{0}'\ngit stash drop 'stash@{0}'\ngit stash pop 'stash@{0}'\n")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"\u8bf4\u660e")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"save")," \u4fdd\u5b58\u5f53\u524d\u5206\u652f\u4fee\u6539\u7684\u5185\u5bb9\u5230\u6682\u5b58\u533a\u4e2d\u5e76\u8bbe\u7f6e\u8bf4\u660e\u4e3a\u201cHello\u201d; ",(0,n.kt)("inlineCode",{parentName:"li"},"--keep-index")," \u8868\u793a\u4e0d\u4f1a\u6682\u5b58\u4f7f\u7528 ",(0,n.kt)("inlineCode",{parentName:"li"},"git add")," \u6682\u5b58\u540e\u7684\u4e1c\u897f "),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"list")," \u5217\u51fa\u6682\u5b58\u533a"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"apply")," \u4f7f\u7528\u6307\u5b9a\u7684\u6682\u5b58\u533a\uff0c\u6b64\u64cd\u4f5c\u4e0d\u4f1a\u5220\u9664\u6682\u5b58\u533a"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"drop")," \u5220\u9664\u6307\u5b9a\u7684\u6682\u5b58\u533a"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"pop")," \u4f7f\u7528\u6307\u5b9a\u7684\u6682\u5b58\u533a\uff0c\u5e76\u4e14\u5220\u9664")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"\u5e94\u7528\u573a\u666f:")),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"\u5f53\u6211\u4eec\u5728 dev \u5206\u652f\u5f00\u53d1\u65f6\uff0cmaster \u51fa\u73b0\u4e00\u4e2a\u7d27\u6025bug\uff0c\u9700\u8981\u6211\u4eec\u5207\u6362\u5230 master \u5206\u652f\u8fdb\u884c\u4fee\u6539"),(0,n.kt)("p",{parentName:"blockquote"},"\u4f46\u662f\u6b64\u65f6\u6211\u4eec\u5728 dev \u5206\u652f\u5f00\u53d1\u7684\u4ee3\u7801\u5e76\u6ca1\u6709\u5b8c\u6210\uff0c\u5982\u679c\u8d38\u7136\u5207\u6362\u5206\u652f\u5230 master \u4f1a\u7167\u6210 dev \u5206\u652f\u672a\u63d0\u4ea4\u7684\u4ee3\u7801\u4e22\u5931"),(0,n.kt)("p",{parentName:"blockquote"},"\u4e3a\u4e86\u89e3\u51b3\u6b64\u95ee\u9898\uff0c\u6211\u4eec\u53ef\u4ee5\u4f7f\u7528 ",(0,n.kt)("inlineCode",{parentName:"p"},"stash save")," \u547d\u4ee4\uff0c\u5c06 dev \u5206\u652f\u7684\u4ee3\u7801\u5b58\u5165\u6682\u5b58\u533a\u4e2d\uff0c\u7136\u540e\u518d\u5207\u6362\u5230 master \u8fdb\u884c\u4fee\u590d bug"),(0,n.kt)("p",{parentName:"blockquote"},"\u5f53\u518d\u6b21\u5207\u6362\u56de dev \u5206\u652f\u65f6\uff0c\u6211\u4eec\u53ef\u4ee5\u4f7f\u7528 ",(0,n.kt)("inlineCode",{parentName:"p"},"stash pop")," \u6062\u590d\u6682\u5b58\u533a\u7684\u4ee3\u7801")),(0,n.kt)("h2",{id:"reset"},"reset"),(0,n.kt)("p",null,"\u64a4\u9500\u4e0a\u4e00\u6b21 commit \u4f46\u4fdd\u7559\u5de5\u4f5c\u7a7a\u95f4\u5df2\u4fee\u6539\u4ee3\u7801"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"git reset --mixed HEAD^ --\n")),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"HEAD^")," \u64a4\u9500\u4e0a\u4e00\u6b21 commit \u7684\u4ee3\u7801"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"HEAD~3")," \u64a4\u9500\u6700\u8fd1\u4e09\u6b21 commit \u7684\u4ee3\u7801"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"--mixed")," \u4e0d\u5220\u9664\u5de5\u4f5c\u7a7a\u95f4\u4ee3\u7801\u3001\u64a4\u9500 commit\u3001\u64a4\u9500 git add"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"--soft")," \u4e0d\u5220\u9664\u5de5\u4f5c\u7a7a\u95f4\u4ee3\u7801\u3001\u64a4\u9500 commit\u3001\u4e0d\u64a4\u9500 git add"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"--hard")," \u5220\u9664\u5de5\u4f5c\u7a7a\u95f4\u4ee3\u7801\u3001\u64a4\u9500 commit\u3001\u64a4\u9500 git add")),(0,n.kt)("h2",{id:"pull"},"pull"),(0,n.kt)("h3",{id:"\u5c06\u8fdc\u7a0borigin\u6307\u5b9a\u5206\u652f-\u62c9\u53d6\u5230-\u672c\u5730\u6307\u5b9a\u5206\u652f"},"\u5c06\u8fdc\u7a0b(origin)\u6307\u5b9a\u5206\u652f \u62c9\u53d6\u5230 \u672c\u5730\u6307\u5b9a\u5206\u652f"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"git pull origin <\u8fdc\u7a0b\u5206\u652f\u540d>:<\u672c\u5730\u5206\u652f\u540d>\n")),(0,n.kt)("h3",{id:"\u5c06\u8fdc\u7a0b\u6307\u5b9a\u5206\u652f-\u62c9\u53d6\u5230-\u5f53\u524d\u5206\u652f"},"\u5c06\u8fdc\u7a0b\u6307\u5b9a\u5206\u652f \u62c9\u53d6\u5230 \u5f53\u524d\u5206\u652f"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"git pull origin <\u8fdc\u7a0b\u5206\u652f\u540d>\n")),(0,n.kt)("h3",{id:"\u5c06-\u672c\u5730\u7684-\u5f53\u524d\u5206\u652f-\u4e0e-\u8fdc\u7a0b\u5206\u652f\u540c\u540d\u7684-\u62c9\u53d6\u5230-\u672c\u5730\u5f53\u524d\u5206\u652f\u4e0a"},"\u5c06 ",(0,n.kt)("inlineCode",{parentName:"h3"},"\u672c\u5730\u7684")," ",(0,n.kt)("inlineCode",{parentName:"h3"},"\u5f53\u524d\u5206\u652f")," \u4e0e ",(0,n.kt)("inlineCode",{parentName:"h3"},"\u8fdc\u7a0b\u5206\u652f\u540c\u540d\u7684")," \u62c9\u53d6\u5230 ",(0,n.kt)("inlineCode",{parentName:"h3"},"\u672c\u5730\u5f53\u524d\u5206\u652f"),"\u4e0a"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"git pull\n")),(0,n.kt)("h2",{id:"push"},"push"),(0,n.kt)("h3",{id:"\u5c06\u672c\u5730\u5f53\u524d\u5206\u652f-\u63a8\u9001\u5230-\u8fdc\u7a0b\u6307\u5b9a\u5206\u652f\u4e0a"},"\u5c06\u672c\u5730\u5f53\u524d\u5206\u652f \u63a8\u9001\u5230 \u8fdc\u7a0b\u6307\u5b9a\u5206\u652f\u4e0a"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"git push origin <\u672c\u5730\u5206\u652f\u540d>:<\u8fdc\u7a0b\u5206\u652f\u540d>\n")),(0,n.kt)("h3",{id:"\u5c06\u672c\u5730\u5f53\u524d\u5206\u652f-\u63a8\u9001\u5230-\u4e0e\u672c\u5730\u5f53\u524d\u5206\u652f\u540c\u540d\u7684\u8fdc\u7a0b\u5206\u652f\u4e0a"},"\u5c06\u672c\u5730\u5f53\u524d\u5206\u652f \u63a8\u9001\u5230 \u4e0e\u672c\u5730\u5f53\u524d\u5206\u652f\u540c\u540d\u7684\u8fdc\u7a0b\u5206\u652f\u4e0a"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"git push origin <\u672c\u5730\u5206\u652f\u540d>\n")),(0,n.kt)("h3",{id:"\u5c06\u672c\u5730\u5f53\u524d\u5206\u652f-\u63a8\u9001\u5230-\u4e0e\u672c\u5730\u5f53\u524d\u5206\u652f\u540c\u540d\u7684\u8fdc\u7a0b\u5206\u652f\u4e0a-1"},"\u5c06\u672c\u5730\u5f53\u524d\u5206\u652f \u63a8\u9001\u5230 \u4e0e\u672c\u5730\u5f53\u524d\u5206\u652f\u540c\u540d\u7684\u8fdc\u7a0b\u5206\u652f\u4e0a"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-shell"},"git push\n")),(0,n.kt)("h2",{id:"\u5de5\u4f5c\u6d41"},"\u5de5\u4f5c\u6d41"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"\u96c6\u4e2d\u5f0f\u5de5\u4f5c\u6d41\uff1a\u5f00\u53d1\u8005\u76f4\u63a5\u5728\u672c\u5730 master \u5206\u652f\u5f00\u53d1\u4ee3\u7801\uff0c\u5f00\u53d1\u5b8c\u6210\u540e push \u5230\u8fdc\u7aef\u4ed3\u5e93 master \u5206\u652f\u3002  "),(0,n.kt)("li",{parentName:"ul"},"\u529f\u80fd\u5206\u652f\u5de5\u4f5c\u6d41\uff1a\u5f00\u53d1\u8005\u57fa\u4e8e master \u5206\u652f\u521b\u5efa\u4e00\u4e2a\u65b0\u5206\u652f\uff0c\u5728\u65b0\u5206\u652f\u8fdb\u884c\u5f00\u53d1\uff0c\u5f00\u53d1\u5b8c\u6210\u540e\u5408\u5e76\u5230\u8fdc\u7aef\u4ed3\u5e93 master \u5206\u652f\u3002  "),(0,n.kt)("li",{parentName:"ul"},"Git Flow \u5de5\u4f5c\u6d41\uff1aGit Flow \u5de5\u4f5c\u6d41\u4e3a\u4e0d\u540c\u7684\u5206\u652f\u5206\u914d\u4e00\u4e2a\u660e\u786e\u7684\u89d2\u8272\uff0c\u5e76\u5b9a\u4e49\u5206\u652f\u4e4b\u95f4\u4ec0\u4e48\u65f6\u5019\u3001\u5982\u4f55\u8fdb\u884c\u4ea4\u4e92\uff0c\u6bd4\u8f83\u9002\u5408\u5927\u578b\u9879\u76ee\u7684\u5f00\u53d1\u3002  "),(0,n.kt)("li",{parentName:"ul"},"Forking \u5de5\u4f5c\u6d41\uff1a\u5f00\u53d1\u8005\u5148 fork \u9879\u76ee\u5230\u4e2a\u4eba\u4ed3\u5e93\uff0c\u5728\u4e2a\u4eba\u4ed3\u5e93\u5b8c\u6210\u5f00\u53d1\u540e\uff0c\u63d0\u4ea4 pull request \u5230\u76ee\u6807\u8fdc\u7a0b\u4ed3\u5e93\uff0c\u8fdc\u7a0b\u4ed3\u5e93 review \u540e\uff0c\u5408\u5e76 pull request \u5230 master \u5206\u652f")),(0,n.kt)("h2",{id:"gitignore"},".gitignore"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"# Hello")," \u6ce8\u91ca"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"*.class")," \u5ffd\u7565\u6240\u6709\u4ee5 ",(0,n.kt)("inlineCode",{parentName:"li"},".class")," \u7ed3\u5c3e\u7684\u6587\u4ef6"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"!a.class")," \u9664\u4e86\u6587\u4ef6\u540d\u79f0\u4e3a ",(0,n.kt)("inlineCode",{parentName:"li"},"a.class")," \u7684\u6587\u4ef6\u4e0d\u4f1a\u88ab\u5ffd\u7565"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"/target")," \u5ffd\u7565 ",(0,n.kt)("inlineCode",{parentName:"li"},"/target")," ",(0,n.kt)("em",{parentName:"li"},"\u6839\u76ee\u5f55")," \u4e0b\u7684\u6587\u4ef6"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"target/")," \u5ffd\u7565 ",(0,n.kt)("inlineCode",{parentName:"li"},"target/")," ",(0,n.kt)("em",{parentName:"li"},"\u76ee\u5f55")," \u4e0b\u6240\u6709\u7684\u6587\u4ef6"),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("inlineCode",{parentName:"li"},"target/*.html")," \u5ffd\u7565 ",(0,n.kt)("inlineCode",{parentName:"li"},"target")," ",(0,n.kt)("em",{parentName:"li"},"\u6839\u76ee\u5f55")," \u4e0b\u6240\u6709\u4ee5 ",(0,n.kt)("inlineCode",{parentName:"li"},".html")," \u7ed3\u5c3e\u7684\u6587\u4ef6")),(0,n.kt)("h3",{id:"\u5e38\u7528\u914d\u7f6e"},"\u5e38\u7528\u914d\u7f6e"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-.gitignore"},"HELP.md\ntarget/\n!.mvn/wrapper/maven-wrapper.jar\n!**/src/main/**\n!**/src/test/**\n\n#### STS ####\n.apt_generated\n.classpath\n.factorypath\n.project\n.settings\n.springBeans\n.sts4-cache\n\n#### IntelliJ IDEA ####\n.idea\n*.iws\n*.iml\n*.ipr\n\n#### NetBeans ####\n/nbproject/private/\n/nbbuild/\n/dist/\n/nbdist/\n/.nb-gradle/\nbuild/\n\n#### VS Code ####\n.vscode/\n\n#### \u5176\u4ed6 ####\n")))}d.isMDXComponent=!0}}]);