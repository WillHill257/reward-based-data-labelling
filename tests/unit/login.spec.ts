import { shallowMount } from "@vue/test-utils";
import Login from "@/views/Login.vue";
import axios from "axios";
import Vue from "vue";
import Vuetify from "vuetify";
const vuetify = new Vuetify();

Vue.use(Vuetify);
describe("Testing basic visual aspects of login screen", () => {
  test("An email field is displayed", () => {
    const wrapper = shallowMount(Login, {
      mocks: { $http: axios },
    });
    expect(wrapper.find("#login-email-input").exists()).toBe(true);
  });

  it("A password field is displayed", () => {
    const wrapper = shallowMount(Login, {
      mocks: { $http: axios },
    });
    expect(wrapper.find("#login-password-input").exists()).toBe(true);
  });

  // it("The password input is not visible", () => {
  //     const wrapper = shallowMount(Login, {
  //         mocks: { $http: axios },
  //     });
  //     expect(wrapper.find('.field__slot').exists()).is.equal(true)
  // });
});

describe("Login functions", function(){
  test("Submit function called when submit button is clicked", () => {
    const wrapper = shallowMount(Login, {
      vuetify,
      mocks: { $http: axios },
    });
    const loginOnClick = jest.fn();
    wrapper.setMethods({
      loginOnClick: loginOnClick
    });
    wrapper.find("#login-click").trigger("click");
    expect(loginOnClick).toHaveBeenCalled();
  });


})



//login-password-input

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
