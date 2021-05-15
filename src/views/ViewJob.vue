<template>
  <v-container fill-height>
    <v-row align="center" justify="center" class="pb-2">
      <v-btn
        color="primary"
        large
        rounded
        id="btnAccept"
        v-on:click.native="onAccept"
        pd-1
        >Accept Job
      </v-btn>
    </v-row>

    <v-row align="center" justify="center" class="my4">
      <!-- card for the jobs descriptions and Title -->
      <v-card
        width="95%"
        height="75%"
        class="jobs"
        id="job-summary"
        color="light grey"
      >
        <v-card-title> {{ jobTitle }}</v-card-title>
        <v-card-text> {{ jobDescription }}</v-card-text>
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
        xa="6"
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
  </v-container>
</template>

<script>
import axios from "axios";
import Vue from "vue";
export default Vue.extend({
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
    };
  },
  async mounted() {
    // this is the jobs ID that is passed from the ViewJobs page
    const jobID = this.$props.jobID;
    this.url = "http://localhost:4000/api/job/" + jobID;
    // get request for the title and description
    await axios
      .get(this.url)
      .then((response) => {
        this.jobTitle = response.data.title;
        this.jobDescription = response.data.description;
      })
      .catch((error) => {
        console.log(error);
      });
    //get request for the images with a specific ID
    await axios
      .get("http://localhost:4000/api/images?jobID=" + jobID)
      .then((response) => {
        console.log(response);
        const fetchedImages = response.data.map(
          (image) =>
            "http://localhost:4000/uploads/jobs/" + jobID + "/" + image.value
        );
        console.log(this.images);
        const temp = [];
        for (let i = 0; i < fetchedImages.length; i++) {
          temp.push(fetchedImages.splice(0, 12));
        }
        this.paginatedImages = temp;
        this.addImages();
        //console.warn(temp);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    // Accept Button
    onAccept() {
      return null;
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
  // Scroll Up botton
  // onScrollUp() {
  //   window.scrollTo({
  //     top: 0,
  //     left: 0,
  //     behavior: "smooth",
  //   });
  // },
});
</script>

