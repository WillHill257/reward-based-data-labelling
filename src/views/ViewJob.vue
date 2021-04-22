<template>
  <div class="ViewJob">
    <CarouselJob />
    <v-row align="center" justify="center">
      <v-btn color="blue" elevation="2" x-large rounded>Accept Job</v-btn>
    </v-row>
  </div>
</template>

<script>
import CarouselJob from "../components/CarouselJob.vue";

export default {
  components: {
    CarouselJob,
  },
};
</script>


