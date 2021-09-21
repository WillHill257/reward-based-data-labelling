<template>
  <v-dialog v-model="isShowDialog" @click:outside="closeDialog" max-width="350">
    <v-card id="QuitJobCard" class="pt-0">
      <v-card-title class="headline justify-center"> Quit Job? </v-card-title>
      
	  <v-card-text>
        Are you sure you would like to quit this job?
      </v-card-text>
      <v-card-actions>
        <v-btn
          id="cancel-button"
          color="deep-blue lighten-2"
          text
          @click="closeDialog()"
        >
          Cancel
        </v-btn>
		<v-spacer></v-spacer>
		<v-btn
		id="quit-button"
        class="ma-2"
        color="red"
		text
        @click="quitJob()"

      	>
        
        <v-icon
		  left
        >
          mdi-cancel
        </v-icon>
		Quit
      </v-btn>
        <!-- <v-btn
          id="quit -button"
          color="red"
          text
          @click="quitJob()"
        >
          Quit
        </v-btn> -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { deleteLabeller } from "@/api/Batch.api";

export default Vue.extend({
  name: "QuitJob",
  props: {
    isShowDialog: {
      type: Boolean,
      required: true,
    },
    batchID: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeDialog(): void {
      this.$emit("update:isShowDialog", false);
    },

	removeLabeller(success: any, failure: any){
		deleteLabeller(this.$props.batchID)
		.then(() => {
			success();
		})
		.catch((err: any) => {
          failure(err);
        });
	},

	quitJob(): void {
    	this.removeLabeller(
        () => {
          this.closeDialog();
        },
        (err: any) => {
          alert("Oops something has gone wrong! \n Please try again later");
        }
      );
    },
  },
});
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
