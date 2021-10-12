import { shallowMount, createLocalVue } from "@vue/test-utils";
import viewJob from "@/views/ViewJob.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import flushPromises from "flush-promises";
import { VuexModule } from "vuex-module-decorators";
import Vuex, { Store } from "vuex";
import * as Job from "@/api/Job.api";
jest.mock("../../src/api/Job.api", () => ({
  getJob: jest.fn(),
  getImages: jest.fn(),
  acceptJob: jest.fn().mockImplementation(() => Promise.resolve()),
}));

jest.mock("../../src/api/Batch.api", () => ({
  findReward: jest.fn().mockImplementation(() => Promise.resolve()),
}));

const vuetify = new Vuetify();

Vue.use(Vuetify);
describe("viewJob", () => {
  test("should display all the UI elements", () => {
    // mock view job
    const wrapper = shallowMount(viewJob, { vuetify });
    // see if components expected appear on the screen
    expect(wrapper.find("#job-summary").exists()).toBe(true);
    expect(wrapper.find("#btnAccept").exists()).toBe(true);
  });
});

describe("testing buttons", () => {
  test("On accept is called when the Accept button is clicked", () => {
    // mock view job
    const wrapper = shallowMount(viewJob, { vuetify });
    // assign method to mock methodd
    const onAccept = jest.fn();
    wrapper.setMethods({
      onAccept: onAccept,
    });
    //trigger click on mock component
    wrapper.find("#btnAccept").trigger("click");
    expect(onAccept).toHaveBeenCalled();
  });
});

describe("inital return values", () => {
  test("Test inital return values", () => {
    // mock view job
    const wrapper = shallowMount(viewJob, { vuetify });

    //initial values ought to be empty
    expect(wrapper.vm.$data.jobTitle).toEqual("");
  });
});

describe("testing mounted", () => {
  test("test mounted", async () => {
    // mock job reponse
    const mockJobResponse = {
      data: {
        title: "testTitle",
        description: "testDescription",
        labels: ["testlabel"],
        rewards: 10,
        author: "test author",
        labellers: ["testLabellers"],
        numLabellersRequired: 3,
        canAccept: true,
      },
    };

    // spy on job
    const getJobSpy = jest.spyOn(Job, "getJob");
    getJobSpy.mockResolvedValue(mockJobResponse);

    const wrapper: any = shallowMount(viewJob, { vuetify });
    // const addImageSpy = jest.spyOn(wrapper.vm, "addImages");
    const changeAcceptVisibilitySpy = jest.spyOn(
      wrapper.vm,
      "changeAcceptVisibility"
    );

    await flushPromises();
    //set dummy data
    expect(wrapper.vm.$data.jobTitle).toEqual("testTitle");
    expect(wrapper.vm.$data.jobDescription).toEqual("testDescription");
    expect(wrapper.vm.$data.labels.length).toEqual(1);
    // expect(wrapper.vm.$data.reward).toEqual(10);
    expect(wrapper.vm.$data.author).toEqual("test author");
    expect(wrapper.vm.$data.labellers).toEqual(["testLabellers"]);
    expect(wrapper.vm.$data.numLabellersRequired).toEqual(3);

    //expect(addImageSpy).toHaveBeenCalled();

    //expect method to have been called
    expect(changeAcceptVisibilitySpy).toHaveBeenCalledTimes(1);
    // expect(fetchImageSpy).toHaveBeenCalledTimes(1);
  });

  test("test fetch job error", async () => {
    // test error messages
    const mockJobResponse = {
      data: {
        error: "test error",
      },
    };

    //spy on job to view error messages
    const getJobSpy = jest.spyOn(Job, "getJob");
    getJobSpy.mockRejectedValue(mockJobResponse);

    const wrapper: any = shallowMount(viewJob, { vuetify });
    // const addImageSpy = jest.spyOn(wrapper.vm, "addImages");
    const changeAcceptVisibilitySpy = jest.spyOn(
      wrapper.vm,
      "changeAcceptVisibility"
    );

    await flushPromises();
    // set dmmy data to null values
    expect(wrapper.vm.$data.jobTitle).toEqual("");
    expect(wrapper.vm.$data.jobDescription).toEqual("");
    expect(wrapper.vm.$data.labels.length).toEqual(0);
    expect(wrapper.vm.$data.reward).toEqual(0);
    expect(wrapper.vm.$data.author).toEqual("");
    expect(wrapper.vm.$data.labellers.length).toEqual(0);
    expect(wrapper.vm.$data.numLabellersRequired).toEqual(0);
    expect(changeAcceptVisibilitySpy).toHaveBeenCalledTimes(0);
    // expect(fetchImageSpy).toHaveBeenCalledTimes(1);
  });
});

describe("testing methods", () => {
  test("test accept job", async () => {
    // mock view job
    const wrapper = shallowMount(viewJob, { vuetify });
    // assign accept function to mock function
    const onAccept = jest.fn();
    const p = Promise.reject("error");
    // assign mock data
    wrapper.vm.$data.jobID = "123";

    wrapper.setMethods({
      onAccept: onAccept,
    });

    //trigger events
    wrapper.find("#btnAccept").trigger("click");
    expect(onAccept).toHaveBeenCalled();
    return expect(p).rejects.toBe("error");
  });

  test("fetch image function", async () => {
    // spy on colelction of images for display
    const getImagesSpy = jest.spyOn(Job, "getImages");
    const mockImagesResponse = {
      data: [
        "./testImages/testImage0.png",
        "./testImages/testImage1.png",
        "./testImages/testImage2.png",
      ],
    };
    getImagesSpy.mockResolvedValue(mockImagesResponse);

    const wrapper: any = shallowMount(viewJob, { vuetify });
    // makes sure add image works
    const addImagesSpy = jest.spyOn(wrapper.vm, "addImages");
    await wrapper.vm.fetchImages();
    expect(addImagesSpy).toHaveBeenCalledTimes(1);
  });

  test("fetch image function error", async () => {
    const getImagesSpy = jest.spyOn(Job, "getImages");
    //mock error data
    const mockImagesResponse = {
      data: {
        error: "test error",
      },
    };

    // spy on image response
    getImagesSpy.mockResolvedValue(mockImagesResponse);

    const wrapper: any = shallowMount(viewJob, { vuetify });
    const addImagesSpy = jest.spyOn(wrapper.vm, "addImages");
    //expect to have seen images using the spy
    await wrapper.vm.fetchImages();
    expect(addImagesSpy).toHaveBeenCalledTimes(0);
  });

  test("on accept function called", () => {
    // mock view jobs with jobID prop included
    const wrapper: any = shallowMount(viewJob, {
      vuetify,
      propsData: { jobID: "123" },
    });
    // assign mock function to valyue
    wrapper.vm.onAccept();
    const acceptJobSpy = jest.spyOn(Job, "acceptJob");
    acceptJobSpy.mockResolvedValue({ status: 200 });

    expect(acceptJobSpy).toHaveBeenCalledTimes(1);
  });

  test("test bottom visible", () => {
    // mock view job
    const wrapper: any = shallowMount(viewJob, {
      vuetify,
    });

    //check that the bottom is visible
    const bottomVisible = wrapper.vm.bottomVisible();
    expect(bottomVisible).toEqual(true || false);
  });
});
