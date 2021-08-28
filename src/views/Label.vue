<template>
    <v-card
    id = "labelCard"
    :loading="loading"
    class="mx-auto my-12 "
    max-width="374"
  >
    <!-- TODO get image from DB -->
    <v-img
      :src="images[imagenext]"
      height="250"
      id = "labelImage"
    ></v-img>

    
    <v-card-title
    id = "instruction"
    >Select a label that best matches the image</v-card-title>

    <v-divider class="mx-4" id = "divider"></v-divider>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="indigo accent-4 white--text"
        column
        multiple
        id = "labelChoices"
      >
        <!-- TODO get labels from DB -->
        <v-chip
        @click="addToSelection(label)" v-for="label in availableLabels" :key="label" class="label">
          {{label}}
        </v-chip>

      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <!-- TODO functionality for next button goes to the next unlabelled image in the DB -->
      <!-- TODO functionality for next saves current labels and resets the array - not mine -->
      <v-btn
        color="deep-blue lighten-2"
        text
        @click="nextImage()"
        id = "nextImageBtn"
      >
        Next
      </v-btn>
      <v-btn
        color="deep-blue lighten-2"
        text
        @click="prevImage()"
        id = "prevImageBtn"
      >
        Prev
      </v-btn>
    </v-card-actions>
    </v-card>
</template>

<script lang = "ts">
import Vue from "vue";
import { Job } from "@/store/modules/job";

export default Vue.extend({
  name: "LabelImages",
  components: { },
  data() {
    return {
      //labels selected by user
      selectedLabels: new Array<string>(),
      availableLabels: new Array<string>(),/*["Restaurant", "Running", "Yoga Studio", "Shopping Centre"],*/
      author: "",
      url: "",
      reward: 0,
      paginatedImages: new Array<string>(),
      images: new Array<string>(),
      count: 0,
      imagenext: 0,
    }
  },
  async mounted() {
    // this is the jobs ID that is passed from the ListJobs page
    const jobID = this.$props.jobID;
    this.url = "http://localhost:4000/api/job/" + jobID;
    // get request for the title and description
    const response = await Job.getJob(this.url);
    // .then((response) => {
    if (!response.data.error) {
      this.availableLabels = response.data.labels;
      this.reward = response.data.rewards;
      this.author = response.data.author;

      await this.fetchImages();
    }
    // get request for the images with a specific ID

    //console.warn(temp);
  },
  props: {
    jobID: String,
    batchNumber: Number,
  },

  methods: {
    //adds the labels selected by the user to an array
    addToSelection(selectedLabel: string){
      console.log("Before:" + this.selectedLabels)
      if (this.selectedLabels.includes(selectedLabel)){
        console.log('In already')
        this.selectedLabels.splice(this.selectedLabels.indexOf(selectedLabel), 1)
      }else{
        console.log('In now')
        this.selectedLabels.push(selectedLabel)
      }
      console.log("After:" + this.selectedLabels)
    },
    async fetchImages() {
      //this is the job ID that is passed from the view jobs page
      const jobID = this.$props.jobID;
      const batchNumber = this.$props.batchNumber
      const imageResponse = await Job.getImages(
        //requests the images with the sepcific job ID
        "http://localhost:4000/api/images?jobID=" + jobID + "&batchNumber=" + batchNumber 
      );
      // if there are no errors it gets the images
      if (!imageResponse.data.error) {
        const fetchedImages = imageResponse.data.map(
          (image:any) =>
            "http://localhost:4000/uploads/jobs/" + jobID + "/" + image.value
        );
        //make a temp array to display the images
        const temp = [];
        for (let i = 0; i < fetchedImages.length; i++) {
          //displays 12 images at a time
          temp.push(fetchedImages.splice(0, 12));
        }
        this.paginatedImages = temp; 
        this.addImages();
      }
    },
    addImages() {
      //adds 12 images at a time to the array to display the pictures
      let arr = this.paginatedImages;
      if (arr[this.count]) {
        this.images.push(...arr[this.count]);
        this.count = this.count + 1;
      }
    },
    nextImage(){
      console.log(this.imagenext)
      console.log(this.images.length)
      this.selectedLabels = []

      if (this.imagenext >= this.images.length-1){
        this.imagenext = 0;
      }else{
        this.imagenext += 1;
      }
      
    }
  },
});
</script>

<style>
</style>