import Vue from 'vue';
import Router from 'vue-router';
import {
	getStorage
} from '@/plugins/utils';
Vue.use(Router);
import store from '@/store';
const routes = [{
	path: '/',
	name: 'Home',
	component: () => import('@/views/home/home.vue')
}];
const router = new Router({
	history: "history",
	routes
});
// 路由守卫
let inheritPages = ['AuctionHall'];
router.beforeEach((to, from, next) => {
	// 拍卖页面继承当前页面头部的数据
	if (inheritPages.includes(to.name) && inheritPages.includes(from.name)) {
		let keys = Object.keys(from.query);
		let url = "";
		let state = false;
		keys.forEach((key, index) => {
			if (!['key'].includes(key) && !to.query[key]) {
				state = true;
				if (index == 0) {
					url = key + "=" + from.query[key];
				} else {
					url += "&" + key + "=" + from.query[key];
				}
			}
		});
		if (state) {
			if (to.fullPath) {
				if (to.fullPath.indexOf("?") >= 0) {
					next(to.fullPath + "&" + url);
				} else {
					next(to.fullPath + "?" + url);
				}
			}
		}

	}
	// 让页面回到顶部
	document.documentElement.scrollTop = 0;
	if (to.meta.auth) {
		if (store.state.userInfo.token) {
			next();
		} else {
			let userInfo = getStorage("userInfo");
			if (userInfo && userInfo.token) {
				next();
			} else {
				next('/login');
			}
		}
	} else {
		next();
	}
});
export default router;
