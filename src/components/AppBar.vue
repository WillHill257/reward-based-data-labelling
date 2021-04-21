<template>
  <div>
    <v-app-bar app dark color="green">
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
    >
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <!-- //these are the items in the nav bar. -->
          <v-list-item>
            <v-list-item-title>Foo</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Bar</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Fizz</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Buzz</v-list-item-title>
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
    drawer: false,
    group: null,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>