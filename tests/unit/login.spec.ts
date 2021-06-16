import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import Login from "@/views/Login.vue";
import axios from "axios";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import { UserModule } from "@/store/modules/user";

Vue.use(Vuetify);

describe("Testing basic visual aspects of login screen", () => {
  //make sure all components are displayed appropriately

  test("An email field is displayed", () => {
    // mock axios witihin the mocked login
    const wrapper = shallowMount(Login, {
      mocks: { $http: axios },
    });
    expect(wrapper.find("#login-email-input").exists()).toBe(true);
  });

  it("A password field is displayed", () => {
    // mock axios witihin the mocked login
    const wrapper = shallowMount(Login, {
      mocks: { $http: axios },
    });
    expect(wrapper.find("#login-password-input").exists()).toBe(true);
  });

  describe("testing buttons", () => {
    test("checking login", () => {
      // mock login
      const wrapper = shallowMount(Login);

      //assign the login function to a jest function to mock it
      const loginOnClick = jest.fn();
      wrapper.setMethods({
        loginOnClick: loginOnClick,
      });

      wrapper.vm.$data.email = "";
      wrapper.vm.$data.password = "";
      wrapper.find("#login-confirm-button").trigger("click");
      expect(loginOnClick).toHaveBeenCalled();
    });

  });

  describe("testing errors", () => {
    // making sure that when an error is asigned it dsplays appropriately
    const wrapper: any = shallowMount(Login);
    wrapper.vm.$data.error = "";
    wrapper.vm.$data.alert = false;

    test("testing setErrorMesssage", () => {
      wrapper.vm.setErrorMessage("hello");
      expect(wrapper.vm.$data.Error).toEqual("hello");
      expect(wrapper.vm.$data.alert).toEqual(true);
    });
  });

  describe("testing usermodule", () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    // mock user module
    const modules = {
      UserModule: {
        state: {},
        actions: {
          loginUser: jest.fn(),
        },
        namespaced: true,
      },
    };
    test("testing module functions", async () => {
      // mock store
      const store = new Vuex.Store({ modules });
      // mock login view
      const wrapper: any = shallowMount(Login, { localVue, store });
      //spy on user module to check for changes
      const loginSpy = jest.spyOn(UserModule, "loginUser");
      //enter dummy data
      wrapper.vm.validate = jest.fn().mockReturnValue(true);
      wrapper.vm.$data.email = "fname@gmail.com";
      wrapper.vm.$data.password = "fnamefname1";
      //module function having worked
      await wrapper.find("#login-confirm-button").trigger("click");
      expect(loginSpy).toHaveBeenCalled();
    });
  });
});
