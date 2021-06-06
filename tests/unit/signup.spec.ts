import { shallowMount, createLocalVue } from "@vue/test-utils";
import Signup from "@/views/Sign_up.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import VueRouter from "vue-router";
import { UserModule } from "@/store/modules/user";


const vuetify = new Vuetify();
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
  describe("checking buttons",  () => {

    // test("Checking signup-cancel-button", async () => {
    //   const mockRouter = {
    //     push: jest.fn()
    //   }
    //   const wrapper: any = shallowMount(Signup, {
    //     mocks: {
    //       $router: mockRouter
    //     }
    //   })

    //   await wrapper.find("#signup-cancel-button").trigger("click");
    //   expect(mockRouter.push).toHaveBeenCalled();
    // });

    test("Checking signup-confirm-button", () => {
      const wrapper = shallowMount(Signup);
      const onSignUp = jest.fn();
      wrapper.setMethods({
        onSignUp: onSignUp
      });
      wrapper.find("#signup-confirm-button").trigger("click");
      expect(onSignUp).toHaveBeenCalled();
    });


   });
  describe("testing errors", () => {
    
    const wrapper: any = shallowMount(Signup, {vuetify});
    const setErrorAlertSpy = jest.spyOn(wrapper.vm, "setErrorAlert");

    wrapper.vm.$data.firstName = "";
    wrapper.vm.$data.surname = "";
    wrapper.vm.$data.email = "";
    wrapper.vm.$data.password = "";
    wrapper.vm.$data.confirmpassword = "";

    test("checking null values", () => {
      wrapper.find("#signup-confirm-button").trigger("click");
      expect(wrapper.vm.$data.errorAlert).toEqual("All fields required");
      wrapper.vm.$data.errorAlert = ""
      wrapper.vm.$data.firstName = "fname";
      wrapper.vm.$data.surname = "sname";
      wrapper.vm.$data.email = "fname@gmail.com";
      wrapper.vm.$data.password = "password1";
      wrapper.vm.$data.confirmPassword = "password1";

      wrapper.find("#signup-confirm-button").trigger("click");
      expect(setErrorAlertSpy).toHaveBeenCalledTimes(1)
      expect(wrapper.vm.$data.errorAlert).toEqual("");

      wrapper.vm.$data.errorAlert = "";
      wrapper.vm.$data.email = "fnamegmail.com";
      wrapper.find("#signup-confirm-button").trigger("click");
      expect(setErrorAlertSpy).toHaveBeenCalledTimes(2)
      expect(wrapper.vm.$data.errorAlert).toEqual("Email is invalid");
      wrapper.vm.$data.email = "fname@gmail.com";

      wrapper.vm.$data.errorAlert = "";
      wrapper.vm.$data.password = "password";
      wrapper.find("#signup-confirm-button").trigger("click");
      expect(setErrorAlertSpy).toHaveBeenCalledTimes(3)
      expect(wrapper.vm.$data.errorAlert).toEqual("Passwords do not match");

      wrapper.vm.$data.password = "pwrd";
      wrapper.vm.$data.confirmPassword = "pwrd";
      wrapper.find("#signup-confirm-button").trigger("click");
      expect(setErrorAlertSpy).toHaveBeenCalledTimes(4)
      expect(wrapper.vm.$data.errorAlert).toEqual("Password too short");
    });
  });


  describe("testing usermodule",async  () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const modules = {
      UserModule: {
        state: {},
        actions: {
          signupUser: jest.fn()
        },
        namespaced: true
      } 
    };

    const store = new Vuex.Store({modules});
    const wrapper:any = shallowMount(Signup,{localVue,store});
    const signup = jest.spyOn(UserModule, "signupUser")
    wrapper.vm.validate = jest.fn().mockReturnValue(true)
    wrapper.vm.$data.firstName = "fname";
    wrapper.vm.$data.surname = "sname";
    wrapper.vm.$data.email = "fname@gmail.com";
    wrapper.vm.$data.password = "password1";
    wrapper.vm.$data.confirmPassword = "password1";
    await wrapper.find("#signup-confirm-button").trigger("click");
    expect(signup).toHaveBeenCalled();
    });

});