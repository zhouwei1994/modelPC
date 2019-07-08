import Vue from 'vue';
//主组件
import App from './App.vue';
//vue路由
import router from './router';
//vuex配置文件
import store from './config/store';
//常用过滤器
import filter from './config/filter';
Vue.use(filter);

Vue.config.productionTip = false;
import zImage from '@/components/common/image.vue';
Vue.component("z-image", zImage);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');