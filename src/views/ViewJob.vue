<template>
  <v-container ma-10 pa-10 fill-height>
    <v-row align="center" justify="center">
      <v-btn
        color="primary"
        large
        rounded
        id="btnAccept"
        v-on:click.native="onAccept"
        >Accept Job
      </v-btn>
    </v-row>

    <v-row align="center" justify="center">
      <!-- card for the jobs descriptions and Title -->
      <v-card width="95%" height="80%" class="jobs" id="job-summary">
        <v-card-title> {{ jobTitle }}</v-card-title>
        <v-card-text> {{ jobDescription }}</v-card-text>
      </v-card>
    </v-row>
    <v-row>
      <!-- this is the scroll to top arrow -->
      <v-btn
        dark
        fab
        button
        bottom
        right
        color="indigo darken-3"
        fixed
        @click="onScrollUp"
        id="btnScrollUp"
        v-on:click.native="onScrollUp"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
      <!-- this handles the formating of the images -->
      <v-col
        v-for="image in images"
        :key="image"
        class="d-flex child-flex"
        cols="3"
        id="pic-display"
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
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
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
    };
  },
  async mounted() {
    // this is the jobs ID that is passed from the ListJobs page
    const jobID = this.$props.jobID;
    this.url = "http://localhost:4000/api/job/" + jobID;
    // get request for the title and description
    const jobMod = getModule(JobModule,this.$store)
    await jobMod.getJob(this.url).then((response) => {
        this.jobTitle = response.data.title;
        this.jobDescription = response.data.description;
      })
      .catch((error) => {
        console.log(error);
      });
    // get request for the images with a specific ID
    jobMod.getImages("http://localhost:4000/api/images?jobID=" + jobID)
      .then((response) => {
        console.log(response);
        for (var i in response.data) {
          var imageName = response.data[i].value;
          this.images.push(
            "http://localhost:4000/uploads/jobs/" + jobID + "/" + imageName
          );
        }
        console.log(this.images);
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
    // Scroll Up botton
    onScrollUp() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
});
</script>
