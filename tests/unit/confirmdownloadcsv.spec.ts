import { mount, shallowMount } from "@vue/test-utils";
import ConfirmDownloadCSV from "@/components/ConfirmDownloadCSV.vue";
import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

const vuetify = new Vuetify();
const propsData: any = {
  isShowDialog: true,
};

describe("UI Properties", () => {
  it("should be a vue instance", () => {
    const wrapper = shallowMount(ConfirmDownloadCSV, {
      vuetify,
      propsData,
    });

    expect(wrapper.vm).toBeTruthy();
  });

  it("displays the correct elements", () => {
    const wrapper = mount(ConfirmDownloadCSV, {
      vuetify,
      propsData,
    });

    expect(wrapper.find(".confirm-download-csv-dialog").exists()).toBe(true);
    expect(wrapper.find("#ConfirmDownloadCSV").exists()).toBe(true);
    expect(wrapper.find("#close-confirm-download").exists()).toBe(true);
    expect(wrapper.find("#confirm-download").exists()).toBe(true);
  });
});

describe("Correctly executes functions", () => {
  it('Trigger closeDialog when "No" button clicked', async () => {
    const wrapper: any = mount(ConfirmDownloadCSV, {
      vuetify,
      propsData,
    });

    const closeSpy = jest.spyOn(wrapper.vm, "closeDialog");
    const button = wrapper.find("#close-confirm-download");
    await button.trigger("click");

    expect(closeSpy).toHaveBeenCalled();
  });

  it('Trigger downloadCSV when "Yes" button clicked', async () => {
    const wrapper: any = mount(ConfirmDownloadCSV, {
      vuetify,
      propsData,
    });

    const downloadSpy = jest.spyOn(wrapper.vm, "downloadCSV");
    const button = wrapper.find("#confirm-download");
    await button.trigger("click");

    expect(downloadSpy).toHaveBeenCalled();
  });

  it("Emits close dialog when function is called", () => {
    const wrapper: any = shallowMount(ConfirmDownloadCSV, {
      vuetify,
      propsData,
    });

    wrapper.vm.closeDialog();
    expect(wrapper.emitted("update:isShowDialog")).toBeTruthy();
    expect(wrapper.emitted("close-confirm-dialog")).toBeTruthy();
  });

  it("Emits download-confirmed when function is called", () => {
    const wrapper: any = shallowMount(ConfirmDownloadCSV, {
      vuetify,
      propsData,
    });

    wrapper.vm.downloadCSV();
    expect(wrapper.emitted("download-comfirmed")).toBeTruthy();
  });
});
