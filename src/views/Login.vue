<template>
  <v-app>
    <!-- Nav bar-->
    <v-app-bar id='AppBarIntro'>
      <img id= AppBarlogo src="../assets/JinxLogo.png" />
 
      <v-spacer></v-spacer>
      <v-btn id='AppBarButton' text rounded> About </v-btn>
      <v-btn id='AppBarButton' text rounded> Contact us </v-btn>
    </v-app-bar>

    <v-content>
      <v-card width="500" class="mx-auto mt-9">
        <!-- Login form-->
        <v-card-title >Login</v-card-title>
        <v-alert
          id="globalError"
          :value="alert"
          dense
          dismissible
          outlined
          type="warning"
          >{{ Error }}</v-alert
        >
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation class="mx-4">
            <v-text-field
              id="login-email-input"
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
              prepend-icon="mdi-account-circle"
            ></v-text-field>

            <v-text-field
              id="login-password-input"
              v-model="password"
              :rules="passwordRules"
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
          
          <v-btn color="info" @click="LoginOnClick">Login</v-btn>
          <v-btn color="info" @click="$router.push('/Sign_up')">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    password: "",
    passwordRules: [(v) => !!v || "Password is required"],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    showPassword: false,
    Error: "",
    alert: false,
  }),

  methods: {
    LoginOnClick(event) {
      //getting data
      var emailText = this.email;
      var passwordText = this.password;
      //this.alert = false
      this.$refs.form.validate();
      if (emailText != "" && passwordText != "") {
        this.alert = false;
        //checking against DB
        const url = "http://localhost:4000/api/user/login";
        this.axios
          .get(url, { params: { email: emailText, password: passwordText } })
          .then((response) => {
            if (response.status === 200) {
              //login - request successful
              this.$router.push({ name: "HomePage" });
            } else if (response.status === 401) {
              //unsuccessful 401 error payload
              this.alert = true;
              this.Error = "Email and password combination not found";
            } else {
              //throw error
              this.alert = true;
              this.Error = "Something went wrong";
            }
            console.log(response);
          });
      }
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
