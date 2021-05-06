require('./bootstrap');

//you can remove this
window.Vue = require('vue');

import router from './router';
import App from './App.vue';
import Vuetify from './plugins/vuetify';
import VueAxios from 'vue-axios';
import axios from 'axios';
import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import VueSweetalert2 from 'vue-sweetalert2';
import 'vue-toast-notification/dist/theme-sugar.css';

window.Swal = require('sweetalert2');
Vue.use(VueSweetalert2);

Vue.use(VueToast);

Vue.use(VueAxios, axios);

const app = new Vue({
    vuetify: Vuetify,
    el: '#app',
    router,
    render: h => h(App)
});
