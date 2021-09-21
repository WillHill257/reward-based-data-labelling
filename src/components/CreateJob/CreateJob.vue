<template>
  <v-dialog width="80%" v-model="isShowDialog" @click:outside="closeDialog">
    <v-card id="createJobCard" class="pt-0">
      <form @submit.prevent enctype="multipart/form-data" class="pt-0 pb-0">
        <v-row justify="center" align="center" no-gutters>
          <v-col align="start" class="mx-2">
            <ImageUploader
              v-bind:filesUploaded="filesUploaded"
              :onFilesUploaded="onFilesUploaded"
              v-on:filetypeerror="onFileTypeError"
            />

            <v-list dense id="image-list" class="mt-1">
              <v-list-item v-for="(file, i) in filesUploaded" :key="i">
                <v-list-item-icon>
                  <v-icon>mdi-file-image</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="file.name"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon @click="removeItem(i)"> mdi-close</v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-col>

          <v-col>
            <!--Error messages displayed in this component-->
            <v-alert
              :style="{ visibility: errorVisibility }"
              dense
              dismissible
              outlined
              type="warning"
              class="pb-0"
            >
              {{ errorMessage }}
            </v-alert>

            <!-- Title input field-->
            <v-text-field v-model="title" label="Title" id="title-input">
            </v-text-field>

            <!--Description input field-->
            <v-textarea
              v-model="description"
              label="Description"
              id="description-input"
            >
            </v-textarea>

            <!-- Reward input field - as number -->
            <v-text-field
              v-model="reward"
              label="Reward"
              id="reward-input"
              type="number"
              min="1"
              step="1"
            >
            </v-text-field>

            <!--Possible labels input field, can be comma separated -->
            <v-text-field
              id="label-input"
              v-model="labelData"
              label="Labels"
              single-line
              full-width
              hide-details
              @keydown.enter.native="makePill"
              class="pt-0"
            ></v-text-field>

            <!--Display of comma separated values from input field above as pills -->
            <v-chip-group active-class="primary--text" column>
              <v-col style="padding: 0 0">
                <v-chip
                  class="pill"
                  v-show="open"
                  v-for="label in labelArray"
                  :key="label"
                  close
                  deletable-chips
                  @click:close="closePill(label)"
                >
                  {{ label }}
                </v-chip>
              </v-col>
            </v-chip-group>

            <!-- Number of labellers required for the job entered as a number -->
            <v-text-field
              v-model="selectedNumber"
              label="Number of labellers"
              id="numLabellers"
              type="number"
              min="1"
              step="1"
            >
            </v-text-field>

            <v-card-actions style="padding-top: 3%">
              <!--Submit button-->
              <v-btn
                color="green"
                id="submit-input"
                type="button"
                @click.native="onSubmitClicked"
              >
                Submit
              </v-btn>
              <!--Discard button-->
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
import JobModule from "@/store/modules/job";
import { getModule } from "vuex-module-decorators";
import { uploadImages } from "@/api/Item.api";

//TODO: keep track of userID with author
export default Vue.extend({
  name: "CreateJob",
  components: { ImageUploader },
  data() {
    return {
      title: "",
      description: "",
      //used to process the comma separated label values
      labelData: "",
      labelArray: new Array<string>(),
      //indicates if a chip should close
      open: true,
      filesUploaded: [] as File[],
      //error messages set here and displayed in alert component above
      errorMessage: "",
      errorHeight: 0,
      errorVisibility: "Hidden",
      author: "60a62a9fab8896534b7a8d23",
      jobJson: {},
      reward: 1,
      selectedNumber: 0,
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

      // reset data values
      this.title = "";
      this.description = "";
      this.filesUploaded = [];
      this.labelArray = new Array<string>();
    },
    onSubmitClicked: function () {
      //enters labels
      this.makePill();
      // checks if all fields are filled - return in the ifs stops the submission if fields are empty
      //title empty
      if (this.title == "") {
        this.errorMessage = "Title required";
        this.errorVisibility = "visible";
        this.errorHeight = 40;
        return;
        //description empty
      } else if (this.description == "") {
        this.errorMessage = "Description required";
        this.errorVisibility = "visible";
        this.errorHeight = 40;
        return;
        //no files uploaded
      } else if (this.filesUploaded.length == 0) {
        this.errorMessage = "No files to upload";
        this.errorVisibility = "visible";
        this.errorHeight = 40;
        return;
        //no labels uploaded
      } else if (this.labelArray.length == 0) {
        this.errorMessage = "Label(s) required";
        this.errorVisibility = "visible";
        this.errorHeight = 40;
        return;
        // no labellers entered
      } else if (this.selectedNumber === 0) {
        this.errorMessage = "Please select number of labellers required";
        this.errorVisibility = "visible";
        this.errorHeight = 40;
        return;
        //reward cannot be 0 or non numeric so not included here
      } else {
        //in the case that everything is correct
        //create a job object
        this.jobJson = {
          title: this.title,
          description: this.description,
          labels: this.labelArray,
          rewards: this.reward,
          numLabellersRequired: this.selectedNumber,
        };

        // makes api all to upload job
        const jobMod = getModule(JobModule, this.$store);
        jobMod
          .createJob(this.jobJson)
          .then(async (response) => {
            // when job is successfully created, upload the images
            // create the form data to contain the images
            let formData = new FormData();
            // append the job ID to the form data
            formData.append("jobID", response.data._id);

            // append all the images to formData
            for (var i in this.filesUploaded) {
              let file = this.filesUploaded[i];
              formData.append("image", file);
            }

            // append all the labels to formData
            for (var j in this.labelArray) {
              let label = this.labelArray[j];
              formData.append("labels", label);
            }
            //formData.append("labels", this.labelArray)
            await this.upload(formData);
            // uploads all the images through the image api
          })
          .catch((error) => {
            console.error(error);
          });
      }
      // close the dialog after submit
    },
    onFilesUploaded(file: any): void {
      //when theh files have been uploaded push them to the file object
      this.filesUploaded.push(file);
    },
    onFileTypeError() {
      //checks if the file type of the uploaded resource is accepted (.jpg or .png)
      this.errorVisibility = "visible";
      this.errorMessage =
        "Warning: the files uploaded contain forbidden file type/s. (Accepted file types: .jpg and .png)";
    },
    //separates comma separated values from string form into separate entries in an array - displayed as pills
    makePill() {
      let arr: Array<string> = this.labelData.split(",");
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].trim() != "" && arr[i].trim() != " ") {
          this.labelArray.push(arr[i].trim());
        }
      }
      this.labelData = "";
    },
    //when the x is clicked on a pill this method is called and the pill is closed and removed from the array of pills
    closePill(label: string) {
      this.labelArray.splice(this.labelArray.indexOf(label), 1);
    },
    //if you added a picture in error, or just want to remove a particular one, this does that
    removeItem(index: any) {
      this.filesUploaded.splice(index, 1);
    },
    async upload(formData: any) {
      // const url = "http://localhost:4000/api/images/";
      // const response = await axios.post(url, formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      const response = await uploadImages(formData);

      this.closeDialog();
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
