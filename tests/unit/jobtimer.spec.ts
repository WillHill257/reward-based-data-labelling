import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import JobTimer from "@/components/JobTimer.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import flushPromises from "flush-promises";
// jest.mock("../../src/components/JobTimer.vue", () => ({
//     expiryTime: jest.fn(),
//   }));


Vue.use(Vuetify);

const vuetify = new Vuetify();

const mockJobResponse = {
    data: {
      days:0,
      hours:1,
      mins:2,
      secs:3,
    },
  };

describe("the time function works", () =>{
    test("the timer variables get values",()=>{

        const wrapper: any = mount(JobTimer, {
            vuetify,
            data: mockJobResponse,
          });
        const setTime = jest.spyOn(wrapper.vm, "expiryTime");

        setTime.mockResolvedValue({mockJobResponse});
        wrapper.vm.expiryTime();
        expect(setTime).toHaveBeenCalled();

        expect(wrapper.vm.days).toBe(0);
        expect(wrapper.vm.hours).toBe(1);

    });
});