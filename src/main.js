import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import http from './utils/request';
import mixins from './mixins/mixins';

// 在线图标库
import IconFontOnline from 'vue-iconfont-online';
Vue.use(IconFontOnline, {  url: '//at.alicdn.com/t/font_2534815_idwh0uhqwf.css',  symbol: 'alibaba-',  fontFamily: 'alibaba-icon',  fontSize: 22})

Vue.config.productionTip = false
Vue.prototype.$axios=http

Vue.use(ElementUI)
Vue.use(mixins)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
