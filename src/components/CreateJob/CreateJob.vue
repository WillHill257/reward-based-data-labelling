<template>
  <v-dialog width="80%" v-model="isShowDialog" @click:outside="closeDialog">
    <v-card id="createJobCard">
      <form @submit.prevent enctype="multipart/form-data">
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
            <v-alert
              :style="{ visibility: errorVisibility }"
              dense
              dismissible
              outlined
              type="warning"
            >
              {{ errorMessage }}
            </v-alert>
            <v-text-field v-model="title" label="Title" id="title-input" :rules = "titleRules">
            </v-text-field>

            <v-textarea
              v-model="description"
              label="Description"
              id="description-input"
              :rules = "descriptionRules"
            >
            </v-textarea>

            <v-text-field
              v-model="reward"
              label="Reward"
              id="reward-input"
              type="number"
              :rules = "rewardRules"
              min = 1
              step = 1
            >
            </v-text-field>

            <v-text-field
              id="label-input"
              v-model="labelData"
              label="Labels"
              single-line
              full-width
              hide-details
              @keydown.enter.native="makePill"
            ></v-text-field>

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

            <v-text-field
              v-model="selectedNumber"
              label="Number of labellers"
              id="numLabellers"
              type="number"
              :rules = "labellerRules"
              min = 1
              step = 1
            >
            </v-text-field>

            <v-card-actions style="padding-top: 25%">
              <v-btn
                color="green"
                id="submit-input"
                type="button"
                @click.native="onSubmitClicked"
              >
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
import JobModule from "@/store/modules/job";
import { getModule } from "vuex-module-decorators";

//TODO: keep track of userID with author
export default Vue.extend({
  name: "CreateJob",
  components: { ImageUploader },
  data() {
    return {
      title: "",
      description: "",
      labelData: "",
      labelArray: new Array<string>(),
      open: true,
      filesUploaded: [] as File[],
      errorMessage: "",
      errorHeight: 0,
      errorVisibility: "Hidden",
      author: "60a62a9fab8896534b7a8d23",
      jobJson: {},
      reward: 1,
      selectedNumber: null,
      //validation rules
      descriptionRules: [(v: string) => !!v || "Description is required"],
      titleRules: [(v: string) => !!v || "Title is required"],
      labellerRules:[
        [(v: string) => !!v || "The number of labellers is required"],
        [(v: string) => (!isNaN(parseFloat(v))) || 'The number of labellers must be a numeric value'],
        [(v: string) => (parseFloat(v) >= 1) || 'There must be at least one labeller'],
      ],
      rewardRules:[
        [(v: string) => !!v || "Reward is required"],
        [(v: string) => (!isNaN(parseFloat(v))) || 'The reward must be a numeric value'],
        [(v: string) => (parseFloat(v) >= 1) || 'The reward must be at least one'],
      ],
      //labelRules: [(v: string) => (!!v || this.labelArray.length == 0) || "Enter labels as comma separated values and press enter"],
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
      this.makePill()
      // checks if all fields are filled - return in the ifs stops the submission if fields are empty
      if (this.title == "") {
        this.errorMessage = "Title required";
        this.errorVisibility = "visible";
        this.errorHeight = 40;
        return;
      } else if (this.description == "") {
        this.errorMessage = "Description required";
        this.errorVisibility = "visible";
        this.errorHeight = 40;
        return;
      } else if (this.filesUploaded.length == 0) {
        this.errorMessage = "No files to upload";
        this.errorVisibility = "visible";
        this.errorHeight = 40;
        return;
      } else if (this.labelArray.length == 0) {
        this.errorMessage = "Label(s) required";
        this.errorVisibility = "visible";
        this.errorHeight = 40;
        return;
      } else if (this.selectedNumber == "") {
        this.errorMessage = "Please select number of labellers required";
        this.errorVisibility = "visible";
        this.errorHeight = 40;
        return;
      } else {
        this.jobJson = {
          title: this.title,
          description: this.description,
          author: this.author,
          labels: this.labelArray,
          rewards: this.reward,
          numLabellersRequired: this.selectedNumber,
        };

        console.log(this.jobJson);
        // makes api all to upload job
        const jobMod = getModule(JobModule, this.$store);
        jobMod
          .createJob(this.jobJson)
          .then((response) => {
            // when job is successfully created, upload the images
            console.log(response);

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
            //alternaticve
            //formData.append("labels", this.labelArray)

            // uploads all the images through the image api
            const url = "http://localhost:4000/api/images/";
            console.log(formData);
            this.axios
              .post(url, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((response) => {
                console.log(response);
                this.closeDialog();
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }

      // close the dialog after submit
    },
    onFilesUploaded(file: File): void {
      this.filesUploaded.push(file);
    },
    onFileTypeError() {
      this.errorVisibility = "visible";
      this.errorMessage =
        "Warning: the files uploaded contain forbidden file type/s. (Accepted file types: .jpg and .png)";
    },
    makePill() {
      let arr: Array<string> = this.labelData.split(",");
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].trim() != "" && arr[i].trim() != " ") {
          this.labelArray.push(arr[i].trim());
        }
      }
      this.labelData = "";
    },
    closePill(label: string) {
      this.labelArray.splice(this.labelArray.indexOf(label), 1);
    },
    removeItem(index: any) {
      this.filesUploaded.splice(index, 1);
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
