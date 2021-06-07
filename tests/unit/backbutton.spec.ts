import { shallowMount } from "@vue/test-utils";
import backButton from "@/components/BackButton.vue";
import Vue from "vue";
import Vuetify from "vuetify";

const vuetify = new Vuetify();

const title = "Test";

describe("When loaded", () => {
    const wrapper = shallowMount(backButton, {
      vuetify,
      
    });
    it("should be vue instance", () => {
      expect(wrapper.vm).toBeTruthy();
    });
  
    it("should have all the necessary UI elements", () => {
      expect(wrapper.find("#backbutton").exists()).toBe(true);
    });
  });


describe("Checking back Button", () => {
    const $router = {
      go: jest.fn()
    };
  
    it("Should go back to the previous page", async() => {
        const wrapper = shallowMount(backButton, {
            vuetify,
            
            mocks: {
                $router,
            },
            });
            (wrapper.vm as any).goBack();
            await wrapper.vm.$nextTick();
            expect(wrapper.vm.$router.go).toBe($router.go);
    });
  });