import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import http from './utils/request';
import mixins from './mixins/mixins';
import echarts from 'echarts';
// import VueAMap from 'vue-amap';
// 在线图标库
import IconFontOnline from 'vue-iconfont-online';
Vue.use(IconFontOnline, {  url: '//at.alicdn.com/t/font_2534815_idwh0uhqwf.css',  symbol: 'alibaba-',  fontFamily: 'alibaba-icon',  fontSize: 22})

Vue.config.productionTip = false
Vue.prototype.$axios=http
Vue.prototype.$echarts=echarts

Vue.use(ElementUI)
Vue.use(mixins)
// Vue.use(VueAMap)

// VueAMap.initAMapApiLoader({
//   key: 'd6eabbd08f89ccfb74278b36ab6342567', // 自己到官网申请，我随便写的
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geolocation','Geocoder'],//plugin所要用到的模块功能，按需添加
//   v: '1.4.4',//高德 sdk 版本为 1.4.4
// });


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
