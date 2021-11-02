<template>
  <div>
    <v-dialog
      v-model="isShowDialog"
      @click:outside="closeDialog"
      max-width="350"
      class="confirm-download-csv-dialog"
    >
      <v-card id="ConfirmDownloadCSV" class="pt-0">
        <v-card-title class="headline justify-center">
          Download CSV?
        </v-card-title>

        <v-card-text>
          This job has not yet been completed. The assigned labels may not be
          accurate or reliable.
        </v-card-text>
        <v-card-text> Are you sure you want to proceed? </v-card-text>
        <v-card-actions>
          <v-btn
            id="close-confirm-download"
            color="red"
            text
            @click="closeDialog()"
          >
            <v-icon left> mdi-close </v-icon>
            No
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            id="confirm-download"
            class="ma-2"
            color="green"
            text
            @click="downloadCSV()"
          >
            <v-icon left> mdi-check </v-icon>
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ConfirmDownloadCSV",
  props: {
    isShowDialog: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    closeDialog(): void {
      this.$emit("update:isShowDialog", false);
      this.$emit("close-confirm-dialog");
    },

    downloadCSV(): void {
      this.$emit("download-comfirmed");
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
