<template>
  <section id="list-jobs">
    <h1>Jobs</h1>

    <section class="basic-grid">
      <div v-for="job in jobs" :key="job._id">
        <JobSummaryCard
          class="card"
          :id="job._id"
          :title="job.title"
          :type="job.type"
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

<script>
import axios from "axios";
import Vue from "vue";
import JobSummaryCard from "@/components/JobSummaryCard";

export default Vue.extend({
  components: {
    JobSummaryCard,
  },

  // todo - define a prop so know what type of jobs to get

  data() {
    return {
      jobs: [
        { _id: "0", title: "Title", type: "Type", description: "Description" },
      ],
    };
  },
  methods: {
    getAllJobs() {
      // get all the available jobs from the server
      const config = {
        method: "get",
        url: "http://localhost:4000/api/job",
        headers: {},
      };

      axios(config)
        .then((response) => {
          // reassign the jobs from the response to this.data
          this.jobs = response.data;
          for (let i = 0; i < this.jobs.length; i++) {
            // todo - currently force jobs to be of images, eventually becomes general type
            this.jobs[i].type = "Image";
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    // trigger the request to get the jibs from the server
    this.getAllJobs();
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
