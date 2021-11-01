<template>
  <div>
    <v-app-bar id="AppBarIntro">
      <!-- Clickable logo that return to the home page -->
      <img
        id="AppBarlogo"
        src="../assets/images/JinxLogo.png"
        @click="$router.push({ name: 'HomePage' })"
        :class="this.$vuetify.theme.dark ? 'invertedLogo' : ''"
      />

      <v-spacer></v-spacer>
      <div v-if="isLoggedIn">Hello, {{ firstName }}!</div>
      <v-spacer></v-spacer>

      <!-- if the user is not logged in we show them the logout button only -->
      <div v-if="!isLoggedIn">
        <v-btn
          id="appbar-login"
          text
          rounded
          @click="$router.push({ name: 'Login' })"
        >
          Login
        </v-btn>
        <v-btn
          id="appbar-register"
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
      v-model="drawer"
      absolute
      temporary
      right
      fixed
      clipped
      id="drawer"
    >
      <v-list nav dense>
        <div class="theme-switch-wrapper">
          <v-switch
            inset
            :prepend-icon="'mdi-weather-sunny'"
            :append-icon="'mdi-moon-waning-crescent'"
            @change="toggleTheme()"
            v-model="this.$vuetify.theme.dark"
            id="theme-switcher"
            class="pt-5"
          ></v-switch>
        </div>
        <v-list-item-group v-model="group">
          <!-- these are the items in the nav bar -->
          <v-list-item v-for="item in items" :key="item.text" :to="item.link">
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
          <!-- </v-list-item-group> -->
          <!-- <v-list-item-group > -->
          <!-- <v-btn @click="isShowDialog = true" icon> -->
          <v-list-item
            id="open-create-job"
            v-if="isLoggedIn"
            @click="openCreateJob"
          >
            <v-list-item-title>Create Job</v-list-item-title>
          </v-list-item>
          <!-- <v-icon size="30">mdi-plus</v-icon> -->
          <!-- </v-btn> -->

          <!-- logout -->
          <v-list-item v-if="isLoggedIn" @click="logout()">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <CreateJob :isShowDialog.sync="isShowDialog" />
  </div>
</template>

<script>
import CreateJob from "@/components/CreateJob/CreateJob";
import Vue from "vue";
import { UserModule } from "@/store/modules/user";
import { getUser } from "@/api/Users.api";

export default Vue.extend({
  name: "AppBar",
  components: { CreateJob },
  computed: {
    isLoggedIn() {
      const status = UserModule.isLoggedIn;
      if (status) {
        // logged in
        this.determineUserName();
      }
      return status;
    },
  },
  data() {
    return {
      firstName: "",
      // these are the names and the directories for the buttons in the side bar.
      drawer: false,
      group: null,
      items: [], // items is populated in populateNavItems - we require route resolving
      isShowDialog: false,
      first: true,
    };
  },
  // data: () => ({

  // }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    openCreateJob() {
      if (this.first) {
        // simulate another click
        this.first = false;
        document.getElementById("open-create-job").click();
      } else {
        this.isShowDialog = true;
        this.first = true;
      }
    },

    determineUserName() {
      //getting the user name
      getUser()
        .then((res) => {
          this.firstName = res.data.firstName;
        })
        .catch((err) => {
          console.error(err);
        });
    },

    toggleTheme() {
      // localStorage.setItem("dark-theme",this.$vuetify.theme.dark);
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    },
    populateNavItems() {
      // set nav items and routes
      this.items = [
        {
          text: "Landing",
          link: this.$router.resolve({ name: "Landing" }).href,
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
    const theme = localStorage.getItem("dark_theme");
    if (theme) {
      if (theme == "true") {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    }
  },
});
</script>
<style scoped>
#AppBarIntro.theme--light {
  background-color: rgb(80, 200, 200);
}

#drawer.theme--light {
  background-color: rgb(80, 200, 200);
}

#AppBarIntro {
  /* background-color: rgb(80, 200, 200); */
  max-height: 65px;
  font-weight: 600;
  max-width: 100%;
}

#AppBarlogo {
  max-width: 65px;
  margin-left: 5px;
}

#AppBarlogo:hover {
  cursor: pointer;
}

#AppBarButton {
  font-weight: 600;
}

.invertedLogo {
  filter: invert(1) hue-rotate(180deg);
}
</style>

<style>
.theme-switch-wrapper .v-input__control {
  width: auto;
  flex-grow: 0;
  transform: translateX(10%);
}
</style>
