<template>
  <!-- width="300px" -->
  <v-card elevation="4" outlined tile height="200px">
    <v-card-title class="job-title">
      {{ title }}
    </v-card-title>

    <v-card-subtitle class="job-type">
      {{ type }}
    </v-card-subtitle>

    <v-card-text>
      <p class="job-description clamp-lines">{{ description }}</p>
    </v-card-text>

    <v-card-actions class="card-actions" flat>
      <v-btn class="btn-view-job" color="blue" text @click="goToJob(id)">
        View job
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    id: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
  },

  methods: {
    goToJob(jobId: string) {
      // view in-depth details for the job
      this.$router.push({ name: "ViewJob", params: { jobID: jobId } });
    },
  },
});
</script>

<style scoped>
.clamp-lines {
  /* This will limit the number of lines shown */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>
