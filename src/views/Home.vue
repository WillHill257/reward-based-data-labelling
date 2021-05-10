<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <router-link to="/about">Go to about</router-link>
    <router-link to="/login">Go to Login</router-link>
    <router-link to="/landing">Go to landing Page</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({})
export default class Home extends Vue {}
</script>


<style scoped>
a{
  display: block;
}
</style>