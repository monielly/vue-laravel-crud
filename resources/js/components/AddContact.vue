<template>
<div class="container">
  <h2 class="text-center p-2 text-white bg-primary mt-5">Add Contact</h2>
  <div class="card-body">
    <div class="col-md-6 offset-md-3" style="padding: 10px; background-color: #d5d5d5;">
      <form id="validateForm" 
        @submit.prevent="saveContact"
        enctype="multipart/form-data"
      >
        <div class="form-group">
          <label for="">Name</label>
          <input type="text" 
                 id="name" 
                 class="form-control"
                 placeholder="Enter Name..."
                 v-model="contact.name"
          >
        </div>
        <div class="form-group">
          <label for="">Email</label>
          <input type="email" 
                 id="email" 
                 class="form-control"
                 placeholder="Enter Email..."
                 v-model="contact.email"
          >
        </div>
        <div class="form-group">
          <label for="">Designation</label>
          <input type="text" 
                 id="designation" 
                 class="form-control"
                 placeholder="Enter Designation..."
                 v-model="contact.designation"
          >
        </div>
        <div class="form-group">
         <label for="">Contact Number</label>
         <input type="number" 
                id="contact_no" 
                class="form-control"
                placeholder="Enter Contact Number..."
                v-model="contact.contact_no"
         >
        </div>
        <div class="form-group">
         <label for="">Biography</label>
         <textarea type="text" 
                id="biography" 
                placeholder="Enter Biography..."
                cols="20"
                rows="5"
                class="form-control"
                v-model="contact.biography"
         >
         </textarea>
         </div>
          <div class="form-group">
            <label for="">File</label>
            <div class="custom-file form-control">
              <input type="file" 
                id="image" 
                class="custom-file-input"
                placeholder="Enter Biography..."
                v-on:change="saveImage"
              >
            </div>
          </div>  
         <div class="form-group">
           <button class="btn btn-primary mt-4">
            Save
           </button>
           <router-link :to="`/contacts`" class="btn btn-sm mt-4">
            Back
           </router-link>
         </div>
      </form>
    </div>
  </div>
</div>  
</template>

<script>
export default {
  data(){
    return {
      url: document.head.querySelector('meta[name="url"]').content,
      contact: {},
      name: '',
      email: '',
      biography: '',
      designation: '',
      contact_no: ''
    }
  },
  methods: {
    saveContact(){
      if(!this.contact.name ||
         !this.contact.email ||
         !this.contact.biography ||
         !this.contact.designation ||
         !this.image ||
         !this.contact.contact_no
      ){
        this.$toast.open({
          message: "Please complete the form before submitting!",
          type: "error",
          position: "bottom-right",
          duration: 5000,
          dismissible: false
        });
      }else{
        let formData = new FormData();
        formData.append('name', this.contact.name);
        formData.append('email', this.contact.email);
        formData.append('biography', this.contact.biography);
        formData.append('designation', this.contact.designation);
        formData.append('image', this.image);
        formData.append('contact_no', this.contact.contact_no);

        let url = this.url + '/api/saveContact';
        this.axios.post(url, formData).then((resp) => {
          if(resp.status){
           
           document.getElementById("name").value = "";
           document.getElementById("email").value = "";
           document.getElementById("biography").value = "";
           document.getElementById("designation").value = "";
           document.getElementById("image").value = "";
           document.getElementById("contact_no").value = "";

            this.$toast.open({
              message: "Added new data successfully!",
              type: "success",
              position: "bottom-right",
              duration: 5000,
              dismissible: false
            })
            // this.$router.push({ name: 'contacts' });

            console.log(resp);

          }else{
           this.$toast.open({
             message: "Adding new data failed!",
             type: "error",
             position: "bottom-right",
             duration: 5000,
             dismissible: false
           });
          }
        }).catch(error =>{
          this.$toast.open({
            message: "Adding new data failed!",
            type: "error",
            position: "bottom-right",
            duration: 5000,
            dismissible: false
          });
            console.log(error);
        });
      }
    },
    saveImage(e){
      this.image = e.target.files[0];
      console.log(this.image);
    }
  },
  mounted: function(){
    console.log("Ready form loaded.");
  },
  created(){
    console.log(this.url);
  }
}
</script>