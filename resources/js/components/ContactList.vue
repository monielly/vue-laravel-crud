<template>
  <div class="container">
    <h2 class="text-center p-2 text-white bg-primary mt-5">Contacts</h2>

    <div class="text-right">
      <router-link to="/add_contact">
        <button class="btn btn-success btn-sm">Add New</button>
      </router-link>
    </div>
    <table class="table">
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
    </table>
  </div>
</template>

<script>
export default {
  name: 'Contact',

  created(){
    this.loadData();
  },
  data(){
    return {
      url: document.head.querySelector('meta[name="url"]').content,
      contacts: []
    }
  },
  methods: {
    loadData(){
      let url = this.url + '/api/getContacts';
      this.axios.get(url).then(resp=> {
        this.contacts = resp.data;
        // console.log(this.contacts);
      })
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
                message: "Deleted data successfully!",
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
    console.log("Mounted!");
  }
}
</script>