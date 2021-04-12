import { expect } from "chai";
import {
  createLocalVue,
  createWrapper,
  mount,
  shallowMount,
} from "@vue/test-utils";
import Signup from "@/views/Sign_up.vue";
import axios from "axios";
import Vue from "vue";
import Vuetify from "vuetify";

declare const global: any;
Vue.use(Vuetify);
describe("Testing sign up screen", () => {
  const localVue = createLocalVue();
  let vuetify: Vuetify;
  beforeEach(() => {
    global.requestAnimationFrame = (cb: any) => cb();
    vuetify = new Vuetify();
  });

  describe("when loaded", () => {
    it("should have all the necessary UI elements", () => {
      const wrapper = mount(Signup, { localVue, vuetify });
      expect(
        wrapper.find("#signup-firstname-input").exists(),
        'Element with ID "signup-firstname-input" is not found in the DOM, but is required.'
      ).to.equal(true);
      expect(
        wrapper.find("#signup-surname-input").exists(),
        'Element with ID "signup-surname-input" is not found in the DOM, but is required.'
      ).to.equal(true);
      expect(
        wrapper.find("#signup-email-input").exists(),
        'Element with ID "signup-email-input" is not found in the DOM, but is required'
      ).to.equal(true);
      expect(
        wrapper.find("#signup-password-input").exists(),
        'Element with ID: "signup-password-input" is not found in the DOM, but is required'
      ).to.equal(true);
      expect(
        wrapper.find("#signup-confirmpassword-input").exists(),
        'Element with ID: "signup-confirmpassword-input" is not found in the DOM, but is required'
      ).to.equal(true);
      expect(
        wrapper.find("#signup-confirm-button").exists(),
        'Element with ID: "signup-confirmation-button" is not found in the DOM, but is required'
      ).to.equal(true);
      expect(
        wrapper.find("#signup-cancel-button").exists(),
        'Element with ID: "signup-cancel-button" is not found in the DOM, but is required'
      ).to.equal(true);
    });
  });
});
