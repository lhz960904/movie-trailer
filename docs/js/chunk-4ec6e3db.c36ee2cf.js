(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4ec6e3db"],{"01b4":function(t,e,a){"use strict";var s=a("13d7"),i=a.n(s);i.a},1300:function(t,e,a){t.exports=a.p+"img/noresult.a58656f3.png"},"13d7":function(t,e,a){},"3e96":function(t,e,a){"use strict";var s=a("bf53"),i=a.n(s);i.a},4623:function(t,e,a){},4886:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"category"},[s("div",{staticClass:"nav-wrapper"},[s("div",{staticClass:"tabs"},t._l(t.cats,(function(e,a){return s("div",{key:e,staticClass:"item",class:t.getCls(a),on:{click:function(e){return t.switchTab(a)}}},[s("span",{staticClass:"text"},[t._v(t._s(e))]),s("i",{staticClass:"iconfont icon-drop-down",class:{"icon-drop-up":a===t.activeTabIdx}})])})),0),s("div",{directives:[{name:"show",rawName:"v-show",value:-1!==t.activeTabIdx,expression:"activeTabIdx !== -1"}],staticClass:"tab-content"},[s("SizerCategory",{directives:[{name:"show",rawName:"v-show",value:0===t.activeTabIdx,expression:"activeTabIdx === 0"}],ref:"sizerCategory",on:{change:t.getMovies},model:{value:t.params.categories,callback:function(e){t.$set(t.params,"categories",e)},expression:"params.categories"}}),s("SizerType",{directives:[{name:"show",rawName:"v-show",value:1===t.activeTabIdx,expression:"activeTabIdx === 1"}],attrs:{status:t.params.type},on:{change:t.changeType}}),s("SizerRate",{directives:[{name:"show",rawName:"v-show",value:2===t.activeTabIdx,expression:"activeTabIdx === 2"}],ref:"sizerRate",on:{change:t.getMovies},model:{value:t.params.rate,callback:function(e){t.$set(t.params,"rate",e)},expression:"params.rate"}})],1),s("div",{directives:[{name:"show",rawName:"v-show",value:-1!==t.activeTabIdx,expression:"activeTabIdx !== -1"}],staticClass:"mask",on:{click:t.closeTab}})]),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.loading,expression:"!loading"}],staticClass:"movie-wrapper"},[s("ScrollView",{attrs:{data:t.movies}},t._l(t.movies,(function(e){return s("Card",{key:e._id,attrs:{movie:e},on:{select:t.selectItem}})})),1),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.movies.length,expression:"!movies.length"}],staticClass:"no-result"},[s("img",{staticClass:"img",attrs:{src:a("1300")}}),s("p",{staticClass:"text"},[t._v("没有找到相关内容")])])],1),s("div",{directives:[{name:"show",rawName:"v-show",value:t.loading,expression:"loading"}],staticClass:"loading-wrap"},[s("Loading")],1)])},i=[],n=(a("7f7f"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"category-wrapper"},[a("div",{staticClass:"list"},t._l(t.list,(function(e){return a("span",{key:e._id,staticClass:"item",class:{active:t.cacheList.includes(e.name)},on:{click:function(a){return t.selectItem(e.name)}}},[t._v(" "+t._s(e.name)+" ")])})),0),a("button",{staticClass:"confirm-btn",on:{click:t.confirm}},[t._v("完成")])])}),r=[],c={model:{prop:"categories",event:"change"},props:{categories:{type:Array,required:!0}},data:function(){return{list:[],cacheList:[]}},created:function(){this.getCategories()},methods:{getCategories:function(){var t=this;this.$axios.get("/api/category/get_cates").then((function(e){1001===e.code&&(t.list=e.result.cates)}))},resetCache:function(){this.cacheList=this.categories.slice()},selectItem:function(t){var e=this.cacheList.slice(),a=e.indexOf(t);a>-1?e.splice(a,1):e.push(t),this.cacheList=e},confirm:function(){this.$emit("change",this.cacheList)}}},o=c,u=(a("a65c"),a("2877")),l=Object(u["a"])(o,n,r,!1,null,"43146fd0",null),h=l.exports,d=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"type-wrapper"},t._l(t.types,(function(e){return a("div",{key:e.name,staticClass:"item",class:{active:t.status===e.type},on:{click:function(a){return t.selectItem(e)}}},[a("i",{staticClass:"iconfont icon-dui"}),a("span",{staticClass:"text"},[t._v(t._s(e.name))])])})),0)},f=[],v=(a("c5f6"),{props:{status:{type:[String,Number],required:!0}},data:function(){return{types:[{name:"全部",type:""},{name:"已上映",type:1},{name:"未上映",type:0}]}},methods:{selectItem:function(t){this.$emit("change",t)}}}),p=v,m=(a("85a3"),Object(u["a"])(p,d,f,!1,null,"2b92a471",null)),g=m.exports,b=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"rate-wrapper"},[a("div",{ref:"bar",staticClass:"bar"},[a("div",{staticClass:"mask",style:t.style}),a("div",{ref:"barBtn1",staticClass:"bar-btn",attrs:{"data-idx":"1"},on:{touchstart:function(e){return e.preventDefault(),t.touchStart(e)},touchmove:function(e){return e.preventDefault(),t.touchMove(e)},touchend:t.touchEnd}}),a("div",{ref:"barBtn2",staticClass:"bar-btn",attrs:{"data-idx":"2"},on:{touchstart:function(e){return e.preventDefault(),t.touchStart(e)},touchmove:function(e){return e.preventDefault(),t.touchMove(e)},touchend:t.touchEnd}})]),a("button",{staticClass:"confirm-btn",on:{click:t.confirm}},[t._v("完成")])])},y=[];a("20d6");function x(t){if(Array.isArray(t)){for(var e=0,a=new Array(t.length);e<t.length;e++)a[e]=t[e];return a}}function w(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function C(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function I(t){return x(t)||w(t)||C()}a("55dd");function T(t){if(Array.isArray(t))return t}function _(t,e){var a=[],s=!0,i=!1,n=void 0;try{for(var r,c=t[Symbol.iterator]();!(s=(r=c.next()).done);s=!0)if(a.push(r.value),e&&a.length===e)break}catch(o){i=!0,n=o}finally{try{s||null==c["return"]||c["return"]()}finally{if(i)throw n}}return a}function $(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function k(t,e){return T(t)||_(t,e)||$()}var S={model:{prop:"rate",event:"change"},props:{rate:{type:Array,required:!0}},data:function(){return{cacheRate:[],style:{}}},created:function(){this.touch={}},methods:{resetCache:function(){this.dots||this.generateDots(),this.cacheRate=this.rate;var t=k(this.cacheRate,2),e=t[0],a=t[1];this.$refs.barBtn1.style.left=this.dots[e]+"px",this.$refs.barBtn2.style.left=this.dots[a]+"px",this.setStyle()},generateDots:function(){this.dots=[0],this.width=this.$refs.bar.getBoundingClientRect().width;for(var t=1;t<10;t++){var e=document.createElement("div");e.className="bar-dot";var a=.1*t*this.width;this.dots.push(parseInt(a)-7),e.style.left=parseInt(a)+"px",this.$refs.bar.appendChild(e)}this.dots.push(this.width-7)},setStyle:function(){var t=parseInt(this.$refs.barBtn1.style.left),e=parseInt(this.$refs.barBtn2.style.left),a=[t,e].sort((function(t,e){return t-e}));this.style={width:a[1]-a[0]+"px",left:a[0]+"px"}},touchStart:function(t){this.touch.initiated=!0,t.target.style.transform="scale(1.3)"},touchMove:function(t){if(this.touch.initiated){var e=this.dots.indexOf(parseInt(t.target.style.left)),a=this.cacheRate[1-this.cacheRate.indexOf(e)],s=Math.min(Math.max(0,t.touches[0].pageX-30),this.width),i=this.dots.map((function(t){return Math.abs(parseInt(t-s))})),n=Math.min.apply(Math,I(i)),r=i.findIndex((function(t){return t===n}));t.target.style.left=this.dots[r]+"px",this.cacheRate=[a,r].sort((function(t,e){return t-e})),this.setStyle()}},touchEnd:function(t){this.touch.initiated=!1,t.target.style.transform="scale(1.0)"},confirm:function(){this.$emit("change",this.cacheRate)}}},M=S,N=(a("01b4"),a("3e96"),Object(u["a"])(M,b,y,!1,null,"13fb806f",null)),R=N.exports,O={components:{SizerType:g,SizerRate:R,SizerCategory:h},data:function(){return{cats:["分类","已上映","评分"],activeTabIdx:2,movies:[],params:{categories:[],rate:[0,10],type:1},loading:!0}},created:function(){this.getMovies()},methods:{getMovies:function(){var t=this;this.activeTabIdx=-1,this.loading=!0;var e=this.params,a=e.categories,s=e.rate,i=e.type,n={categories:JSON.stringify(a),rate:JSON.stringify(s),type:i};this.$axios.get("/api/movie/get_special_movies",{params:n}).then((function(e){1001===e.code&&(t.movies=e.result.movies),t.loading=!1}))},changeType:function(t){var e=t.type,a=t.name;this.params.type=e,this.cats[1]=a,this.getMovies()},switchTab:function(t){var e=this;t!==this.activeTabIdx?0===this.params.type&&2===t||(this.activeTabIdx=t,0===t&&this.$refs.sizerCategory.resetCache(),2===t&&this.$nextTick((function(){e.$refs.sizerRate.resetCache()}))):this.activeTabIdx=-1},selectItem:function(t){this.$router.push("/movie/".concat(t))},closeTab:function(){this.activeTabIdx=-1},getCls:function(t){return{active:t===this.activeTabIdx,disable:2===t&&0===this.params.type}}}},z=O,E=(a("c589"),Object(u["a"])(z,s,i,!1,null,"735c7561",null));e["default"]=E.exports},5515:function(t,e,a){},"85a3":function(t,e,a){"use strict";var s=a("4623"),i=a.n(s);i.a},a65c:function(t,e,a){"use strict";var s=a("c2a2"),i=a.n(s);i.a},bf53:function(t,e,a){},c2a2:function(t,e,a){},c589:function(t,e,a){"use strict";var s=a("5515"),i=a.n(s);i.a}}]);
//# sourceMappingURL=chunk-4ec6e3db.c36ee2cf.js.map