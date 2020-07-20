import Vue from 'vue'
import App from './App.vue'
import router from './router.js'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios'
//请求接口的基本路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios;

Vue.config.productionTip = false

Vue.use(ElementUI);//全局导入element-ui

new Vue({
  router,//挂载路由
  render: h => h(App),
}).$mount('#app')
