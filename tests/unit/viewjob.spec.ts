import { shallowMount } from "@vue/test-utils";
import viewJob from "@/views/ViewJob.vue";
import Vue from "vue";
import Vuetify from "vuetify";
const vuetify = new Vuetify();


Vue.use(Vuetify);
describe("viewJob", () => {
    test("should display all the UI elements", () => {
        const wrapper = shallowMount(viewJob, {vuetify});
        expect(wrapper.isVueInstance()).toBeTruthy();
        expect(wrapper.find("#job-summary").exists()).toBe(true);
        expect(wrapper.find("#btnAccept").exists()).toBe(true);
      // expect(wrapper.find("#pic-display").exists()).toBe(true);
    });
});

describe("testing buttons", () => {
    test("On accept is called when the Accept button is clicked", () => {
        const wrapper = shallowMount(viewJob, {vuetify});
        const onAccept = jest.fn();
        wrapper.setMethods({
            onAccept: onAccept
        });
        wrapper.find("#btnAccept").trigger("click");
        expect(onAccept).toHaveBeenCalled();
    });

})