<template>
  <v-row justify="center">
    <v-dialog v-model="isShowDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5"
          ><v-icon left color="deep-orange accent-4">
            mdi-alert-circle-outline </v-icon
          >{{ title }}</v-card-title
        >
        <v-card-text>{{ message }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDialog"> Okay </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    isShowDialog: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },

  methods: {
    closeDialog(): void {
      this.$emit("update:isShowDialog", false);
    },
  },
});
</script>
