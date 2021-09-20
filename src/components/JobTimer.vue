<template>
    <div class="text-xs-center">
        <span class ="blue--text">
        {{`${days} days ${hours} : ${mins} : ${secs}`}}
        </span>
        
    </div>
</template>

<script lang="ts">
import { batchTimer } from "@/api/Batch.api";
import Vue from "vue";


export default Vue.extend({

  props: {
    batchID: { type: String, required: true },
  },
  mounted(){
      
      this.expiryTime();
  },

  data()
  {
      return{

          expiry: new Date(),
          days: 0,
          hours: 0,
          mins: 0,
          secs: 0,

      }


  },

  methods: 
  {
    expiryTime() 
    {
        batchTimer(this.$props.batchID).then((res: any)=>{

            this.expiry = new Date(res.data.expiry);
            setInterval( ()=>{
                const distance = (this.expiry.getTime()-Date.now());

                this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
                this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                this.mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                this.secs = Math.floor((distance % (1000 * 60)) / 1000);
            },1000);

        })
        .catch((err: any) => {
            alert("Something went wrong.");
        });
    },
  },
  
});
</script>

<style scoped>

/* div
{
    color: rgb(101, 181, 246);
} */

</style>


