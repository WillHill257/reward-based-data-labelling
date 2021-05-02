<template>
  <v-dialog width="80%" v-model="isShowDialog" @click:outside="closeDialog">
    <v-card id="createJobCard">
      
      <v-row justify="center" align="center" no-gutters>
        <v-col> <ImageUploader :onFilesUploaded="onFilesUploaded" /></v-col>
        <v-col>
          
          <v-text-field v-model="title" label="Title" id="title-input">
          </v-text-field>

          <v-textarea
            v-model="description"
            label="Description"
            id="description-input"
          >
          </v-textarea>

          <v-text-field
            id = "label-input"
            v-model="labelData"
            label="Labels"
            single-line
            full-width
            hide-details
            @keydown.enter="makePill()"
          ></v-text-field>

          <v-chip-group 
            active-class="primary--text"
            column 
          >
            <v-col  style="padding: 0 0;">
                <v-chip class = "pill" v-show="open" v-for="label in labelArray" :key="label" close deletable-chips @click:close="closePill(label)">
                    {{ label }}
                </v-chip>
            </v-col>
          </v-chip-group>
          
          <v-card-actions style="padding-top: 25%">
            <v-btn color="green" id="submit-input" @click="onSubmitClicked"
              >Submit</v-btn
            >
            <v-btn color="grey" id="discard-input">Discard</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import ImageUploader from "./components/ImageUploader.vue";

export default Vue.extend({
  name: "CreateJob",
  components: { ImageUploader },
  data() {
    return {
      title: "",
      description: "",
      filesUploaded: [],
      labelData: "",
      labelArray: new Array<string>(), 
      open: true
    };
  },

  props: {
    isShowDialog: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    closeDialog(): void {
      this.$emit("update:isShowDialog", false);
      this.title = "";
      this.description = "";
      this.filesUploaded = [];
    },
    onSubmitClicked(): void {
      console.log(this.filesUploaded);
    },
    onFilesUploaded(files: never): void {
      this.filesUploaded.push(files);
    },
    makePill() {
      let arr: Array<string> = this.labelData.split(',')
      for (var i = 0; i < arr.length; i++) {
          if (arr[i].trim() != "" && arr[i].trim() != " "){
            this.labelArray.push(arr[i].trim())
          } 
      }
      this.labelData = ""
      console.log("yo")
    }, 
    closePill(label: string){
      this.labelArray.splice(this.labelArray.indexOf(label), 1)
    }
  },
});
</script>
<style scoped>
#createJobCard {
  padding: 2%;
}
</style>
