<template>
  <v-app>
    <!-- Nav bar-->

    <v-main>
      <v-card width="500" class="mx-auto mt-9">
        <!-- Login form-->
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-alert
            id="globalError"
            :value="alert"
            dense
            dismissible
            outlined
            type="warning"
            >{{ Error }}</v-alert
          >
          <v-form ref="form" v-model="valid" lazy-validation class="mx-4">
            <!-- nter email address -->
            <v-text-field
              id="login-email-input"
              v-model="email"
              label="E-mail"
              required
              prepend-icon="mdi-account-circle"
            ></v-text-field>

            <!-- enter password -->
            <v-text-field
              id="login-password-input"
              v-model="password"
              label="Password"
              required
              prepend-icon="mdi-lock"
              :type="showPassword ? 'text' : 'Password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <!-- I belong here log me in -->
          <v-btn
            color="info"
            @click.native="loginOnClick"
            class="login-click"
            id="login-confirm-button"
            >Login</v-btn
          >
          <!-- I don't have an account I meant to register -->
          <v-btn
            id="login-cancel-button"
            color="info"
            @click="$router.push({ name: 'Signup' })"
            >Register</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { VueForm } from "../componentTypes";
import { getModule } from "vuex-module-decorators";
import { UserModule } from "@/store/modules/user";
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    valid: true,
    password: "",
    email: "",
    showPassword: false,
    Error: "",
    alert: false,
  }),

  computed: {
    form(): VueForm {
      // set form type

      return this.$refs.form as VueForm;
    },
  },

  methods: {
    // ...mapActions("user", ["loginUser"])
    loginOnClick(): void {
      // getting data
      var user = {
        email: this.email,
        password: this.password,
      };

      this.hideError();
      const message = this.validate();
      if (message === "true") {
        // if form is valid, continue with login
        //const userMod = getModule(UserModule, this.$store);
        UserModule.loginUser(user)
          .then(() => {
            // successful login - navigate to homepage, user object is in store
            this.$router.push({ name: "HomePage" });
          })
          .catch((errorMessage: string) => {
            // login failed - display error and stop here
            this.setErrorMessage(
              "The email and password combination does not exist"
            );
          });
      } else {
        // form is invalid - complete it correctly
        this.setErrorMessage(message);
      }
    },
    setErrorMessage(message: string): void {
      // display error with this message
      this.alert = true;
      this.Error = message;
    },
    hideError(): void {
      // remove error
      this.alert = false;
      this.Error = "";
    },
    validate(): string {
      // check form rules are adhered to
      if (this.email == "" || this.password == "") {
        return "Please complete form";
      }

      if (this.email.includes("@")) {
        if (this.password != "" && this.password.length >= 8) {
          return "true";
        } else {
          return "Email and password combination incorrect";
        }
      } else {
        return "Please enter a valid email";
      }
    },
  },
});
</script>

<style>
/* get rid of the autofill coloured box */
input:-internal-autofill-selected {
  transition: all 0s 50000s;
}
</style>
