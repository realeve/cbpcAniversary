webpackJsonp([3],{21:function(t,n,e){"use strict";var i=e(4),o=e(65);i.a.use(o.a),n.a=new o.a({mode:"hash",routes:[{path:"/",component:function(t){e.e(0).then(function(){var n=[e(72)];t.apply(null,n)}.bind(this)).catch(e.oe)}},{path:"/lucky",component:function(t){e.e(1).then(function(){var n=[e(73)];t.apply(null,n)}.bind(this)).catch(e.oe)}}]})},22:function(t,n,e){"use strict";var i=e(4),o=e(13),a=e(47),s=e(46);i.a.use(o.b),n.a=new o.b.Store({state:a.a,mutations:s.a})},26:function(t,n,e){e(62);var i=e(8)(e(49),e(64),null,null);t.exports=i.exports},45:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e(4),o=e(24),a=e.n(o),s=e(26),r=e.n(s),u=e(25),c=e(22),d=e(21),h=e(23);i.a.use(u.a),i.a.use(h.a),d.a.beforeEach(function(t,n,e){c.a.commit("updateLoadingStatus",{isLoading:!0}),e()}),d.a.afterEach(function(t){c.a.commit("updateLoadingStatus",{isLoading:!1})}),a.a.attach(document.body),i.a.config.productionTip=!1,new i.a({router:d.a,store:c.a,render:function(t){return t(r.a)}}).$mount("#app")},46:function(t,n,e){"use strict";var i={updateLoadingStatus:function(t,n){t.isLoading=n.isLoading},hideArrow:function(t,n){t.showArrow=n},setUserinfo:function(t,n){t.userInfo=n}};n.a=i},47:function(t,n,e){"use strict";var i={isLoading:!1,showArrow:!0,userInfo:{},cdnUrl:"http://cbpc540.applinzi.com/index.php"};n.a=i},48:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={props:{value:{type:Boolean,default:!1},text:String,position:String},created:function(){this.show=this.value},data:function(){return{show:!1}},watch:{value:function(t){this.show=t},show:function(t){this.$emit("input",t)}}}},49:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e(51),o=e.n(i),a=e(36),s=e.n(a),r=e(34),u=e.n(r),c=e(67),d=e.n(c),h=e(42),p=e.n(h),f=e(13);n.default={name:"app",components:{Loading:d.a},data:function(){return{code:"",apiId:"wx0d9af88bd9613e6a"}},computed:u()({},e.i(f.a)(["isLoading","cdnUrl"]),{userInfo:{get:function(){return this.$store.state.userInfo},set:function(t){this.$store.commit("setUserinfo",t)}},url:function(){return window.location.href.split("#")[0]},redirectUrl:function(){return"https://open.weixin.qq.com/connect/oauth2/authorize?appid="+this.apiId+"&redirect_uri="+encodeURIComponent(this.url)+"&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect"},shareUrl:function(){return window.location.href.split("#")[0].split("?")[0]}}),methods:{wxPermissionInit:function(){var t={s:"/addon/Api/Api/getSignature",url:this.url};return this.$http.jsonp(this.cdnUrl,{params:t}).then(function(t){return t.data})},wxReady:function(t){this.$wechat.config({debug:!1,appId:t.appId,timestamp:t.timestamp,nonceStr:t.nonceStr,signature:t.signature,jsApiList:["onMenuShareAppMessage","onMenuShareTimeline","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"]})},initWxShare:function(){var t=this;this.$wechat.ready(function(){var n={title:"品质成钞两岁啦！有奖留言快来参加！",desc:"群里就差你了！",link:t.shareUrl,imgUrl:t.userInfo.headimgurl,type:"",dataUrl:"",success:function(){},cancel:function(){}};t.$wechat.onMenuShareAppMessage(n),t.$wechat.onMenuShareTimeline(n),t.$wechat.onMenuShareQQ(n),t.$wechat.onMenuShareWeibo(n),t.$wechat.onMenuShareQZone(n)})},getWXUserInfo:function(){var t=void 0,n=localStorage.wx_userinfo;if(void 0!==n)return t=JSON.parse(n),void(this.userInfo=t);this.getWXInfo()},getWXInfo:function(){var t=this,n={s:"/addon/Api/Api/getUserInfo",code:this.code};this.$http.jsonp(this.cdnUrl,{params:n}).then(function(n){t.userInfo=n.data,localStorage.setItem("wx_userinfo",s()(n.data))})},wxInit:function(){var t=this;this.needRedirect()||this.getWXInfo(),this.wxPermissionInit().then(function(n){t.wxReady(n),t.initWxShare()})},needRedirect:function(){var t=p.a.parse(window.location.href.split("?")[1]);return o()(t,"code")?(this.code=t.code,console.log(this.redirectUrl),!1):(window.location.href=this.redirectUrl,!0)}},created:function(){this.wxInit()}}},61:function(t,n){},62:function(t,n){},63:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("transition",{attrs:{name:"vux-mask"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"weui-loading_toast"},[e("div",{staticClass:"weui-mask_transparent"}),t._v(" "),e("div",{staticClass:"weui-toast",style:{position:t.position}},[e("i",{staticClass:"weui-loading weui-icon_toast"}),t._v(" "),e("p",{staticClass:"weui-toast__content"},[t._v(t._s(t.text||"加载中")),t._t("default")],2)])])])},staticRenderFns:[]}},64:function(t,n){t.exports={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"app"}},[e("loading",{model:{value:t.isLoading,callback:function(n){t.isLoading=n},expression:"isLoading"}}),t._v(" "),e("router-view")],1)},staticRenderFns:[]}},67:function(t,n,e){e(61);var i=e(8)(e(48),e(63),null,null);t.exports=i.exports},69:function(t,n){}},[45]);