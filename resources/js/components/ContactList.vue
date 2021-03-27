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
          <td><button class="btn btn-danger btn-sm">Delete</button></td>
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
  methods: {
    loadData(){
      let url = this.url + '/api/getContacts';
      this.axios.get(url).then(resp=> {
        this.contacts = resp.data;
        // console.log(this.contacts);
      })
    }
  },
  mounted(){
    console.log("Mounted!");
  },
  data(){
    return {
      url: document.head.querySelector('meta[name="url"]').content,
      contacts: []
    }
  }
}
</script>