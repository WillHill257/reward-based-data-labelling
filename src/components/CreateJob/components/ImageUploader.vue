<template>
  <v-container
    @drop.prevent="onDrop($event)"
    @dragover.prevent="dragover = true"
    @dragenter.prevent="dragover = true"
    @dragleave.prevent="dragover = false"
    :class="{ 'grey lighten-2': dragover }"
  >
    <v-card-text>
      <v-col align="center" justify="center">
        <v-icon class="mt-5" size="60">mdi-cloud-upload</v-icon>
        <p>Drop your file(s) here, or click to select them.</p>
      </v-col>
    </v-card-text>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "ImageUploader",
  props: {
    onFilesUploaded: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      dragover: false,
      uploadedFiles: [],
    };
  },
  methods: {
    onDrop(e: any) {
      console.log("hey");
      this.dragover = false;
      e.dataTransfer.files.forEach((element) => this.onFilesUploaded(element));
    },
  },
});
</script>
