(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-447a7c99"],{1300:function(t,e,i){t.exports=i.p+"img/noresult.a58656f3.png"},"2d3b":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"search"},[s("ScrollView",{attrs:{data:t.list}},[s("div",{staticClass:"input-wrap"},[s("SearchBox",{ref:"searchBox",on:{input:t.search,clear:t.clear}})],1),s("div",{staticClass:"hotkey-wrap"},[s("h1",{staticClass:"title"},[t._v("热门搜索")]),s("div",{staticClass:"list"},t._l(t.hotKeys,(function(e){return s("span",{key:e._id,staticClass:"item",on:{click:function(i){return t.addQuery(e.name)}}},[t._v(" "+t._s(e.name)+" ")])})),0)]),t.searchHistory.length?s("div",{staticClass:"history-wrap"},[s("div",{staticClass:"title"},[s("span",[t._v("搜索历史")]),s("i",{staticClass:"iconfont icon-clear",on:{click:t.showConfirm}})]),t._l(t.searchHistory,(function(e){return s("div",{key:e,staticClass:"item"},[s("i",{staticClass:"iconfont icon-history"}),s("span",{staticClass:"text",on:{click:function(i){return t.addQuery(e)}}},[t._v(t._s(e))]),s("i",{staticClass:"iconfont icon-del",on:{click:function(i){return t.deleteSearchHistory(e)}}})])}))],2):t._e()]),s("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"result-wrap"},[s("ScrollView",{attrs:{data:t.movieList}},t._l(t.movieList,(function(e){return s("Card",{key:e._id,attrs:{movie:e},on:{select:t.selectItem}})})),1),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.movieList.length,expression:"!movieList.length"}],staticClass:"no-result"},[s("img",{staticClass:"img",attrs:{src:i("1300")}}),s("p",{staticClass:"text"},[t._v("没有找到相关内容")])])],1),s("Confirm",{ref:"confirm",attrs:{content:"是否删除所有搜索历史"},on:{confirm:t.clearSearchHistory}})],1)},n=[],r=(i("386d"),i("be94")),a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"search-box"},[i("i",{staticClass:"iconfont icon-search"}),i("input",{directives:[{name:"model",rawName:"v-model",value:t.query,expression:"query"}],staticClass:"search-input",attrs:{type:"text",placeholder:t.placeholder},domProps:{value:t.query},on:{input:[function(e){e.target.composing||(t.query=e.target.value)},t.handleInput]}}),i("i",{directives:[{name:"show",rawName:"v-show",value:t.query,expression:"query"}],staticClass:"iconfont icon-delete",on:{click:t.clear}})])},o=[],c={props:{placeholder:{type:String,default:"搜索电影"}},data:function(){return{query:""}},methods:{handleInput:function(){this.$emit("input",this.query)},clear:function(){this.query="",this.$emit("clear")},setQuery:function(t){this.query=t}}},u=c,l=(i("7fda"),i("2877")),h=Object(l["a"])(u,a,o,!1,null,"1f5dac33",null),f=h.exports,d=i("5880"),v={components:{SearchBox:f},data:function(){return{hotKeys:[],movieList:[],isShow:!1}},computed:Object(r["a"])({list:function(){return this.hotKeys.concat(this.searchHistory)}},Object(d["mapState"])(["searchHistory"])),created:function(){this.getHotKeys()},methods:Object(r["a"])({getHotKeys:function(){var t=this;this.$axios.get("/api/movie/get_hot_search").then((function(e){1001===e.code&&(t.hotKeys=e.result.keywords)}))},search:function(t){var e=this;if(this.timer&&clearTimeout(this.timer),t.trim()){var i={keyword:t};this.timer=setTimeout((function(){e.$axios.get("api/movie/search",{params:i}).then((function(t){1001===t.code&&(e.movieList=t.result.movies,e.isShow=!0)})),e.saveSearchHistory(t)}),500)}},showConfirm:function(){this.$refs.confirm.show()},clear:function(){this.movieList=[],this.isShow=!1},addQuery:function(t){this.$refs.searchBox.setQuery(t),this.search(t)},selectItem:function(t){this.$router.push("/movie/".concat(t))}},Object(d["mapMutations"])(["saveSearchHistory","deleteSearchHistory","clearSearchHistory"]))},m=v,p=(i("8de0"),Object(l["a"])(m,s,n,!1,null,"0bb42948",null));e["default"]=p.exports},3165:function(t,e,i){},"386d":function(t,e,i){"use strict";var s=i("cb7c"),n=i("83a1"),r=i("5f1b");i("214f")("search",1,(function(t,e,i,a){return[function(i){var s=t(this),n=void 0==i?void 0:i[e];return void 0!==n?n.call(i,s):new RegExp(i)[e](String(s))},function(t){var e=a(i,t,this);if(e.done)return e.value;var o=s(t),c=String(this),u=o.lastIndex;n(u,0)||(o.lastIndex=0);var l=r(o,c);return n(o.lastIndex,u)||(o.lastIndex=u),null===l?-1:l.index}]}))},"4aaf":function(t,e,i){},"7fda":function(t,e,i){"use strict";var s=i("3165"),n=i.n(s);n.a},"83a1":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},"8de0":function(t,e,i){"use strict";var s=i("4aaf"),n=i.n(s);n.a},be94:function(t,e,i){"use strict";function s(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function n(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{},n=Object.keys(i);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(i).filter((function(t){return Object.getOwnPropertyDescriptor(i,t).enumerable})))),n.forEach((function(e){s(t,e,i[e])}))}return t}i.d(e,"a",(function(){return n}))}}]);
//# sourceMappingURL=chunk-447a7c99.3ec881a0.js.map