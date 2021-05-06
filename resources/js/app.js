require('./bootstrap');
window.Vue = require('vue');

import router from './router';

import App from './App.vue';

/* sweetalert2 */
import VueSweetalert2 from 'vue-sweetalert2';
window.Swal = require('sweetalert2');
Vue.use(VueSweetalert2);

import VueToast from 'vue-toast-notification';
// Import one of the available themes
// Import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast);

/* Importing Vuetify */
import Vuetify from './plugins/vuetify';

import VueAxios from 'vue-axios';
import axios from 'axios';
import Vue from 'vue';

Vue.use(VueAxios, axios);

const app = new Vue({
    vuetify: Vuetify,
    el: '#app',
    router,
    render: h => h(App)
});
