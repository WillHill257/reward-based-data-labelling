<template>
  <v-card elevation="4" outlined tile height="200px">
    <!-- Title display -->
    <v-card-title class="job-title">
      {{ title }}
      <v-spacer></v-spacer>
      <JobTimer 
      v-if= "batchID != undefined" 
            :batchID="batchID"
        />
      
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

    <v-card-actions class="card-actions" flat>
      <!-- button to view more details -->
      <v-btn class="btn-view-job" color="blue" text @click="goToJob(id)">
        View job
      </v-btn>

      <!-- button to begin/continue labelling job -->
      <v-btn
        v-if="canLabel"
        class="btn-label-job"
        color="blue"
        text
        @click="goToLabel(id, batchID)"
      >
        Label
      </v-btn>

      <!-- button to quit/leave labelling job -->
      <v-btn
        v-if="canLabel"
        class="btn-quit-job"
        color="blue"
        text
        @click="quitJob"
      >
        <v-icon left> mdi-minus-circle </v-icon>Quit Job
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { deleteLabeller } from "@/api/Batch.api";
import Vue from "vue";
import JobTimer from "@/components/JobTimer.vue";
export default Vue.extend({
  components:{JobTimer},
  props: {
    id: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    labels: { type: Array, required: true },
    description: { type: String, required: true },
    batchID: { type: String, required: true },
  },
  

  computed: {
    canLabel() {
      // the batchID is only going to be set for the 'Accepted' jobs, otherwise it will be undefined
      // we only want to be able to label the accepted batches
      return this.$props.batchID !== undefined;
    },
  },

  methods: {
    goToJob(jobId: string) {
      // view in-depth details for the job
      this.$router.push({ name: "ViewJob", params: { jobID: jobId } });
    },
    goToLabel(jobId: string, batchId: string) {
      // view labelling screen
      this.$router.push({
        name: "LabelImages",
        params: { jobID: jobId, batchID: batchId },
      });
    },
    //leave the labelling job
    quitJob() {
      deleteLabeller(this.batchID)
        .then(() => {
          location.reload();
        })
        .catch((err: any) => {
          alert("Something went wrong. Please contact support...");
        });
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
