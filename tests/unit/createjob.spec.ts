import { shallowMount } from "@vue/test-utils";
import CreateJob from "@/components/CreateJob/CreateJob.vue";
import Vue from "vue";
import Vuetify from "vuetify";


Vue.use(Vuetify);
describe("CreateJob", () => {
  describe("When loaded", () => {
    test("should have all the necessary UI elements", () => {
      const wrapper = shallowMount(CreateJob);
      expect(wrapper.isVueInstance()).toBeTruthy();
      expect(wrapper.find("#title-input").exists()).toBe(true);
      expect(wrapper.find("#description-input").exists()).toBe(true);
      expect(wrapper.find("#discard-input").exists()).toBe(true);
      expect(wrapper.find("#submit-input").exists()).toBe(true);
      expect(wrapper.find("#createJobCard").exists()).toBe(true);
    });
  });

  describe("Checking buttons", () => {
    test("Close function called when discard button is clicked", () => {
      const wrapper = shallowMount(CreateJob);
      const closeDialog = jest.fn();
      wrapper.setMethods({
        closeDialog: closeDialog
      });
      wrapper.find("#discard-input").trigger("click");
      expect(closeDialog).toHaveBeenCalled();
    });
    test("Submit function called when submit button is clicked", () => {
      const wrapper = shallowMount(CreateJob);
      const onSubmitClicked = jest.fn();
      wrapper.setMethods({
        onSubmitClicked: onSubmitClicked
      });
      wrapper.find("#submit-input").trigger("click");
      expect(onSubmitClicked).toHaveBeenCalled();
    });
  });

  describe("When loaded", () => {
    test("Checking errors throw correctly", () => {
      const wrapper: any = shallowMount(CreateJob);
      wrapper.vm.$data.title = ""
      wrapper.vm.onSubmitClicked()
      expect(wrapper.vm.$data.errorMessage).toEqual("Title required");
      wrapper.vm.$data.title = "Something"
      wrapper.vm.$data.description = ""
      wrapper.vm.onSubmitClicked()
      expect(wrapper.vm.$data.errorMessage).toEqual("Description required");
      wrapper.vm.$data.description = "Something"
      wrapper.vm.$data.filesUploaded = []
      wrapper.vm.onSubmitClicked()
      expect(wrapper.vm.$data.errorMessage).toEqual("No files to upload");
    });

  });
});