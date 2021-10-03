<template>
  <v-container fill-height>
    <v-row align="center" justify="center" class="pb-2">
      <v-btn
        color="primary"
        large
        rounded
        id="btnAccept"
        @click.native="onAccept"
        pd-1
        >Accept Job
      </v-btn>
    </v-row>

    <v-row align="center" justify="center" class="my4">
      <!-- card for the jobs descriptions and Title -->
      <v-card width="95%" height="75%" class="jobs" id="job-summary">
        <v-card-title class=""> {{ jobTitle }}</v-card-title>
        <v-card-subtitle class="pb-1 pt-1">
          Reward: {{ reward }}
        </v-card-subtitle>
        <v-chip-group class="mx-4" active-class="primary--text" column>
          <v-col style="padding: 0 0">
            <v-chip class="pill" v-for="label in labels" :key="label">
              {{ label }}
            </v-chip>
          </v-col>
        </v-chip-group>
        <v-card-text>
          <v-divider class="mx-4 pb-2 pt-2"></v-divider>
          Description: {{ jobDescription }}
        </v-card-text>
      </v-card>
    </v-row>

    <v-row>
      <!-- this handles the formating of the images -->

      <v-col
        v-for="(image, index) in images"
        :key="index"
        class="d-flex child-flex"
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
          <template v-slot:placeholder>
            <v-row class="fill-height" align="center" justify="center">
              <div v-if="images.length === 0">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </div>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>

    <ErrorDialog
      :isShowDialog.sync="showError"
      :title="'An error occurred'"
      :message="'Please try again. If the problem persists, please contact support.'"
    />
  </v-container>
</template>

<script>
import Vue from "vue";
import router from "@/router";
import { Job } from "@/store/modules/job";
import { acceptJob } from "@/api/Job.api";
import ErrorDialog from "@/components/ErrorDialog.vue";

export default Vue.extend({
  components: { ErrorDialog },
  props: { jobID: String },
  data() {
    // these are the return vars used to the jobs information
    return {
      jobTitle: "",
      jobDescription: "",
      url: "",
      images: [],
      paginatedImages: [],
      count: 0,
      bottom: false,
      labels: [],
      reward: 0,
      author: "",
      labellers: [],
      numLabellersRequired: 0,
      showError: false,
    };
  },
  async mounted() {
    // this is the jobs ID that is passed from the ListJobs page
    const jobID = this.$props.jobID;
    this.url = "http://localhost:4000/api/job/" + jobID;
    // get request for the title and description
    const response = await Job.getJob(this.url);
    // .then((response) => {
    if (!response.data.error) {
      this.jobTitle = response.data.title;
      this.jobDescription = response.data.description;
      this.labels = response.data.labels;
      this.reward = response.data.rewards;
      this.author = response.data.author;
      this.labellers = response.data.labellers;
      this.numLabellersRequired = response.data.numLabellersRequired;

      this.changeAcceptVisibility(response.data.canAccept);
      await this.fetchImages();
    }
    // get request for the images with a specific ID

    //console.warn(temp);
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
        this.addImages();
      }
    },
    // Accept Button
    onAccept() {
      const jobID = this.$props.jobID;

      acceptJob(jobID)
        .then((response) => {
          router.push({ name: "HomePage" });
        })
        .catch((error) => {
          console.error(error);
          this.showError = true;
        });
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

    changeAcceptVisibility(isVisible) {
      const button = document.getElementById("btnAccept");
      if (isVisible) {
        button.classList.remove("hidden");
      } else {
        button.classList.add("hidden");
      }
    },
  },
  //this is the observer class for the infinite scrolling
  watch: {
    bottom(bottom) {
      if (bottom && window.scrollY > 0) {
        this.addImages();
      }
    },
  },
  created() {
    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
    });
    this.addImages();
  },
  labelImagesClick() {
    this.$router.push({ name: "LabelImages" });
  },
});
</script>

<style scoped>
.hidden {
  display: none;
}
</style>