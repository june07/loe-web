import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		item: null,
		items: null,
		message: null,
		injected: {},
		token: null,
		itemCurrentlyViewing: null,
		stats: {
			updated: null,
			totalReceipts: null,
			totalApiCalls: null,
		},
        deferredPrompt: null,
        showInstallPromotion: null
	},
	mutations: {
		set(state, payload) {
			delete payload.type
			const kvPairs = Object.entries(payload)
			kvPairs.forEach((kv) => Vue.set(state, kv[0], kv[1]))
		},
	},
	actions: {},
	modules: {},
})
