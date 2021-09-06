import { mount, shallowMount } from "@vue/test-utils";
import FinishJob from "@/components/FinishJobDialog.vue";
import * as BatchApi from "@/api/Batch.api";
import Vue from "vue";

import Vuetify from "vuetify";
import flushPromises from "flush-promises";

const vuetify = new Vuetify();

Vue.use(Vuetify);

describe("FinishJobDialog", () => {
  const mockPropsData = {
    canAcceptNew: false,
    batchID: "mockBatchID",
    jobID: "mockJobID",
    isShowDialog: true,
  };

  it("Trigger closeDialog when cancel button clicked", async () => {
    const wrapper: any = mount(FinishJob, {
      vuetify,
      propsData: mockPropsData,
    });

    const closeSpy = jest.spyOn(wrapper.vm, "closeDialog");
    const container = wrapper.find("#cancel-button");
    await container.trigger("click");
    expect(closeSpy).toHaveBeenCalled();
  });

  it("Emits close dialog when function is call", () => {
    const wrapper: any = shallowMount(FinishJob, {
      propsData: mockPropsData,
    });
    wrapper.vm.closeDialog();
    expect(wrapper.emitted("update:isShowDialog")).toBeTruthy();
  });

  it("Trigger finishJob when finish button clicked", async () => {
    const wrapper: any = mount(FinishJob, {
      vuetify,
      propsData: mockPropsData,
    });

    const finishSpy = jest.spyOn(wrapper.vm, "finishJob");
    const container = wrapper.find("#finish-button");
    console.log(container.exists());
    await container.trigger("click");

    expect(finishSpy).toHaveBeenCalled();
  });

  it("Calls markBatchCompleted in finishJob", async () => {
    // jest.mock("../../src/api/Batch.api", () => ({
    //   markBatchFinished: () => {
    //     return new Promise((resolve: any, reject: any) => {});
    //   },
    // }));

    const wrapper: any = shallowMount(FinishJob, {
      propsData: mockPropsData,
    });
    const spy = jest.spyOn(wrapper.vm, "markBatchCompleted");
    const apiSpy = jest.spyOn(BatchApi, "markBatchFinished");
    apiSpy.mockResolvedValue({});
    wrapper.vm.finishJob();
    expect(spy).toHaveBeenCalled();
  });

  it("markBatchCompleted calls the correct callbacks", async () => {
    const successFunction = () => {
      console.log("hello");
    };
    const failureFunction = jest.fn();
    const wrapper: any = shallowMount(FinishJob, {
      propsData: mockPropsData,
    });
    const apiSpy = jest.spyOn(BatchApi, "markBatchFinished");
    apiSpy.mockResolvedValue({});
    //apiSpy.mockRejectedValue({});
    wrapper.vm.markBatchCompleted(successFunction, failureFunction);

    expect(apiSpy).toHaveBeenCalled();
  });

  it("Triggers acceptNewJob when accept new button clicked", async () => {
    mockPropsData.canAcceptNew = true;
    const wrapper: any = mount(FinishJob, {
      vuetify,
      propsData: mockPropsData,
    });

    const acceptNewSpy = jest.spyOn(wrapper.vm, "acceptNew");
    const container = wrapper.find("#accept-new-button");
    console.log(container.exists());
    await container.trigger("click");

    expect(acceptNewSpy).toHaveBeenCalled();
  });

  it("acceptNew calls markBatchCompleted ", async () => {
    mockPropsData.canAcceptNew = true;
    const wrapper: any = shallowMount(FinishJob, {
      propsData: mockPropsData,
    });
    const spy = jest.spyOn(wrapper.vm, "markBatchCompleted");
    const apiSpy = jest.spyOn(BatchApi, "markBatchFinished");
    apiSpy.mockResolvedValue({});
    wrapper.vm.acceptNew();
    expect(spy).toHaveBeenCalled();
  });
});
