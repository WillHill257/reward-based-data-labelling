import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Login from "@/views/Login.vue";
import axios from "axios";

describe("Testing basic visual aspects of login screen", () => {
  it("An email field is displayed", () => {
    const wrapper = shallowMount(Login, {
      mocks: { $http: axios },
    });
    expect(wrapper.find("#login-email-input").exists()).is.equal(true);
  });

  it("A password field is displayed", () => {
    const wrapper = shallowMount(Login, {
      mocks: { $http: axios },
    });
    expect(wrapper.find("#login-password-input").exists()).is.equal(true);
  });

  // it("The password input is not visible", () => {
  //     const wrapper = shallowMount(Login, {
  //         mocks: { $http: axios },
  //     });
  //     expect(wrapper.find('.field__slot').exists()).is.equal(true)
  // });
});

// describe("Login function", function(){
//   it("Should return and error if user not found", function(){
//     const wrapper = shallowMount(Login, {
//       mocks: { $http: axios },
//     });
//     expect(
//       wrapper.find("#globalError").exists(),
//       'Element with ID "globalError" is not found in the DOM, but is required.'
//     ).to.equal(true);
//   })
// })