"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[5804],{9613:(e,n,t)=>{t.d(n,{Zo:()=>c,kt:()=>m});var r=t(9496);function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,r,l=function(e,n){if(null==e)return{};var t,r,l={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var p=r.createContext({}),u=function(e){var n=r.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},c=function(e){var n=u(e.components);return r.createElement(p.Provider,{value:n},e.children)},s="mdxType",g={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,l=e.mdxType,i=e.originalType,p=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),s=u(t),d=l,m=s["".concat(p,".").concat(d)]||s[d]||g[d]||i;return t?r.createElement(m,o(o({ref:n},c),{},{components:t})):r.createElement(m,o({ref:n},c))}));function m(e,n){var t=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var i=t.length,o=new Array(i);o[0]=d;var a={};for(var p in n)hasOwnProperty.call(n,p)&&(a[p]=n[p]);a.originalType=e,a[s]="string"==typeof e?e:l,o[1]=a;for(var u=2;u<i;u++)o[u]=t[u];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},9065:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>o,default:()=>g,frontMatter:()=>i,metadata:()=>a,toc:()=>u});var r=t(4778),l=(t(9496),t(9613));const i={},o="Config",a={unversionedId:"\u540e\u7aef/SpringCloud/SpringCloudConfig",id:"\u540e\u7aef/SpringCloud/SpringCloudConfig",title:"Config",description:"\u7b80\u4ecb",source:"@site/docs/\u540e\u7aef/SpringCloud/SpringCloudConfig.md",sourceDirName:"\u540e\u7aef/SpringCloud",slug:"/\u540e\u7aef/SpringCloud/SpringCloudConfig",permalink:"/docs/\u540e\u7aef/SpringCloud/SpringCloudConfig",draft:!1,editUrl:"https://github.com/pannanxu/wiki/docs/\u540e\u7aef/SpringCloud/SpringCloudConfig.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Sentinel",permalink:"/docs/\u540e\u7aef/SpringCloud/SpringCloudAlibabaSentinel"},next:{title:"Consul",permalink:"/docs/\u540e\u7aef/SpringCloud/SpringCloudConsul"}},p={},u=[{value:"\u7b80\u4ecb",id:"\u7b80\u4ecb",level:2},{value:"GIT\u914d\u7f6e\u7ba1\u7406",id:"git\u914d\u7f6e\u7ba1\u7406",level:2},{value:"\u642d\u5efa\u914d\u7f6e\u4e2d\u5fc3\u5fae\u670d\u52a1",id:"\u642d\u5efa\u914d\u7f6e\u4e2d\u5fc3\u5fae\u670d\u52a1",level:2},{value:"<strong>user-server\u5fae\u670d\u52a1\u83b7\u53d6\u914d\u7f6e\u4e2d\u5fc3</strong>",id:"user-server\u5fae\u670d\u52a1\u83b7\u53d6\u914d\u7f6e\u4e2d\u5fc3",level:2}],c={toc:u},s="wrapper";function g(e){let{components:n,...t}=e;return(0,l.kt)(s,(0,r.Z)({},c,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"config"},"Config"),(0,l.kt)("h2",{id:"\u7b80\u4ecb"},"\u7b80\u4ecb"),(0,l.kt)("p",null,"\u5728\u6bcf\u4e2a\u5fae\u670d\u52a1\u90fd\u6709\u81ea\u5df1\u7684\u914d\u7f6e\u6587\u4ef6\uff0c\u7531\u4e8e\u670d\u52a1\u6570\u636e\u975e\u5e38\u591a\uff0c\u914d\u7f6e\u6587\u4ef6\u5206\u6563\u5728\u4e0d\u540c\u7684\u5fae\u670d\u52a1\u9879\u76ee\u4e2d\uff0c\u7ba1\u7406\u4e0d\u65b9\u4fbf\uff0c\u4e3a\u4e86\u65b9\u4fbf\u914d\u7f6e\u6587\u4ef6\u7684\u96c6\u4e2d\u7ba1\u7406\uff0c\u5c31\u4ea7\u751f\u4e86\u5206\u5e03\u5f0f\u914d\u7f6e\u4e2d\u5fc3\u7ec4\u4ef6\uff08Spring Cloud Config\uff09"),(0,l.kt)("p",null,"\u5728spring Cloud config\u4e2d\uff0c\u5b83\u652f\u6301\u914d\u7f6e\u6587\u4ef6\u653e\u5728\u914d\u7f6e\u670d\u52a1\u7684\u672c\u5730\uff0c\u4e5f\u652f\u6301\u653e\u5728\u8fdc\u7a0bGit\u4ed3\u5e93\uff08Github \u548c Gitee\uff09"),(0,l.kt)("p",null,"\u914d\u7f6e\u4e2d\u5fc3\u672c\u8d28\u4e0a\u4e5f\u662f\u4e00\u4e2a\u5fae\u670d\u52a1\uff0c\u540c\u6837\u9700\u8981\u6ce8\u518c\u5230eureka\u670d\u52a1\u6ce8\u518c\u4e2d\u5fc3"),(0,l.kt)("h2",{id:"git\u914d\u7f6e\u7ba1\u7406"},"GIT\u914d\u7f6e\u7ba1\u7406"),(0,l.kt)("p",null,"\u5728gitee\u4e0a\u9762\u521b\u5efa\u4e00\u4e2a\u516c\u5f00\u4ed3\u5e93"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"\u6dfb\u52a0\u6587\u4ef6")),(0,l.kt)("p",null,"\u6ce8\u610f\uff1a\u914d\u7f6e\u6587\u4ef6\u7684\u547d\u540d\u65b9\u5f0f",(0,l.kt)("inlineCode",{parentName:"p"}," {applicaiton}-{profile}.yml"),"\u6216\u8005\u662f ",(0,l.kt)("inlineCode",{parentName:"p"},"{applicaiton}-{profile}.properties")),(0,l.kt)("p",null,"applicaiton:\u5e94\u7528\u7684\u540d\u79f0 profile\uff1a\u7528\u4e8e\u533a\u5206\u5f00\u53d1\u73af\u5883\u3001\u6d4b\u8bd5\u73af\u5883\u548c\u751f\u6210\u73af\u5883\u7b49"),(0,l.kt)("p",null,"\u5c06user-service\u4e2d\u7684\u914d\u7f6e\u6587\u4ef6application.yml\u5185\u5bb9\u526a\u5207\u5230\u521b\u5efa\u7684\u914d\u7f6e\u6587\u4ef6\u4e2d"),(0,l.kt)("h2",{id:"\u642d\u5efa\u914d\u7f6e\u4e2d\u5fc3\u5fae\u670d\u52a1"},"\u642d\u5efa\u914d\u7f6e\u4e2d\u5fc3\u5fae\u670d\u52a1"),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://img-ages-test0001.oss-cn-hangzhou.aliyuncs.com/images/image-20200611171529754.png",alt:"img"})),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"\u542f\u52a8\u7c7b")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-java"},"@SpringBootApplication\n@EnableConfigServer\npublic class ConfigServerApplication {\n\n    public static void main(String[] args) {\n        SpringApplication.run(ConfigServerApplication.class, args);\n    }\n\n}\n")),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"\u914d\u7f6e\u6587\u4ef6")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yml"},"server:\n  port: 12000\nspring:\n  application:\n    name: config-server\n  cloud:\n    config:\n      server:\n        git:\n          uri: https://gitee.com/xxx/cloud-config.git #\u4fee\u6539\u4e3a\u81ea\u5df1\u7684git\u5730\u5740\n          skip-ssl-validation: true #\u4e0d\u505ahttps\u7684\u9a8c\u8bc1\neureka:\n  client:\n    service-url:\n      defaultZone: http://127.0.0.1:10086/eureka\n")),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"\u542f\u52a8\u914d\u7f6e\u4e2d\u5fc3\u5fae\u670d\u52a1")),(0,l.kt)("p",null,"\u5982\u679c\u80fd\u8bbf\u95ee\u5230\u914d\u7f6e\u6587\u4ef6\uff0c\u8868\u793a\u6210\u529f"),(0,l.kt)("h2",{id:"user-server\u5fae\u670d\u52a1\u83b7\u53d6\u914d\u7f6e\u4e2d\u5fc3"},(0,l.kt)("strong",{parentName:"h2"},"user-server\u5fae\u670d\u52a1\u83b7\u53d6\u914d\u7f6e\u4e2d\u5fc3")),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"\u6dfb\u52a0\u4f9d\u8d56")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-xml"},"<dependency>\n    <groupId>org.springframework.cloud</groupId>\n    <artifactId>spring-cloud-starter-config</artifactId>\n</dependency>\n")),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"\u4fee\u6539\u914d\u7f6e")),(0,l.kt)("p",null,"\u5220\u9664\u4e86\u539f\u6765\u7684application.yml\u6587\u4ef6"),(0,l.kt)("p",null,"\u65b0\u5efa\u4e00\u4e2abootstrap.yml\u914d\u7f6e\u6587\u4ef6"),(0,l.kt)("blockquote",null,(0,l.kt)("p",{parentName:"blockquote"},"bootstrap.yml\u6587\u4ef6\u76f8\u5f53\u4e8e\u9879\u76ee\u542f\u52a8\u65f6\u5019\u7684\u5f15\u5bfc\u6587\u4ef6\uff0c\u5185\u5bb9\u76f8\u5bf9\u56fa\u5b9a\uff0c\u800c application.yml\u6587\u4ef6\u662f\u5fae\u670d\u52a1\u7684\u4e00\u4e9b\u5e38\u7528\u914d\u7f6e\u6587\u4ef6\uff0c\u53d8\u5316\u6bd4\u8f83\u9891\u7e41")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-yml"},"spring:\n  cloud:\n    config:\n      #\u4e0e\u8fdc\u7a0b\u4ed3\u5e93\u4e2d\u914d\u7f6e\u6587\u4ef6\u7684application\u4fdd\u6301\u4e00\u81f4\n      name: user\n      #\u4e0e\u8fdc\u7a0b\u4ed3\u5e93\u4e2d\u914d\u7f6e\u6587\u4ef6\u7684profile\u4fdd\u6301\u4e00\u81f4\n      profile: dev\n      #\u8fdc\u7a0b\u4ed3\u5e93\u4e2d\u7248\u672c\n      label: master\n      discovery:\n        # \u4f7f\u7528\u914d\u7f6e\u4e2d\u5fc3\n        enabled: true\n        # \u914d\u7f6e\u4e2d\u5fc3\u670d\u52a1id\n        service-id: config-server\neureka:\n  client:\n    service-url:\n      defaultZone: http://127.0.0.1:10086/eureka\n")),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"\u542f\u52a8\u540e\u6d4b\u8bd5")))}g.isMDXComponent=!0}}]);