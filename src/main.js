import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import http from './utils/request';
import mixins from './mixins/mixins';
import echarts from 'echarts';
import {
  getStorage
} from './utils/storage'
// import VueAMap from 'vue-amap';
// 在线图标库
import IconFontOnline from 'vue-iconfont-online';
Vue.use(IconFontOnline, {  url: '//at.alicdn.com/t/font_2534815_kp3a5tbekfm.css',  symbol: 'alibaba-',  fontFamily: 'alibaba-icon',  fontSize: 22})

Vue.config.productionTip = false
Vue.prototype.$axios=http
Vue.prototype.$echarts=echarts

Vue.use(ElementUI)
Vue.use(mixins)

router.beforeEach((to, from, next) => {
  let user = getStorage('user')
  if (to.meta.isLogin) {
    if (user) {
      // 进入你想要进入的页面
      next();
    } else {
      // 重新让你去登录页面
      router.push('/Login')
    }
  } else {
    next()
  }
})
// Vue.use(VueAMap)

// VueAMap.initAMapApiLoader({
//   key: 'd6eabbd08f89ccfb74278b36ab6342567', // 自己到官网申请，我随便写的
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geolocation','Geocoder'],//plugin所要用到的模块功能，按需添加
//   v: '1.4.4',//高德 sdk 版本为 1.4.4
// });
let loadingInstance;
http.interceptors.request.use(function (config) {
  console.log(config);
  // 在发送请求之前做些什么,全屏加载
  // 显示加载动画
  loadingInstance = ElementUI.Loading.service({ fullscreen: true ,text:"登录中...","background":"rgba(0,0,0,0.5)"});
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 关闭动画
  loadingInstance.close();
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
