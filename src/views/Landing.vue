<template>
  <div>
    <v-container fluid>
      <v-row id="titleLanding" justify="center" class="LandingHeading">
        Welcome To Jinx Data Labelling Service
      </v-row>
      <!-- Heading row -->
      <v-row
        v-if="$vuetify.breakpoint.mdAndUp"
        no-gutters
        style="margin-top: 20px; height: 320px"
      >
        <!-- Explinatation of the purpose of the site -->
        <v-spacer></v-spacer>
        <v-card id="step1" :height="150" :width="300" elevation="0">
          <img
            class="UndrawImage"
            src="../assets/UndrawImages/UndrawJobOffers.svg"
          />

          <v-card-title>Step 1</v-card-title>
          <v-card-text style="color: black">
            View the available jobs. Pick a job that matches your skillset best.
            Accept the job.</v-card-text
          >
        </v-card>
        <v-spacer></v-spacer>
        <v-card id="step2" :height="150" :width="300" elevation="0">
          <img
            class="UndrawImage"
            src="../assets/UndrawImages/UndrawLabel.svg"
          />
          <v-card-title>Step 2</v-card-title>
          <v-card-text style="color: black">
            Match the given labels to the images. Complete the set of pictures
            given.
          </v-card-text>
        </v-card>

        <v-spacer></v-spacer>
        <v-card id="step3" :height="150" :width="300" elevation="0">
          <img
            class="UndrawImage"
            src="../assets/UndrawImages/UndrawPaid.svg"
          />
          <v-card-title>Step 3</v-card-title>
          <v-card-text style="color: black">
            Your work is verified. You are rewarded. It's that
            simple.</v-card-text
          >
        </v-card>
        <v-spacer></v-spacer>
      </v-row>

      <v-row v-show="$vuetify.breakpoint.xs ? false : true">
        <v-spacer></v-spacer>
        <!-- Redirects to a login screen, allows user to register and get their images labelled -->
        <v-btn
          @click="labelImagesClick"
          id="dataLblBtn"
          color="success"
          rounded
          elevation="6"
        >
          I Want My Images Labelled
        </v-btn>
        <v-spacer></v-spacer>
        <!--Redirects to the screen that displays all jobs -->
        <v-btn
          @click="listJobsClick"
          id="availableJobs"
          color="primary"
          rounded
          elevation="6"
        >
          View Available Jobs
        </v-btn>
        <v-spacer></v-spacer>
      </v-row>

      <!-- The mobile page starts here -->
      <v-row
        style="padding-top: 5%; padding-left: 10%"
        v-show="$vuetify.breakpoint.xs ? true : false"
      >
        <v-col>
          <v-text>Step 1 <br /></v-text>
          <v-text style="color: black; font-size: 11px">
            View the available jobs. Pick a job that matches your skillset best.
            Accept the job.</v-text
          >
        </v-col>
        <v-col>
          <v-card :height="100" :width="100" elevation="0">
            <img
              class="UndrawImage"
              src="../assets/UndrawImages/UndrawJobOffers.svg"
            />
          </v-card>
        </v-col>
      </v-row>

      <v-row
        style="padding-top: 5%; padding-left: 10%"
        v-show="$vuetify.breakpoint.xs ? true : false"
      >
        <v-col>
          <v-text>Step 2 <br /></v-text>
          <v-text style="color: black; font-size: 11px">
            Match the given labels to the images. Complete the set of pictures
            given.</v-text
          >
        </v-col>
        <v-col>
          <v-card :height="100" :width="100" elevation="0">
            <img
              class="UndrawImage"
              src="../assets/UndrawImages/UndrawLabel.svg"
            />
          </v-card>
        </v-col>
      </v-row>

      <v-row
        style="padding-top: 5%; padding-left: 10%"
        v-show="$vuetify.breakpoint.xs ? true : false"
      >
        <v-col>
          <v-text>Step 3 <br /></v-text>
          <v-text style="color: black; font-size: 11px">
            Your work is verified. You are rewarded. It's that simple.</v-text
          >
        </v-col>
        <v-col>
          <v-card :height="100" :width="100" elevation="0">
            <img
              class="UndrawImage"
              src="../assets/UndrawImages/UndrawPaid.svg"
            />
          </v-card>
        </v-col>
      </v-row>

      <v-row
        no-gutters
        style="padding-top: 10%"
        v-show="$vuetify.breakpoint.xs ? true : false"
      >
        <v-spacer></v-spacer>
        <v-btn
          @click="listJobsClick"
          large
          id="dataLblBtn"
          color="primary"
          rounded
          elevation="6"
          dark
        >
          View Available Jobs
        </v-btn>
        <v-spacer></v-spacer>
      </v-row>

      <v-row
        style="padding-top: 5%"
        v-show="$vuetify.breakpoint.xs ? true : false"
      >
        <v-spacer></v-spacer>
        <v-btn
          @click="labelImagesClick"
          large
          id="dataLblBtn"
          color="success"
          outlined
          elevation="6"
          dark
        >
          I Want My Images Labelled
        </v-btn>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  methods: {
    listJobsClick: function () {
      this.$router.push({ name: "ListJobs" });
    },

    labelImagesClick: function () {
      this.$router.push({ name: "HomePage" });
    },
  },
};
</script>
