import Vue from 'vue'
import Router from 'vue-router'
import {
  routerMode
} from './../config/env'
import store from './../config/store'
Vue.use(Router)
//路由配置
const routes = [{
  path: '/',
  name: 'index',
  component: resolve => require(['./../page/home/index.vue'], resolve)
}];
let router = new Router({
  //模式
  mode: routerMode,
  //代码检查
  // strict: process.env.NODE_ENV !== 'production',
  routes,
  "router-link-active": "active",
  "linkExactActiveClass": "active",
});
//页面加载时
router.beforeEach(function (to, from, next) {
  store.commit('setLoading', true);
  next();
});
//页面销毁时
router.afterEach(function () {
  store.commit('setLoading', false);
});
export default router;