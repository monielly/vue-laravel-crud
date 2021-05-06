import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../js/components/Home.vue';
import ContactList from '../js/components/ContactList.vue';
import AddContact from '../js/components/AddContact.vue';
import EditContact from '../js/components/EditContact.vue';

Vue.use(VueRouter);

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
},
{
  name: 'edit_contact',
  path: '/edit_contact/edit/:id?',
  component: EditContact
}];

/* You must put "mode: history" to remove hashtag on router-url */
const router = new VueRouter({ 
  mode: 'history',
  routes: routes 
});

export default router;