import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "./router";
import { createStore } from "./store";

Vue.config.productionTip = false;

export function createApp() {
	const router = createRouter();
	const store = createStore();

	const app = new Vue({
		// 注入 router 到 根vue实列中
		router,
		store,
		// 根据实例简单的渲染应用程序组件
		render: h => h(App)
	});

	return { app, router, store };
}
