<template>
  <div>
    <div class="text-center">
      <span class="blue--text">
        <!-- &lt == < (js has an issue with that symbol for some reason so that is the fix) -->
        <!-- ? is a ternary operator and works like an if statement -->
        {{`${days>0 ? days+"D":""} ${hours>0 ? hours+"H":""} ${mins &lt; 9 ? "0"+mins:mins}M ${secs &lt; 9 ? "0"+secs:secs}S`}}
      </span>
    </div>
    <ErrorDialog
      :isShowDialog.sync="showError"
      :title="'An error occurred'"
      :message="'Please try again. If the problem persists, please contact support.'"
    />
  </div>
</template>

<script lang="ts">
import { batchTimer } from "@/api/Batch.api";
import Vue from "vue";
import ErrorDialog from "@/components/ErrorDialog.vue";

export default Vue.extend({
  components: { ErrorDialog },
  props: {
    batchID: { type: String, required: true },
  },
  mounted() {
      
    this.expiryTime();
  },

  data() {
    return {
      expiry: new Date(),
      days: NaN,
      hours: NaN,
      mins: NaN,
      secs: NaN,
      showError: false,
    };
  },

  methods: {

    expiryTime() {
      batchTimer(this.$props.batchID)
        .then((res: any) => {
          this.expiry = new Date(res.data.expiry);
          setInterval(() => {
            const distance = this.expiry.getTime() - Date.now();
            this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
            this.hours = Math.floor(
              (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            this.mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            this.secs = Math.floor((distance % (1000 * 60)) / 1000);
          }, 1000);
        })
        .catch((err: any) => {
          this.showError = true;
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
