import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueCookies from 'vue-cookies';
import axios from 'axios';
import VueAxios from 'vue-axios';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootswatch/dist/cyborg/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
// Install Vue Cookies https://www.npmjs.com/package/vue-cookies
Vue.use(VueCookies);

axios.interceptors.request.use(
    (request) => {
        if (store.getters.getToken) {
            request.headers[
                'authorization'
            ] = `bearer ${store.getters.getToken}`;
        }
        return request;
    },
    (error) => {
        Promise.reject(error);
    }
);

Vue.use(VueAxios, axios);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
