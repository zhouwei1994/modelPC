import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/plugins/filter";
import zHeader from "@/components/header";
import zFooter from "@/components/footer";
let application = createApp(App);
application.use(store);
application.use(router);
// 注册全局组件
application.component('z-header', zHeader);
application.component('z-footer', zFooter);
application.mount('#app');
