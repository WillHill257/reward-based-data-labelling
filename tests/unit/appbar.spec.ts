import { mount } from "@vue/test-utils";
import router from "@/router";
import AppBar from "@/components/AppBar.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import * as UserApi from "@/api/Users.api";
import flushPromises from "flush-promises";
import { UserModule } from "@/store/modules/user";

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

describe("Checking methods", () => {
  it("Opens create job", async () => {
    const wrapper: any = mount(AppBar, {
      vuetify,
      router,
    });
    wrapper.setData({ first: false });

    await Vue.nextTick();

    wrapper.vm.openCreateJob();
    expect(wrapper.vm.$data.first).toBe(true);
    expect(wrapper.vm.$data.isShowDialog).toBe(true);
  });

  it("determines the user's name - successul", async () => {
    const wrapper: any = mount(AppBar, {
      vuetify,
      router,
    });

    const name = "Test";

    const mockResponse = {
      data: {
        firstName: name,
      },
    };

    const apiSpy = jest.spyOn(UserApi, "getUser");
    apiSpy.mockResolvedValue(mockResponse);

    wrapper.vm.determineUserName();
    await flushPromises();

    expect(wrapper.vm.$data.firstName).toBe(name);
  });

  it("determines the user's name - unsuccessul", async () => {
    const wrapper: any = mount(AppBar, {
      vuetify,
      router,
    });

    const name = "Test";

    const mockResponse = {
      data: {
        firstName: name,
      },
    };

    const consoleSpy = jest.spyOn(console, "error");

    const apiSpy = jest.spyOn(UserApi, "getUser");
    apiSpy.mockRejectedValue(mockResponse);

    wrapper.vm.determineUserName();
    await flushPromises();

    expect(consoleSpy).toBeCalled();
  });

  it("toggles the theme", () => {
    const wrapper: any = mount(AppBar, {
      vuetify,
      router,
    });

    const setItem = jest.spyOn(window.localStorage.__proto__, "setItem");

    const initialValue: boolean = wrapper.vm.$vuetify.theme.dark;
    wrapper.vm.toggleTheme();

    expect(wrapper.vm.$vuetify.theme.dark).toBe(!initialValue);
    expect(setItem).toBeCalled();
  });

  it("logs out", async () => {
    const wrapper: any = mount(AppBar, {
      vuetify,
      router,
    });

    const spy = jest.spyOn(UserModule, "logoutUser");

    wrapper.vm.logout();
    await flushPromises();

    expect(spy).toBeCalled();
  });

  it("sets the theme to dark", async () => {
    const getItem = jest.spyOn(window.localStorage.__proto__, "getItem");
    getItem.mockReturnValue("true");

    const wrapper: any = mount(AppBar, {
      vuetify,
      router,
    });

    await wrapper.vm.$nextTick();

    expect(getItem).toBeCalled();
    expect(wrapper.vm.$vuetify.theme.dark).toBe(true);
  });

  it("sets the theme to light", async () => {
    const getItem = jest.spyOn(window.localStorage.__proto__, "getItem");
    getItem.mockReturnValue("false");

    const wrapper: any = mount(AppBar, {
      vuetify,
      router,
    });

    await wrapper.vm.$nextTick();

    expect(getItem).toBeCalled();
    expect(wrapper.vm.$vuetify.theme.dark).toBe(false);
  });
});
