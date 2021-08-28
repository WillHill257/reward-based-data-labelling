<template>
  <v-card elevation="4" outlined tile height="200px">
    <!-- Title display -->
    <v-card-title class="job-title">
      {{ title }}
    </v-card-title>

    <v-card-subtitle class="job-type">
      {{ type }}
    </v-card-subtitle>

    <!-- labels available to label these images with -->
    <v-chip-group class="mx-4" active-class="primary--text" column>
      <v-col style="padding: 0 0">
        <v-chip class="pill" v-for="label in labels" :key="label" x-small>
          {{ label }}
        </v-chip>
      </v-col>
    </v-chip-group>

    <!-- description summary for the job -->
    <v-card-text class="pt-0">
      <p class="job-description clamp-lines">{{ description }}</p>
    </v-card-text>

    <!-- button to view more details -->
    <v-card-actions class="card-actions" flat>
      <v-btn class="btn-view-job" color="blue" text @click="goToJob(id)">
        View job
      </v-btn>
      <v-btn class="btn-label-job" color="blue" text @click="goToLabel(id, batchNumber)">
        Label
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
    labels: { type: Array, required: true },
    description: { type: String, required: true },
    batchNumber: { type: Number, required: true },
  },

  methods: {
    goToJob(jobId: string) {
      // view in-depth details for the job
      this.$router.push({ name: "ViewJob", params: { jobID: jobId}});
    },
    goToLabel(jobId: string, batchnumber: number) {
      // view labelling screen
      this.$router.push({ name: "LabelImages", params: { jobID: jobId, batchNumber: batchnumber.toString()}});
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
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>
