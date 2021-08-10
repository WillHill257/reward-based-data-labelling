import { createWrapper, shallowMount } from "@vue/test-utils";
import Landing from "@/views/Landing.vue";
import Vue from "vue";
import Vuetify from "vuetify";
const vuetify = new Vuetify();

Vue.use(Vuetify);
describe("LandingPage", () => {
  describe("Checking methods", () => {
    test("View Jobs function called when View Available Jobs button is clicked", () => {
      const wrapper = shallowMount(Landing, { vuetify });
      const listJobsClick = jest.fn();
      wrapper.setMethods({
        listJobsClick: listJobsClick,
      });
      wrapper.find("#availableJobs").trigger("click");
      wrapper.vm.$nextTick(() => {
        expect(listJobsClick).toHaveBeenCalled();
      });
    });

    test("Label data function called when I Want My Images Labelled button is clicked", () => {
      const wrapper = shallowMount(Landing, { vuetify });
      const labelImagesClick = jest.fn();
      wrapper.setMethods({
        labelImagesClick: labelImagesClick,
      });
      wrapper.find("#dataLblBtn").trigger("click");
      wrapper.vm.$nextTick(() => {
        expect(labelImagesClick).toHaveBeenCalled();
      });
    });
  });

  describe("Loaded UI elements", () => {
    test("should have all the necessary UI elements", () => {
      const wrapper = shallowMount(Landing, { vuetify });
      expect(wrapper.find("#titleLanding").exists()).toBe(true);
      expect(wrapper.find("#step1").exists()).toBe(true);
      expect(wrapper.find("#step2").exists()).toBe(true);
      expect(wrapper.find("#step3").exists()).toBe(true);

      expect(wrapper.find("#dataLblBtn").exists()).toBe(true);
      expect(wrapper.find("#availableJobs").exists()).toBe(true);
    });
  });
  describe("testing router ", ()=>{
    test("ListJobs" , ()=>{
      const mockRouter = {
        push: jest.fn()
      }
      const wrapper: any = shallowMount(Landing,{vuetify,
        mocks:{
          $route: mockRouter
        }
    
      });
      wrapper.vm.$router = mockRouter
      const pushSpy = jest.spyOn(mockRouter, "push");

      wrapper.vm.listJobsClick()
      expect(pushSpy).toHaveBeenCalled
    })

    test("Available Jobs" , ()=>{
      const mockRouter = {
        push: jest.fn()
      }
      const wrapper: any = shallowMount(Landing,{vuetify,
        mocks:{
          $route: mockRouter
        }
    
      });
      wrapper.vm.$router = mockRouter
      const pushSpy = jest.spyOn(mockRouter, "push");

      wrapper.vm.labelImagesClick()
      expect(pushSpy).toHaveBeenCalled
    })
    

    
  })
  
});
