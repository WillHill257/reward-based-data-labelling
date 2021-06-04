import { shallowMount } from "@vue/test-utils";
import AppBar from "@/components/AppBar.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from 'vue-router';
Vue.use(VueRouter);


const vuetify = new Vuetify();

Vue.use(Vuetify);
describe("Testing basic visual aspects of login screen", () => {
  test("checking buttons", () => {
    const wrapper = shallowMount(AppBar, {vuetify});
    expect(wrapper.find("#appbar-login").exists()).toBe(true);
  });


});


