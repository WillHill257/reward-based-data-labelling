<template>
  <!-- <span class="go-back"> -->
  <v-btn @click="goBack" left id="backbutton">
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn>
  <!-- </span> -->
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  methods: {
    goBack() {
      return this.$router.go(-1); //when the button is clicked the the user will go to the last route on the route history stack
    },
  },
});
</script>
