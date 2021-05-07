<template>
    <v-app>
  
    <h1>Jobs</h1>

    <v-container grid-list-lg>

      <v-layout 
      row wrap>
        <v-flex 
        xs12 sm6 md4 lg3 
        v-for="job in jobs" :key="job.title">
          <v-card 
          elevation="5" 
          width="300px"
          height ="200px">

            <v-card-title 
            id = "job-title">
            {{job.title}}
            </v-card-title>

            <v-card-subtitle 
            id = "job-type">
                {{job.type}}
                </v-card-subtitle>

            <v-card-text 
            >
              <v-clamp id = "job-description" autoresize :max-lines="3">{{ job.description }}</v-clamp>
              </v-card-text>

            <v-card-actions 
            class ="card-actions"
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

<style>
.card-actions {
  position: absolute;
  bottom: 0;
}
</style>

<script>
import VClamp from "vue-clamp";
export default {
  components: {
    VClamp
  },
  data() {
    return {
      jobs: [
        { title: 'Title', type: 'Type', description: 'Description' },
        { title: 'Dog vs Cats', type: 'Image', description: 'Identify whether an image is one of a cat or a dog.eufhef usin fesuif seuibfsi uebfsi uebfsi uebfui sbiuebfsi ufuebufbciefbicsbf' },
        { title: 'Clouds', type: 'Image', description: 'Identify the types of clouds in an image.' },
        { title: 'Parts of speech', type: 'Text', description: 'Identify Parts of speech when given a word fioen nfeio foie nosfao nfi oesfn slkfei n sif nensn fsen fosieefinceinfone cienfencf'},
        { title: 'Farm animals', type: 'Image', description: 'Identify the farm animal when given an image ienfos f ein oseif snefn sienfos efnienf s cfiencubfuebicfebcfbec ceubfciue ceocf' },
        { title: 'Digits', type: 'Image', description: 'Identify hand written number in an image'},
        { title: 'Title', type: 'Type', description: 'Description' },
        { title: 'Dog vs Cats', type: 'Image', description: 'Identify whether an image is one of a cat or a dog.eufhef usin fesuif seuibfsi uebfsi uebfsi uebfui sbiuebfsi ufuebufbciefbicsbf' },
        { title: 'Clouds', type: 'Image', description: 'Identify the types of clouds in an image.' },
        { title: 'Parts of speech', type: 'Text', description: 'Identify Parts of speech when given a word fioen nfeio foie nosfao nfi oesfn slkfei n sif nensn fsen fosieefinceinfone cienfencf'},
        { title: 'Farm animals', type: 'Image', description: 'Identify the farm animal when given an image ienfos f ein oseif snefn sienfos efnienf s cfiencubfuebicfebcfbec ceubfciue ceocf' },
        { title: 'Digits', type: 'Image', description: 'Identify hand written number in an image'},
        { title: 'Title', type: 'Type', description: 'Description' },
        { title: 'Dog vs Cats', type: 'Image', description: 'Identify whether an image is one of a cat or a dog.eufhef usin fesuif seuibfsi uebfsi uebfsi uebfui sbiuebfsi ufuebufbciefbicsbf' },
        { title: 'Clouds', type: 'Image', description: 'Identify the types of clouds in an image.' },
        { title: 'Parts of speech', type: 'Text', description: 'Identify Parts of speech when given a word fioen nfeio foie nosfao nfi oesfn slkfei n sif nensn fsen fosieefinceinfone cienfencf'},
        { title: 'Farm animals', type: 'Image', description: 'Identify the farm animal when given an image ienfos f ein oseif snefn sienfos efnienf s cfiencubfuebicfebcfbec ceubfciue ceocf' },
        { title: 'Digits', type: 'Image', description: 'Identify hand written number in an image'},
        { title: 'Title', type: 'Type', description: 'Description' },
        { title: 'Dog vs Cats', type: 'Image', description: 'Identify whether an image is one of a cat or a dog.eufhef usin fesuif seuibfsi uebfsi uebfsi uebfui sbiuebfsi ufuebufbciefbicsbf' },
        { title: 'Clouds', type: 'Image', description: 'Identify the types of clouds in an image.' },
        { title: 'Parts of speech', type: 'Text', description: 'Identify Parts of speech when given a word fioen nfeio foie nosfao nfi oesfn slkfei n sif nensn fsen fosieefinceinfone cienfencf'},
        { title: 'Farm animals', type: 'Image', description: 'Identify the farm animal when given an image ienfos f ein oseif snefn sienfos efnienf s cfiencubfuebicfebcfbec ceubfciue ceocf' },
        { title: 'Digits', type: 'Image', description: 'Identify hand written number in an image'},
      ]
    }
  }
}
</script>