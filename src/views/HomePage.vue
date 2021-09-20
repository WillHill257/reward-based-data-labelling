<template>
  <section id="home">
    <h3>Welcome to jinx</h3>
    <!-- <router-link to="/login">Go to Login</router-link> -->
    <v-spacer></v-spacer>
    <section>
      <v-card :max-width="width">
        <v-toolbar color="white" dark flat>
          <v-app-bar-nav-icon color="cyan"></v-app-bar-nav-icon>

          <v-toolbar-title>Your Dashboard</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon color="cyan">mdi-magnify</v-icon>
          </v-btn>
        </v-toolbar>
        <v-tabs id="dashboard-tabs" v-model="tab" align-with-title>
          <v-tabs-slider color="cyan"></v-tabs-slider>

          <v-tab id="authored-tab" style="color: black">Mine</v-tab>
          <v-tab-item>
            <DashboardList
              class="authored"
              title="Mine"
              :jobs="authored"
              endpoint="authored"
            ></DashboardList>
          </v-tab-item>

          <v-tab id="accepted-tab" style="color: black">Currently Doing</v-tab>
          <v-tab-item>
            <DashboardList
              class="accepted"
              title="Currently Doing"
              :jobs="accepted"
              endpoint="accepted"
            ></DashboardList>
          </v-tab-item>

          <v-tab id="available-tab" style="color: black">Available</v-tab>
          <v-tab-item>
            <DashboardList
              class="available"
              title="Available"
              :jobs="available"
              endpoint="available"
            ></DashboardList>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </section>
  </section>
</template>

<script lang="ts">
import DashboardList from "@/components/DashboardList.vue";
import Vue from "vue";
import {
  getAvailableJobs,
  getAuthoredJobs,
  getAcceptedJobs,
} from "@/api/Job.api";

export default Vue.extend({
  components: { DashboardList },
  name: "Home",
  computed: {
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "100%";
        case "sm":
          return "100%";
        case "md":
          return "50%";
        case "lg":
          return "50%";
        case "xl":
          return "50%";
      }
      return "50%";
    },
  },
  data() {
    return {
      tab: null,
      isShowDialog: false,
      //dummy data for initial screen when database is empty
      accepted: [
        {
          _id: "0",
          title: "Title",
          type: "Type",
          description: "Description",
          labels: ["a", "b"],
        },
      ],
      authored: [
        {
          _id: "0",
          title: "Title",
          type: "Type",
          description: "Description",
          labels: ["a", "b"],
        },
      ],
      available: [
        {
          _id: "0",
          title: "Title",
          type: "Type",
          description: "Description",
          labels: ["a", "b"],
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

    // determineListHeight(): void {
    //   // determine top of dashboard row
    //   const row: Element = document.getElementsByClassName("dashboard-row")[0];
    //   const rowTop: number = row.getBoundingClientRect().top;

    //   // determine height of screen
    //   const screenHeight: number = this.determineViewportHeight();

    //   // set the height of these lists
    //   Array.from(row.getElementsByClassName("recycler-view")).forEach(
    //     (item: any) => {
    //       item.style.height = 0.9 * (screenHeight - rowTop) + "px";
    //     }
    //   );
    // },

    handleResponseList(list: Array<any>) {
      // assign the job data type
      for (let i = 0; i < list.length; i++) {
        list[i].type = "Image";
      }

      return list;
    },
  },

  mounted() {
    //this.determineListHeight();
    console.log("authored");

    //filters and returns available jobs (those that are not full)
    getAvailableJobs().then((response: any) => {
      this.available = this.handleResponseList(response.data);
      console.log(this.available);
    });

    //filters and returns jobs accepted by currently logged in user
    getAcceptedJobs().then((response: any) => {
      this.accepted = this.handleResponseList(response.data);
      console.log(this.accepted);
    });

    //filters and returns jobs that were created by currently logged in user
    getAuthoredJobs().then((response: any) => {
      this.authored = this.handleResponseList(response.data);
      console.log(this.authored);
    });
  },
});
</script>

<style scoped>
#home {
  max-height: 90vh;
}

.basic-grid {
  /* define a grid layout */
  display: grid;
  gap: 1rem;

  align-items: center;
  justify-items: center;

  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
}

@media (min-width: 1264px) {
  .basic-grid {
    /* add padding to prevent the grid becoming too wide on large screens */
    padding-left: 10rem;
    padding-right: 10rem;
  }
}
</style>
