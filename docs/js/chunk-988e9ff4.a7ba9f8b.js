(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-988e9ff4"],{"0764":function(t,e,i){},"2c6c":function(t,e,i){"use strict";var o=i("0764"),s=i.n(o);s.a},"789b":function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"rank"},[i("ScrollView",{directives:[{name:"show",rawName:"v-show",value:t.movieList.length,expression:"movieList.length"}],attrs:{data:t.movieList}},t._l(t.movieList,(function(e,o){return i("Card",{key:e._id,attrs:{movie:e,sort:o+1},on:{select:t.gotoDetail}})})),1),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.movieList.length,expression:"!movieList.length"}],staticClass:"loading-wrap"},[i("Loading")],1)],1)},s=[],n=(i("cadf"),i("551c"),i("097d"),{data:function(){return{movieList:[]}},created:function(){this.getMovieList()},methods:{getMovieList:function(){var t=this;this.$axios.get("/api/movie/get_rank").then((function(e){1001===e.code&&(t.movieList=t.movieList.concat(e.result.movies))}))},gotoDetail:function(t){this.$router.push("/movie/".concat(t))}}}),a=n,c=(i("2c6c"),i("2877")),r=Object(c["a"])(a,o,s,!1,null,"177c37ba",null);e["default"]=r.exports}}]);
//# sourceMappingURL=chunk-988e9ff4.a7ba9f8b.js.map