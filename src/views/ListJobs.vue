<template>
  <section id="list-jobs">
    <goBack />

    <h1 v-if="!jobs.length">There are no jobs available</h1>
    <h1 v-else>Jobs</h1>

    <section class="basic-grid">
      <div v-for="job in jobs" :key="job._id" >
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

import axios from "axios";
import Vue from "vue";
import JobSummaryCard from "@/components/JobSummaryCard.vue";
import Job from '@/store/modules/job';
import { getModule } from "vuex-module-decorators";
import Vuex from "vuex";

export default Vue.extend({
  components: {
    goBack,
    JobSummaryCard,
  },
  created () {
    const Jobmod = getModule(Job, this.$store)

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
      store: new Vuex.Store({})
    };
  },
  async mounted() {
    // trigger the request to get the jobs from the server
    this.getJobsList(this.endpoint === "");

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
    getJobsList(getAll: boolean) {
      // get all the available jobs from the server
      const config: any = {
        method: "get",
        url: getAll
          ? "http://localhost:4000/api/job/"
          : "http://localhost:4000/api/job/" +
            this.endpoint +
            "/" +
            this.userId,
        headers: {},
      };

      axios(config)
        .then((response) => {
          // let temp: Array<any>;

          this.jobs = response.data;
          for (let i = 0; i < this.jobs.length; i++) {
            this.jobs[i].type = "Image";
          }

          // if (endpoint === "available") this.available = temp;
          // else if (endpoint === "authored") this.authored = temp;
          // else this.accepted = temp;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
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
