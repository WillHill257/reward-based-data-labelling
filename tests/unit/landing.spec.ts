import { createWrapper, shallowMount } from "@vue/test-utils";
import Landing from "@/views/Landing.vue";
import Vue from "vue";
import Vuetify from "vuetify";
const vuetify = new Vuetify();

Vue.use(Vuetify);
describe("LandingPage", () => {
  describe("Checking methods", () => {
    test("View Jobs function called when View Available Jobs button is clicked", () => {
      // mock landing page
      const wrapper = shallowMount(Landing, { vuetify });
      const listJobsClick = jest.fn();
      // mock method to list jobs
      wrapper.setMethods({
        listJobsClick: listJobsClick,
      });
      //trigger click on available jobs button
      wrapper.find("#availableJobs").trigger("click");
      //test passes if the method has been clicked
      wrapper.vm.$nextTick(() => {
        expect(listJobsClick).toHaveBeenCalled();
      });
    });

    test("Label data function called when I Want My Images Labelled button is clicked", () => {
      // mock landing page
      const wrapper = shallowMount(Landing, { vuetify });
      //mock a jest function
      const labelImagesClick = jest.fn();
      //assign the mocked function the function in our code
      wrapper.setMethods({
        labelImagesClick: labelImagesClick,
      });
      //trigger a click on the component that calls the function
      wrapper.find("#dataLblBtn").trigger("click");
      //check if it gets called appropriately
      wrapper.vm.$nextTick(() => {
        expect(labelImagesClick).toHaveBeenCalled();
      });
    });
  });

  describe("Loaded UI elements", () => {
    test("should have all the necessary UI elements", () => {
      //mock landing page
      const wrapper = shallowMount(Landing, { vuetify });
      //expect landing components to have appeared
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
      // mock the router
      const mockRouter = {
        push: jest.fn()
      }
      const wrapper: any = shallowMount(Landing,{vuetify,
        mocks:{
          $route: mockRouter
        }
    
      });
      //check that the router redirects user to the aprropriate place
      wrapper.vm.$router = mockRouter
      const pushSpy = jest.spyOn(mockRouter, "push");

      wrapper.vm.labelImagesClick()
      expect(pushSpy).toHaveBeenCalled
    })
    

    
  })
  
});
