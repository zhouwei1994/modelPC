import Vue from 'vue'
import App from './App.vue'
import install from "@/plugins/install";
import store from "@/store";
import zHeader from "@/components/header";
import zFooter from "@/components/footer";
import router from './router'
// 全局组件
Vue.use(install);
Vue.config.productionTip = false
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
Vue.component("z-header", zHeader);
Vue.component("z-footer", zFooter);
