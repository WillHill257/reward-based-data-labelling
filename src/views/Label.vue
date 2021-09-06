<template>
  <div>
    <!-- Allows entire screen to be filled by card -->
    <v-main>
      <v-container>
        <v-row align="left" justify="left" style="padding: 5px">
          <BackButton />
        </v-row>
        <v-row class="pt-2">
          <v-card class="label-card">
            <v-row justify="center" align="center">
              <!--Appears underneath one another in portrait and side by side in landscape -->
              <!-- Images that need to be labelled in the batch -->
              <v-col class="col-md-6 col-lg-6 col-xl-6">
                <v-img
                  :src="images[imagenext]"
                  id="labelImage"
                  aspect-ratio="1"
                  min-height="200"
                  min-width="200"
                ></v-img>
              </v-col>
              <!-- Instruction, labels and buttons -->
              <v-col class="col-md-6 col-lg-6 col-xl-6">
                <v-card-text id="instruction">
                  <!-- Reward -->
                  <v-row>
                    <v-col class="text-right"> {{ reward }} reward </v-col>
                  </v-row>

                  <!-- Instruction -->
                  <v-row justify="center">
                    <v-card-text class="text-center">
                      Select the label(s) that best match the image
                    </v-card-text>
                  </v-row>

                  <!-- Labels -->
                  <v-row justify="center">
                    <v-chip-group column multiple id="labelChoices">
                      <v-col class="justify-center">
                        <v-chip
                          @click.native="addToSelection(label)"
                          v-for="label in availableLabels"
                          :key="label"
                          :class="label + ' labelling-label'"
                        >
                          {{ label }}
                        </v-chip>
                      </v-col>
                    </v-chip-group>
                  </v-row>
                </v-card-text>

                <v-spacer></v-spacer>

                <v-card-actions>
                  <v-row class="" justify="end">
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
                      <v-btn
                        v-if="canFinish"
                        color="deep-blue lighten-2"
                        text
                        id="finishBtn"
                        @click="finishBatchDialog"
                      >
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
        </v-row>
      </v-container>
    </v-main>
    <FinishJob
      :isShowDialog.sync="isShowDialog"
      :canAcceptNew="canAcceptNew"
      :jobID="jobID"
      :batchID="batchID"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FinishJob from "@/components/FinishJobDialog.vue";
import { Job } from "@/store/modules/job";
import { computeFetchEndpoint, sendLabels } from "@/api/Item.api";
import { getCompleteBatch, getNextBatch } from "@/api/Batch.api";
import BackButton from "@/components/BackButton.vue";

export default Vue.extend({
  name: "LabelImages",
  components: { FinishJob, BackButton },

  props: {
    jobID: String,
    batchID: String,
  },

  data() {
    return {
      //labels selected by user
      selectedLabels: new Array<string>(),
      availableLabels: new Array<string>() /*["Restaurant", "Running", "Yoga Studio", "Shopping Centre"],*/,
      author: "",
      url: "",
      reward: 0,
      images: new Array<string>(), // array of image filenames to display
      count: 0,
      imagenext: 0,
      title: "",
      batchData: null,
      isShowDialog: false,
      canAcceptNew: false,
      canFinish: false,
    };
  },

  async mounted() {
    // this is the jobs ID that is passed from the ListJobs page
    const jobID = this.$props.jobID;
    this.url = "http://localhost:4000/api/job/" + jobID;

    // get request for the title and description
    const response = await Job.getJob(this.url);

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

    // load the initial data
    this.$nextTick(() => {
      this.loadLabels(0);
    });
  },

  methods: {
    canFinishMethod(): boolean {
      // when the labels are successfully updated on the backend, the batchData will reflect
      // (this.batchData as any).images[index].labels.value

      if (!this.batchData) return false;

      // loop through each image
      const batchImages: any = (this.batchData as any).images;
      for (let image of batchImages) {
        // check that the labels.value is not empty
        if (image.labels.value) {
          if (image.labels.value.length === 0) return false;
        } else {
          return false;
        }
      }

      return true;
    },
    //adds the labels selected by the user to an array
    addToSelection(selectedLabel: string) {
      if (this.selectedLabels.includes(selectedLabel)) {
        // In already
        this.setLabelInactive(selectedLabel);
        this.selectedLabels.splice(
          this.selectedLabels.indexOf(selectedLabel),
          1
        );
      } else {
        // In now
        this.setLabelActive(selectedLabel);
        this.selectedLabels.push(selectedLabel);
      }
    },

    updateLabels(index: number) {
      if (this.batchData) {
        const data: any = this.batchData;
        sendLabels(data.images[index]._id, this.selectedLabels)
          .then((res: any) => {
            // update the stored label data
            (this.batchData as any).images[index].labels.value = res.data;
            this.canFinish = this.canFinishMethod();
          })
          .catch((error: any) => {
            console.log(error);
          });
      }
    },

    setLabelActive(label: string) {
      document.querySelectorAll("." + label).forEach((element: any) => {
        if (element) {
          element.classList.add("light-green");
          element.classList.add("lighten-3");
          element.classList.add("v-chip--active");
        }
      });
    },

    setLabelInactive(label: string) {
      document.querySelectorAll("." + label).forEach((element: any) => {
        if (element) {
          element.classList.remove("light-green");
          element.classList.remove("lighten-3");
          element.classList.remove("v-chip--active");
        }
      });
    },

    loadLabels(index: number) {
      // use this index to load the correct labels for the image

      // start with a fresh slate
      this.setLabelInactive("labelling-label");

      // get the existing labels from the batchData
      try {
        const temp = JSON.stringify(
          (this.batchData as any).images[index].labels.value
        );
        this.selectedLabels = JSON.parse(temp);
      } catch (e) {
        this.selectedLabels = [];
      }

      if (this.selectedLabels === undefined) this.selectedLabels = [];

      // make these chips active
      this.selectedLabels.forEach((label: any) => {
        // add the correct classes
        this.setLabelActive(label);
      });
    },

    nextImage() {
      // update the labels for the current image
      this.updateLabels(this.imagenext);

      this.imagenext += 1;

      if (this.imagenext > this.images.length - 1) {
        this.imagenext = 0;
      }

      // update the labels
      this.loadLabels(this.imagenext);
    },
    prevImage() {
      // update the labels for the current image
      this.updateLabels(this.imagenext);

      this.imagenext -= 1;

      if (this.imagenext < 0) {
        this.imagenext = this.images.length - 1;
      }

      // update the labels
      this.loadLabels(this.imagenext);
    },

    async finishBatchDialog() {
      var nextBatch = await getNextBatch(this.jobID);
      if (nextBatch.data != "No Batch") {
        this.canAcceptNew = true;
      }
      this.isShowDialog = true;
    },
  },
});
</script>

<style scoped>
.label-card {
  width: 100%;
}
</style>
>
