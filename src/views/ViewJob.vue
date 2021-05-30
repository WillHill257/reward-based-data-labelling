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
import Vue from "vue";
import router from "@/router";
import JobModule from "@/store/modules/job";
import { getModule } from "vuex-module-decorators";

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
      labels: [],
      reward: 0,
      author: "",
      labellers: [],
    };
  },
  async mounted() {
    // this is the jobs ID that is passed from the ListJobs page
    const jobID = this.$props.jobID;
    this.url = "http://localhost:4000/api/job/" + jobID;
    // get request for the title and description
    const jobMod = getModule(JobModule, this.$store);
    await jobMod
      .getJob(this.url)
      .then((response) => {
        this.jobTitle = response.data.title;
        this.jobDescription = response.data.description;
        this.labels = response.data.labels;
        this.reward = response.data.rewards;
        this.author = response.data.author;
        this.labellers = response.data.labellers;
        console.warn(response);
      })
      .catch((error) => {
        console.error(error);
      });
    // get request for the images with a specific ID
    jobMod
      .getImages("http://localhost:4000/api/images?jobID=" + jobID)
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
      //TODO get the users actaul userID
      var acceptJobJson = {
        user: "60ae15438517d247b80aebef",
      };

      if (this.labellers.includes("60ae15438517d247b80aebef")) {
        alert("You have already accepted this job!");
        return;
      }

      if (this.author == "60ae15438517d247b80aebef") {
        alert("You cannot accept a job you have created");
        return;
      }

      const jobID = this.$props.jobID;
      const addLabellerUrl = "http://localhost:4000/api/job/labeller/" + jobID;

      console.log(acceptJobJson, addLabellerUrl);
      this.axios
        .put(addLabellerUrl, acceptJobJson)
        .then((response) => {
          console.log(response);
          alert(
            "You have successfully accepted the job! \n Check it out in your dashboard"
          );
          router.push("/home");
        })
        .catch((error) => {
          console.log(error);
          alert("Oops something has gone wrong! \n Please try again later");
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
});
</script>
