
<template>
  <v-content style="
  padding-left: 4%;
  padding-top: 2%;
  padding-right: 4%" >

    
    <v-text-field
    label="Title"
    id = "title-input">
    </v-text-field>

    <v-textarea
      label="Description"
      id = "description-input">
    </v-textarea>

    <v-card-actions style="padding-left: 80%; padding-top: 25%">
    <v-btn color="green" id = "submit-input">Submit</v-btn>
    <v-btn color="grey" id = "discard-input">Discard</v-btn>
    </v-card-actions>
  </v-content>
</template>

