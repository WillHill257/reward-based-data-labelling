import { mount } from "@vue/test-utils";
import router from "@/router";
import AppBar from "@/components/AppBar.vue";
import Vue from "vue";
import Vuetify from "vuetify";



const vuetify = new Vuetify();

Vue.use(Vuetify);
describe("Checking button visibility", () => {
    test("button visibility on log-in = true", () => {
        const wrapper = mount(AppBar, {
            computed: {
                isLoggedIn() {
                    return true;
                }
            },
            vuetify, router
        });
        wrapper.vm.$data.isLoggedIn = true;
        console.log(wrapper.vm.$data.isLoggedIn);
        expect(wrapper.find("#appbar-login").exists()).toBe(false);
        expect(wrapper.find("#appbar-register").exists()).toBe(false);
    });

    test("button visibility on log-in = false", () => {
        const wrapper = mount(AppBar, {
            computed: {
                isLoggedIn() {
                    return false;
                }
            },
            vuetify, router
        });
        wrapper.vm.$data.isLoggedIn = false;
        console.log(wrapper.vm.$data.isLoggedIn);
        expect(wrapper.find("#appbar-login").exists()).toBe(true);
        expect(wrapper.find("#appbar-register").exists()).toBe(true);
    });


});
