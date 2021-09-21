import { shallowMount, mount } from "@vue/test-utils";
import HomePage from "@/views/HomePage.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import * as JobApi from "@/api/Job.api";
import flushPromises from "flush-promises";
jest.mock("../../src/api/Job.api", () => ({
  getAvailableJobs: jest.fn().mockResolvedValue({
    status: 200,
    data: [
      {
        _id: "0",
        title: "Title",
        type: "Type",
        description: "Description",
        labels: ["a", "b"],
      },
    ],
  }),
  getAcceptedJobs: jest.fn().mockResolvedValue({
    status: 200,
    data: [
      {
        _id: "0",
        title: "Title",
        type: "Type",
        description: "Description",
        labels: ["a", "b"],
      },
    ],
  }),
  getAuthoredJobs: jest.fn().mockResolvedValue({
    status: 200,
    data: [
      {
        _id: "0",
        title: "Title",
        type: "Type",
        description: "Description",
        labels: ["a", "b"],
      },
    ],
  }),
}));

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
  const mockResponse = it("should be vue instance", () => {
    const wrapper: any = mount(HomePage, {
      attachTo: document.body,
      vuetify,
      stubs: ["router-link"],
    });
    expect(wrapper.vm).toBeTruthy();
  });

  // all the ui elements we expect on the page should appear
  it("should have all the necessary UI elements", async () => {
    const wrapper: any = mount(HomePage, {
      attachTo: document.body,
      vuetify,
      stubs: ["router-link"],
    });
    expect(wrapper.find("#dashboard-tabs").exists()).toBe(true);
    // expect(wrapper.find(".authored").exists()).toBe(true);
    // expect(wrapper.find(".authored").html()).toContain("Mine");
    // expect(wrapper.find(".authored").props().endpoint).toBe("authored");
    // await wrapper.find("#accepted-tab").trigger("click");
    // expect(wrapper.find(".accepted").exists()).toBe(true);
    // expect(wrapper.find(".accepted").html()).toContain("Currently Doing");
    // expect(wrapper.find(".accepted").props().endpoint).toBe("accepted");
    // await wrapper.find("#available-tab").trigger("click");
    // expect(wrapper.find(".available").exists()).toBe(true);
    // expect(wrapper.find(".available").html()).toContain("Available");
    // expect(wrapper.find(".available").props().endpoint).toBe("available");
  });
  it("makes the correct api calls", async () => {
    const availJobSpy = jest.spyOn(JobApi, "getAvailableJobs");
    const acceptedJobSpy = jest.spyOn(JobApi, "getAcceptedJobs");
    const authoredJobSpy = jest.spyOn(JobApi, "getAuthoredJobs");
    const wrapper: any = shallowMount(HomePage, {
      vuetify,
    });

    expect(availJobSpy).toHaveBeenCalled();
    expect(acceptedJobSpy).toHaveBeenCalled();
    expect(authoredJobSpy).toHaveBeenCalled();
    const handleResponseListSpy = jest.spyOn(wrapper.vm, "handleResponseList");
    await flushPromises();
    expect(handleResponseListSpy).toHaveBeenCalled();
  });
  // test("testing handleresponselist", async ()=>{
  //   const wrapper: any= shallowMount(HomePage)
  //   const a =new  Image(1,1);
  //   const temp = [a, a, a ]
  //   const tempnew =  wrapper.vm.handleResponseList(temp)
  //   let x = tempnew[1]
  //   expect(1).toBe(1);
  // })
});
