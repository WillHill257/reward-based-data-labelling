
<template>
  <v-container ma-10 pa-10 fill-height>
    <v-row align="center" justify="center">
      <!-- <v-btn color="primary" elevation="7" large elavation="2" fab>Prev</v-btn> -->
      <v-btn color="primary" large rounded>Accept Job </v-btn>
      <!-- <v-btn color="primary" elevation="7" large elavation="2" fab>Next</v-btn> -->
    </v-row>

    <v-row>
      <v-btn
        dark
        fab
        button
        bottom
        right
        color="indigo darken-3"
        fixed
        @click="top"
      >
        Go to top
      </v-btn>
      <v-col v-for="n in 100" :key="n" class="d-flex child-flex" cols="3">
        <v-img
          :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
          :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
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
export default {
  methods: {
    top() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>




