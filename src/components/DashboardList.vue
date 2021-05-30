<template>
  <v-container>
    <v-list>
      <!-- Title -->
      <h3 class="title">{{ title }}</h3>
      <!-- Content -->
      <!-- Scrollable list of job cards -->
      <!-- Ends with button to view all -->
      <!-- Height is set in dashboard -->
      <v-virtual-scroll
        class="recycler-view"
        :items="items"
        :bench="2"
        :item-height="cardHeight"
      >
        <template v-slot:default="{ item }">
          <JobSummaryCard
            v-if="item.title !== sentinel"
            class="job-card"
            :id="item._id"
            :title="item.title"
            :type="item.type"
            :labels="item.labels"
            :description="item.description"
          ></JobSummaryCard>
          <v-row
            v-else
            :style="{ height: cardHeight + 'px' }"
            align="center"
            justify="center"
          >
            <ViewMoreButton
              class="view-more"
              @click.native="goToJobList()"
            ></ViewMoreButton>
          </v-row>
        </template>
      </v-virtual-scroll>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import JobSummaryCard from "./JobSummaryCard.vue";
import ViewMoreButton from "./ViewMoreButton.vue";

export default Vue.extend({
  components: { JobSummaryCard, ViewMoreButton },

  data() {
    return {
      sentinel: "!@#@!",
    };
  },

  props: {
    // title is the list heading
    // jobs is the list of jobs to be displayed
    title: { type: String, required: true },
    jobs: { type: Array, required: true },
    limit: { type: Number, required: false, default: 6 },
    endpoint: { type: String, required: true },
  },

  computed: {
    items(): Array<any> {
      let returns: Array<any>;

      // add the correct number of jobs to the array
      if (this.jobs.length <= this.limit) returns = this.jobs;
      else returns = this.jobs.slice(0, this.limit);

      // add the View All button
      returns.push({ title: this.sentinel });

      return returns;
    },

    cardHeight(): number {
      return 210;
    },
  },

  methods: {
    goToJobList() {
      // todo - Pass through argument so knows what kind of job to display
      this.$router.push({
        name: "ListJobs",
        params: { endpoint: this.endpoint },
      });
    },
    // does not show jobs that are full
    jobFull(labellers:Array<string>,  numLabellersRequired:number){
      return labellers.length < numLabellersRequired
    },
  },
});
</script>

<style scoped>
.title {
  text-align: center;
}

.recycler-view {
  padding-top: 10px;
}

.job-card {
  width: 98%;
  margin: auto;
}
</style>
