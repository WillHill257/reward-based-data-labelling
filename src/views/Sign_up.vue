<template>
  <v-app>
    <v-app-bar app dark color="green">
      <v-toolbar-title> Jinx </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text rounded> About </v-btn>
      <v-btn text rounded> Contact us </v-btn>
    </v-app-bar>

    <v-content>
      <v-card width="500" class="mx-auto mt-9">
        <v-card-title
          v-model="paddingDirection"
          :items="directions"
          class="pr-2"
          label="Padding"
        >
          Sign Up</v-card-title
        >

        <v-card-text>
          <v-alert
            :style="{ visibility: errorVisibility }"
            :height="errorHeight"
            dense
            dismissible
            outlined
            type="warning"
            >{{ errorAlert }}</v-alert
          >
          <v-text-field
            id="signup-firstname-input"
            label="First Name"
            prepend-icon="mdi-account-circle"
            v-model="firstName"
          />
          <v-text-field
            id="signup-surname-input"
            label="Surname"
            prepend-icon="mdi-account-circle"
            v-model="surname"
          />
          <v-text-field
            label="Email"
            prepend-icon="mdi-at"
            id="signup-email-input"
            v-model="email"
          />

          <v-text-field
            id="signup-password-input"
            v-model="password"
            label="Password"
            prepend-icon="mdi-lock"
            :type="showPassword ? 'text' : 'Password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          >
          </v-text-field>

          <v-text-field
            id="signup-confirmpassword-input"
            v-model="confirmPassword"
            label="Confirm Password"
            prepend-icon="mdi-lock-check"
            :type="showPassword ? 'text' : 'Password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          >
          </v-text-field>
          <!-- The Label is the name of the variable for use when getting the users data-->
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            id="signup-confirm-button"
            color="success"
            @click="$router.push('/Home')"
            v-on:click="onSignUp"
            >Sign Me UP</v-btn
          >
          <v-btn
            id="signup-cancel-button"
            color="info"
            @click="$router.push('/Login')"
            >Already Registered</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      errorAlert: "",
      errorHeight: 0,
      errorVisibility: "Hidden",
      showPassword: false,
      firstName: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    ...mapActions("user", ["signupUser"]),
    onSignUp() {
      if (
        this.verifyFields(
          this.firstName,
          this.surname,
          this.email,
          this.password,
          this.confirmPassword
        ) == "Passed"
      ) {
        var newUser = {
          firstName: this.firstName,
          surname: this.surname,
          email: this.email,
          password: this.password,
        };
        this.signupUser(
          this.firstName,
          this.surname,
          this.email,
          this.password
        );
        // axios
        //   .post("http://localhost:4000/api/user/", newUser)
        //   .then()
        //   .catch(function (error) {
        //     console.log(error);
        //   });

        // console.log("Success!");
        // this.$router.push("/Home");
      } else {
        console.log("Unsuccessful");
        this.errorAlert = this.verifyFields(
          this.firstName,
          this.surname,
          this.email,
          this.password,
          this.confirmPassword
        );
        this.errorVisibility = "visible";
        this.errorHeight = 40;
      }
    },

    verifyFields(fName, sName, email, pWord, cpWord) {
      if (
        fName == "" ||
        sName == "" ||
        email == "" ||
        pWord == "" ||
        cpWord == ""
      ) {
        return "All fields required";
      } else if (email.search("@") == -1) {
        return "Email is invalid";
      } else if (pWord != cpWord) {
        return "Passwords do not match";
      } else if (pWord.length < 8) {
        return "Password too short";
      } else {
        return "Passed";
      }
    },
  },
};
</script>
