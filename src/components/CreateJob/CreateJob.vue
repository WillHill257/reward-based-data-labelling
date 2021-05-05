<template>
  <v-dialog width="80%" v-model="isShowDialog" @click:outside="closeDialog">
    <v-card id="createJobCard">
      <form @submit.prevent="onSubmitClicked" enctype="multipart/form-data">
        <v-row justify="center" align="center" no-gutters>
          <v-col align="start" class="mx-2">
            <ImageUploader
              v-bind:filesUploaded="filesUploaded"
              :onFilesUploaded="onFilesUploaded"
            />

            <v-list dense id="image-list" class="mt-1">
              <v-list-item v-for="(file, i) in filesUploaded" :key="i">
                <v-list-item-icon>
                  <v-icon>mdi-file-image</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="file.name"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>

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
              <v-btn color="green" id="submit-input" type="submit">
                Submit
              </v-btn>
              <v-btn
                color="grey"
                id="discard-input"
                v-on:click.native="closeDialog"
              >
                Discard
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </form>
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
      errorMessage: "",
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
    onSubmitClicked: function () {
      // checks if all fields are filled

      // if (this.title == "") {
      //   this.errorMessage = "Title required";
      // } else if (this.description == "") {
      //   this.errorMessage = "Description required";
      // } else if (this.filesUploaded.length == 0) {
      //   this.errorMessage = "No files to upload";
      // } else {
      //   return;
      // }

      let formData = new FormData();
      for (var i in this.filesUploaded) {
        let file = this.filesUploaded[i];
        formData.append("image", file);
      }

      this.errorVisibility = "visible";
      this.errorHeight = 40;

      const url = "http://localhost:4000/api/images/upload";
      this.axios
        .post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onFilesUploaded(file: File): void {
      this.filesUploaded.push(file);
    },
  },
});
</script>
<style scoped>
#createJobCard {
  padding: 2%;
}
#image-list {
  height: 200px; /* or any height you want */
  overflow-y: auto;
}
</style>
