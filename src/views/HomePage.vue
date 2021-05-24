<template>
  <section id="home">
    <h3>Welcome to jinx</h3>
    <router-link to="/login">Go to Login</router-link>

    <section class="dashboard-row basic-grid">
      <DashboardList
        class="authored"
        title="Mine"
        :jobs="authored"
        endpoint="authored"
      ></DashboardList>
      <DashboardList
        class="accepted"
        title="Currently Doing"
        :jobs="accepted"
        endpoint="accepted"
      ></DashboardList>
      <DashboardList
        class="available"
        title="Available"
        :jobs="available"
        endpoint="available"
      ></DashboardList>
    </section>
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

    getAllJobs(userId: string, endpoint: string) {
      // get all the available jobs from the server
      const config: any = {
        method: "get",
        url: "http://localhost:4000/api/job/" + endpoint + "/" + userId,
        headers: {},
      };

      axios(config)
        .then((response) => {
          let temp: Array<any>;

          temp = response.data;
          for (let i = 0; i < temp.length; i++) {
            temp[i].type = "Image";
          }

          if (endpoint === "available") this.available = temp;
          else if (endpoint === "authored") this.authored = temp;
          else this.accepted = temp;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  mounted() {
    this.determinListHeight();
    const id = "60a62a9fab8896534b7a8d23";
    this.getAllJobs(id, "available");
    this.getAllJobs(id, "authored");
    this.getAllJobs(id, "accepted");
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
