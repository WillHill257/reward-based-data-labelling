import { shallowMount } from "@vue/test-utils";
import Landing from "@/views/Landing.vue";
import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);
describe("CreateJob", () => {
  describe("When loaded", () => {
    test("should have all the necessary UI elements", () => {
      const wrapper = shallowMount(Landing);
      expect(wrapper.isVueInstance()).toBeTruthy();
      expect(wrapper.find("#step1").exists()).toBe(true);

    });
  });
});