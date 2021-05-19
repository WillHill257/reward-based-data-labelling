<template>
  <section id="home">
    <h3>Welcome to jinx</h3>
    <router-link to="/login">Go to Login</router-link>
    <v-row class="dashboard-row" no-gutters>
      <v-col cols="12" sm="6" md="4">
        <DashboardList title="Test 1"></DashboardList>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <DashboardList title="Test 2"></DashboardList>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <DashboardList title="Test 3"></DashboardList>
      </v-col>
    </v-row>
  </section>
</template>

<script lang="ts">
import DashboardList from "@/components/DashboardList.vue";
import Vue from "vue";

export default Vue.extend({
  components: { DashboardList },
  name: "Home",

  data() {
    return {
      isShowDialog: false,
    };
  },

  methods: {
    determineViewportHeight(): number {
      return Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
    },

    determinListHeight(): void {
      // determine top of dashboard row
      const row: Element = document.getElementsByClassName("dashboard-row")[0];
      const rowTop: number = row.getBoundingClientRect().top;

      // determine height of screen
      const screenHeight: number = this.determineViewportHeight();

      // set the height of these lists
      console.log(rowTop, screenHeight, 0.9 * (screenHeight - rowTop));
      Array.from(row.getElementsByClassName("recycler-view")).forEach(
        (item: any) => {
          console.log(item);
          item.style.height = 0.9 * (screenHeight - rowTop) + "px";
        }
      );
    },
  },

  mounted() {
    this.determinListHeight();
  },
});
</script>

<style scoped>
#home {
  max-height: 90vh;
}
</style>
