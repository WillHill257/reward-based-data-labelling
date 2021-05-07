<template>
  <div>
    <v-app-bar app dark color="green" clipped-right>
      <v-toolbar-title> Jinx </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text rounded> About </v-btn>
      <v-btn text rounded> Contact us </v-btn>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <!-- //this is the hamburger navigation bar. //this is declaring what it does and
    how it looks. -->
    <v-navigation-drawer
      color="green"
      v-model="drawer"
      absolute
      bottom
      temporary
      right
      fixed
      clipped
    >
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <!-- these are the items in the nav bar. -->
          <v-list-item v-for="item in items" :key="item.text" :to="item.link">
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "AppBar",
  data: () => ({
    // these are the names and the directories for the buttons in the side bar.
    drawer: false,
    group: null,
    items: [
      {
        text: "Landing",
        link: "/",
      },
      {
        text: "About",
        link: "/about",
      },
      {
        text: "Home",
        link: "/home",
      },
      {
        text: "ViewJob",
        link: "/viewJob",
      },
    ],
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>