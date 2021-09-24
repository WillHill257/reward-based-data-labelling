<template>
  <v-sheet class="mx-auto pa-2" elevation="2" rounded max-width="500">
    <div class="text-h5 text-center mb-6 font-weight-bold">Leaderboard</div>

    <div v-if="items.length != 0">
      <v-row class="mx-2" :align="'center'">
        <v-col cols="1" class="mr-2"
          ><v-icon color="primary">mdi-trophy</v-icon>
        </v-col>
        <v-col class="text-left"
          ><div class="text-subtitle-1 text--secondary">Top labeller</div>
          <div class="text-h6">{{ items[0].firstName }}</div></v-col
        >
        <v-spacer></v-spacer>
        <v-col class="text-right" cols="4">
          <span class="primary--text font-weight-medium text-h6">{{
            rewardRounded(items[0].rewardCount)
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
          <div class="text-subtitle-1">{{ items[i].firstName }}</div></v-col
        >
        <v-spacer></v-spacer>
        <v-col class="text-right" cols="4">
          <span>{{ rewardRounded(items[i].rewardCount) }}</span>
        </v-col>
      </v-row>
    </div>
    <div v-else class="text-body-1 text--secondary text-center">
      Currently no users
    </div>
  </v-sheet>
</template>

<script>
import { getLeaderBoard } from "@/api/Users.api";

export default {
  async mounted() {
    const leaders = await getLeaderBoard();
    this.items = leaders.data;
  },

  data() {
    return {
      selectedItem: 0,
      items: [],
    };
  },

  methods: {
    rewardRounded(num) {
      return num.toFixed();
    },
  },
};
</script>

<style></style>
