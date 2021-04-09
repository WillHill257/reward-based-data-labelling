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
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-text-field label="Email" prepend-icon="mdi-account-circle" />

          <v-text-field
            label="Password"
            prepend-icon="mdi-lock"
            :type="showPassword ? 'text' : 'Password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          >
          </v-text-field>
          <!-- This is the names of the variables for use when getting the users data-->
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="info" @click="$router.push('/Sign_up')">Register</v-btn>
          <v-btn color="info" @click="$router.push('/Home')">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
    };
  },
};
</script>
