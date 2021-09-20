import { mount, shallowMount } from "@vue/test-utils";
import ErrorDialog from "@/components/ErrorDialog.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import flushPromises from "flush-promises";

Vue.use(Vuetify);

const vuetify = new Vuetify();
const propsData: any = {
  isShowDialog: true,
  title: "An error occurred",
  message: "Please try again. If the problem persists, please contact support",
};

describe("UI Properties", () => {
  it("should be a vue instance", () => {
    const wrapper = shallowMount(ErrorDialog, {
      vuetify,
      propsData,
    });

    expect(wrapper.vm).toBeTruthy();
  });

  it("displays the correct elements", () => {
    const wrapper = mount(ErrorDialog, {
      vuetify,
      propsData,
    });

    expect(wrapper.find(".error-dialog").exists()).toBe(true);
    expect(wrapper.find(".mdi-alert-circle-outline").exists()).toBe(true);
    expect(wrapper.element.innerHTML).toContain(propsData.title);
    expect(wrapper.element.innerHTML).toContain(propsData.message);
    expect(wrapper.find(".okay-button").exists()).toBe(true);
  });
});

describe("Correctly executes functions", () => {
  it('Trigger closeDialog when "Okay" button clicked', async () => {
    const wrapper: any = mount(ErrorDialog, {
      vuetify,
      propsData,
    });

    const closeSpy = jest.spyOn(wrapper.vm, "closeDialog");
    const button = wrapper.find(".okay-button");
    await button.trigger("click");

    expect(closeSpy).toHaveBeenCalled();
  });

  it("Emits close dialog when function is called", () => {
    const wrapper: any = shallowMount(ErrorDialog, {
      vuetify,
      propsData,
    });

    wrapper.vm.closeDialog();
    expect(wrapper.emitted("update:isShowDialog")).toBeTruthy();
  });
});
