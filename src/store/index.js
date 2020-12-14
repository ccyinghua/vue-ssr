import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
	count: 0
};

const mutations = {
	increment(state) {
		state.count++;
	},
	decrement(state) {
		state.count--;
	}
};

const actions = {
	increment: ({ commit }) => {
		commit("increment");
	},
	decrement: ({ commit }) => {
		commit("decrement");
	}
};

const getters = {
	count(state) {
		return state.count;
	},
	getOdd(state) {
		return state.count % 2 == 0 ? '偶数' : '奇数';
	}
}

// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {}
// });

export function createStore() {
	return new Vuex.Store({
		state,
		mutations,
		actions,
		getters,
		modules: {}
	});
}
