<template>
  <div>
    <v-dialog
      v-model="isShowDialog"
      @click:outside="closeDialog"
      max-width="350"
    >
      <v-card id="FinishJobCard" class="pt-0">
        <v-card-title class="headline"> Finish Job? </v-card-title>
        <v-card-text>
          You are about to finish and submit you labels. There are a fews things
          you can do from here.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            id="cancel-button"
            color="deep-blue lighten-2"
            text
            @click="closeDialog()"
          >
            Cancel
          </v-btn>
          <v-btn
            id="finish-button"
            color="deep-blue lighten-2"
            text
            @click="finishJob()"
          >
            Finish
          </v-btn>
          <v-btn
            id="accept-new-button"
            v-if="canAcceptNew"
            color="deep-blue lighten-2"
            text
            @click="acceptNew()"
          >
            Accept New
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <ErrorDialog
      :isShowDialog.sync="showError"
      :title="'An error occurred'"
      :message="'Please try again. If the problem persists, please contact support.'"
    />
  </div>
</template>

<script lang="ts">
import { acceptJob } from "@/api/Job.api";
import router from "@/router";
import Vue from "vue";
import { markBatchFinished, updateReward } from "@/api/Batch.api";
import ErrorDialog from "@/components/ErrorDialog.vue";

export default Vue.extend({
  name: "FinishJob",
  components: { ErrorDialog },
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
    batchID: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      showError: false,
    };
  },

  methods: {
    closeDialog(): void {
      this.$emit("update:isShowDialog", false);
    },

    markBatchCompleted(success: any, failure: any) {
      // make the api call
      markBatchFinished(this.$props.batchID)
        .then(() => {
          success();
        })
        .catch((err: any) => {
          failure(err);
        });
    },

    updateRewardAmount(success: any, failure: any) {
      // make the api call
      updateReward(this.$props.jobID)
        .then(() => {
          success();
        })
        .catch((err: any) => {
          failure(err);
        });
    },

    finishJob(): void {
      this.markBatchCompleted(
        () => {
          router.push({ name: "HomePage" });
          this.closeDialog();
          this.updateRewardAmount(
            () => {
              console.log("this worked");
            },
            (err: any) => {
              this.showError = true;
            }
          );
        },
        (err: any) => {
          this.showError = true;
        }
      );
    },
    acceptNew(): void {
      this.markBatchCompleted(
        () => {
          acceptJob(this.$props.jobID)
            .then((response) => {
              router.push({ name: "HomePage" });
              this.closeDialog();
            })
            .catch((error) => {
              console.error(error);
              this.showError = true;
              this.closeDialog();
            });
        },
        (err: any) => {
          this.showError = true;
        }
      );
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
