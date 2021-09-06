import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import JobSummaryCard from "@/components/JobSummaryCard.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import flushPromises from "flush-promises";
import * as BatchApi from "@/api/Batch.api";

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
    batchID: "6135cfe89c361f61fee112ef",
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
      batchID: jobs[0]["batchID"],
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
  const name = "ViewJob";

  const localVue = createLocalVue();
  localVue.use(VueRouter);

  // mock router and routes
  const routes = [
    {
      path: "/",
      name: "Landing",
    },
    {
      path: "/whatever",
      name: name,
    },
  ];
  const mockRouter = new VueRouter({
    routes,
  });

  // mocking job summary card
  const wrapper = mount(JobSummaryCard, {
    localVue,
    router: mockRouter,
    vuetify,
    propsData: {
      id: jobs[0]["_id"],
      title: jobs[0]["title"],
      type: jobs[0]["type"],
      labels: jobs[0]["labels"],
      description: jobs[0]["description"],
      batchID: jobs[0]["batchID"],
    },
  });

  //ensures that the view job button goes to the approriate view job page
  it("Should go to the 'View Job' page", async () => {
    wrapper.find(".btn-view-job").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.name).toBe(name);
  });
});

describe("Checking 'Label' Button", () => {
  const name = "LabelImages";

  const localVue = createLocalVue();
  localVue.use(VueRouter);

  // mock router and routes
  const routes = [
    {
      path: "/",
      name: "Landing",
    },
    {
      path: "/whatever",
      name: name,
    },
  ];
  const mockRouter = new VueRouter({
    routes,
  });

  // mocking job summary card
  const wrapper = mount(JobSummaryCard, {
    localVue,
    router: mockRouter,
    vuetify,
    propsData: {
      id: jobs[0]["_id"],
      title: jobs[0]["title"],
      type: jobs[0]["type"],
      labels: jobs[0]["labels"],
      description: jobs[0]["description"],
      batchID: jobs[0]["batchID"],
    },
  });

  //ensures that the view job button goes to the approriate label page
  it("Should go to the 'Label' page", async () => {
    wrapper.find(".btn-label-job").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$route.name).toBe(name);
  });
});

describe("Checking routing functions", () => {
  test("Checking 'View More' Button triggers the method to view the job", async () => {
    const name = "ViewJob";

    const localVue = createLocalVue();
    localVue.use(VueRouter);

    // mock router and routes
    const routes = [
      {
        path: "/",
        name: "Landing",
      },
      {
        path: "/whatever1",
        name: name,
      },
    ];
    const mockRouter = new VueRouter({
      routes,
    });
    // mock job summary card
    const wrapper: any = mount(JobSummaryCard, {
      localVue,
      vuetify,
      router: mockRouter,
      propsData: {
        id: jobs[0]["_id"],
        title: jobs[0]["title"],
        type: jobs[0]["type"],
        labels: jobs[0]["labels"],
        description: jobs[0]["description"],
        batchID: jobs[0]["batchID"],
      },
    });

    const spy = jest.spyOn(wrapper.vm, "goToJob");

    //trigger click on available jobs button
    wrapper.find(".btn-view-job").trigger("click");
    //test passes if the method has been clicked
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(spy).toHaveBeenCalled();
  });

  test("Checking 'Label' Button triggers the method to view the job", async () => {
    const name = "LabelImages";

    const localVue = createLocalVue();
    localVue.use(VueRouter);

    // mock router and routes
    const routes = [
      {
        path: "/",
        name: "Landing",
      },
      {
        path: "/whatever2",
        name: name,
      },
    ];
    const mockRouter = new VueRouter({
      routes,
    });

    // mock job summary card
    const wrapper: any = mount(JobSummaryCard, {
      localVue,
      vuetify,
      router: mockRouter,
      propsData: {
        id: jobs[0]["_id"],
        title: jobs[0]["title"],
        type: jobs[0]["type"],
        labels: jobs[0]["labels"],
        description: jobs[0]["description"],
        batchID: jobs[0]["batchID"],
      },
    });

    const spy = jest.spyOn(wrapper.vm, "goToLabel");

    //trigger click on available jobs button
    wrapper.find(".btn-label-job").trigger("click");
    //test passes if the method has been clicked
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(spy).toHaveBeenCalled();
  });
});

describe("Check Quit Job", () => {
  test("successfully deletes labeller", async () => {
    // mock view
    const wrapper: any = shallowMount(JobSummaryCard, {
      vuetify,
      propsData: {
        id: jobs[0]["_id"],
        title: jobs[0]["title"],
        type: jobs[0]["type"],
        labels: jobs[0]["labels"],
        description: jobs[0]["description"],
        batchID: jobs[0]["batchID"],
      },
    });

    //spy on the close dailogue function
    const postSpy = jest.spyOn(BatchApi, "deleteLabeller");
    postSpy.mockResolvedValue({ status: 200 });

    await wrapper.vm.quitJob(); // random id
    await flushPromises();

    //expect it to have been called if the dialogu was closed
    expect(postSpy).toHaveBeenCalledTimes(1);
  });

  test("unsuccessfully deletes labeller", async () => {
    // mock view
    const wrapper: any = shallowMount(JobSummaryCard, {
      vuetify,
      propsData: {
        id: jobs[0]["_id"],
        title: jobs[0]["title"],
        type: jobs[0]["type"],
        labels: jobs[0]["labels"],
        description: jobs[0]["description"],
        batchID: jobs[0]["batchID"],
      },
    });

    //spy on the close dailogue function
    const postSpy = jest.spyOn(BatchApi, "deleteLabeller");
    postSpy.mockRejectedValue({ status: 400 });

    await wrapper.vm.quitJob(); // random id
    await flushPromises();

    //expect it to have been called if the dialogu was closed
    expect(postSpy).toBeCalled();
  });
});

// describe("Checking buttons route correctly", () => {
//   test("going to a particular job" , ()=>{
//     // mock the router
//     const mockRouter = {
//       push: jest.fn()
//     }
//     const wrapper: any = shallowMount(JobSummaryCard,{vuetify,
//       mocks:{
//         $route: mockRouter
//       }

//     });
//     //check that the router redirects user to the aprropriate place
//     wrapper.vm.$router = mockRouter
//     const pushSpy = jest.spyOn(mockRouter, "push");

//     wrapper.vm.goToJob(jobs[0]._id)
//     expect(pushSpy).toHaveBeenCalled
//   })

//   test("going to the label page" , ()=>{
//     // mock the router
//     const mockRouter = {
//       push: jest.fn()
//     }
//     const wrapper: any = shallowMount(JobSummaryCard,{vuetify,
//       mocks:{
//         $route: mockRouter
//       }

//     });
//     //check that the router redirects user to the aprropriate place
//     wrapper.vm.$router = mockRouter
//     const pushSpy = jest.spyOn(mockRouter, "push");

//     wrapper.vm.goToLabel()
//     expect(pushSpy).toHaveBeenCalled
//   })
// });
