<template>
  <section id="home">
    <h3>Welcome to jinx</h3>
    <router-link to="/login">Go to Login</router-link>
    <v-row class="dashboard-row" no-gutters>
      <v-col cols="12" sm="6" md="4">
        <DashboardList title="Mine" :jobs="jobs"></DashboardList>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <DashboardList title="Currently Doing" :jobs="jobs"></DashboardList>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <DashboardList title="Available" :jobs="jobs"></DashboardList>
      </v-col>
    </v-row>
  </section>
</template>

<script lang="ts">
import DashboardList from "@/components/DashboardList.vue";
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  components: { DashboardList },
  name: "Home",

  data() {
    return {
      isShowDialog: false,
      jobs: [
        {
          _id: "0",
          title: "Title",
          type: "Type",
          description: "Description",
        },
      ],
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
      Array.from(row.getElementsByClassName("recycler-view")).forEach(
        (item: any) => {
          item.style.height = 0.9 * (screenHeight - rowTop) + "px";
        }
      );
    },

    getAllJobs() {
      // get all the available jobs from the server
      const config: any = {
        method: "get",
        url: "http://localhost:4000/api/job",
        headers: {},
      };

      axios(config)
        .then((response) => {
          this.jobs = response.data;
          for (let i = 0; i < this.jobs.length; i++) {
            this.jobs[i].type = "Image";
          }
          // console.log(JSON.stringify(response.data));
          // console.log(this.jobs);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  mounted() {
    this.determinListHeight();
    this.getAllJobs();
  },
});
</script>

<style scoped>
#home {
  max-height: 90vh;
}
</style>
