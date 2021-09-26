import { mount } from "@vue/test-utils";
import router from "@/router";
import AppBar from "@/components/AppBar.vue";
import Vue from "vue";
import Vuetify from "vuetify";

const vuetify = new Vuetify();

Vue.use(Vuetify);
describe("Checking button visibility", () => {
  test("button visibility on log-in = true", () => {
    //creating a wrapper to mock the view displayed
    const wrapper = mount(AppBar, {
      computed: {
        isLoggedIn() {
          return true;
        },
      },
      vuetify,
      router,
    });
    //setting logged in to be true for testing
    wrapper.vm.$data.isLoggedIn = true;
    //the app bar does not contain the register and login buttons (UX)
    expect(wrapper.find("#appbar-login").exists()).toBe(false);
    expect(wrapper.find("#appbar-register").exists()).toBe(false);
  });

  test("button visibility on log-in = false", () => {
    //creating a wrapper to mock the view displayed
    const wrapper = mount(AppBar, {
      computed: {
        isLoggedIn() {
          return false;
        },
      },
      vuetify,
      router,
    });
    //setting logged in to be false for testing
    wrapper.vm.$data.isLoggedIn = false;
    //the app bar does contain the register and login buttons - since the user still needs to login/register
    expect(wrapper.find("#appbar-login").exists()).toBe(true);
    expect(wrapper.find("#appbar-register").exists()).toBe(true);
  });
});
