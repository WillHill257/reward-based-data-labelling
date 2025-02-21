<template>
  <v-card elevation="4" outlined tile height="200px">
    <!-- Title display -->
    <v-card-title class="job-title">
      {{ title }}
      <v-spacer></v-spacer>
      <JobTimer
        class="txtTimer"
        v-if="batchID !== 'undefined'"
        :batchID="batchID"
      />
    </v-card-title>
    <v-card-subtitle class="job-type">
      {{ type }}
    </v-card-subtitle>

    <!-- labels available to label these images with -->
    <v-chip-group class="jsc-label-group mx-4" mobile-breakpoint="5000">
      <v-chip class="pill" v-for="label in labels" :key="label" x-small>
        {{ label }}
      </v-chip>
    </v-chip-group>

    <!-- description summary for the job -->
    <v-card-text class="pt-0">
      <p class="job-description clamp-lines">{{ description }}</p>
    </v-card-text>

    <v-progress-circular
      class="progress"
      v-if="isMine"
      id="jobProgress"
      rotate="-90"
      size="60"
      width="5"
      :value="calcProgress()"
    >
      {{ calcProgress() }}%
    </v-progress-circular>

    <v-card-actions class="card-actions" flat>
      <!-- button to view more details -->
      <v-row style="margin-bottom: 5%">
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
        <v-btn
          v-if="isMine"
          id="btn-job-results"
          color="blue"
          text
          @click="gotToResults(id)"
        >
          Results
        </v-btn>

        <!-- button to quit/leave labelling job -->

        <v-btn
          v-if="canLabel && $vuetify.breakpoint.smAndDown"
          class="btn-quit-job"
          color="blue"
          text
          @click="quitJob"
        >
          <v-icon left> mdi-minus-circle </v-icon>Quit
        </v-btn>

        <v-btn
          v-if="canLabel && $vuetify.breakpoint.mdAndUp"
          class="btn-quit-job"
          color="blue"
          text
          @click="quitJob"
        >
          <v-icon left> mdi-minus-circle </v-icon>Quit Job
        </v-btn>
      </v-row>
    </v-card-actions>
    <QuitJobDialog :isShowDialog.sync="isShowDialog" :batchID="batchID" />
  </v-card>
</template>

<script lang="ts">
// import { deleteLabeller } from "@/api/Batch.api";
import QuitJobDialog from "@/components/QuitJobDialog.vue";

import Vue from "vue";
import JobTimer from "@/components/JobTimer.vue";
import { getprogress } from "@/api/Batch.api";
export default Vue.extend({
  components: { JobTimer, QuitJobDialog },

  props: {
    id: { type: String, required: true },
    title: { type: String, required: true },
    type: { type: String, required: true },
    labels: { type: Array, required: true },
    description: { type: String, required: true },
    batchID: { type: String, required: true },
    isMine: { type: Boolean, required: true },
  },

  data() {
    return {
      isShowDialog: false,
      progressValue: 0,
    };
  },

  computed: {
    canLabel() {
      // the batchID is only going to be set for the 'Accepted' jobs, otherwise it will be undefined
      // we only want to be able to label the accepted batches
      return this.$props.batchID !== "undefined";
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
    gotToResults(jobID: string) {
      this.$router.push({
        name: "jobResults",
        params: { jobID: jobID, progress: this.calcProgress() },
      });
    },

    //leave the labelling job
    quitJob() {
      this.isShowDialog = true;
    },

    calcProgress() {
      if (this.id === "0") return "0";
      getprogress(this.id).then((response: any) => {
        this.progressValue = Math.round(response.data[0].progress);
        //this.progressValue = val.toString();
      });
      var value = JSON.stringify(this.progressValue);
      return value;
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
  -webkit-line-clamp: 1; /* number of lines to show */
  -webkit-box-orient: vertical;
}

.progress {
  position: absolute;
  right: 5%;
  top: 10%;
  transform: translateY(-10%);
}
</style>

<style>
.jsc-label-group .v-slide-group__wrapper {
  overflow: scroll !important;
}
.jsc-label-group .v-slide-group__wrapper::-webkit-scrollbar {
  display: none;
}
</style>
