
import { shallowMount } from "@vue/test-utils";
import ListJobs from "@/views/ListJobs.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import {getAcceptedJobs, getAllJobs, getAuthoredJobs, getAvailableJobs} from "@/api/Job.api";
const vuetify = new Vuetify();

const title = "Test";


Vue.use(Vuetify);

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
]

describe("When list jobs is loaded", async () => {
  const wrapper = shallowMount(ListJobs);
  it("should have all the necessary UI elements", () => {
    expect(wrapper.find("#list-jobs").exists()).toBe(true);
  });

  });

  describe("When list jobs is loaded and get accepted jobs is called", async () => {
    const wrapper = shallowMount(ListJobs, {
      vuetify,
      propsData: {
        title: title,
        jobs: testJobs,
        endpoint: "accepted",
      },
  
    });
    it("should be vue instance", () => {
      expect(wrapper.vm).toBeTruthy();
    });
    const handleResponseList = jest.fn();
    wrapper.setData(testJobs);
    wrapper.setMethods({
      handleResponseList: handleResponseList
    })
  
    
    const getAcceptedJobs = jest.fn();
    wrapper.setMethods({
      getAcceptedJobs: getAcceptedJobs
    })
    await handleResponseList(testJobs);
    await getAcceptedJobs();
    
    expect(getAcceptedJobs).toHaveBeenCalled();
    expect(handleResponseList).toBeCalled();

  })

  describe("When list jobs is loaded", async () => {
    const wrapper = shallowMount(ListJobs, {
      vuetify,
      propsData: {
        title: title,
        jobs: testJobs,
        endpoint: "available",
      },
    });
    it("should be vue instance", () => {
      expect(wrapper.vm).toBeTruthy();
    });
    const handleResponseList = jest.fn();
    wrapper.setMethods({
      handleResponseList: handleResponseList
    })
  
    
    const getAvaliableJobs = jest.fn();
    wrapper.setMethods({
      getAvaliableJobs: getAvaliableJobs
    })
    await handleResponseList();
    await getAvaliableJobs();
    
    expect(getAvaliableJobs).toHaveBeenCalled();
    expect(handleResponseList).toHaveBeenCalled();

  })

  describe("When list jobs is loaded", async () => {
    const wrapper = shallowMount(ListJobs, {
      vuetify,
      propsData: {
        title: title,
        jobs: testJobs,
        endpoint: "authored",
      },
    });
    it("should be vue instance", () => {
      expect(wrapper.vm).toBeTruthy();
    });
    const handleResponseList = jest.fn();
    wrapper.setMethods({
      handleResponseList: handleResponseList
    })
  
    
    const getAuthoredJobs = jest.fn();
    wrapper.setMethods({
      getAuthoredJobs: getAuthoredJobs
    })
    await handleResponseList();
    await getAuthoredJobs();
    
    expect(getAuthoredJobs).toHaveBeenCalled();
    expect(handleResponseList).toHaveBeenCalled();
  });

  describe("testing handleResponceList",async()=>{
    const wrapper = shallowMount(ListJobs, {
      vuetify,
      propsData: {
        title: title,
        jobs: testJobs,
        endpoint: "authored",
      },
      mocks:{
        testJobs,
      }
      
  });
});
