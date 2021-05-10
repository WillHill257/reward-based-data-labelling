import { shallowMount } from "@vue/test-utils";
import Landing from "@/views/Landing.vue";
import Vue from "vue";
import Vuetify from "vuetify";
const vuetify = new Vuetify();


Vue.use(Vuetify);
describe("Checking buttons", () => {
  describe("When loaded", () => {
    test("View Jobs function called when View Available Jobs button is clicked", () => {
      const wrapper = shallowMount(Landing, {vuetify});
      const viewJobsClick = jest.fn();
      wrapper.setMethods({
        viewJobsClick: viewJobsClick
      });
      wrapper.find("#availableJobs").trigger("click");
      wrapper.vm.$nextTick(() => {
        expect(viewJobsClick).toHaveBeenCalled();
      })
      
    });

    test("Label data function called when I Want My Images Labelled button is clicked", () => {
      const wrapper = shallowMount(Landing, {vuetify});
      const labelImagesClick = jest.fn();
      wrapper.setMethods({
        labelImagesClick: labelImagesClick
      });
      wrapper.find("#dataLblBtn").trigger("click");
      wrapper.vm.$nextTick(() => {
        expect(labelImagesClick).toHaveBeenCalled();
      })
      
    });
  });
});