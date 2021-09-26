import { createWrapper, mount, shallowMount } from "@vue/test-utils";
import LabelImages from "@/views/Label.vue";
import Vue from "vue";
import Vuetify from "vuetify";
const vuetify = new Vuetify();

Vue.use(Vuetify);

describe("Labelling Page", () => {
  describe("Checking method calls", () => {
    test("When a chip is clicked, is addToSelection called", () => {
      // mock label page
      const wrapper: any = shallowMount(LabelImages, { vuetify });
      const addToSelection = jest.fn();

      // //make a pill to look for
      // const value = "a"
      // wrapper.vm.addToSelection(value)

      // mock method to list jobs
      wrapper.setMethods({
        addToSelection: addToSelection,
      });
      wrapper.vm.$nextTick(() => {
        //trigger click on available jobs button
        wrapper.find(".labelling-label").trigger("click");
        //test passes if the method has been clicked
        wrapper.vm.$nextTick(() => {
          expect(addToSelection).toHaveBeenCalled();
        });
      });
    });

    /*
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
    });*/
  });

  describe("Checking methods behave as expected", () => {
    //one pill selected
    test("One pill clicked", () => {
      // mock landing page
      const wrapper: any = shallowMount(LabelImages, { vuetify });

      // add value to array when method called
      const value = "a";
      wrapper.vm.addToSelection(value);

      expect(wrapper.vm.$data.selectedLabels.length).toBe(1);
    });

    //pill selected and then unselected
    test("One pill clicked", () => {
      // mock landing page
      const wrapper: any = shallowMount(LabelImages, { vuetify });
      const value = "a";

      //insert value into array so it's there already
      wrapper.vm.$data.selectedLabels = [value];

      // add value to array when method called
      wrapper.vm.addToSelection(value);

      expect(wrapper.vm.$data.selectedLabels.length).toBe(0);
    });
  });

  //more than one pill selected

  //one pill selected and then removed

  //two pills selected and then one removed

  describe("Loaded UI elements", () => {
    test("should have all the necessary UI elements", async () => {
      //mock labelling page
      const wrapper = mount(LabelImages, { vuetify });

      // await wrapper.vm.$nextTick();

      //expect labelling components to have appeared (this is their order top to bottom)
      expect(wrapper.find(".label-card").exists()).toBe(true);
      expect(wrapper.find("#labelImage").exists()).toBe(true);
      expect(wrapper.find("#instruction").exists()).toBe(true);
      expect(wrapper.find("#labelChoices").exists()).toBe(true);
      //maybe the individual labels too?
      expect(wrapper.find("#nextImageBtn").exists()).toBe(true);
      expect(wrapper.find("#prevImageBtn").exists()).toBe(true);
      expect(wrapper.find("#finishBtn").exists()).toBe(false); // don't want to see if can't finish a batch
      expect(wrapper.find("#backbutton").exists()).toBe(true);
      expect(wrapper.find(".txtTimer").exists()).toBe(true);
    });

    test("should show the Finish button when batch is complete", async () => {
      const wrapper = shallowMount(LabelImages, { vuetify });

      // mock the values
      wrapper.vm.$data.canFinish = true;

      await wrapper.vm.$nextTick();

      expect(wrapper.find("#finishBtn").exists()).toBe(true);
    });
  });

  //Router testing templates
  /*
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
  */
});
