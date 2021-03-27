require('./bootstrap');
window.Vue = require('vue');

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import App from './App.vue';
import Home from '../js/components/Home.vue';
import ContactList from '../js/components/ContactList.vue';
import AddContact from '../js/components/AddContact.vue';

/* sweetalert2 */
import VueSweetalert2 from 'vue-sweetalert2';
window.Swal = require('sweetalert2');
Vue.use(VueSweetalert2);


/* import utils from './helpers/utilities';
Vue.prototype.$utils = utils; */

import VueAxios from 'vue-axios';
import axios from 'axios';
import Vue from 'vue';

Vue.use(VueAxios, axios);

const routes = [{
        name: '/',
        path: '/',
        component: Home
    },
    {
        name: 'contacts',
        path: '/contacts',
        component: ContactList
    },
    {
        name: 'add_contact',
        path: '/add_contact',
        component: AddContact
    }
];

const router = new VueRouter({ mode: 'history', routes: routes })
const app = new Vue(Vue.util.extend({ router }, App)).$mount('#app');