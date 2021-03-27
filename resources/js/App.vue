<template>
  <div>
    <Sidebar />
    <br>
    <router-view />
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar";
export default {
  name: 'app',
  components: {
    Sidebar
  }
}
</script>