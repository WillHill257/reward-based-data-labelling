import { mount, shallowMount } from "@vue/test-utils";
import ExportToCSV from "@/components/ExportToCSV.vue";
import * as JobApi from "@/api/Job.api";
import Vue from "vue";
import Vuetify from "vuetify";
import flushPromises from "flush-promises";

Vue.use(Vuetify);

const vuetify = new Vuetify();

const propsData: any = {
  jobID: "6135cfe79c361f61fee112eb",
  jobProgress: "100",
};

const nonCompleteProps: any = {
  jobID: "6135cfe79c361f61fee112eb",
  jobProgress: "90",
};

describe("UI Properties", () => {
  it("should be a vue instance", () => {
    const wrapper = mount(ExportToCSV, {
      vuetify,
      propsData,
    });

    expect(wrapper.vm).toBeTruthy();
  });

  it("displays an export button", () => {
    const wrapper = mount(ExportToCSV, {
      vuetify,
      propsData,
    });

    // check that the initial export button elements are visible
    expect(wrapper.find(".export-button").exists()).toBe(true);
    expect(wrapper.find(".export-button").html()).toContain("Export to CSV");
    expect(wrapper.find(".mdi-cloud-download").exists()).toBe(true);
  });

  it("displays the loading symbol when clicked", async () => {
    const wrapper = mount(ExportToCSV, {
      vuetify,
      propsData,
    });

    // check that the loading symbol is visible whilst downloading the file
    wrapper.find(".export-button").trigger("click");
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".loading-symbol").exists()).toBe(true);
  });

  it("initially hides the error dialog", () => {
    const wrapper = mount(ExportToCSV, {
      vuetify,
      propsData,
    });

    expect(wrapper.find(".error-dialog").exists()).toBe(true);
    expect(wrapper.find(".v-card").exists()).toBe(false);
    expect(
      wrapper.findComponent({ name: "ErrorDialog" }).vm.$props.isShowDialog
    ).toBe(false);
  });
});

describe("Displays confirmation dialog when necessary", () => {
  it("displays confirmation dialog when job not completed", async () => {
    const wrapper = mount(ExportToCSV, {
      vuetify,
      propsData: nonCompleteProps,
    });

    // click the button, and make sure the data elements update accoordingly
    wrapper.find(".export-button").trigger("click");
    await wrapper.vm.$nextTick();

    // expect(download).toBeCalled();
    expect(wrapper.vm.$data.loading).toBe(true);
    expect(wrapper.vm.$data.loader).toBeNull();
    expect(wrapper.vm.$data.showConfirmationDialog).toBe(true);
  });
});

describe("Correctly executes functions", () => {
  it("closes confirmation dialog", async () => {
    const wrapper = mount(ExportToCSV, {
      vuetify,
      propsData: nonCompleteProps,
    });

    // click the button, and make sure the data elements update accoordingly
    wrapper.find(".export-button").trigger("click");
    await wrapper.vm.$nextTick();

    (wrapper.vm as any).closeConfirmDialog();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$data.loading).toBe(false);
    expect(wrapper.vm.$data.showConfirmationDialog).toBe(false);
  });

  it("triggers loader on button click", async () => {
    const wrapper = mount(ExportToCSV, {
      vuetify,
      propsData,
    });

    const download = jest.fn();
    wrapper.setMethods({
      downloadCSV: download,
    });
    // click the button, and make sure the data elements update accoordingly
    wrapper.find(".export-button").trigger("click");
    await wrapper.vm.$nextTick();

    expect(download).toBeCalled();
    expect(wrapper.vm.$data.loading).toBe(true);
    expect(wrapper.vm.$data.loader).toBeNull();
  });

  it("successfully downloads csv", async () => {
    const wrapper = shallowMount(ExportToCSV, {
      vuetify,
      propsData,
    });

    const mockResponse = {
      data:
        "image_filename,first_label;second_label;other_labels\nOHy3oIoLS3SQrJYsu6Dtz1IKJgCU403QR3Vy.jpg,dog",
    };

    const apiSpy = jest.spyOn(JobApi, "exportJobToCSV");
    apiSpy.mockResolvedValue(mockResponse);

    const success = jest.fn();
    const failure = jest.fn();

    (wrapper.vm as any).downloadCSV(success, failure);
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(success).toBeCalled();
  });

  it("handles unsuccessful download of csv", async () => {
    const wrapper = shallowMount(ExportToCSV, {
      vuetify,
      propsData,
    });

    const mockResponse = {
      data: {
        message: "You are not authorised to export this job",
      },
    };

    const apiSpy = jest.spyOn(JobApi, "exportJobToCSV");
    apiSpy.mockRejectedValue(mockResponse);

    const success = jest.fn();
    const failure = jest.fn();

    (wrapper.vm as any).downloadCSV(success, failure);
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(failure).toBeCalled();
  });

  it("responds to successfully downloading csv", async () => {
    const wrapper = mount(ExportToCSV, {
      vuetify,
      propsData,
    });

    const mockResponse = {
      data:
        "image_filename,first_label;second_label;other_labels\nOHy3oIoLS3SQrJYsu6Dtz1IKJgCU403QR3Vy.jpg,dog",
    };

    const apiSpy = jest.spyOn(JobApi, "exportJobToCSV");
    apiSpy.mockResolvedValue(mockResponse);

    // click the button, and make sure the data elements update accoordingly
    wrapper.find(".export-button").trigger("click");
    await wrapper.vm.$nextTick();
    await flushPromises();

    expect(wrapper.vm.$data.loading).toBe(false);
    expect(wrapper.vm.$data.isShowDialog).toBe(false);
  });

  it("responds to unsuccessfully downloading csv", async () => {
    const wrapper = mount(ExportToCSV, {
      vuetify,
      propsData,
    });

    const mockResponse = {
      data: {
        message: "You are not authorised to export this job",
      },
    };

    const apiSpy = jest.spyOn(JobApi, "exportJobToCSV");
    apiSpy.mockRejectedValue(mockResponse);

    // click the button, and make sure the data elements update accoordingly
    wrapper.find(".export-button").trigger("click");
    await wrapper.vm.$nextTick();
    await flushPromises();

    expect(wrapper.vm.$data.loading).toBe(false);
    expect(wrapper.vm.$data.isShowDialog).toBe(true);
  });
});
