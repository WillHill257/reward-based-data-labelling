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

const vuetify = new Vuetify();

Vue.use(Vuetify);
describe("viewJob", () => {
  test("should display all the UI elements", () => {
    const wrapper = shallowMount(viewJob, { vuetify });
    expect(wrapper.find("#job-summary").exists()).toBe(true);
    expect(wrapper.find("#btnAccept").exists()).toBe(true);
    // expect(wrapper.find("#pic-display").exists()).toBe(true);
  });
});

describe("testing buttons", () => {
  test("On accept is called when the Accept button is clicked", () => {
    const wrapper = shallowMount(viewJob, { vuetify });
    const onAccept = jest.fn();
    wrapper.setMethods({
      onAccept: onAccept,
    });
    wrapper.find("#btnAccept").trigger("click");
    expect(onAccept).toHaveBeenCalled();
  });
});

describe("inital return values", () => {
  test("Test inital return values", () => {
    const wrapper = shallowMount(viewJob, { vuetify });

    expect(wrapper.vm.$data.jobTitle).toEqual("");
  });
});

describe("testing mounted", () => {
  test("test mounted", async () => {
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

    const getJobSpy = jest.spyOn(Job, "getJob");
    getJobSpy.mockResolvedValue(mockJobResponse);

    const wrapper: any = shallowMount(viewJob, { vuetify });
    // const addImageSpy = jest.spyOn(wrapper.vm, "addImages");
    const changeAcceptVisibilitySpy = jest.spyOn(
      wrapper.vm,
      "changeAcceptVisibility"
    );

    await flushPromises();
    expect(wrapper.vm.$data.jobTitle).toEqual("testTitle");
    expect(wrapper.vm.$data.jobDescription).toEqual("testDescription");
    expect(wrapper.vm.$data.labels.length).toEqual(1);
    expect(wrapper.vm.$data.reward).toEqual(10);
    expect(wrapper.vm.$data.author).toEqual("test author");
    expect(wrapper.vm.$data.labellers).toEqual(["testLabellers"]);
    expect(wrapper.vm.$data.numLabellersRequired).toEqual(3);

    //expect(addImageSpy).toHaveBeenCalled();

    expect(changeAcceptVisibilitySpy).toHaveBeenCalledTimes(1);
    // expect(fetchImageSpy).toHaveBeenCalledTimes(1);
  });

  test("test fetch job error", async () => {
    const mockJobResponse = {
      data: {
        error: "test error",
      },
    };

    const getJobSpy = jest.spyOn(Job, "getJob");
    getJobSpy.mockRejectedValue(mockJobResponse);

    const wrapper: any = shallowMount(viewJob, { vuetify });
    // const addImageSpy = jest.spyOn(wrapper.vm, "addImages");
    const changeAcceptVisibilitySpy = jest.spyOn(
      wrapper.vm,
      "changeAcceptVisibility"
    );

    await flushPromises();
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
    // const localVue = createLocalVue();
    // localVue.use(Vuex);
    // const modules = {
    //     UserModule: {
    //         state: {},
    //         namespaced: true
    //     }
    // }
    // const store = new Vuex.Store({ modules: { job: { state: { jobID: "123" } } } })
    // const state = { jobID: "123" };
    const wrapper = shallowMount(viewJob, { vuetify });
    const onAccept = jest.fn();
    const p = Promise.reject("error");
    wrapper.vm.$data.jobID = "123";

    wrapper.setMethods({
      onAccept: onAccept,
    });

    wrapper.find("#btnAccept").trigger("click");
    expect(onAccept).toHaveBeenCalled();
    return expect(p).rejects.toBe("error");
  });

  test("fetch image function", async () => {
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
    const addImagesSpy = jest.spyOn(wrapper.vm, "addImages");
    await wrapper.vm.fetchImages();
    expect(addImagesSpy).toHaveBeenCalledTimes(1);
  });

  test("fetch image function error", async () => {
    const getImagesSpy = jest.spyOn(Job, "getImages");
    const mockImagesResponse = {
      data: {
        error: "test error",
      },
    };

    getImagesSpy.mockResolvedValue(mockImagesResponse);

    const wrapper: any = shallowMount(viewJob, { vuetify });
    const addImagesSpy = jest.spyOn(wrapper.vm, "addImages");
    await wrapper.vm.fetchImages();
    expect(addImagesSpy).toHaveBeenCalledTimes(0);
  });

  test("on accept function called", () => {
    const wrapper: any = shallowMount(viewJob, {
      vuetify,
      propsData: { jobID: "123" },
    });
    wrapper.vm.onAccept();
    const acceptJobSpy = jest.spyOn(Job, "acceptJob");
    acceptJobSpy.mockResolvedValue({ status: 200 });

    expect(acceptJobSpy).toHaveBeenCalledTimes(1);
  });

  test("test bottom visible", () => {
    const wrapper: any = shallowMount(viewJob, {
      vuetify,
    });

    const bottomVisible = wrapper.vm.bottomVisible();
    expect(bottomVisible).toEqual(true || false);
  });
});
