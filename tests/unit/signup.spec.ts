import { shallowMount } from "@vue/test-utils";
import Signup from "@/views/Sign_up.vue";

import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);
describe("Testing sign up screen", () => {
  describe("when loaded", () => {
    test("should have all the necessary UI elements", () => {
      const wrapper = shallowMount(Signup);
      expect(wrapper.find("#signup-firstname-input").exists()).toBe(true);
      expect(wrapper.find("#signup-surname-input").exists()).toBe(true);
      expect(wrapper.find("#signup-email-input").exists()).toBe(true);
      expect(wrapper.find("#signup-password-input").exists()).toBe(true);
      expect(wrapper.find("#signup-confirmpassword-input").exists()).toBe(true);
      expect(wrapper.find("#signup-confirm-button").exists()).toBe(true);
      expect(wrapper.find("#signup-cancel-button").exists()).toBe(true);
    });
  });
});
