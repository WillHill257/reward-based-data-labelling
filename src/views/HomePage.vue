<template>
  <div class="home">
    <h1>Welcome to jinx</h1>
    <h3>This is your dashboard</h3>
    <router-link to="/login">Go to Login</router-link>
  </div>
</template>

<script>
import CreateJob from "@/components/CreateJob/CreateJob";
import Vue from "vue";

export default Vue.extend({
  name: "Home",

  // components: { CreateJob },
  data() {
    return {
      isShowDialog: false,
    };
  },
});
</script>
