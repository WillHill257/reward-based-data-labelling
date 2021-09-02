<template>
  <div>
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
                  <v-col class="text-right"> {{ reward }} reward </v-col>
                </v-row>

                <!-- Labels -->
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
                    <v-btn
                      color="deep-blue lighten-2"
                      text
                      id="FinishBtn"
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
      </v-container>
    </v-content>
    <FinishJob
      :isShowDialog.sync="isShowDialog"
      :canAcceptNew="canAcceptNew"
      :jobID="jobID"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FinishJob from "@/components/FinishJobDialog.vue";
import { Job } from "@/store/modules/job";
import { computeFetchEndpoint, sendLabels } from "@/api/Item.api";
import { getCompleteBatch, getNextBatch } from "@/api/Batch.api";

export default Vue.extend({
  name: "LabelImages",
  components: { FinishJob },

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
      this.selectedLabels = (this.batchData as any).images[index].labels.value;
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

      if (this.imagenext >= this.images.length - 1) {
        this.imagenext = 0;
      } else {
        this.imagenext += 1;
      }

      // update the labels
      this.loadLabels(this.imagenext);
    },
    prevImage() {
      // update the labels for the current image
      this.updateLabels(this.imagenext);

      if (this.imagenext <= 0) {
        this.imagenext = this.images.length - 1;
      } else {
        this.imagenext -= 1;
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
    }
    //get the progress
    /*
    async progress(images: Array<string>, selectedLabels: Array<string>){
      await this.addImages;
      const total_images = images.length;
      var total_labels = selectedLabels.length;

      var progress = (total_labels/total_images) *100;
      return progress;

    }*/
  },
});
</script>

<style></style>
