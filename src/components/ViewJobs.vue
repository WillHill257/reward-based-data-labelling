<template>
    <v-app>
  
    <h1>Jobs</h1>

    <v-container grid-list-md>

      <v-layout 
      row wrap>
        <v-flex 
        xs12 sm6 md4 lg3 
        v-for="job in jobs" :key="job.title">
          <v-card 
          elevation="2" >

            <v-card-title 
            id = "job-title">
            {{job.title}}
            </v-card-title>

            <v-card-subtitle 
            id = "job-type">
                {{job.type}}
                </v-card-subtitle>

            <v-card-text 
            id = "job-description">
              {{ job.description }}
              </v-card-text>

            <v-card-actions 
            flat >
            <v-btn
            id ="btn-view-job"
            color = "blue"
            text>
                View job
                </v-btn>
               </v-card-actions>

          </v-card>
        </v-flex>
      </v-layout>

    </v-container>
    
 
    </v-app>
</template>

<script>
export default {
  data() {
    return {
      jobs: [
        { title: 'Title', type: 'Type', description: 'Description' },
        { title: 'Dog vs Cats', type: 'Image', description: 'Identify whether an image is one of a cat or a dog.' },
        { title: 'Clouds', type: 'Image', description: 'Identify the types of clouds in an image.' },
        { title: 'Parts of speech', type: 'Text', description: 'Identify Parts of speech when given a word'},
        { title: 'Farm animals', type: 'Image', description: 'Identify the farm animal when given an image' },
        { title: 'Digits', type: 'Image', description: 'Identify hand written number in an image'},
      ]
    }
  }
}
</script>