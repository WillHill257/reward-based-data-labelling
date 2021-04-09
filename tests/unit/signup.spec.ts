import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Signup from "@/views/Sign_up.vue";
import axios from "axios";

describe("Testing UI elements of sign up screen", () => {
  // Tests if there is username input field
  it("should display an input field for username", () => {
    const wrapper = shallowMount(Signup, {
      mocks: { $http: axios },
    });
    expect(
      wrapper.find("#signup-username-input").exists(),
      'Element with ID "signup-username-input" is not found in the DOM, but is required.'
    ).to.equal(true);
  });

  // Tests if there is email input field
  it("should display an input field for email", () => {
    const wrapper = shallowMount(Signup, {
      mocks: { $http: axios },
    });
    expect(
      wrapper.find("#signup-email-input").exists(),
      'Element with ID "signup-email-input" is not found in the DOM, but is required'
    ).to.equal(true);
  });

  // Tests if there is password input field
  it("should display an input field for password", () => {
    const wrapper = shallowMount(Signup, {
      mocks: { $http: axios },
    });
    expect(
      wrapper.find("#signup-password-input").exists(),
      'Element with ID: "signup-password-input" is not found in the DOM, but is required'
    ).to.equal(true);
  });

  // Tests if there is password confirm input field
  it("should display an input field for password confirmation", () => {
    const wrapper = shallowMount(Signup, {
      mocks: { $http: axios },
    });
    expect(
      wrapper.find("#signup-confirmpassword-input").exists(),
      'Element with ID: "signup-confirmpassword-input" is not found in the DOM, but is required'
    ).to.equal(true);
  });

  // Tests if there is a button to confirm sign up
  it("should display a button to confirm sign up", () => {
    const wrapper = shallowMount(Signup, {
      mocks: { $http: axios },
    });
    expect(
      wrapper.find("#signup-confirm-button").exists(),
      'Element with ID: "signup-confirmation-button" is not found in the DOM, but is required'
    ).to.equal(true);
  });

  // Tests if there is a button to cancel sign up
  it("should display a button to cancel sign up", () => {
    const wrapper = shallowMount(Signup, {
      mocks: { $http: axios },
    });
    expect(
      wrapper.find("#signup-cancel-button").exists(),
      'Element with ID: "signup-cancel-button" is not found in the DOM, but is required'
    ).to.equal(true);
  });
});
