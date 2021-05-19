<template>
  <v-container>
    <v-list>
      <!-- Title -->
      <h3 class="title">{{ title }}</h3>
      <!-- Content -->
      <!-- Scrollable list of job cards -->
      <!-- Ends with button to view all -->
      <!-- Height is set in dashboard -->
      <v-virtual-scroll
        class="recycler-view"
        :items="items"
        :bench="1"
        item-height="210"
      >
        <template v-slot:default="{ item }">
          <JobSummaryCard
            class="job-card"
            :id="item._id"
            :title="item.title"
            :type="item.type"
            :description="item.description"
          ></JobSummaryCard>
        </template>
      </v-virtual-scroll>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import JobSummaryCard from "./JobSummaryCard.vue";
import axios from "axios";

export default Vue.extend({
  components: { JobSummaryCard },
  data() {
    return {
      jobs: [
        { _id: "0", title: "Title", type: "Type", description: "Description" },
        { _id: "0", title: "Title", type: "Type", description: "Description" },
        { _id: "0", title: "Title", type: "Type", description: "Description" },
        { _id: "0", title: "Title", type: "Type", description: "Description" },
        { _id: "0", title: "Title", type: "Type", description: "Description" },
      ],
    };
  },
  props: {
    title: { type: String, required: true },
  },
  computed: {
    items(): Array<any> {
      // return Array.from({ length: 5 }, (k, v) => v + 1);
      return this.jobs;
    },
  },
  methods: {
    async getAllJobs() {
      // get all the available jobs from the server
      const config: any = {
        method: "get",
        url: "http://localhost:4000/api/job",
        headers: {},
      };

      const response = await axios(config);
      // .then((response) => {
      this.jobs = response.data;
      for (let i = 0; i < this.jobs.length; i++) {
        this.jobs[i].type = "Image";
      }
      // console.log(JSON.stringify(response.data));
      // console.log(this.jobs);
      // })
      // .catch(function (error) {
      // console.log(error);
      // });
    },
    mounted() {
      this.getAllJobs();
    },
  },
});
</script>

<style scoped>
.title {
  text-align: center;
}

.recycler-view {
  padding-top: 10px;
}

.job-card {
  width: 98%;
  margin: auto;
}
</style>
