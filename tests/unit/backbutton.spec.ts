import { shallowMount } from "@vue/test-utils";
import backButton from "@/components/BackButton.vue";
import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);
describe("backButton", () => {
    test("should display all the UI elements", () => {
        const wrapper = shallowMount(backButton);
        expect(wrapper.find("#backbutton").exists()).toBe(true);
    });
});

describe("Testing all my buttons",  () => {
    test("go back button is called", async() => {
        const wrapper = shallowMount(backButton);
        const goBack = jest.fn();
        wrapper.setMethods({
            goBack: goBack,
        });
        await wrapper.find("#backbutton").trigger("click");
        wrapper.vm.$nextTick(()=> {
            expect(goBack).toHaveBeenCalled();
          });
        
    });
    
})