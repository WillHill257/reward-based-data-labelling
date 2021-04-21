<template>
  <div class="home">
    <h1>Welcome to jinx</h1>
    <h3> This is your dashboard</h3>
    <router-link to="/login">Go to Login</router-link>
    <v-btn @click="isShowDialog = true" icon>
      <v-icon size="30">mdi-plus</v-icon>
    </v-btn>
    <CreateJob :isShowDialog.sync="isShowDialog" />
  </div>
</template>


<script>
import CreateJob from "@/components/CreateJob/CreateJob";

export default {
  name: "Home",

  components: { CreateJob },
  data() {
    return {
      isShowDialog: false
    };
  }
};
</script>