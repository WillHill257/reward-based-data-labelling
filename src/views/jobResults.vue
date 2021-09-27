<template>
  <v-container fill-height>
    <v-row align="center" justify="center" class="pb-2">
      <ExportToCSV class="results-export-button pr-1 pb-1" :jobID="jobID" />
    </v-row>
    <v-row>
      <!-- this handles the formating of the images -->

      <v-col
        v-for="(image, index) in images"
        :key="index"
        id="pic-display"
        lg="3"
        md="4"
        sm="6"
        xs="12"
      >
        <!-- this is where the images are set to load -->
        <v-img
          :src="image"
          :lazy-src="image"
          aspect-ratio="1"
          class="grey lighten-2"
        >
        </v-img>

        <v-btn v-bind:id="'label' + index" style="width: 270px"> </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

import Vue from "vue";
import router from "@/router";
import { Job } from "@/store/modules/job";
import ExportToCSV from "@/components/ExportToCSV.vue";

export default Vue.extend({
  components: { ExportToCSV },
  props: { jobID: String },

  data() {
    // these are the return vars used to the jobs information
    return {
      jobTitle: "",
      url: "",
      images: [],
      paginatedImages: [],
      paginatedLabels: [],
      count: 0,
      bottom: false,
      labels: [],
    };
  },

  async mounted() {
    // this is the jobs ID that is passed from the ListJobs page
    const jobID = this.$props.jobID;
    this.url = "http://localhost:4000/api/job/labelled/" + jobID;
    // get request for the title and description
    const response = await Job.getJob(this.url);
    // .then((response) => {
    if (!response.data.error) {
      this.jobTitle = response.data.title;

      for (var i = 0; i < response.data.images.length; i++) {
        if (response.data.images[i].assignedLabels[0] != undefined) {
          this.labels.push(response.data.images[i].assignedLabels[0]);
        } else {
          this.labels.push("Unlabelled");
        }
      }

      await this.fetchImages();
    }
    // get request for the images with a specific ID
  },

  methods: {
    async fetchImages() {
      const jobID = this.$props.jobID;
      const imageResponse = await Job.getImages(
        "http://localhost:4000/api/images?jobID=" + jobID
      );

      if (!imageResponse.data.error) {
        const fetchedImages = imageResponse.data.map(
          (image) =>
            "http://localhost:4000/uploads/jobs/" + jobID + "/" + image.value
        );
        const temp = [];

        for (let i = 0; i < fetchedImages.length; i++) {
          temp.push(fetchedImages.splice(0, 12));
        }
        this.paginatedImages = temp;
        await this.addImages();
        this.addLabels();
      }
    },

    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    //this implements the infite scrolling by adding another 12 pictures to the screen
    //when the user scrolls to the bottom of the page
    addImages() {
      let arr = this.paginatedImages;
      if (arr[this.count]) {
        this.images.push(...arr[this.count]);
        this.count = this.count + 1;
      }
    },

    addLabels() {
      for (var i = 0; i < this.images.length; i++) {
        if(document.getElementById("label" + i)!=null)
        {
        document.getElementById("label" + i).innerText = this.labels[i];
        }
      }
    },
  },

  watch: {
    bottom(bottom) {
      if (bottom && window.scrollY > 0) {
        this.addImages();
        this.addLabels();
      }
    },
  },
  created() {
    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
    });
    this.addImages();
    this.addLabels();
  },
});
</script>

<style scoped>
.results-export-button {
  margin-left: auto;
  margin-right: 0;
}
</style>
