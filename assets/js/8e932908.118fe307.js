"use strict";(self.webpackChunkdoc=self.webpackChunkdoc||[]).push([[8454],{3905:(e,n,l)=>{l.d(n,{Zo:()=>p,kt:()=>_});var t=l(7294);function a(e,n,l){return n in e?Object.defineProperty(e,n,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[n]=l,e}function r(e,n){var l=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),l.push.apply(l,t)}return l}function o(e){for(var n=1;n<arguments.length;n++){var l=null!=arguments[n]?arguments[n]:{};n%2?r(Object(l),!0).forEach((function(n){a(e,n,l[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(l)):r(Object(l)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(l,n))}))}return e}function i(e,n){if(null==e)return{};var l,t,a=function(e,n){if(null==e)return{};var l,t,a={},r=Object.keys(e);for(t=0;t<r.length;t++)l=r[t],n.indexOf(l)>=0||(a[l]=e[l]);return a}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(t=0;t<r.length;t++)l=r[t],n.indexOf(l)>=0||Object.prototype.propertyIsEnumerable.call(e,l)&&(a[l]=e[l])}return a}var s=t.createContext({}),m=function(e){var n=t.useContext(s),l=n;return e&&(l="function"==typeof e?e(n):o(o({},n),e)),l},p=function(e){var n=m(e.components);return t.createElement(s.Provider,{value:n},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},g=t.forwardRef((function(e,n){var l=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=m(l),g=a,_=d["".concat(s,".").concat(g)]||d[g]||u[g]||r;return l?t.createElement(_,o(o({ref:n},p),{},{components:l})):t.createElement(_,o({ref:n},p))}));function _(e,n){var l=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var r=l.length,o=new Array(r);o[0]=g;var i={};for(var s in n)hasOwnProperty.call(n,s)&&(i[s]=n[s]);i.originalType=e,i[d]="string"==typeof e?e:a,o[1]=i;for(var m=2;m<r;m++)o[m]=l[m];return t.createElement.apply(null,o)}return t.createElement.apply(null,l)}g.displayName="MDXCreateElement"},5017:(e,n,l)=>{l.r(n),l.d(n,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>i,toc:()=>m});var t=l(7462),a=(l(7294),l(3905));const r={sidebar_position:3},o="\u65e5\u5fd7",i={unversionedId:"\u540e\u7aef/\u6570\u636e\u5e93/MySQL/\u65e5\u5fd7",id:"\u540e\u7aef/\u6570\u636e\u5e93/MySQL/\u65e5\u5fd7",title:"\u65e5\u5fd7",description:"\u4e8c\u8fdb\u5236\u65e5\u5fd7\uff08binlog\uff09",source:"@site/docs/\u540e\u7aef/\u6570\u636e\u5e93/MySQL/\u65e5\u5fd7.md",sourceDirName:"\u540e\u7aef/\u6570\u636e\u5e93/MySQL",slug:"/\u540e\u7aef/\u6570\u636e\u5e93/MySQL/\u65e5\u5fd7",permalink:"/docs/\u540e\u7aef/\u6570\u636e\u5e93/MySQL/\u65e5\u5fd7",draft:!1,editUrl:"https://github.com/pannanxu/wiki/docs/\u540e\u7aef/\u6570\u636e\u5e93/MySQL/\u65e5\u5fd7.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"\u7528\u6237\u6743\u9650",permalink:"/docs/\u540e\u7aef/\u6570\u636e\u5e93/MySQL/\u7528\u6237\u6743\u9650"},next:{title:"\u5907\u4efd\u4e0e\u6062\u590d",permalink:"/docs/\u540e\u7aef/\u6570\u636e\u5e93/MySQL/\u5907\u4efd\u4e0e\u6062\u590d"}},s={},m=[{value:"\u4e8c\u8fdb\u5236\u65e5\u5fd7\uff08binlog\uff09",id:"\u4e8c\u8fdb\u5236\u65e5\u5fd7binlog",level:2},{value:"\u67e5\u770b\u662f\u5426\u542f\u7528\u4e8c\u8fdb\u5236\u65e5\u5fd7",id:"\u67e5\u770b\u662f\u5426\u542f\u7528\u4e8c\u8fdb\u5236\u65e5\u5fd7",level:3},{value:"\u4fee\u6539\u65e5\u5fd7\u4f4d\u7f6e",id:"\u4fee\u6539\u65e5\u5fd7\u4f4d\u7f6e",level:3},{value:"\u4fee\u6539my.cnf",id:"\u4fee\u6539mycnf",level:4},{value:"\u4fee\u6539 <code>max_binlog_size</code>",id:"\u4fee\u6539-max_binlog_size",level:3},{value:"\u67e5\u770b",id:"\u67e5\u770b",level:4},{value:"\u5207\u6362\u5230\u4e0b\u4e00\u4e2a\u65e5\u5fd7\u6587\u4ef6",id:"\u5207\u6362\u5230\u4e0b\u4e00\u4e2a\u65e5\u5fd7\u6587\u4ef6",level:3},{value:"\u6e05\u7406\u65e5\u5fd7",id:"\u6e05\u7406\u65e5\u5fd7",level:3},{value:"1\u3001\u8bbe\u7f6e\u65e5\u5fd7\u8fc7\u671f\u65f6\u95f4",id:"1\u8bbe\u7f6e\u65e5\u5fd7\u8fc7\u671f\u65f6\u95f4",level:4},{value:"2\u3001\u624b\u52a8\u6e05\u9664\u65e5\u5fd7",id:"2\u624b\u52a8\u6e05\u9664\u65e5\u5fd7",level:4},{value:"\u65b9\u5f0f1",id:"\u65b9\u5f0f1",level:5},{value:"\u6309\u7167\u65e5\u671f\u5220\u9664",id:"\u6309\u7167\u65e5\u671f\u5220\u9664",level:5},{value:"\u5220\u9664\u6240\u6709\u65e5\u5fd7\u4ece\u5934\u5f00\u59cb",id:"\u5220\u9664\u6240\u6709\u65e5\u5fd7\u4ece\u5934\u5f00\u59cb",level:4},{value:"\u63d0\u53d6\u65e5\u5fd7",id:"\u63d0\u53d6\u65e5\u5fd7",level:3},{value:"\u8bbe\u7f6e\u4e8c\u8fdb\u5236\u683c\u5f0f",id:"\u8bbe\u7f6e\u4e8c\u8fdb\u5236\u683c\u5f0f",level:4},{value:"\u63d0\u53d6\u65e5\u5fd7",id:"\u63d0\u53d6\u65e5\u5fd7-1",level:4},{value:"\u65e5\u5fd7\u7ba1\u7406",id:"\u65e5\u5fd7\u7ba1\u7406",level:2},{value:"\u65e5\u5fd7\u7b5b\u9009\u5668",id:"\u65e5\u5fd7\u7b5b\u9009\u5668",level:3},{value:"\u914d\u7f6e\u9519\u8bef\u65e5\u5fd7",id:"\u914d\u7f6e\u9519\u8bef\u65e5\u5fd7",level:3},{value:"\u4fee\u6539\u65e5\u5fd7\u76ee\u5f55",id:"\u4fee\u6539\u65e5\u5fd7\u76ee\u5f55",level:4},{value:"\u521b\u5efa\u76ee\u5f55",id:"\u521b\u5efa\u76ee\u5f55",level:5},{value:"\u4fee\u6539my.cnf",id:"\u4fee\u6539mycnf-1",level:5},{value:"\u91cd\u542fmysql",id:"\u91cd\u542fmysql",level:5},{value:"\u8c03\u6574\u5197\u4f59\u4fe1\u606f",id:"\u8c03\u6574\u5197\u4f59\u4fe1\u606f",level:4},{value:"\u8f6e\u8f6c\u9519\u8bef\u65e5\u5fd7",id:"\u8f6e\u8f6c\u9519\u8bef\u65e5\u5fd7",level:4},{value:"\u901a\u7528\u67e5\u8be2\u65e5\u5fd7 &amp; \u6162\u67e5\u8be2\u65e5\u5fd7",id:"\u901a\u7528\u67e5\u8be2\u65e5\u5fd7--\u6162\u67e5\u8be2\u65e5\u5fd7",level:3},{value:"\u901a\u7528\u67e5\u8be2\u65e5\u5fd7",id:"\u901a\u7528\u67e5\u8be2\u65e5\u5fd7",level:3},{value:"\u6162\u67e5\u8be2\u65e5\u5fd7",id:"\u6162\u67e5\u8be2\u65e5\u5fd7",level:3},{value:"\u5207\u6362\u65e5\u5fd7\u8868",id:"\u5207\u6362\u65e5\u5fd7\u8868",level:3}],p={toc:m},d="wrapper";function u(e){let{components:n,...l}=e;return(0,a.kt)(d,(0,t.Z)({},p,l,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"\u65e5\u5fd7"},"\u65e5\u5fd7"),(0,a.kt)("h2",{id:"\u4e8c\u8fdb\u5236\u65e5\u5fd7binlog"},"\u4e8c\u8fdb\u5236\u65e5\u5fd7\uff08binlog\uff09"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u542f\u7528\u4e8c\u8fdb\u5236\u65e5\u5fd7\uff0c\u9700\u8981\u8bbe\u7f6e ",(0,a.kt)("inlineCode",{parentName:"p"},"log_bin")," \u548c ",(0,a.kt)("inlineCode",{parentName:"p"},"server_id"),"\n\u5982\u679c\u5c06 ",(0,a.kt)("inlineCode",{parentName:"p"},"big_bin")," \u8bbe\u7f6e\u4e3a ",(0,a.kt)("inlineCode",{parentName:"p"},"/data/binlogs/")," \u90a3\u4e48\uff0c\u4e8c\u8fdb\u5236\u65e5\u5fd7\u5c31\u4f1a\u5b58\u50a8\u5728 \u8fd9\u4e2a\u76ee\u5f55\u4e0b\u7684 ",(0,a.kt)("inlineCode",{parentName:"p"},"server1.00001")," \u548c ",(0,a.kt)("inlineCode",{parentName:"p"},"server1.00002")," \u7b49\u65e5\u5fd7\u6587\u4ef6\u4e2d\n\u6bcf\u5f53\u670d\u52a1\u5668\u542f\u52a8\u6216\u5237\u65b0\u65e5\u5fd7\u65f6\uff0c\u6216\u8005\u5f53\u524d\u65e5\u5fd7\u7684\u5927\u5c0f\u8fbe\u5230 ",(0,a.kt)("inlineCode",{parentName:"p"},"max_binlog_size"),"\uff08\u9ed8\u8ba41GB\uff09\u65f6\uff0c\u670d\u52a1\u5668\u90fd\u4f1a\u65b0\u5efa\u4e00\u4e2a\u6587\u4ef6\uff1b\n\u6bcf\u4e2a\u65e5\u5fd7\u6587\u4ef6\u90fd\u4f1a\u5728 ",(0,a.kt)("inlineCode",{parentName:"p"},"server1.index")," \u6587\u4ef6\u4e2d\u7ef4\u62a4")),(0,a.kt)("h3",{id:"\u67e5\u770b\u662f\u5426\u542f\u7528\u4e8c\u8fdb\u5236\u65e5\u5fd7"},"\u67e5\u770b\u662f\u5426\u542f\u7528\u4e8c\u8fdb\u5236\u65e5\u5fd7"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"show variables like '%log_bin%';\n\n+---------------------------------+--------------------+\n| Variable_name                   | Value              |\n+---------------------------------+--------------------+\n| log_bin                         | ON                 |\n| log_bin_basename                | /data/binlog       |\n| log_bin_index                   | /data/binlog.index |\n| log_bin_trust_function_creators | OFF                |\n| log_bin_use_v1_row_events       | OFF                |\n| sql_log_bin                     | ON                 |\n+---------------------------------+--------------------+\n\n## \u663e\u793a\u5f53\u524d\u670d\u52a1\u5668\u6240\u6709\u7684\u4e8c\u8fdb\u5236\u65e5\u5fd7\nshow master logs;\nshow binary logs;\n+---------------+-----------+-----------+\n| Log_name      | File_size | Encrypted |\n+---------------+-----------+-----------+\n| binlog.000001 |       477 | No        |\n| binlog.000002 |       156 | No        |\n+---------------+-----------+-----------+\n\n## \u83b7\u53d6\u5f53\u524d\u7684\u4e8c\u8fdb\u5236\u65e5\u5fd7\u4f4d\u7f6e\nshow master status;\n+---------------+----------+--------------+------------------+-------------------+\n| File          | Position | Binlog_Do_DB | Binlog_Ignore_DB | Executed_Gtid_Set |\n+---------------+----------+--------------+------------------+-------------------+\n| binlog.000002 |      156 |              |                  |                   |\n+---------------+----------+--------------+------------------+-------------------+\n")),(0,a.kt)("h3",{id:"\u4fee\u6539\u65e5\u5fd7\u4f4d\u7f6e"},"\u4fee\u6539\u65e5\u5fd7\u4f4d\u7f6e"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u9700\u8981\u5148\u505c\u6b62mysql")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"## \u521b\u5efa\u65e5\u5fd7\u5b58\u50a8\u76ee\u5f55\nmkdir /data/binlogs/server1\n## \u7ed9mysql\u7528\u6237\u7ec4\u6743\u9650\nsudo chown -R mysql:mysql /data/binlogs/server1\n")),(0,a.kt)("h4",{id:"\u4fee\u6539mycnf"},"\u4fee\u6539my.cnf"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u5728 ",(0,a.kt)("inlineCode",{parentName:"p"},"[mysqld]"),"\u8ffd\u52a0\u7b2c\u56db\u3001\u4e94\u884c"),(0,a.kt)("p",{parentName:"blockquote"},"\u6ce8\u610f\uff1a",(0,a.kt)("inlineCode",{parentName:"p"},"log_bin")," \u8fd9\u4e2a\u8def\u5f84\u8868\u793a\uff1a\u65e5\u5fd7\u6587\u4ef6\u5b58\u50a8\u5728",(0,a.kt)("inlineCode",{parentName:"p"},"/data/binlogs"),"\u76ee\u5f55\uff0c\u524d\u7f00\u4ee5",(0,a.kt)("inlineCode",{parentName:"p"},"server1"),"\u547d\u540d"),(0,a.kt)("p",{parentName:"blockquote"},"\u8fd9\u6837\u751f\u6210\u7684\u6587\u4ef6\u5982\u4e0b"),(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("inlineCode",{parentName:"p"},"server_id"),"\u4fdd\u6301\u552f\u4e00"),(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("inlineCode",{parentName:"p"},"/data/binlogs")),(0,a.kt)("ul",{parentName:"blockquote"},(0,a.kt)("li",{parentName:"ul"},"server1"),(0,a.kt)("li",{parentName:"ul"},"server1.000001"),(0,a.kt)("li",{parentName:"ul"},"server1.index"))),(0,a.kt)("p",null,"\u4fee\u6539\u5b8c\u6bd5\u540e\u91cd\u542f\uff0c\u518d\u6b21\u6267\u884c\u4e0a\u9762\u7684sql\u67e5\u770b\u662f\u5426\u4fee\u6539\u6210\u529f"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"\n[mysqld]\nlower_case_table_names=1\ndatadir=/data\nlog_bin=/data/binlogs/server1\nserver_id=100\n")),(0,a.kt)("h3",{id:"\u4fee\u6539-max_binlog_size"},"\u4fee\u6539 ",(0,a.kt)("inlineCode",{parentName:"h3"},"max_binlog_size")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u5f53\u65e5\u5fd7\u6587\u4ef6\u8fbe\u5230\u8bbe\u7f6e\u7684\u6807\u51c6\u540e\uff0c\u5c06\u4f1a\u65b0\u5efa\u4e00\u4e2a\u65e5\u5fd7\u6587\u4ef6\u5b58\u50a8\uff08\u9ed8\u8ba41GB\uff09\uff0c\u6240\u4ee5\u6211\u4eec\u53ef\u4ee5\u52a8\u6001\u7684\u4fee\u6539\u6b64\u503c\uff0c\u65e0\u9700\u91cd\u542f")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"set @@global.max_binlog_size=536870912;\n")),(0,a.kt)("h4",{id:"\u67e5\u770b"},"\u67e5\u770b"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"select @@global.max_binlog_size;\n")),(0,a.kt)("h3",{id:"\u5207\u6362\u5230\u4e0b\u4e00\u4e2a\u65e5\u5fd7\u6587\u4ef6"},"\u5207\u6362\u5230\u4e0b\u4e00\u4e2a\u65e5\u5fd7\u6587\u4ef6"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"flush logs;\n")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u6267\u884c\u540e\u53ef\u4ee5\u4f7f\u7528\u67e5\u770b\u65e5\u5fd7sql\u67e5\u770b\u6548\u679c")),(0,a.kt)("h3",{id:"\u6e05\u7406\u65e5\u5fd7"},"\u6e05\u7406\u65e5\u5fd7"),(0,a.kt)("h4",{id:"1\u8bbe\u7f6e\u65e5\u5fd7\u8fc7\u671f\u65f6\u95f4"},"1\u3001\u8bbe\u7f6e\u65e5\u5fd7\u8fc7\u671f\u65f6\u95f4"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"## \u4ee5\u79d2\u4e3a\u5355\u4f4d\u8bbe\u7f6e\u8fc7\u671f\u65f6\u95f4\nset @@global.binlog_expire_logs_seconds=10000;\n")),(0,a.kt)("h4",{id:"2\u624b\u52a8\u6e05\u9664\u65e5\u5fd7"},"2\u3001\u624b\u52a8\u6e05\u9664\u65e5\u5fd7"),(0,a.kt)("h5",{id:"\u65b9\u5f0f1"},"\u65b9\u5f0f1"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u624b\u52a8\u6e05\u9664\u53ef\u4ee5\u4f7f\u7528sql ",(0,a.kt)("inlineCode",{parentName:"p"},"purge binary logs to 'log_name';"),"\u6765\u5220\u9664\uff0c\n\u5176\u4e2d",(0,a.kt)("inlineCode",{parentName:"p"},"log_name"),"\u9700\u8981\u6ce8\u610f\n\u4f8b\u5982\uff1a\u6709\u65e5\u5fd7\u6587\u4ef6\uff1aserver1.000001\u3001server1.000002\u3001server1.000003\n\u5982\u679c log_name \u586b\u5165 server1.000002\uff0c\u90a3\u4e48\u8868\u793a\uff0cserver1.000001 \u4f1a\u88ab\u5220\u9664\n\u5982\u679c log_name \u586b\u5165 server1.000003\uff0c\u90a3\u4e48\u8868\u793a\uff0cserver1.000001\u3001server1.000002 \u90fd\u4f1a\u88ab\u5220\u9664\n\u5373\uff1a\u586b\u5165\u7684\u4f1a\u5220\u9664\u6bd4\u81ea\u8eab\u5c0f\u7684\u65e5\u5fd7\u6587\u4ef6\uff0c\u4f46\u4e0d\u5305\u542b\u81ea\u5df1")),(0,a.kt)("h5",{id:"\u6309\u7167\u65e5\u671f\u5220\u9664"},"\u6309\u7167\u65e5\u671f\u5220\u9664"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("inlineCode",{parentName:"p"},"purge binary logs before '2022-01-02 14:30:00';"))),(0,a.kt)("h4",{id:"\u5220\u9664\u6240\u6709\u65e5\u5fd7\u4ece\u5934\u5f00\u59cb"},"\u5220\u9664\u6240\u6709\u65e5\u5fd7\u4ece\u5934\u5f00\u59cb"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"reset master;\n")),(0,a.kt)("p",null,"!> \u4e0d\u5efa\u8bae\u4f7f\u7528"),(0,a.kt)("h3",{id:"\u63d0\u53d6\u65e5\u5fd7"},"\u63d0\u53d6\u65e5\u5fd7"),(0,a.kt)("h4",{id:"\u8bbe\u7f6e\u4e8c\u8fdb\u5236\u683c\u5f0f"},"\u8bbe\u7f6e\u4e8c\u8fdb\u5236\u683c\u5f0f"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"## \u57fa\u4e8e\u8bed\u53e5\u7684\u590d\u5236 \uff08SBR\uff09\nset @@global.binlog_format='STATEMENT';\n## \u57fa\u4e8e\u884c\u7684\u590d\u5236\uff08RBR\uff09\nset @@global.binlog_format='ROW';\n## \u57fa\u4e8e MIXED \u683c\u5f0f\nset @@global.binlog_format='MIXED';\n")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"global \u7ea7\u522b\u7684\u4fee\u6539\u9700\u8981\u65ad\u5f00\u8fde\u63a5\u91cd\u65b0\u8fde\u63a5")),(0,a.kt)("h4",{id:"\u63d0\u53d6\u65e5\u5fd7-1"},"\u63d0\u53d6\u65e5\u5fd7"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"mysqlbinlog /data/binlogs/server1.000001\n")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u6839\u636e\u65f6\u95f4\u548c\u4f4d\u7f6e\u62bd\u53d6\uff1a")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'mysqlbinlog /data/binlogs/server1.000001 \\\n--start-datetime="2022-01-02 15:00:00" \\\n--stop-datetime="2022-01-02 19:00:00" \\\n> binlog_extract\n')),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u6839\u636e\u6570\u636e\u5e93\u63d0\u53d6")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"mysqlbinlog /data/binlogs/server1.000001 \\\n--database=test \\\n> binlog_extract\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"## The proper term is pseudo_replica_mode, but we use this compatibility alias\n## to make the statement usable on server versions 8.0.24 and older.\n/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=1*/;\n/*!50003 SET @OLD_COMPLETION_TYPE=@@COMPLETION_TYPE,COMPLETION_TYPE=0*/;\nDELIMITER /*!*/;\n## at 4\n#220102 19:31:31 server id 100  end_log_pos 125 CRC32 0xba41dff0        Start: binlog v 4, server v 8.0.27 created 220102 19:31:31 at startup\n## Warning: this binlog is either in use or was not closed properly.\nROLLBACK/*!*/;\nBINLOG '\nE43RYQ9kAAAAeQAAAH0AAAABAAQAOC4wLjI3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAATjdFhEwANAAgAAAAABAAEAAAAYQAEGggAAAAICAgCAAAACgoKKioAEjQA\nCigB8N9Bug==\n'/*!*/;\n## at 125\n#220102 19:31:31 server id 100  end_log_pos 156 CRC32 0x14d6d966        Previous-GTIDs\n## [empty]\n## at 156\n#220102 19:32:10 server id 100  end_log_pos 235 CRC32 0x0c1d9e4c        Anonymous_GTID  last_committed=0        sequence_number=1       rbr_only=no     original_committed_timestamp=1641123130966660    immediate_commit_timestamp=1641123130966660     transaction_length=309\n## original_commit_timestamp=1641123130966660 (2022-01-02 19:32:10.966660 CST)\n## immediate_commit_timestamp=1641123130966660 (2022-01-02 19:32:10.966660 CST)\n/*!80001 SET @@session.original_commit_timestamp=1641123130966660*//*!*/;\n/*!80014 SET @@session.original_server_version=80027*//*!*/;\n/*!80014 SET @@session.immediate_server_version=80027*//*!*/;\nSET @@SESSION.GTID_NEXT= 'ANONYMOUS'/*!*/;\n## at 235\n#220102 19:32:10 server id 100  end_log_pos 317 CRC32 0xf41a257f        Query   thread_id=25    exec_time=0     error_code=0\nSET TIMESTAMP=1641123130/*!*/;\nSET @@session.pseudo_thread_id=25/*!*/;\nSET @@session.foreign_key_checks=1, @@session.sql_auto_is_null=0, @@session.unique_checks=1, @@session.autocommit=1/*!*/;\nSET @@session.sql_mode=1168113696/*!*/;\nSET @@session.auto_increment_increment=1, @@session.auto_increment_offset=1/*!*/;\n/*!\\C utf8mb4 *//*!*/;\nSET @@session.character_set_client=255,@@session.collation_connection=255,@@session.collation_server=255/*!*/;\nSET @@session.lc_time_names=0/*!*/;\nSET @@session.collation_database=DEFAULT/*!*/;\n/*!80011 SET @@session.default_collation_for_utf8mb4=255*//*!*/;\nBEGIN\n/*!*/;\n## at 317\n#220102 19:32:10 server id 100  end_log_pos 434 CRC32 0x375ef53a        Query   thread_id=25    exec_time=0     error_code=0\nuse `test`/*!*/;\nSET TIMESTAMP=1641123130/*!*/;\ninsert into table_1 values (2, '\u5f20\u4e09')\n/*!*/;\n## at 434\n#220102 19:32:10 server id 100  end_log_pos 465 CRC32 0xcffe53e0        Xid = 175\nCOMMIT/*!*/;\n## at 465\n#220102 19:32:59 server id 100  end_log_pos 544 CRC32 0xd12df013        Anonymous_GTID  last_committed=1        sequence_number=2       rbr_only=yes    original_committed_timestamp=1641123179339229    immediate_commit_timestamp=1641123179339229     transaction_length=317\n/*!50718 SET TRANSACTION ISOLATION LEVEL READ COMMITTED*//*!*/;\n## original_commit_timestamp=1641123179339229 (2022-01-02 19:32:59.339229 CST)\n## immediate_commit_timestamp=1641123179339229 (2022-01-02 19:32:59.339229 CST)\n/*!80001 SET @@session.original_commit_timestamp=1641123179339229*//*!*/;\n/*!80014 SET @@session.original_server_version=80027*//*!*/;\n/*!80014 SET @@session.immediate_server_version=80027*//*!*/;\nSET @@SESSION.GTID_NEXT= 'ANONYMOUS'/*!*/;\n## at 544\n#220102 19:32:59 server id 100  end_log_pos 628 CRC32 0x06cd606a        Query   thread_id=26    exec_time=0     error_code=0\nSET TIMESTAMP=1641123179/*!*/;\nBEGIN\n/*!*/;\n## at 628\n#220102 19:32:59 server id 100  end_log_pos 689 CRC32 0xd823f6d4        Table_map: `test`.`table_1` mapped to number 164\n## at 689\n#220102 19:32:59 server id 100  end_log_pos 751 CRC32 0x00f5fa0a        Update_rows: table id 164 flags: STMT_END_F\n\nBINLOG '\na43RYRNkAAAAPQAAALECAAAAAKQAAAAAAAEABHRlc3QAB3RhYmxlXzEAAgMPAvwDAgEBAAID/P8A\n1PYj2A==\na43RYR9kAAAAPgAAAO8CAAAAAKQAAAAAAAEAAgAC//8AAgAAAAYA5byg5LiJAAIAAAAGAOi1teS/\noQr69QA=\n'/*!*/;\n## at 751\n#220102 19:32:59 server id 100  end_log_pos 782 CRC32 0x75c1558f        Xid = 185\nCOMMIT/*!*/;\n## at 782\n#220102 19:33:24 server id 100  end_log_pos 861 CRC32 0xa3f54f52        Anonymous_GTID  last_committed=2        sequence_number=3       rbr_only=no     original_committed_timestamp=1641123204180632    immediate_commit_timestamp=1641123204180632     transaction_length=334\n## original_commit_timestamp=1641123204180632 (2022-01-02 19:33:24.180632 CST)\n## immediate_commit_timestamp=1641123204180632 (2022-01-02 19:33:24.180632 CST)\n/*!80001 SET @@session.original_commit_timestamp=1641123204180632*//*!*/;\n/*!80014 SET @@session.original_server_version=80027*//*!*/;\n/*!80014 SET @@session.immediate_server_version=80027*//*!*/;\nSET @@SESSION.GTID_NEXT= 'ANONYMOUS'/*!*/;\n## at 861\n#220102 19:33:24 server id 100  end_log_pos 952 CRC32 0x72a8370a        Query   thread_id=27    exec_time=0     error_code=0\nSET TIMESTAMP=1641123204/*!*/;\nBEGIN\n/*!*/;\n## at 952\n#220102 19:33:24 server id 100  end_log_pos 1085 CRC32 0xe89627c1       Query   thread_id=27    exec_time=0     error_code=0\nSET TIMESTAMP=1641123204/*!*/;\nupdate table_1 set name = '\u97e9\u4fe1' where id = 2\n/*!*/;\n## at 1085\n#220102 19:33:24 server id 100  end_log_pos 1116 CRC32 0xafc6ecf9       Xid = 194\nCOMMIT/*!*/;\nSET @@SESSION.GTID_NEXT= 'AUTOMATIC' /* added by mysqlbinlog */ /*!*/;\nDELIMITER ;\n## End of log file\n/*!50003 SET COMPLETION_TYPE=@OLD_COMPLETION_TYPE*/;\n/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=0*/;\n")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("inlineCode",{parentName:"p"},"## at 1540"),"\u540e\u9762\u7684\u6570\u5b57\u8868\u793a\u4e8c\u8fdb\u5236\u6587\u4ef6\u4e2d\u4e8b\u4ef6\u7684\u8d77\u59cb\u4f4d\u7f6e\uff08\u6587\u4ef6\u504f\u79fb\u91cf\uff09"),(0,a.kt)("p",{parentName:"blockquote"},"\u7b2c\u4e8c\u884c\u5305\u542b\u4e86\u8bed\u53e5\u5728\u670d\u52a1\u5668\u4e0a\u542f\u7528\u7684\u65f6\u95f4\u6233\uff0c\u65f6\u95f4\u6233\u540e\u9762\u8ddf\u968f\u4e86",(0,a.kt)("inlineCode",{parentName:"p"},"server id"),"\u3001",(0,a.kt)("inlineCode",{parentName:"p"},"end_log_pos"),"\u3001",(0,a.kt)("inlineCode",{parentName:"p"},"thread_id"),"\u3001",(0,a.kt)("inlineCode",{parentName:"p"},"exec_time"),"\u3001",(0,a.kt)("inlineCode",{parentName:"p"},"error_code"))),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"server id")," \u4ea7\u751f\u8be5\u4e8b\u4ef6\u7684\u670d\u52a1\u5668\u7684 server_id\u503c\uff08\u5c31\u5728\u4e0a\u9762\u8bbe\u7f6e\u7684\u90a3\u4e2aserver id\uff09"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"end_log_pos")," \u4e0b\u4e00\u4e2a\u4e8b\u4ef6\u7684\u5f00\u59cb\u4f4d\u7f6e"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"exec_time")," \u5728\u4f4f\u670d\u52a1\u5668\u4e0a\uff0c\u5b83\u4ee3\u8868\u6267\u884c\u4e8b\u4ef6\u7684\u4e8b\u4ef6\uff1b\u5728\u4ece\u670d\u52a1\u5668\u4e0a\uff0c\u5b83\u4ee3\u8868\u670d\u52a1\u5668\u7684\u6700\u7ec8\u6267\u884c\u65f6\u95f4\u4e0e\u4e3b\u670d\u52a1\u5668\u7684\u5f00\u59cb\u6267\u884c\u65f6\u95f4\u4e4b\u95f4\u7684\u5dee\u503c\uff0c\u8fd9\u4e2a\u5dee\u503c\u53ef\u4ee5\u505a\u4e3a\u5907\u4efd\u76f8\u5bf9\u4e8e\u4e3b\u670d\u52a1\u5668\u6ede\u540e\u591a\u5c11\u7684\u6307\u6807"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"error_code")," \u4ee3\u8868\u6267\u884c\u4e8b\u4ef6\u7684\u7ed3\u679c\uff1b0\u8868\u793a\u6ca1\u6709\u9519\u8bef\u53d1\u751f")),(0,a.kt)("h2",{id:"\u65e5\u5fd7\u7ba1\u7406"},"\u65e5\u5fd7\u7ba1\u7406"),(0,a.kt)("h3",{id:"\u65e5\u5fd7\u7b5b\u9009\u5668"},"\u65e5\u5fd7\u7b5b\u9009\u5668"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"select @@global.log_error_services;\n\n+----------------------------------------+\n| @@global.log_error_services            |\n+----------------------------------------+\n| log_filter_internal; log_sink_internal |\n+----------------------------------------+\n")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u8868\u793a\u65e5\u5fd7\u4e8b\u4ef6\u9996\u9009\u7a7f\u8fc7\u5185\u7f6e\u7684\u7b5b\u9009\u5668\u7ec4\u4ef6 log_filter_internal \uff0c\u7136\u540e\u7a7f\u8fc7\u5185\u7f6e\u7684\u65e5\u5fd7\u5199\u5165\u7ec4\u4ef6 log_sink_internal\u3002\u7ec4\u4ef6\u662f\u6309\u7167\u5217\u51fa\u987a\u5e8f\u6267\u884c\u7684"),(0,a.kt)("p",{parentName:"blockquote"},"\u5728 log_error_services \u7684\u503c\u4e2d\uff0c\u6307\u5b9a\u7684\u4efb\u4f55\u53ef\u52a0\u8f7d\uff08\u975e\u5185\u7f6e\uff09\u7ec4\u4ef6\u90fd\u9700\u8981\u901a\u8fc7 ",(0,a.kt)("inlineCode",{parentName:"p"},"install component"),"\u8fdb\u884c\u5b89\u88c5")),(0,a.kt)("h3",{id:"\u914d\u7f6e\u9519\u8bef\u65e5\u5fd7"},"\u914d\u7f6e\u9519\u8bef\u65e5\u5fd7"),(0,a.kt)("p",null,"\u9519\u8bef\u65e5\u5fd7\u8bb0\u5f55\u7531 ",(0,a.kt)("inlineCode",{parentName:"p"},"log_error"),"\u53d8\u91cf\uff08\u5728\u542f\u52a8\u811a\u672c\u4f7f\u7528",(0,a.kt)("inlineCode",{parentName:"p"},"--log-error"),"\uff09\u63a7\u5236"),(0,a.kt)("p",null,"\u5982\u679c\u6ca1\u6709\u7ed9\u51fa",(0,a.kt)("inlineCode",{parentName:"p"},"--log-error"),"\uff0c\u5219\u9ed8\u8ba4\u7684\u76ee\u6807\u6587\u4ef6\u662f\u63a7\u5236\u53f0"),(0,a.kt)("p",null,"\u5982\u679c\u6ca1\u6709\u547d\u540d\u6587\u4ef6\u7684\u60c5\u51b5\u4e0b\u7ed9\u51fa\u4e86",(0,a.kt)("inlineCode",{parentName:"p"},"--log-error"),"\uff0c\u5219\u9ed8\u8ba4\u662f\u76ee\u6807\u6587\u4ef6\u662f\u4e00\u4e2a\u5728\u6570\u636e\u76ee\u5f55\u4e2d\u540d\u4e3a",(0,a.kt)("inlineCode",{parentName:"p"},"host_name.err"),"\u7684\u6587\u4ef6"),(0,a.kt)("p",null,"\u5982\u679c",(0,a.kt)("inlineCode",{parentName:"p"},"--log-error"),"\u88ab\u5236\u5b9a\u6765\u547d\u540d\u4e00\u4e2a\u6587\u4ef6\uff0c\u9ed8\u8ba4\u7684\u76ee\u6807\u6587\u4ef6\u5c31\u662f\u8be5\u6587\u4ef6\uff08\u5982\u679c\u6587\u4ef6\u6ca1\u6709\u540e\u7f00\uff0c\u5219\u81ea\u52a8\u6dfb\u52a0\u4e00\u4e2a",(0,a.kt)("inlineCode",{parentName:"p"},".err"),"\u540e\u7f00\uff09\u5982\u679c\u6ca1\u6709\u7528\u4e00\u4e2a\u7edd\u5bf9\u8def\u5f84\u6765\u6307\u5b9a\u522b\u7684\u4f4d\u7f6e\uff0c\u90a3\u4e48\u8fd9\u4e2a\u6587\u4ef6\u5c31\u4f4d\u4e8e\u6570\u636e\u76ee\u5f55\u4e0b"),(0,a.kt)("p",null,"\u7cfb\u7edf\u53d8\u91cf ",(0,a.kt)("inlineCode",{parentName:"p"},"log_error_verbsity"),"\u63a7\u5236\u7740\u670d\u52a1\u5668\u5c06\u9519\u8bef\u3001\u8b66\u544a\u548c\u6ce8\u91ca\u4fe1\u606f\u8bb0\u5f55\u5230\u9519\u8bef\u65e5\u5fd7\u7684\u5197\u4f59\u60c5\u51b5\u3002\u53ef\u4ee5\u4f7f\u7528\u7684\u503c\u6709\u5982\u4e0b\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"1\uff1a\u53ea\u8f93\u51fa\u9519\u8bef"),(0,a.kt)("li",{parentName:"ul"},"2\uff1a\u8f93\u51fa\u9519\u8bef\u548c\u8b66\u544a"),(0,a.kt)("li",{parentName:"ul"},"3\uff1a\u8f93\u51fa\u9519\u8bef\u3001\u8b66\u544a\u3001\u6ce8\u91ca\uff08\u9ed8\u8ba4\uff09")),(0,a.kt)("p",null,"\u5982\u679c\u9700\u8981\u4fee\u6539\u9519\u8bef\u65e5\u5fd7\u7684\u4f4d\u7f6e\uff0c\u5219\u9700\u8981\u4fee\u6539",(0,a.kt)("inlineCode",{parentName:"p"},"my.cnf"),"\u5e76\u91cd\u542f"),(0,a.kt)("h4",{id:"\u4fee\u6539\u65e5\u5fd7\u76ee\u5f55"},"\u4fee\u6539\u65e5\u5fd7\u76ee\u5f55"),(0,a.kt)("h5",{id:"\u521b\u5efa\u76ee\u5f55"},"\u521b\u5efa\u76ee\u5f55"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},'sudo mkdir /data/logs\n## \u624b\u52a8\u521b\u5efa\u4e00\u4e2a\u65e5\u5fd7\u6587\u4ef6\necho "" > logs/mysqld.log\nsudo chown -R mysql:mysql /data/logs\n')),(0,a.kt)("h5",{id:"\u4fee\u6539mycnf-1"},"\u4fee\u6539my.cnf"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"sudo vi /etc/my.cnf\n\n## \u589e\u52a0 log-error\n\n[mysqld]\nlog-error=/data/logs/mysqld.log\n")),(0,a.kt)("h5",{id:"\u91cd\u542fmysql"},"\u91cd\u542fmysql"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"sudo /etc/init.d/mysql restart\n## \u67e5\u770b\u65e5\u5fd7\ncat logs/mysqld.log\n## \u767b\u9646mysql\u67e5\u770b\u662f\u5426\u4fee\u6539\u6210\u529f\nshow variables like 'log_error';\n")),(0,a.kt)("h4",{id:"\u8c03\u6574\u5197\u4f59\u4fe1\u606f"},"\u8c03\u6574\u5197\u4f59\u4fe1\u606f"),(0,a.kt)("p",null,"log_error_verbsity \u53ef\u4ee5\u52a8\u6001\u4fee\u6539\uff0c\u4fee\u6539\u540e\u65e0\u9700\u91cd\u542fmysql"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"set @@global.log_error_verbosity=2;\n\n## \u67e5\u770b\u4fee\u6539\u7ed3\u679c\n select @@global.log_error_verbosity;\n")),(0,a.kt)("p",null,"\u7cfb\u7edf\u53d8\u91cf ",(0,a.kt)("inlineCode",{parentName:"p"},"log_error_verbsity"),"\u63a7\u5236\u7740\u670d\u52a1\u5668\u5c06\u9519\u8bef\u3001\u8b66\u544a\u548c\u6ce8\u91ca\u4fe1\u606f\u8bb0\u5f55\u5230\u9519\u8bef\u65e5\u5fd7\u7684\u5197\u4f59\u60c5\u51b5\u3002\u53ef\u4ee5\u4f7f\u7528\u7684\u503c\u6709\u5982\u4e0b\uff1a"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"1\uff1a\u53ea\u8f93\u51fa\u9519\u8bef"),(0,a.kt)("li",{parentName:"ul"},"2\uff1a\u8f93\u51fa\u9519\u8bef\u548c\u8b66\u544a"),(0,a.kt)("li",{parentName:"ul"},"3\uff1a\u8f93\u51fa\u9519\u8bef\u3001\u8b66\u544a\u3001\u6ce8\u91ca\uff08\u9ed8\u8ba4\uff09")),(0,a.kt)("h4",{id:"\u8f6e\u8f6c\u9519\u8bef\u65e5\u5fd7"},"\u8f6e\u8f6c\u9519\u8bef\u65e5\u5fd7"),(0,a.kt)("p",null,"\u5f53\u65e5\u5fd7\u6587\u4ef6\u8fc7\u5927\u65f6\uff0c\u6211\u4eec\u9700\u8981\u5206\u79bb\u51fa\u591a\u4e2a\u6587\u4ef6"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"sudo mv /data/logs/mysqld.log /data/logs/mysqld.log.0\nmysqladmin -u root -p123456 flush-logs\n\n## \u5408\u5e76\u6267\u884c\nsudo mv /data/logs/mysqld.log /data/logs/mysqld.log.0 && mysqladmin -u root -p123456 flush-logs\n")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u5f53\u6267\u884c\u7b2c\u4e8c\u884c\u540e\uff0c\u4f1a\u65b0\u5efa\u4e00\u4e2amysqld.log\u6587\u4ef6"),(0,a.kt)("p",{parentName:"blockquote"},"\u5728\u7b2c\u4e94\u884c\uff0c\u53ef\u4ee5\u4f7f\u7528cron\u8ba1\u5212\uff0c\u6bcf\u5929\u5b9a\u65f6\u6267\u884c")),(0,a.kt)("h3",{id:"\u901a\u7528\u67e5\u8be2\u65e5\u5fd7--\u6162\u67e5\u8be2\u65e5\u5fd7"},"\u901a\u7528\u67e5\u8be2\u65e5\u5fd7 & \u6162\u67e5\u8be2\u65e5\u5fd7"),(0,a.kt)("h3",{id:"\u901a\u7528\u67e5\u8be2\u65e5\u5fd7"},"\u901a\u7528\u67e5\u8be2\u65e5\u5fd7"),(0,a.kt)("p",null,"\u4fee\u6539\u65e5\u5fd7\u6587\u4ef6\u914d\u7f6e"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"## \u67e5\u770b\u65e5\u5fd7\u6587\u4ef6\u8def\u5f84\nselect @@global.general_log_file;\n## \u4fee\u6539\u65e5\u5fd7\u6587\u4ef6\u8def\u5f84\nset @@global.general_log_file='/data/query_log/query.log';\n")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"\u6ce8\u610f\uff1a\u5982\u679c\u5728\u4fee\u6539\u65e5\u5fd7\u6587\u4ef6\u8def\u5f84\u65f6\u51fa\u9519\uff0c\u90a3\u4e48\u9700\u8981\u5c06\u76ee\u5f55\u6743\u9650\u8bbe\u4e3amysql"),(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("inlineCode",{parentName:"p"},"sudo chown -R mysql:mysql /data/query_log/"))),(0,a.kt)("p",null,"\u5f00\u542f\u65e5\u5fd7\u8bb0\u5f55"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"## \u67e5\u770b\u65e5\u5fd7\u662f\u5426\u5f00\u542f\uff08ON\u662f\u5f00\uff0cOFF\u662f\u5173\uff09\nshow variables like 'general_log';\n## \u5f00\u542f\u65e5\u5fd7\nset global general_log=on;\n")),(0,a.kt)("p",null,"\u7136\u540e\u67e5\u770b query.log \u6587\u4ef6\uff0c\u53ef\u4ee5\u770b\u5230\u6bcf\u6b21\u67e5\u8be2\u7684sql\u90fd\u4f1a\u5728\u8fd9\u91cc\u8bb0\u5f55"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"cat /data/query_log/query.log\n")),(0,a.kt)("p",null,"\u5982\u679c\u6211\u4eec\u5c06\u65e5\u5fd7\u5199\u5165\u65b9\u5f0f\u4fee\u6539\u4e3a table"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"## \u67e5\u770b\u65e5\u5fd7\u5199\u5165\u65b9\u5f0f\uff08\u6587\u4ef6file\u548c\u3001\u6570\u636e\u8868table\uff09\nshow variables like 'log_output';\n## \u66f4\u6539\u65e5\u5fd7\u5199\u5165\u65b9\u5f0f\nset global log_output='table';\n")),(0,a.kt)("p",null,"\u90a3\u4e48\u73b0\u5728\u67e5\u770b\u65e5\u5fd7\u7684\u65b9\u5f0f\u5c31\u662f"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"## \u67e5\u8be2\u65e5\u5fd7\u4fe1\u606f\nselect * from mysql.general_log;\n")),(0,a.kt)("p",null,"!> \u6ce8\u610f\uff1a\u901a\u7528\u67e5\u8be2\u65e5\u5fd7\u4f1a\u9020\u6210\u5de8\u5927\u7684\u65e5\u5fd7\uff0c\u6240\u4ee5\u542f\u7528\u9700\u8c28\u614e"),(0,a.kt)("h3",{id:"\u6162\u67e5\u8be2\u65e5\u5fd7"},"\u6162\u67e5\u8be2\u65e5\u5fd7"),(0,a.kt)("p",null,"\u6162\u67e5\u8be2\u65e5\u5fd7\u5305\u542b\u4e86\u6267\u884c\u65f6\u95f4\u8d85\u8fc7\u4e86 ",(0,a.kt)("inlineCode",{parentName:"p"},"long_query_time"),"\u79d2\uff08\u9ed8\u8ba410\u79d2\uff09\uff0c\u6216\u8005\u81f3\u5c11\u626b\u63cf\u4e86 ",(0,a.kt)("inlineCode",{parentName:"p"},"max_examined_row_limit"),"\u884c\uff08\u9ed8\u8ba40\uff09\u7684SQL\u8bed\u53e5"),(0,a.kt)("p",null,"\u4fee\u6539\u6162\u67e5\u8be2\u65e5\u5fd7\u7684\u6700\u5927\u65f6\u95f4"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"## \u67e5\u8be2\u8d85\u65f6\u65f6\u95f4\nselect @@global.long_query_time;\n## \u4fee\u6539\u8d85\u65f6\u65f6\u95f4\nset @@global.long_query_time=1;\n")),(0,a.kt)("p",null,"\u4fee\u6539\u6162\u67e5\u8be2\u65e5\u5fd7\u7684\u65e5\u5fd7\u8def\u5f84"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-shell"},"## \u521b\u5efa\u76ee\u5f55 & \u6587\u4ef6 \u7565\uff1a/data/slow_query/slow_query.log\n## \u76ee\u5f55\u6388\u6743\nsudo chown -R mysql:mysql /data/slow_query/\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"## \u67e5\u8be2\u6162\u67e5\u8be2\u65e5\u5fd7\u6587\u4ef6\u8def\u5f84\nselect @@global.slow_query_log_file;\n## \u4fee\u6539\u65e5\u5fd7\u6587\u4ef6\u8def\u5f84\nset @@global.slow_query_log_file='/data/slow_query/slow_query.log';\n")),(0,a.kt)("p",null,"\u5237\u65b0\u65e5\u5fd7"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"flush logs;\n")),(0,a.kt)("p",null,"\u542f\u7528\u6162\u67e5\u8be2\u65e5\u5fd7"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"## \u67e5\u770b\u662f\u5426\u542f\u7528\uff080\u672a\u542f\u75281\u5df2\u542f\u7528\uff09\nselect @@global.slow_query_log;\n## \u542f\u7528\u6162\u67e5\u8be2\u65e5\u5fd7\nset @@global.slow_query_log=1;\n")),(0,a.kt)("p",null,"\u5982\u679c\u5c06 ",(0,a.kt)("inlineCode",{parentName:"p"},"log_output"),"\u8bbe\u7f6e\u4e3a\u4e86table\uff0c\u90a3\u4e48\u5c06\u4f1a\u5728\u5982\u4e0b\u8868\u4e2d\u8bb0\u5f55"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"select * from mysql.slow_log;\n")),(0,a.kt)("h3",{id:"\u5207\u6362\u65e5\u5fd7\u8868"},"\u5207\u6362\u65e5\u5fd7\u8868"),(0,a.kt)("p",null,"\u5982\u679c\u6570\u636e\u8868\u6570\u91cf\u8fc7\u5927\uff0c\u53ef\u4ee5\u521b\u5efa\u4e00\u4e2a\u65b0\u7684\u8868\u6765\u66ff\u4ee3"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sql"},"drop table if exists mysql.general_log_new;\ncreate table mysql.general_log_new like mysql.general_log;\nrename table mysql.general_log to mysql.general_log_1, mysql.general_log_new to mysql.general_log;\n")))}u.isMDXComponent=!0}}]);