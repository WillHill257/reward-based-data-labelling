<template>
  <v-container
    @click.prevent="onClick"
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
import Compressor from "compressorjs";

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
    onClick() {
      // opens file explorer for file upload
      this.openFileDialog("image/*", this.onFileDialogChange);
    },

    openFileDialog(accept, callback) {
      // create input element in DOM
      var inputElement = document.createElement("input");
      inputElement.type = "file";
      inputElement.accept = accept;
      inputElement.multiple = "multiple";
      inputElement.addEventListener("change", callback);
      inputElement.dispatchEvent(new MouseEvent("click"));
    },

    onFileDialogChange(e) {
      // loop through the files chosen and compress it
      var files = e.path[0].files;
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        new Compressor(file, {
          quality: 0.7,
          success: (resultFile) => {
            this.onFilesUploaded(resultFile);
          },
        });
      }
    },

    onDrop(e) {
      //when the file is dropped elements appear on the screen to show the images that have been uploaded
      e.preventDefault();
      this.dragover = false;

      var items = e.dataTransfer.items;
      for (var i = 0; i < items.length; i++) {
        // webkitGetAsEntry allows directory traversal
        var item = items[i].webkitGetAsEntry();
        if (item) {
          this.traverseFileTree(item);
        }
      }
    },

    traverseFileTree(item, path) {
      path = path || "";
      if (item.isFile) {
        // Get file extension to check if it is jpeg or png
        const name = item.name;
        const lastDot = name.lastIndexOf(".");
        const extension = name.substring(lastDot + 1);
        if (extension == "png" || extension == "jpg") {
          // compress the file if it is an image
          item.file((file) => {
            new Compressor(file, {
              quality: 0.7,
              success: (resultFile) => {
                this.onFilesUploaded(resultFile);
              },
            });
          });
        } else {
          // emit an event to show forbidden type
          this.$emit("filetypeerror");
        }
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
  /* background-color: #ebebeb; */
  border: 1px solid rgba(128, 128, 128, 0.486);
  border-radius: 10px;
}
</style>
