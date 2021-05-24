import { shallowMount } from "@vue/test-utils";
import JobSummaryCard from "@/components/JobSummaryCard.vue";
import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

const vuetify = new Vuetify();

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
  it("should be vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

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
  const $route = {
    name: "ViewJob",
  };

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

  it("Should go to the 'View Job' page", async () => {
    wrapper.find(".btn-view-job").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.name).toBe($route.name);
  });
});
