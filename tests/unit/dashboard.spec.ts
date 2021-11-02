import { shallowMount } from "@vue/test-utils";
import DashboardList from "@/components/DashboardList.vue";
import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

const vuetify = new Vuetify();

const title = "Test";
const endpoint = "accepted";

//dummy jobs to be used in testing
let testJobs = [
  {
    _id: "0",
    title: "Title",
    type: "Type",
    labels: ["a", "b"],
    description: "Description",
  },
  {
    _id: "1",
    title: "Title",
    type: "Type",
    labels: ["a", "b"],
    description: "Description",
  },
  {
    _id: "2",
    title: "Title",
    type: "Type",
    labels: ["a", "b"],
    description: "Description",
  },
];

describe("When loaded", () => {
  // create a mock of the screen
  const wrapper = shallowMount(DashboardList, {
    vuetify,
    propsData: {
      //bring necessary props in
      title: title,
      jobs: testJobs,
      endpoint: endpoint,
    },
  });
  //make sure it is a vue instance
  it("should be vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  //all the ui elements should appear on the page as expected
  it("should have all the necessary UI elements", () => {
    // expect(wrapper.find(".title").exists()).toBe(true);
    // expect(wrapper.find(".title").html()).toContain(title);
    expect(wrapper.find(".recycler-view").exists()).toBe(true);
    expect(
      (wrapper.find(".recycler-view").attributes("items") as string).split(",")
        .length
    ).toBe(testJobs.length);
  });
});

describe("Checking 'View More' Button", () => {
  const $route = {
    name: "ListJobs",
  };

  it("Should go to the 'List Jobs' page", () => {
    // const wrapper = shallowMount(DashboardList, {
    //   vuetify,
    //   propsData: {
    //     title: title,
    //     jobs: testJobs,
    //     endpoint: endpoint,
    //   },
    //   mocks: {
    //     $route,
    //   },
    // });
    // (wrapper.vm as any).goToJobList();
    // await wrapper.vm.$nextTick();
    // expect(wrapper.vm.$route.name).toBe($route.name);
  });
});
