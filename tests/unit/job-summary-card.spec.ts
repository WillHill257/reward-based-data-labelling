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
  // mock the job summary card
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

//TODO Label Button testing working

describe("Checking 'Label' Button", () => {
  //mocking route
  const $route = {
    name: "LabelImages",
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

  //ensures that the view job button goes to the approriate label page
  it("Should go to the 'Label' page", async () => {
    wrapper.find(".btn-label-job").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.name).toBe($route.name);
  });
});

describe("Checking routing functions", () => {
  test("Checking 'View More' Button triggers the method to view the job", () => {
    // mock job summary card
    const wrapper = shallowMount(JobSummaryCard, { vuetify });
    const goToJob = jest.fn();
    // mock method to go to the view job page
    wrapper.setMethods({
      goToJob: goToJob,
    });
    //trigger click on available jobs button
    wrapper.find(".btn-view-job").trigger("click");
    //test passes if the method has been clicked
    wrapper.vm.$nextTick(() => {
      expect(goToJob).toHaveBeenCalled();
    });
  });

  test("Checking 'Label' Button triggers the method to view the job", () => {
    // mock job summary card
    const wrapper = shallowMount(JobSummaryCard, { vuetify });
    const goToLabel = jest.fn();
    // mock method to go to the label page
    wrapper.setMethods({
      goToLabel: goToLabel,
    });
    //trigger click on available jobs button
    wrapper.find(".btn-label-job").trigger("click");
    //test passes if the method has been clicked
    wrapper.vm.$nextTick(() => {
      expect(goToLabel).toHaveBeenCalled();
    });
  });
});

describe("Checking buttons route correctly", () => {
  test("going to a particular job" , ()=>{
    // mock the router
    const mockRouter = {
      push: jest.fn()
    }
    const wrapper: any = shallowMount(JobSummaryCard,{vuetify,
      mocks:{
        $route: mockRouter
      }
  
    });
    //check that the router redirects user to the aprropriate place
    wrapper.vm.$router = mockRouter
    const pushSpy = jest.spyOn(mockRouter, "push");

    wrapper.vm.goToJob(jobs[0]._id)
    expect(pushSpy).toHaveBeenCalled
  })

  test("going to the label page" , ()=>{
    // mock the router
    const mockRouter = {
      push: jest.fn()
    }
    const wrapper: any = shallowMount(JobSummaryCard,{vuetify,
      mocks:{
        $route: mockRouter
      }
  
    });
    //check that the router redirects user to the aprropriate place
    wrapper.vm.$router = mockRouter
    const pushSpy = jest.spyOn(mockRouter, "push");

    wrapper.vm.goToLabel()
    expect(pushSpy).toHaveBeenCalled
  })
});