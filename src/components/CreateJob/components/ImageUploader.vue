<template>
  <v-container
    @drop.prevent="onDrop($event)"
    @dragover.prevent="dragover = true"
    @dragenter.prevent="dragover = true"
    @dragleave.prevent="dragover = false"
    :class="{ 'grey lighten-2': dragover }"
    id="dragAndDropContainer"
  >
    <v-card-text>
      <v-col align="center">
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
      //required: true,
    },
  },
  data() {
    return {
      dragover: false,
    };
  },
  methods: {
    onDrop(e: any) {
      this.dragover = false;
      if (e != null) {
        const files = e.dataTransfer?.files;
        if (files) {
          for (var i = 0; i < files.length; i++) {
            const element: File = files[i];
            this.onFilesUploaded(element);
          }
        }
      }
    },
  },
});
</script>

<style scoped>
#dragAndDropContainer {
  background-color: #ebebeb;
}
</style>
