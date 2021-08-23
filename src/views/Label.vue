<template>
    <v-card
    id = "labelCard"
    :loading="loading"
    class="mx-auto my-12 "
    max-width="374"
  >
    <!-- TODO get image from DB -->
    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      id = "labelImage"
    ></v-img>

    
    <v-card-title
    id = "instruction"
    >Select a label that best matches the image</v-card-title>

    <v-divider class="mx-4" id = "divider"></v-divider>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="indigo accent-4 white--text"
        column
        multiple
        id = "labelChoices"
      >
        <!-- TODO get labels from DB -->
        <v-chip
        @click="addToSelection(label)" v-for="label in availableLabels" :key="label" class="label">
          {{label}}
        </v-chip>

      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <!-- TODO functionality for next button goes to the next unlabelled image in the DB -->
      <!-- TODO functionality for next saves current labels and resets the array - not mine -->
      <v-btn
        color="deep-blue lighten-2"
        text
        @click="reserve"
        id = "nextImageBtn"
      >
        Next
      </v-btn>
    </v-card-actions>
    </v-card>
</template>

<script lang = "ts">
import Vue from "vue";

export default Vue.extend({
  name: "LabelImages",
  components: { },
  data() {
    return {
      //labels selected by user
      selectedLabels: new Array<string>(),
      availableLabels: ["Restaurant", "Running", "Yoga Studio", "Shopping Centre"]
    }
  },
  props: {
  },

  methods: {
    //adds the labels selected by the user to an array
    addToSelection(selectedLabel: string){
      console.log("Before:" + this.selectedLabels)
      if (this.selectedLabels.includes(selectedLabel)){
        console.log('In already')
        this.selectedLabels.splice(this.selectedLabels.indexOf(selectedLabel), 1)
      }else{
        console.log('In now')
        this.selectedLabels.push(selectedLabel)
      }
      console.log("After:" + this.selectedLabels)
    },
  },
});
</script>

<style>
</style>