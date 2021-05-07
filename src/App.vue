<template>
  <v-app>
    <AppBar />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AppBar from "./components/AppBar.vue";

export default Vue.extend({
  //import the app bar here because we want it to be in all the pages while only importing it once.
  name: "App",
  components: {
    AppBar,
  },
});
</script>