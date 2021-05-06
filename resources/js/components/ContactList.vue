<template>
  <div class="container">
    <div v-if="loading == true" :loading="loading"
         class="mt-5"
    >
      <v-skeleton-loader
        class="mx-auto"
        max-width="100%"
        type="table"
      ></v-skeleton-loader>
    </div>
    <div v-if="loading == false" :loading="loading">
      <h2 class="text-center p-2 text-white bg-primary mt-5">Contacts</h2>
        <v-card>
          <v-card-title>
            Contact Records |  
            <router-link to="/add_contact">
              <v-btn
                class="mx-3"
                fab
                dark
                small
                color="indigo"
              >
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
            </router-link>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            >
            </v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="contacts"
            :loading="loading"
            :search="search"
            :items-per-page="5"
            loading-text="Loading... Please wait"
            class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <router-link :to="{ name:'edit_contact', params: { id:item.id } }">
                <v-icon 
                  aria-hidden="false"
                  medium
                  style="color: orange;"
                >
                  mdi-pencil
                </v-icon>
              </router-link>
              <button @click.prevent="deleteContact(item.id)">
                <v-icon
                  aria-hidden="false"
                  medium 
                  style="color: red;"
                >
                  mdi-trash-can-outline
                </v-icon>
              </button>
            </template>
          </v-data-table>
        </v-card>
      <!-- <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Designation</th>
            <th scope="col">Contact Number</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody v-for="contact in contacts" :key="contact.id">
          <tr>
            <td scope="row">{{ contact.id }}</td>
            <td scope="row">{{ contact.name }}</td>
            <td scope="row">{{ contact.email }}</td>
            <td scope="row">{{ contact.designation }}</td>
            <td scope="row">{{ contact.contact_no }}</td>
            <td>
              <router-link class="btn btn-warning btn-sm" 
                          :to="{ name:'edit_contact', params: {id:contact.id} }
              ">Edit
              </router-link> 
              <button class="btn btn-danger btn-sm" @click.prevent="deleteContact(contact.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',

  data(){
    return {
      url: document.head.querySelector('meta[name="url"]').content,
      contacts: [],
      loading: true,
      loaded: false,
      search: "",
      headers: [
        { text: "#", value: "id" },
        { text: "Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Biography", value: "bio" },
        { text: "Contact Number", value: "contact_no" },
        { text: "Designation", value: "designation" },
        { text: "Actions", value: "actions", sortable: false }
      ]
    }
  },
  inject: {
    theme: {
      default: { isDark: false },
      //another....
    }
  },
  methods: {
    loadData(){
      let url = this.url + '/api/getContacts';
      this.axios.get(url).then((resp) => {
        this.contacts = resp.data.contacts;
        let cons = console.log;
        // cons(this.contacts);
        // console.log(this.contacts);
      });
    },
    deleteContact(id){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {

          let url = this.url + `/api/deleteContact/${id}`;
          this.axios.delete(url).then(resp => {
            if(resp.status){
              this.loadData();
              this.$toast.open({
                message: "Data deleted successfully!",
                type: "success",
                position: "bottom-right",
                duration: 5000,
                dismissible: false
              });
            }else{
              this.$toast.open({
                message: "Deleting data failed!",
                type: "error",
                position: "bottom-right",
                duration: 5000,
                dismissible: false
              });
            }
          });
        }
      });
    },
  },
  mounted(){
    this.loadData();

    this.intervalid1 = setInterval(function(){
      this.loading = false;
      this.loaded = true;
    }.bind(this), 1000);
    console.log("Mounted!");
  }
}
</script>
<style>
#swal2-title, #swal2-content {
  font-size: 15px;
}
</style>