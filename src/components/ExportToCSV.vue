<template>
  <v-btn
    :loading="loading"
    :disabled="loading"
    color="blue-grey"
    class="ma-2 white--text"
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
</template>

<script lang="ts">
import Vue from "vue";
import { exportJobToCSV } from "@/api/Job.api";

export default Vue.extend({
  props: {
    jobID: { type: String, required: true },
  },

  data() {
    return {
      loader: null,
      loading: false,
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
          alert("something went wrong");
        }
      );
    },
  },

  methods: {
    downloadCSV(success: any, failure: any) {
      exportJobToCSV(this.$props.jobID)
        .then((res: any) => {
          console.log(res);
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
