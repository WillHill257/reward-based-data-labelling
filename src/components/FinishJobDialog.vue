<template>
  <v-dialog v-model="isShowDialog" @click:outside="closeDialog" max-width="350">
    <v-card id="FinishJobCard" class="pt-0">
      <v-card-title class="headline"> Finish Job? </v-card-title>
      <v-card-text>
        You are about to finish and submit you labels. There are a fews things
        you can do from here.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="deep-blue lighten-2" text @click="closeDialog">
          Cancel
        </v-btn>
        <v-btn color="deep-blue lighten-2" text @click="finishJob">
          Finish
        </v-btn>
        <v-btn
          v-if="canAcceptNew"
          color="deep-blue lighten-2"
          text
          @click="acceptNew"
        >
          Accept New
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { acceptJob } from "@/api/Job.api";
import router from "@/router";
import Vue from "vue";
export default Vue.extend({
  name: "FinishJob",
  props: {
    isShowDialog: {
      type: Boolean,
      required: true,
    },

    canAcceptNew: {
      type: Boolean,
      required: true,
    },
    jobID: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeDialog(): void {
      this.$emit("update:isShowDialog", false);
    },
    finishJob(): void {
      router.push({ name: "HomePage" });
      this.closeDialog();
    },
    acceptNew(): void {
      acceptJob(this.$props.jobID)
        .then((response) => {
          router.push({ name: "HomePage" });
          this.closeDialog();
        })
        .catch((error) => {
          console.log(error);
          alert("Oops something has gone wrong! \n Please try again later");
          this.closeDialog();
        });
    },
  },
});
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
