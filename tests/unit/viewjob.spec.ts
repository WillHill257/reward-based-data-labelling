import { shallowMount } from "@vue/test-utils";
import viewJob from "@/views/ViewJob.vue";
import Vue from "vue";
import Vuetify from "vuetify";



Vue.use(Vuetify);
describe("viewJob", () => {
    test("should display all the UI elements", () => {
        const wrapper = shallowMount(viewJob);
        expect(wrapper.isVueInstance()).toBeTruthy();
        expect(wrapper.find("#job-summary").exists()).toBe(true);
        expect(wrapper.find("#btnAccept").exists()).toBe(true);
        expect(wrapper.find("#btnScrollUp").exists()).toBe(true);
        expect(wrapper.find("#pic-display").exists()).toBe(true);
    });
});

describe("testing buttons", () => {
    test("On accept is called when the Accept button is clicked", () => {
        const wrapper = shallowMount(viewJob);
        const onAccept = jest.fn();
        wrapper.setMethods({
            onAccept: onAccept
        });
        wrapper.find("#btnAccept").trigger("click");
        expect(onAccept).toHaveBeenCalled();
    });
    test("onScrollUp is called when the onScrollUp button is clicked", () => {
        const wrapper = shallowMount(viewJob);
        const onScrollUp = jest.fn();
        wrapper.setMethods({
            onScrollUp: onScrollUp
        });
        wrapper.find("#btnScrollUp").trigger("click");
        expect(onScrollUp).toHaveBeenCalled();
    });
})