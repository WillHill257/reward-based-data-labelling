<template>
  <div>
    <v-btn
      :loading="loading"
      :disabled="loading"
      color="primary"
      class="export-button ma-2 white--text"
      @click.native="loader = 'loading'"
    >
      Export to CSV
      <v-icon right dark> mdi-cloud-download </v-icon>
      <template v-slot:loader>
        <span class="loading-symbol">
          <v-icon light>mdi-cached</v-icon>
        </span>
      </template>
    </v-btn>
    <ErrorDialog
      :isShowDialog.sync="isShowDialog"
      :title="'An error occurred'"
      :message="'Please try again. If the problem persists, please contact support.'"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { exportJobToCSV } from "@/api/Job.api";
import ErrorDialog from "./ErrorDialog.vue";

export default Vue.extend({
  components: { ErrorDialog },
  props: {
    jobID: { type: String, required: true },
  },

  data() {
    return {
      loader: null,
      loading: false,
      isShowDialog: false,
    };
  },

  watch: {
    loader() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.loader = null;

      this.downloadCSV(
        () => {
          this.loading = false;
        },
        () => {
          this.loading = false;
          this.isShowDialog = true;
        }
      );
    },
  },

  methods: {
    downloadCSV(success: any, failure: any) {
      exportJobToCSV(this.$props.jobID)
        .then((res: any) => {
          // Then, create a hidden element and automatically download the file.
          const hiddenElement = document.createElement("a");
          hiddenElement.href =
            "data:text/csv;charset=utf-8," + encodeURI(res.data);
          hiddenElement.target = "_blank";
          hiddenElement.download = this.$props.jobID + ".csv";
          hiddenElement.click();

          success();
        })
        .catch((err: any) => {
          console.error(err);
          failure();
        });
    },
  },
});
</script>

<style scoped>
.loading-symbol {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
