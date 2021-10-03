import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import JobTimer from "@/components/JobTimer.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import flushPromises from "flush-promises";
import * as Batch from "@/api/Batch.api";
jest.mock("../../src/api/Batch.api", () => ({
  batchTimer: jest.fn().mockResolvedValue({
    data: {
      expiry:"2021-09-27T17:10:27.052Z",
    },
    }),
}));


Vue.use(Vuetify);
const vuetify = new Vuetify();

describe("the time function works", () =>{
    test("the timer variables get values",async()=>{
      jest.useFakeTimers();
      const batchTimerSpy = jest.spyOn(Batch,"batchTimer");
      const wrapper: any = mount(JobTimer,{vuetify});
      
      const mockJobResponse = {
      data: {
        expiry:"2021-09-27T17:10:27.052Z",
      },
      };  
      const expiryTimeSpy = jest.spyOn(wrapper.vm,"expiryTime");

      await flushPromises();
      
      expect(batchTimerSpy).toHaveBeenCalled();
      jest.advanceTimersByTime(1000);
      expect(wrapper.vm.$data.days===NaN).toBe(false);
      expect(wrapper.vm.$data.hours===NaN).toBe(false);
      expect(wrapper.vm.$data.mins===NaN).toBe(false);
      expect(wrapper.vm.$data.secs===NaN).toBe(false);



    });
});