import { shallowMount } from "@vue/test-utils";
import router from "@/router";
import AppBar from "@/components/AppBar.vue";
import Vue from "vue";
import Vuetify from "vuetify";



const vuetify = new Vuetify();

Vue.use(Vuetify);
describe("Checking button visibility", () => {
    test("button visibility", () => {
        const wrapper = shallowMount(AppBar, {
            vuetify, router
        });
        wrapper.vm.$data.isLoggedIn = true;
        expect(wrapper.find("#appbar-login").exists()).toBe(true);
        expect(wrapper.find("#appbar-register").exists()).toBe(true);
    });



});
