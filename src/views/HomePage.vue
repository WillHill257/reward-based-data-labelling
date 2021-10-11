<template>
  <section id="home">
    <v-spacer></v-spacer>
    <section>
      <v-row class="flex-row-reverse">
        <v-col class="col-xl-3 col-lg-3 col-md-3">
          <v-card>
            <v-card-text id="user-greeting">
              <!-- Hello username -->
              Hello, {{ firstName }}!
            </v-card-text>
            <v-card-text id="heading" class="pt-0 pb-0">
              <!-- Hello username -->
              Your available rewards
            </v-card-text>
            <v-card-title
              id="available-rewards"
              class="font-weight-black headline pt-0"
              style="font-size: 10em"
            >
              <!-- Your available rewards -->
              {{ rewardRounded(rewardCount) }}
            </v-card-title>
            <Leaderboard />
          </v-card>
        </v-col>
        <v-col class="col-xl-9 col-lg-9 col-md-9">
          <v-card id="dashboard-tabs">
            <v-toolbar color="white" dark flat>
              <v-app-bar-nav-icon color="cyan"></v-app-bar-nav-icon>

              <v-toolbar-title>Your Dashboard</v-toolbar-title>

              <v-spacer></v-spacer>

              <!-- <v-btn icon>
                <v-icon color="cyan">mdi-magnify</v-icon>
              </v-btn> -->
            </v-toolbar>
            <v-tabs v-model="tab" align-with-title>
              <v-tabs-slider color="cyan"></v-tabs-slider>

              <v-tab style="color: black">Mine</v-tab>
              <v-tab-item>
                <DashboardList
                  class="authored"
                  title="Mine"
                  :jobs="authored"
                  endpoint="authored"
                ></DashboardList>
              </v-tab-item>

              <v-tab style="color: black">Currently Doing</v-tab>
              <v-tab-item>
                <DashboardList
                  class="accepted"
                  title="Currently Doing"
                  :jobs="accepted"
                  endpoint="accepted"
                ></DashboardList>
              </v-tab-item>

              <v-tab style="color: black">Available</v-tab>
              <v-tab-item>
                <DashboardList
                  class="available"
                  title="Available"
                  :jobs="available"
                  endpoint="available"
                ></DashboardList>
              </v-tab-item>

              <v-tab style="color: black">Completed</v-tab>
              <v-tab-item>
                <DashboardList
                  class="completed"
                  title="Completed"
                  :jobs="completed"
                  endpoint="completed"
                ></DashboardList>
              </v-tab-item>
            </v-tabs>
          </v-card>
        </v-col>
      </v-row>
    </section>
  </section>
</template>

<script lang="ts">
import DashboardList from "@/components/DashboardList.vue";
import Leaderboard from "@/components/Leaderboard.vue";
import Vue from "vue";
import {
  getAvailableJobs,
  getAuthoredJobs,
  getAcceptedJobs,
  getCompletedJobs,
} from "@/api/Job.api";
import { getUser } from "@/api/Users.api";

export default Vue.extend({
  components: { DashboardList, Leaderboard },
  name: "Home",

  data() {
    return {
      tab: null,
      isShowDialog: false,
      firstName: "",
      rewardCount: "",
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
      completed: [
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
    handleResponseList(list: Array<any>) {
      // assign the job data type
      for (let i = 0; i < list.length; i++) {
        list[i].type = "Image";
      }

      return list;
    },

    rewardRounded(num: number) {
      return Number(num).toFixed();
    },
  },

  mounted() {
    //filters and returns available jobs (those that are not full)
    getAvailableJobs()
      .then((response: any) => {
        this.available = this.handleResponseList(response.data);
      })
      .catch((error: any) => {
        console.error(error);
      });

    //filters and returns jobs accepted by currently logged in user
    getAcceptedJobs()
      .then((response: any) => {
        this.accepted = this.handleResponseList(response.data);
      })
      .catch((error: any) => {
        console.error(error);
      });

    getCompletedJobs()
      .then((response: any) => {
        this.completed = this.handleResponseList(response.data);
      })
      .catch((error: any) => {
        console.error(error);
      });

    //filters and returns jobs that were created by currently logged in user
    getAuthoredJobs()
      .then((response: any) => {
        this.authored = this.handleResponseList(response.data);
      })
      .catch((error: any) => {
        console.error(error);
      });

    getUser()
      .then((res: any) => {
        this.firstName = res.data.firstName;
        this.rewardCount = res.data.rewardCount;
      })
      .catch((err: any) => {
        console.error(err);
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
