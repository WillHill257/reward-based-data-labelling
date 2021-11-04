<template>
  <section id="list-jobs">
    <BackButton />

    <h1 v-if="!jobs.length">There are no jobs to view</h1>
    <!--if there are no jobs availiable this heading will be displayed-->
    <!-- <h1 v-else>Jobs</h1> -->
    <!--when jobs are avaliable this heading will be displayed along with a list of jobs to accept-->

    <section class="basic-grid pt-2">
      <div v-for="job in jobs" :key="job._id">
        <!--for every job that is avaliable the JobSummary compnent will be called and process the job-->
        <!-- when this component  is called it takes in the job info, processes it and returns the job in a summary card format-->
        <JobSummaryCard
          class="card"
          :id="job._id"
          :title="job.title"
          :type="job.type"
          :labels="job.labels"
          :description="job.description"
          :batchID="endpoint === 'accepted' ? job.batch_id : 'undefined'"
          :isMine="endpoint == 'authored'"
        ></JobSummaryCard>
      </div>
    </section>
  </section>
</template>
<!--.card-actions positions the view more button at the bottom left of the summary cards -->
<style>
.card-actions {
  position: absolute;
  bottom: 0;
}
</style>

<script lang="ts">
import BackButton from "@/components/BackButton.vue";

import Vue from "vue";
import JobSummaryCard from "@/components/JobSummaryCard.vue";
import {
  getAvailableJobs,
  getAuthoredJobs,
  getAcceptedJobs,
  getAllJobs,
} from "@/api/Job.api"; // import the relavant api calls

export default Vue.extend({
  components: {
    BackButton,
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
      //labellers: [],
      //numLabellers: 0,
      url: "",
      dataReady: false,
      // store: new Vuex.Store({}),
    };
  },

  props: {
    userId: {
      type: String,
      required: false,
      default: "60ae15438517d247b80aebef",
    },
    endpoint: { type: String, required: false, default: "" },
  },

  methods: {
    // todo - currently force jobs to be of images, eventually becomes general type
    //handelResponseList processs the job and changes the job type to image since its the only type we have at the moment
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
      case "authored": // if the endpoint is authored, the api returns the relavent list of jobs is processed and displayed
        getAuthoredJobs().then((response: any) => {
          this.jobs = this.handleResponseList(response.data);
        });
        break;
      case "accepted": // if the endpoint is accepted, the api returns the relavent list of jobs is processed and displayed
        getAcceptedJobs().then((response: any) => {
          this.jobs = this.handleResponseList(response.data);
        });
        break;
      case "available": // if the endpoint is avaliable, the api returns the relavent list of  avaliable jobs is processed and displayed
        getAvailableJobs().then((response: any) => {
          this.jobs = this.handleResponseList(response.data);
        });
        break;
      default:
        // if there is no endpoint, the api returns a list of all the jobs is processed and displayed
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
/* this puts alll the job summary cards into a grid system */
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
