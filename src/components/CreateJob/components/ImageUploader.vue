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

<script>
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
    onDrop(e) {
      e.preventDefault();
      this.dragover = false;
      // if (e != null) {
      //   const files = e.dataTransfer.files;
      //   console.log(files);
      //   if (files) {
      //     for (var i = 0; i < files.length; i++) {
      //       const element = files[i];
      //       this.onFilesUploaded(element);
      //     }
      //   }
      // }
      var items = e.dataTransfer.items;
      console.log(items);
      for (var i = 0; i < items.length; i++) {
        // webkitGetAsEntry is where the magic happens
        var item = items[i].webkitGetAsEntry();
        if (item) {
          this.traverseFileTree(item);
        }
      }
    },

    traverseFileTree(item, path) {
      path = path || "";
      if (item.isFile) {
        // Get file
        item.file((file) => {
          this.onFilesUploaded(file);
        });
      } else if (item.isDirectory) {
        // Get folder contents
        var dirReader = item.createReader();
        dirReader.readEntries((entries) => {
          for (var i = 0; i < entries.length; i++) {
            this.traverseFileTree(entries[i], path + item.name + "/");
          }
        });
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
