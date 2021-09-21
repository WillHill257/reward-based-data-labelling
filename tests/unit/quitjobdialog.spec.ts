import { mount, shallowMount } from "@vue/test-utils";
import QuitJob from "@/components/QuitJobDialog.vue";
import * as BatchApi from "@/api/Batch.api";
import Vue from "vue";

import Vuetify from "vuetify";

const vuetify = new Vuetify();

Vue.use(Vuetify);

describe("QuitJobDialog", () => {
  const mockPropsData = {
    batchID: "mockBatchID",
    isShowDialog: true,
  };

  it("Trigger closeDialog when cancel button clicked", async () => {
    const wrapper: any = mount(QuitJob, {
      vuetify,
      propsData: mockPropsData,
    });

    const closeSpy = jest.spyOn(wrapper.vm, "closeDialog");
    const container = wrapper.find("#cancel-button");
    await container.trigger("click");
    expect(closeSpy).toHaveBeenCalled();
  });

  it("Emits close dialog when function is call", () => {
    const wrapper: any = shallowMount(QuitJob, {
      propsData: mockPropsData,
    });
    wrapper.vm.closeDialog();
    expect(wrapper.emitted("update:isShowDialog")).toBeTruthy();
  });

  it("Trigger quitJob when quit button clicked", async () => {
    const wrapper: any = mount(QuitJob, {
      vuetify,
      propsData: mockPropsData,
    });

    const quitSpy = jest.spyOn(wrapper.vm, "quitJob");
    const container = wrapper.find("#quit-button");
    console.log(container.exists());
    await container.trigger("click");

    expect(quitSpy).toHaveBeenCalled();
  });

  it("Calls removeLabeller in quitJob", async () => {
    const wrapper: any = shallowMount(QuitJob, {
      propsData: mockPropsData,
    });
    const spy = jest.spyOn(wrapper.vm, "removeLabeller");
    const apiSpy = jest.spyOn(BatchApi, "deleteLabeller");
    apiSpy.mockResolvedValue({});
    wrapper.vm.quitJob();
    expect(spy).toHaveBeenCalled();
  });
});
