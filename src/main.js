import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant';
import 'vant/lib/index.css';
import FastClick from 'fastclick'

// 导入vant组件库
Vue.use(Vant);

// fastclck减少移动端300ms延迟
FastClick.attach(document.body);

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
