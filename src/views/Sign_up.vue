<template>
  <v-app>
    <v-main>
      <v-card width="500" class="mx-auto mt-9">
        <v-card-title class="pr-2" label="Padding"> Sign Up</v-card-title>

        <v-card-text>
          <!-- show error messages to user -->
          <v-alert
            :style="{ visibility: errorVisibility }"
            :height="errorHeight"
            dense
            dismissible
            outlined
            type="warning"
            >{{ errorAlert }}</v-alert
          >
          <!-- user info entered -->
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
          <!-- Make an account -->
          <v-btn
            id="signup-confirm-button"
            color="success"
            v-on:click.native="onSignUp"
            >Sign Me UP</v-btn
          >
          <!-- I already have an account, redirect em to login -->
          <v-btn
            id="signup-cancel-button"
            color="info"
            v-on:click.native="$router.push({ name: 'Login' })"
            >Already Registered</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { AxiosResponse } from "axios";
import { UserModule } from "@/store/modules/user";
import { getModule } from "vuex-module-decorators";
import Vue from "vue";

export default Vue.extend({
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
    onSignUp(): void {
      if (
        this.verifyFields(
          this.firstName,
          this.surname,
          this.email,
          this.password,
          this.confirmPassword
        ) === "Passed"
      ) {
        var newUser = {
          firstName: this.firstName,
          lastName: this.surname,
          email: this.email,
          password: this.password,
        };
        // access the vuex store to create new user using the above details
        UserModule.signupUser(newUser)
          .then((res) => {
            this.$router.push({ name: "HomePage" });
          })
          //if email already in db, do not allow second entry with same email
          .catch((errorMessage: string) => {
            this.setErrorAlert("User already exists");
          });
      } else {
        //signup unsuccessful
        this.setErrorAlert(
          this.verifyFields(
            this.firstName,
            this.surname,
            this.email,
            this.password,
            this.confirmPassword
          )
        );
      }
    },

    setErrorAlert(message: string): void {
      this.errorAlert = message;
      this.errorVisibility = "visible";
      this.errorHeight = 40;
    },

    verifyFields(
      fName: string,
      sName: string,
      email: string,
      pWord: string,
      cpWord: string
    ): string {
      //no empty fields
      if (
        fName === "" ||
        sName === "" ||
        email === "" ||
        pWord === "" ||
        cpWord === ""
      ) {
        return "All fields required";
        //email must have @
      } else if (email.search("@") === -1) {
        return "Email is invalid";
      } else if (pWord !== cpWord) {
        //passwords must match
        return "Passwords do not match";
        //password must be more than 8 characters
      } else if (pWord.length < 8) {
        return "Password too short";
      } else {
        return "Passed";
      }
    },
  },
});
</script>
