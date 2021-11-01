<template>
  <v-sheet class="mx-auto pa-2" elevation="2" rounded max-width="500">
    <div
      v-if="!$vuetify.breakpoint.smAndDown"
      class="text-h5 text-center mb-6 font-weight-bold"
    >
      Leaderboard
    </div>

    <div v-if="items.length != 0" id="leaderboard">
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
        :style="thisIsMe(items[i])"
      >
        <v-col cols="1" class="mr-2"
          ><div class="text-subtitle-2 text--disabled">{{ i + 1 }}</div>
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
    <div
      v-else
      class="text-body-1 text--secondary text-center"
      id="unavailable"
    >
      Currently no users
    </div>
  </v-sheet>
</template>

<script>
import { getLeaderBoard } from "@/api/Users.api";
import { getUser } from "@/api/Users.api";

export default {
  async mounted() {
    const leaders = await getLeaderBoard();
    this.items = leaders.data;
    const users = await getUser();
    this.userInfo = users.data;
    this.userFirstName = this.userInfo.firstName;
    this.userLastName = this.userInfo.surname;
    this.userRewardCount = this.userInfo.rewardCount;
  },

  data() {
    return {
      selectedItem: 0,
      items: [],
      userInfo: [],
      userFirstName: "",
      userLastName: "",
      userRewardCount: 0,
    };
  },

  methods: {
    rewardRounded(num) {
      //console.log(items);
      return Number(num).toFixed();
    },
    thisIsMe(item) {
      var isItMe = false;
      var firstMatch = false;
      var lastMatch = false;
      var rewardMatch = false;

      //check if the first name matches
      if (item.firstName === this.userFirstName) {
        firstMatch = true;
      }
      //check if the surname matches
      if (item.surname === this.userLastName) {
        lastMatch = true;
      }
      //check if the reward count matches
      if (item.rewardCount === this.userRewardCount) {
        rewardMatch = true;
      }
      // if all three match then that is me
      if (firstMatch == true && lastMatch == true && rewardMatch == true) {
        isItMe = true;
      }

      //if it is me highlight me on the leaderboard
      if (isItMe) {
        return "background-color: #4baaf3;";
      } else {
        return null;
      }
    },
  },
};
</script>

<style></style>
