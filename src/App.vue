<template>
  <v-app>
    <AppBar />
    <v-main>
      <v-container fluid>
        <v-btn
          v-scroll="onScroll"
          v-scroll:#app="onScroll"
          v-show="fab"
          fab
          dark
          fixed
          bottom
          right
          color="primary"
          @click="toTop"
        >
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
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
  data: () => ({
    fab: false,
  }),

  methods: {
    onScroll(e: any) {
      console.log("here");

      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
});
</script>

<style scoped>
#app {
  overflow-x: hidden;
}
</style>
