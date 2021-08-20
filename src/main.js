import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import vuetify from './plugins/vuetify'
import router from './router'
import { Auth0Plugin } from './auth'
import { domain, clientId, audience } from '../auth_config.json'
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Auth0Plugin, {
	domain,
	clientId,
	audience,
	onRedirectCallback: (appState) => {
		router.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname)
	},
})

new Vue({
	vuetify,
	router,
	store,
	render: (h) => h(App),
}).$mount('#app')
