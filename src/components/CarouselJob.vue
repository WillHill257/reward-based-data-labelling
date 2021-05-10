<template>
  <!-- the container fluid, row allign and cols is to get the slider centered and a nice size -->
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="5">
        <!-- these are the attributes of the slider -->
        <v-carousel
          cycle
          height="450"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet :color="colors[i]" height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <div class="display-3">{{ slide }} Slide</div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      // these are the colors for the slider for now but will be changed later because doubt we will need
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      //  this is the writing on the slides, can probably change these to pictures when the time comes
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    };
  },
});
</script>