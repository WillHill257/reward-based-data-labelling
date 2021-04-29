<template>
  <v-dialog width="80%" v-model="isShowDialog" @click:outside="closeDialog">
    <v-card id="createJobCard">
      <v-row justify="center" align="center" no-gutters>
        <v-col> <ImageUploader :onFilesUploaded="onFilesUploaded" /></v-col>
        <v-col>
<!--          <v-alert-->
<!--            :style="{ visibility: errorVisibility }"-->
<!--            :height="errorHeight"-->
<!--            dense-->
<!--            dismissible-->
<!--            outlined-->
<!--            type="warning"-->
<!--          >{{ errorMessage}}</v-alert-->
<!--          >-->
          <v-text-field v-model="title" label="Title" id="title-input">
          </v-text-field>

          <v-textarea
            v-model="description"
            label="Description"
            id="description-input"
          >
          </v-textarea>

          <v-card-actions style="padding-top: 25%">
            <v-btn color="green" id="submit-input" v-on:click.native="onSubmitClicked"
              >Submit</v-btn>
            <v-btn color="grey" id="discard-input" v-on:click.native="closeDialog">Discard</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import ImageUploader from "./components/ImageUploader.vue";

export default Vue.extend({
  name: "CreateJob",
  components: { ImageUploader },
  data() {
    return {
      title: "",
      description: "",
      filesUploaded: [] as File[],
      errorMessage:  "",
      errorHeight: 0,
      errorVisibility: "Hidden",
    };
  },

  props: {
    isShowDialog: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    closeDialog(): void {
      this.$emit("update:isShowDialog", false);
      this.title = "";
      this.description = "";
      this.filesUploaded = [];
    },
    onSubmitClicked: function() {
      if(this.title == "") {
        this.errorMessage = "Title required";
      }
      else if(this.description == "") {
        this.errorMessage = "Description required";
      }
      else if(this.filesUploaded.length ==0) {
        this.errorMessage = "No files to upload";
      }
      else
      {
        return
      }
      this.errorVisibility = "visible";
      this.errorHeight = 40;
    },
    onFilesUploaded(file: File): void {
      this.filesUploaded.push(file);
    },
  }
});
</script>
<style scoped>
#createJobCard {
  padding: 2%;
}
</style>
