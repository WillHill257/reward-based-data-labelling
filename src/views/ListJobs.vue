<template>
  <v-app>
    <h1>Jobs</h1>

    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="job in jobs" :key="job._id">
          <JobSummaryCard
            class="card"
            :id="job._id"
            :title="job.title"
            :type="job.type"
            :description="job.description"
          ></JobSummaryCard>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<style>
.card-actions {
  position: absolute;
  bottom: 0;
}
</style>

<script>
import axios from "axios";
import Vue from "vue";
import JobSummaryCard from "@/components/JobSummaryCard";

export default Vue.extend({
  components: {
    JobSummaryCard,
  },

  data() {
    return {
      jobs: [
        { _id: "0", title: "Title", type: "Type", description: "Description" },
      ],
    };
  },
  methods: {
    getAllJobs() {
      // get all the available jobs from the server
      const config = {
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
    this.getAllJobs();
  },
});
</script>

<style scoped>
.card {
  width: 300px;
}
</style>
