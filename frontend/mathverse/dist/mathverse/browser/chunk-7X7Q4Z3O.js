import{Aa as d,Ba as u,Q as c,Ra as h,Sa as g,Wa as v,ia as n,ja as a,qa as m,ra as l,ua as r,va as p,xa as f}from"./chunk-IZFVNPQ5.js";function C(i,t){if(i&1&&(r(0,"li"),f(1),p()),i&2){let s=t.$implicit;n(),d(" ",s.topicName," - ",s.description," ")}}var I=(()=>{let t=class t{constructor(e){this.http=e,this.topics=[]}ngOnInit(){this.http.get("/mathverse/topics").subscribe(e=>{this.topics=e},e=>{console.error("Error fetching topics:",e)})}};t.\u0275fac=function(o){return new(o||t)(a(v))},t.\u0275cmp=c({type:t,selectors:[["app-topics"]],standalone:!0,features:[u],decls:2,vars:1,consts:[[4,"ngFor","ngForOf"]],template:function(o,F){o&1&&(r(0,"ul"),m(1,C,2,2,"li",0),p()),o&2&&(n(),l("ngForOf",F.topics))},dependencies:[g,h]});let i=t;return i})();export{I as TopicsComponent};
