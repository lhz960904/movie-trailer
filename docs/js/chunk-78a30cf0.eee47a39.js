(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-78a30cf0"],{"6a50":function(e,s,t){"use strict";var i=t("7414"),a=t.n(i);a.a},7414:function(e,s,t){},"961f":function(e,s,t){},a346:function(e,s,t){e.exports=t.p+"img/logo.720acaad.png"},a55b:function(e,s,t){"use strict";t.r(s);var i=function(){var e=this,s=e.$createElement,i=e._self._c||s;return i("div",[i("Transition",{attrs:{name:"fade"}},[i("div",{staticClass:"login"},[i("TheBackHeader",[i("img",{attrs:{src:t("a346"),width:"70"}})]),i("div",{staticClass:"wrapper"},[i("section",{staticClass:"form-box"},[i("div",{staticClass:"item"},[i("i",{staticClass:"iconfont icon-email"}),i("input",{directives:[{name:"model",rawName:"v-model",value:e.email,expression:"email"}],attrs:{type:"text",placeholder:"登录邮箱"},domProps:{value:e.email},on:{focus:function(s){e.errMsg=""},input:function(s){s.target.composing||(e.email=s.target.value)}}}),i("i",{directives:[{name:"show",rawName:"v-show",value:e.email,expression:"email"}],staticClass:"iconfont icon-delete",on:{click:function(s){e.email=""}}})]),i("div",{directives:[{name:"show",rawName:"v-show",value:e.isSignUp,expression:"isSignUp"}],staticClass:"item"},[i("i",{staticClass:"iconfont icon-user1"}),i("input",{directives:[{name:"model",rawName:"v-model",value:e.username,expression:"username"}],attrs:{type:"text",placeholder:"用户名"},domProps:{value:e.username},on:{focus:function(s){e.errMsg=""},input:function(s){s.target.composing||(e.username=s.target.value)}}})]),i("div",{staticClass:"item"},[i("i",{staticClass:"iconfont icon-lock"}),i("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"password",placeholder:"密码"},domProps:{value:e.password},on:{focus:function(s){e.errMsg=""},input:function(s){s.target.composing||(e.password=s.target.value)}}})])]),i("div",{staticClass:"btn-wrapper"},[i("button",{on:{click:e.check}},[e._v(e._s(e.isSignUp?"注册":"登录"))])]),i("div",{staticClass:"text-wrapper"},[i("Transition",{attrs:{name:"err"}},[i("p",{directives:[{name:"show",rawName:"v-show",value:e.errMsg,expression:"errMsg"}],staticClass:"errmsg"},[e._v(e._s(e.errMsg))])]),e.isSignUp?i("p",{staticClass:"register",on:{click:e.changeType}},[e._v("立即登录")]):i("p",{staticClass:"register",on:{click:e.changeType}},[e._v("免费注册")])],1)])],1)]),i("Confirm",{ref:"confirm",attrs:{content:e.confirmText,"confirm-btn-text":"前往"},on:{confirm:e.changeType}})],1)},a=[],n=t("db19"),r={components:{TheBackHeader:n["a"]},data:function(){return{email:"",username:"",password:"",errMsg:"",loignType:0,confirmText:""}},computed:{isSignUp:function(){return 1===this.loignType}},methods:{check:function(){var e=/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;e.test(this.email)?!this.isSignUp||this.username.trim()?!this.password.trim()||this.password.length<6?this.errMsg="密码不能为空且不小于6位":this.isSignUp?this.register():this.login():this.errMsg="用户名不能为空":this.errMsg="邮箱格式不正确"},login:function(){var e=this,s=this.email,t=this.password;this.$axios.post("/api/user/login",{email:s,password:t}).then((function(s){1001===s.code?(e.$store.commit("setUserInfo",s.result.user),e.$router.push("/user")):e.errMsg=s.errmsg}))},register:function(){var e=this,s=this.email,t=this.username,i=this.password;this.$axios.post("/api/user/register",{email:s,username:t,password:i}).then((function(s){1001===s.code?e.confirmText="注册成功！是否前往登录":e.confirmText="邮箱已存在！是否直接登录",e.$refs.confirm.show()}))},changeType:function(){this.email="",this.username="",this.password="",this.errMsg="",this.loignType=1-this.loignType}}},o=r,c=(t("ca94"),t("2877")),l=Object(c["a"])(o,i,a,!1,null,"5df8ecf6",null);s["default"]=l.exports},ca94:function(e,s,t){"use strict";var i=t("961f"),a=t.n(i);a.a},db19:function(e,s,t){"use strict";var i=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("header",{staticClass:"back-header"},[t("i",{staticClass:"iconfont icon-left",on:{click:function(s){return e.$router.back()}}}),e._t("default")],2)},a=[],n={name:"TheBackHeader"},r=n,o=(t("6a50"),t("2877")),c=Object(o["a"])(r,i,a,!1,null,"16cdf5d2",null);s["a"]=c.exports}}]);
//# sourceMappingURL=chunk-78a30cf0.eee47a39.js.map