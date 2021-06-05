<template>
  <section id="list-jobs">
    <goBack />

    <h1 v-if="!jobs.length">There are no jobs available</h1>
    <h1 v-else>Jobs</h1>

    <section class="basic-grid">
      <div v-for="job in jobs" :key="job._id">
        <JobSummaryCard
          class="card"
          :id="job._id"
          :title="job.title"
          :type="job.type"
          :labels="job.labels"
          :description="job.description"
        ></JobSummaryCard>
      </div>
    </section>
  </section>
</template>

<style>
.card-actions {
  position: absolute;
  bottom: 0;
}
</style>

<script lang="ts">
import goBack from "@/components/BackButton.vue";

import Vue from "vue";
import JobSummaryCard from "@/components/JobSummaryCard.vue";
import {
  getAvailableJobs,
  getAuthoredJobs,
  getAcceptedJobs,
  getAllJobs,
} from "@/api/Job.api";

export default Vue.extend({
  components: {
    goBack,
    JobSummaryCard,
  },

  // todo - define a prop so know what type of jobs to get

  data() {
    return {
      jobs: [
        {
          _id: "0",
          title: "Title",
          type: "Type",
          description: "Description",
          labels: ["Labels"],
        },
      ],
    };
  },

  props: {
    userId: {
      type: String,
      required: false,
      default: "60a62a9fab8896534b7a8d23",
    },
    endpoint: { type: String, required: false, default: "" },
  },

  methods: {
    // todo - currently force jobs to be of images, eventually becomes general type

    handleResponseList(list: Array<any>) {
      // assign the job data type
      for (let i = 0; i < list.length; i++) {
        list[i].type = "Image";
      }

      return list;
    },
  },
  mounted() {
    // trigger the request to get the jobs from the server
    switch (this.endpoint) {
      case "authored":
        getAuthoredJobs().then((response: any) => {
          this.jobs = this.handleResponseList(response.data);
        });
        break;
      case "accepted":
        getAcceptedJobs().then((response: any) => {
          this.jobs = this.handleResponseList(response.data);
        });
        break;
      case "available":
        getAvailableJobs().then((response: any) => {
          this.jobs = this.handleResponseList(response.data);
        });
        break;
      default:
        getAllJobs().then((response: any) => {
          this.jobs = this.handleResponseList(response.data);
        });
    }
  },
});
</script>

<style scoped>
.card {
  width: 300px;
}

.basic-grid {
  /* define a grid layout */
  display: grid;
  gap: 1rem;

  align-items: center;
  justify-items: center;

  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

@media (min-width: 1264px) {
  .basic-grid {
    /* add padding to prevent the grid becoming too wide on large screens */
    padding-left: 10rem;
    padding-right: 10rem;
  }
}
</style>
