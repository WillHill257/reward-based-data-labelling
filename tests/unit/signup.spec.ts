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
      // make sure all compnents show on the screen appropriately
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
      // mock signup screen
      const wrapper = shallowMount(Signup);
      // assign signup variable to method
      const onSignUp = jest.fn();
      wrapper.setMethods({
        onSignUp: onSignUp
      });
      wrapper.find("#signup-confirm-button").trigger("click");
      expect(onSignUp).toHaveBeenCalled();
    });

   });
  describe("testing errors", () => {
    // mock signup screen
    const wrapper: any = shallowMount(Signup, {vuetify});
    // spy on errorAlert
    const setErrorAlertSpy = jest.spyOn(wrapper.vm, "setErrorAlert");

    // setting data to be tested
    wrapper.vm.$data.firstName = "";
    wrapper.vm.$data.surname = "";
    wrapper.vm.$data.email = "";
    wrapper.vm.$data.password = "";
    wrapper.vm.$data.confirmpassword = "";

    test("checking null values", () => {
      // click signup button and test results
      wrapper.find("#signup-confirm-button").trigger("click");
      expect(wrapper.vm.$data.errorAlert).toEqual("All fields required");
      wrapper.vm.$data.errorAlert = ""
      wrapper.vm.$data.firstName = "fname";
      wrapper.vm.$data.surname = "sname";
      wrapper.vm.$data.email = "fname@gmail.com";
      wrapper.vm.$data.password = "password1";
      wrapper.vm.$data.confirmPassword = "password1";
      //see how many times things get called, expect 1
      wrapper.find("#signup-confirm-button").trigger("click");
      expect(setErrorAlertSpy).toHaveBeenCalledTimes(1)
      expect(wrapper.vm.$data.errorAlert).toEqual("");

      //see how many times things get called, expect 2
      wrapper.vm.$data.errorAlert = "";
      wrapper.vm.$data.email = "fnamegmail.com";
      wrapper.find("#signup-confirm-button").trigger("click");
      expect(setErrorAlertSpy).toHaveBeenCalledTimes(2)
      expect(wrapper.vm.$data.errorAlert).toEqual("Email is invalid");
      wrapper.vm.$data.email = "fname@gmail.com";

      //see how many times things get called, expect 3
      wrapper.vm.$data.errorAlert = "";
      wrapper.vm.$data.password = "password";
      wrapper.find("#signup-confirm-button").trigger("click");
      expect(setErrorAlertSpy).toHaveBeenCalledTimes(3)
      expect(wrapper.vm.$data.errorAlert).toEqual("Passwords do not match");

      //see how many times things get called, expect 4
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

    //mock vue store
    const store = new Vuex.Store({modules});
    //mock signup view
    const wrapper:any = shallowMount(Signup,{localVue,store});
    //spy on user module to make sure it is behaving appropriately
    const signup = jest.spyOn(UserModule, "signupUser")
    //enter dummy data
    wrapper.vm.validate = jest.fn().mockReturnValue(true)
    wrapper.vm.$data.firstName = "fname";
    wrapper.vm.$data.surname = "sname";
    wrapper.vm.$data.email = "fname@gmail.com";
    wrapper.vm.$data.password = "password1";
    wrapper.vm.$data.confirmPassword = "password1";
    //check signup works
    await wrapper.find("#signup-confirm-button").trigger("click");
    expect(signup).toHaveBeenCalled();
    });

});