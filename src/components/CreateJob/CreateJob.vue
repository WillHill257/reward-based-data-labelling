<template>
  <v-dialog
    v-model="isShowDialog"
    @click:outside="closeDialog">
    <v-card id="createJobCard">
      <v-row>
        <v-col>
          <v-text-field
            v-model="title"
            label="Title"
            id="title-input">
          </v-text-field>

          <v-textarea
            v-model="description"
            label="Description"
            id="description-input">
          </v-textarea>

          <v-card-actions style="padding-left: 80%; padding-top: 25%">
            <v-btn color="green" id="submit-input">Submit</v-btn>
            <v-btn color="grey" id="discard-input">Discard</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CreateJob",

  data() {
    return { title: "", description: "" };
  },

  props: {
    isShowDialog: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    closeDialog() {
      this.$emit("update:isShowDialog", false);
      this.title = "";
      this.description = "";
    }
  }
};
</script>
<style scoped>
#createJobCard {
  padding: 2%
}
</style>


