import { shallowMount } from "@vue/test-utils";
import ListJobs from "@/views/ListJobs.vue";
import Vue from "vue";
import Vuetify from "vuetify";
const vuetify = new Vuetify();


Vue.use(Vuetify);
describe("ViewJobs", () => {
    test("should display all the UI elements", () => {
        const wrapper = shallowMount(ListJobs);
        expect(wrapper.find("#job-title").exists()).toBe(true);
        expect(wrapper.find("#job-type").exists()).toBe(true);
        expect(wrapper.find("#job-description").exists()).toBe(true);
    });
});

describe("Testing all my buttons", () => {
    test("go to job is classed when view job is clicked",() => {
        const wrapper = shallowMount(ListJobs);
        const goToJob = jest.fn();
        wrapper.setMethods({
            goToJob: goToJob,
        });
        wrapper.find("#btn-view-job").trigger("click");
        wrapper.vm.$nextTick(()=> {
            expect(goToJob).toHaveBeenCalled();
          });
        
    });
    
})