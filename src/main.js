// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//主组件
import App from './App'
//vue路由
import router from './router'
//vuex配置文件
import store from '@/config/store'
//常用过滤器
import filter from '@/config/filter'
Vue.use(filter);
//头部
import headTop from '@/components/header/head';
//涟漪动画效果
import {
  ripple
} from '@/plugins/mixin';
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
Vue.mixin(ripple);
