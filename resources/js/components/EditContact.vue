<template>
<div class="container">
  <h2 class="text-center p-2 text-white bg-primary mt-5">Add Contact</h2>
  <div class="card-body">
    <div class="col-md-6 offset-md-3" style="padding: 10px; background-color: #d5d5d5;">
      <form id="validateForm"
            @submit.prevent="updateContact"
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
                id="bio" 
                placeholder="Enter Biography..."
                cols="20"
                rows="5"
                class="form-control"
                v-model="contact.bio"
          >
          </textarea>
         </div>
         <br>
         <div class="form-group"
          v-if="contact.image"
         >
          <img :src="`${url + '/'+contact.image}`"
               alt=""
               width="150"
               height="auto"
          >
         </div>
          <div class="form-group">
            <label for="">File</label>
            <div class="custom-file form-control">
              <input type="file" 
                id="image" 
                class="custom-file-input"
                placeholder="Enter Biography..."
                v-on:change="onImageChange"
              >
            </div>
          </div>  
         <div class="form-group">
           <button class="btn btn-primary mt-4">
            Save
           </button>
           <router-link :to="`/contacts`" class="btn btn-sm mt-4">
            Cancel
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
      bio: '',
      designation: '',
      contact_no: '',
      image: ''
    }
  },
  created() {
    this.editContact();
  },
  mounted: function(){
    console.log("Ready form loaded.");
  },
  methods: {
    editContact(){
      let url = this.url + `/api/editContact/${this.$route.params.id}`;
      this.axios.get(url).then((resp) =>{
        this.contact = resp.data;
      });
    },
    updateContact(){
        let formData = new FormData();
        formData.append('name', this.contact.name);
        formData.append('email', this.contact.email);
        formData.append('biography', this.contact.bio);
        formData.append('designation', this.contact.designation);
        formData.append('image', this.image);
        formData.append('contact_no', this.contact.contact_no);

        let url = this.url + `/api/updateContact/${this.$route.params.id}`;
        this.axios.post(url, formData).then((resp) => {
          if(resp.status){
            
            this.$toast.open({
              message: "Updating data successfully!",
              type: "success",
              position: "bottom-right",
              duration: 5000,
              dismissible: false
            })
            this.$router.push({
               name: 'contacts' 
            });

            console.log(resp);

          }else{
           this.$toast.open({
             message: "Updating data failed!",
             type: "error",
             position: "bottom-right",
             duration: 5000,
             dismissible: false
           });
          }
        }).catch(error =>{
          this.$toast.open({
            message: "Updating data failed!",
            type: "error",
            position: "bottom-right",
            duration: 5000,
            dismissible: false
          });
            console.log(error);
        });
    },
    onImageChange(e){
      this.image = e.target.files[0];
      console.log(this.image);
    }
  }
}
</script>