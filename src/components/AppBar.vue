<template>
  <div>
    <v-app-bar id="AppBarIntro">
      <img
        id="AppBarlogo"
        src="../assets/images/JinxLogo.png"
        @click="$router.push({ name: 'HomePage' })"
      />
      <v-spacer></v-spacer>
      <div v-if="!isLoggedIn">
        <v-btn
          id=""
          text
          rounded
          @click="$router.push({ name: 'Login' })"
        >
          Login
        </v-btn>
        <v-btn
          id="AppBarButton"
          text
          rounded
          @click="$router.push({ name: 'Signup' })"
        >
          Register
        </v-btn>
      </div>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <!-- //this is the hamburger navigation bar. //this is declaring what it does and
    how it looks. -->
    <v-navigation-drawer
      color="rgb(80,200,200)"
      v-model="drawer"
      absolute
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
        <div v-if="isLoggedIn">
          <v-btn @click="isShowDialog = true" icon>
            <v-icon size="30">mdi-plus</v-icon>
          </v-btn>

          <!-- logout -->
          <v-list-item @click="logout()">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </div>
      </v-list>
    </v-navigation-drawer>
    <CreateJob :isShowDialog.sync="isShowDialog" />
  </div>
</template>

<script>
import CreateJob from "@/components/CreateJob/CreateJob";
import Vue from "vue";
import { UserModule } from "@/store/modules/user";
export default Vue.extend({
  name: "AppBar",
  components: { CreateJob },
  computed: {
    isLoggedIn() {
      return UserModule.isLoggedIn;
    },
  },
  data: () => ({
    // these are the names and the directories for the buttons in the side bar.
    drawer: false,
    group: null,
    items: [], // items is populated in populateNavItems - we require route resolving
    isShowDialog: false,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    populateNavItems() {
      // set nav items and routes
      this.items = [
        {
          text: "Landing",
          link: this.$router.resolve({ name: "Landing" }).href,
        },
        {
          text: "About",
          link: this.$router.resolve({ name: "About" }).href,
        },
        {
          text: "Home",
          link: this.$router.resolve({ name: "HomePage" }).href,
        },
        {
          text: "Available Jobs",
          link: this.$router.resolve({ name: "ListJobs" }).href,
        },
      ];
    },

    logout() {
      UserModule.logoutUser();
    },
  },
  mounted() {
    this.populateNavItems();
  },
});
</script>
<style scoped>
#AppBarIntro {
  background-color: rgb(80, 200, 200);
  max-height: 65px;
  font-weight: 600;
  max-width: 100%;
}

#AppBarlogo {
  max-width: 65px;
  margin-left: 5px;
}

#AppBarButton {
  font-weight: 600;
}
</style>
