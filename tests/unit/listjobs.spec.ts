
import { shallowMount } from "@vue/test-utils";
import ListJobs from "@/views/ListJobs.vue";
import Vue from "vue";
import Vuetify from "vuetify";
const vuetify = new Vuetify();


Vue.use(Vuetify);
describe("ViewJobs", () => {
    test("should display all the UI elements", () => {
        const wrapper = shallowMount(ListJobs);
        expect(wrapper.find("#list-jobs").exists()).toBeTruthy();
    });

})


