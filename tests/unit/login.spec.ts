import { shallowMount } from "@vue/test-utils";
import Login from "@/views/Login.vue";
import axios from "axios";
import Vue from "vue";
import Vuetify from "vuetify";

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

  describe("testing buttons", () => 
  {
    test("checking login", () =>
    {
    const wrapper  = shallowMount(Login);

    const loginOnClick = jest.fn();
    wrapper.setMethods({
      loginOnClick: loginOnClick
    });

    wrapper.vm.$data.email = "";
    wrapper.vm.$data.password = "";
    wrapper.find("#login-confirm-button").trigger("click");
    expect(loginOnClick).toHaveBeenCalled();
    })

    test("checkin register", () =>
    {
      const mockRouter = {
        push: jest.fn()
      }
    const wrapper  = shallowMount(Login,{
      mocks: {
        $router: mockRouter
      }});



    wrapper.vm.$data.email = "";
    wrapper.vm.$data.password = "";
    wrapper.find("#register-button").trigger("click");
    expect(mockRouter.push).toHaveBeenCalled();
    })

  })

  describe("testing errors",  () =>
  {

  });

});


