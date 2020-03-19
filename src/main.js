import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import VueLazyload from 'vue-lazyload'
import axios from 'axios'
import vueInfiniteScroll from 'vue-infinite-scroll'

Vue.prototype.axios = axios

Vue.config.productionTip = false


Vue.use(vueInfiniteScroll)
Vue.use(VueLazyload, {
  loading: 'static/loading-svg/loading-bars.svg',
  try: 3 // default 1
})


// 设置接口的前缀
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000

// 拦截返回值
axios.interceptors.response.use((response) => {
  let res = response.data;
  if (res.status == 0) {
    return response;
  } else {
    if (response.config.url != '/users/checkLogin') {
      if (res.status == 10008) {
        alert(res.msg)
        return Promise.reject(res.msg);
      } else {
        alert(res.msg)
        return Promise.reject(res.msg);
      }
    } else {
      return response;
    }
  }
}, (error) => {
  let res = error.response;
  alert(res.data.message)
  return Promise.reject(error);
})




new Vue({
  router,
  render: h => h(App),
}).$mount('#app')