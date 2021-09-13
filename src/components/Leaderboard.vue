<template>
  <v-sheet class="mx-auto pa-2" elevation="2" rounded max-width="500">
    <div class="text-h5 text-center mb-6 font-weight-bold">Leaderboard</div>
    <v-row class="mx-2" :align="'center'">
      <v-col cols="1" class="mr-2"
        ><v-icon color="primary">mdi-trophy</v-icon>
      </v-col>
      <v-col class="text-left"
        ><div class="text-subtitle-1 text--secondary">Top labeller</div>
        <div class="text-h6">{{ items[0].name }}</div></v-col
      >
      <v-spacer></v-spacer>
      <v-col class="text-right" cols="1">
        <span class="primary--text font-weight-medium text-h6">{{
          items[0].score
        }}</span>
      </v-col>
    </v-row>
    <v-divider class="my-2"></v-divider>
    <v-row
      class="mx-2"
      :align="'center'"
      v-for="i in items.length - 1"
      :key="i"
    >
      <v-col cols="1" class="mr-2"
        ><div class="text-subtitle-2 text--disabled">{{ i + 1 }}.</div>
      </v-col>
      <v-col class="text-left">
        <div class="text-subtitle-1">{{ items[i].name }}</div></v-col
      >
      <v-spacer></v-spacer>
      <v-col class="text-right" cols="1">
        <span>{{ items[i].score }}</span>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      selectedItem: 0,
      items: [
        { name: "Andrew", score: 50 },
        { name: "John", score: 38 },
        { name: "Eric", score: 20 },
        { name: "Simon", score: 15 },
        { name: "Bob", score: 10 },
      ],
    };
  },
};
</script>

<style>
</style>