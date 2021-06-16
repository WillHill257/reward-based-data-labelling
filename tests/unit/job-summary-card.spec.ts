import { shallowMount } from "@vue/test-utils";
import JobSummaryCard from "@/components/JobSummaryCard.vue";
import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

const vuetify = new Vuetify();

//mock job
let jobs = [
  {
    _id: "0",
    title: "Title",
    type: "Type",
    labels: ["a", "b"],
    description: "Description",
  },
];

describe("When loaded", () => {
  // mock the job sumaary card
  const wrapper = shallowMount(JobSummaryCard, {
    vuetify,
    propsData: {
      id: jobs[0]["_id"],
      title: jobs[0]["title"],
      type: jobs[0]["type"],
      labels: jobs[0]["labels"],
      description: jobs[0]["description"],
    },
  });
  //check that is is an instance of view
  it("should be vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  //making sure all elements that should appear do
  it("should have all the necessary UI elements", () => {
    expect(wrapper.find(".job-title").exists()).toBe(true);
    expect(wrapper.find(".job-type").exists()).toBe(true);
    expect(wrapper.find(".pill").exists()).toBe(true);
    expect(wrapper.findAll(".pill").length).toBe(jobs[0]["labels"].length);
    expect(wrapper.find(".job-description").exists()).toBe(true);
    expect(wrapper.find(".btn-view-job").exists()).toBe(true);
  });
});

describe("Checking 'View More' Button", () => {
  //mocking route
  const $route = {
    name: "ViewJob",
  };

  // mocking job summary card
  const wrapper = shallowMount(JobSummaryCard, {
    vuetify,
    propsData: {
      id: jobs[0]["_id"],
      title: jobs[0]["title"],
      type: jobs[0]["type"],
      labels: jobs[0]["labels"],
      description: jobs[0]["description"],
    },
    mocks: {
      $route,
    },
  });

  //ensures that the view job button goes to the approriate view job page
  it("Should go to the 'View Job' page", async () => {
    wrapper.find(".btn-view-job").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.name).toBe($route.name);
  });
});
