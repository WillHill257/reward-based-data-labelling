<template>
  <v-app>
    <h1>Jobs</h1>

    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="job in jobs" :key="job._id">
          <v-card elevation="5" width="300px" height="200px">
            <v-card-title id="job-title">
              {{ job.title }}
            </v-card-title>

            <v-card-subtitle class = "pb-0" id="job-type">
              {{ job.type }}
            </v-card-subtitle>

            <v-chip-group class="mx-4" active-class="primary--text" column>
              <v-col style="padding: 0 0">
                <v-chip
                  class="pill"
                  v-for="label in job.labels"
                  :key="label"
                  x-small
                >
                  {{ label }}
                </v-chip>
                  </v-col>
            </v-chip-group>

            <v-card-text class = "pt-0">
              <v-clamp id="job-description" autoresize :max-lines="2">{{
                job.description
              }}</v-clamp>
            </v-card-text>

            <v-card-actions class="card-actions" flat>
              <v-btn
                id="btn-view-job"
                color="blue"
                text
                @click="goToJob(job._id)"
              >
                View job
              </v-btn>
            </v-card-actions>
          </v-card>
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
import VClamp from "vue-clamp";
import axios from "axios";
import Vue from "vue";
export default Vue.extend({
  components: {
    VClamp,
  },
  data() {
    return {
      jobs: [
        { _id: "0", title: "Title", type: "Type", description: "Description", labels: "Labels" },
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

    goToJob(jobId) {
      this.$router.push({ name: "ViewJob", params: { jobID: jobId } });
    },
  },
  mounted() {
    this.getAllJobs();
  },
});
</script>
