import { shallowMount, createLocalVue } from "@vue/test-utils";
import Leaderboard from "@/components/Leaderboard.vue";
import Vue from "vue";
import Vuetify from "vuetify";

const vuetify = new Vuetify();

Vue.use(Vuetify);

describe("Leaderboard", () => {
  //I can see what I'm supposed to see
  const wrapper = shallowMount(Leaderboard, {
    propsData: {
      isShowDialog: false,
    },
    vuetify,
  });

  describe("When loaded", () => {
    it("should be vue instance", () => {
      expect(wrapper.vm).toBeTruthy();
    });

    //if there are items in the leaderboard show them
    it("All UI elements when leaderboard available", async () => {
      const wrapper = shallowMount(Leaderboard, {
        propsData: {
          isShowDialog: false,
        },
        vuetify,
      });

      wrapper.vm.$data.items = [{}, {}];
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.$data.items.length).toBeGreaterThan(0);
      expect(wrapper.find("#leaderboard").exists()).toBe(true);
      expect(wrapper.find("#unavailable").exists()).toBe(false);
    });

    //if not show a message
    it("All UI elements when leaderbaord unavailable", () => {
      const wrapper = shallowMount(Leaderboard, {
        propsData: {
          isShowDialog: false,
        },
        vuetify,
      });

      wrapper.vm.$data.items = [];
      expect(wrapper.find("#leaderboard").exists()).toBe(false);
      expect(wrapper.find("#unavailable").exists()).toBe(true);

      //if not show a message
    });
  });
});
