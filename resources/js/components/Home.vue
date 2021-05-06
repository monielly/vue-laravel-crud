<template>
<div class="container mt-5">
  <v-skeleton-loader
    class="mx-auto"
    max-width="100%"
    type="card"
  ></v-skeleton-loader>
</div>  
</template>

<script>
export default {
  name: 'Home',
  inject: {
    theme: {
      default: { isDark: false },
      //another....
    }
  }
}
</script>