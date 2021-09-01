<template>
  <!-- Allows entire screen to be filled by card -->
  <v-content>
    <v-container>
      <v-card>
        <v-row>
          <!--Appears underneath one another in portrait and side by side in landscape -->
          <!-- Images that need to be labelled in the batch -->
          <v-col class="pt-0 pb-0 col-md-6 col-lg-6 col-xl-6">
            <!-- TODO get image from DB -->
            <v-img
              :src="images[imagenext]"
              height="250"
              id="labelImage"
            ></v-img>
          </v-col>
          <!-- Instruction, labels and buttons -->
          <v-col class="pt-0 pb-0 col-md-6 col-lg-6 col-xl-6">
            <v-card-text>
              <!-- Reward -->
              <v-row>
                <v-col class="text-right"> {{ reward }} reward</v-col>
              </v-row>

              <!-- Labels -->
              <v-row justify="center">
                <v-card-text class="text-center">
                  Select the label(s) that best match the image
                </v-card-text>
              </v-row>

              <!-- Labels -->
              <v-row justify="center">
                <v-chip-group
                  v-model="selection"
                  active-class="light-green lighten-3"
                  column
                  multiple
                  id="labelChoices"
                >
                  <v-col class="justify-center">
                    <v-chip
                      @click="addToSelection(label)"
                      v-for="label in availableLabels"
                      :key="label"
                      class="label"
                    >
                      {{ label }}
                    </v-chip>
                  </v-col>
                </v-chip-group>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col class="text-left col-4">
                  <v-btn
                    color="blue lighten-2"
                    text
                    @click="prevImage()"
                    id="prevImageBtn"
                  >
                    Prev
                  </v-btn>
                </v-col>
                <v-col class="text-center col-4">
                  <v-btn color="deep-blue lighten-2" text id="FinishBtn">
                    Finish
                  </v-btn>
                </v-col>
                <v-col class="text-right col-4">
                  <v-btn
                    color="blue lighten-2"
                    text
                    @click="nextImage()"
                    id="nextImageBtn"
                  >
                    Next
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import Vue from "vue";
import { Job } from "@/store/modules/job";
import { getCompleteBatch } from "@/api/Batch.api";
import { computeFetchEndpoint, sendLabels } from "@/api/Item.api";

export default Vue.extend({
  name: "LabelImages",
  components: {},

  props: {
    jobID: String,
    batchID: String
  },

  data() {
    return {
      //labels selected by user
      selectedLabels: new Array<string>(),
      availableLabels: new Array<string>() /*["Restaurant", "Running", "Yoga Studio", "Shopping Centre"],*/,
      author: "",
      url: "",
      reward: 0,
      paginatedImages: new Array<string>(),
      images: new Array<string>(), // array of image filenames to display
      count: 0,
      imagenext: 0,
      title: "",
      batchData: null
    };
  },
  async mounted() {
    // this is the jobs ID that is passed from the ListJobs page
    const jobID = this.$props.jobID;
    this.url = "http://localhost:4000/api/job/" + jobID;
    // get request for the title and description
    const response = await Job.getJob(this.url);
    // .then((response) => {


    // get the batch data
    var batchData = await getCompleteBatch(this.batchID);

    if (!batchData) {
      // something went majorly wrong
      return;
    }

    // remove the metadata
    batchData = batchData.data;

    // add the images filenames to the array
    this.images = batchData.images.map((element: any) => {
      return computeFetchEndpoint(jobID, element.value);
    });

    if (!response.data.error) {
      this.availableLabels = response.data.labels;
      this.reward = response.data.rewards;
      this.author = response.data.author;
      this.title = response.data.title;
    }
    this.batchData = batchData;
    // get request for the images with a specific ID
  },

  methods: {
    //adds the labels selected by the user to an array
    addToSelection(selectedLabel: string) {
      // console.log("Before:" + this.selectedLabels);
      if (this.selectedLabels.includes(selectedLabel)) {
        // console.log("In already");
        this.selectedLabels.splice(
          this.selectedLabels.indexOf(selectedLabel),
          1
        );
      } else {
        // console.log("In now");
        this.selectedLabels.push(selectedLabel);
      }
      // console.log("After:" + this.selectedLabels);
    },

    updateLabels() {
      if (this.batchData) {
        const data: any = this.batchData;
        sendLabels(data.images[this.imagenext]._id, this.selectedLabels).then(
          (res: any) => {
            console.log("Updated images:" + res);
          }
        );
      }
    },

    nextImage() {
      this.updateLabels();
      this.selectedLabels = [];

      if (this.imagenext >= this.images.length - 1) {
        this.imagenext = 0;
      } else {
        this.imagenext += 1;
      }
    },
    prevImage() {
      this.selectedLabels = [];

      if (this.imagenext <= 0) {
        this.imagenext = this.images.length - 1;
      } else {
        this.imagenext -= 1;
      }
    }
  }
});
</script>

<style></style>
