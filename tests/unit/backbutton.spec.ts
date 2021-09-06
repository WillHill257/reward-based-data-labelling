import { shallowMount } from "@vue/test-utils";
import backButton from "@/components/BackButton.vue";
import Vue from "vue";
import Vuetify from "vuetify";

const vuetify = new Vuetify();

const title = "Test";

describe("When loaded", () => {
  //create a mock view
  const wrapper = shallowMount(backButton, {
    vuetify,
  });
  //expect it to be related to vue
  it("should be vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  //make sure the button displays on the screen
  it("should have all the necessary UI elements", () => {
    expect(wrapper.find("#backbutton").exists()).toBe(true);
  });
});

describe("Checking back Button", () => {
  const $router = {
    go: jest.fn(),
  };

  it("Should go back to the previous page", async () => {
    const spy = jest.spyOn($router, "go");

    //make a mock of the screen
    const wrapper = shallowMount(backButton, {
      vuetify,

      //make a mock of the router
      mocks: {
        $router,
      },
    });
    //when we click on the back button does it go back
    (wrapper.vm as any).goBack();
    await wrapper.vm.$nextTick();

    expect(spy).toBeCalledWith(-1);

    // expect(wrapper.vm.$router.go).toBe($router.go);
  });
});
