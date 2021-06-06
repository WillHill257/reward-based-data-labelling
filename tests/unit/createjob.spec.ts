import { shallowMount, createLocalVue } from "@vue/test-utils";
import CreateJob from "@/components/CreateJob/CreateJob.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex"
import  {Job} from "@/store/modules/job";

const vuetify = new Vuetify();

Vue.use(Vuetify);
describe("CreateJob", () => {
  const wrapper = shallowMount(CreateJob, {
    propsData: {
      isShowDialog: false,
    },
    vuetify
  });
  describe("When loaded", () => {
    it("should be vue instance", () => {
      expect(wrapper.vm).toBeTruthy();
    });

    it("should have all the necessary UI elements", () => {
      expect(wrapper.find("#title-input").exists()).toBe(true);
      expect(wrapper.find("#description-input").exists()).toBe(true);
      expect(wrapper.find("#discard-input").exists()).toBe(true);
      expect(wrapper.find("#submit-input").exists()).toBe(true);
      expect(wrapper.find("#createJobCard").exists()).toBe(true);
      expect(wrapper.find("#reward-input").exists()).toBe(true);
    });
  });

  describe("Checking buttons", () => {
    test("Close function called when discard button is clicked", () => {
      const wrapper = shallowMount(CreateJob, {
        vuetify
      });
      const closeDialog = jest.fn();
      wrapper.setMethods({
        closeDialog: closeDialog
      });
      wrapper.find("#discard-input").trigger("click");
      expect(closeDialog).toHaveBeenCalled();
    });
    test("Submit function called when submit button is clicked", () => {
      const wrapper = shallowMount(CreateJob, {
        vuetify
      });
      const onSubmitClicked = jest.fn();
      wrapper.setMethods({
        onSubmitClicked: onSubmitClicked
      });
      wrapper.find("#submit-input").trigger("click");
      expect(onSubmitClicked).toHaveBeenCalled();
    });
  });

  describe("When loaded", () => {
    test("Checking errors throw correctly", () => {
      const wrapper:any = shallowMount(CreateJob, {
        vuetify
      });
      wrapper.vm.$data.title = ""
      wrapper.vm.onSubmitClicked()
      expect(wrapper.vm.$data.errorMessage).toEqual("Title required");
      wrapper.vm.$data.title = "Something"
      wrapper.vm.$data.description = ""
      wrapper.vm.onSubmitClicked()
      expect(wrapper.vm.$data.errorMessage).toEqual("Description required");
      wrapper.vm.$data.description = "Something"
      wrapper.vm.$data.filesUploaded = []
      wrapper.vm.onSubmitClicked()
      expect(wrapper.vm.$data.errorMessage).toEqual("No files to upload");
    });

  });

  describe("Store", () => {

    it("Job module", async () => {
      const modules = {
        Job: {
          state: {},
          actions: {
            createJob: jest.fn()
          },
          namespaced: true
        } 
      };
      const localVue = createLocalVue();
      localVue.use(Vuex);

      const store = new Vuex.Store({modules});
      const wrapper:any = shallowMount(CreateJob,{localVue,store,vuetify});
      const jobSpy = jest.spyOn(Job, "createJob")
      //enter data
      wrapper.vm.$data.title = "Something"
      wrapper.vm.$data.description = "Something"
      wrapper.vm.$data.reward = "2"
      wrapper.vm.$data.labelData = "a, b, c"
      wrapper.vm.$data.selectedNumber = "2"
      wrapper.vm.$data.filesUploaded= ["1", "2"]
      await wrapper.find("#submit-input").trigger("click");
      
      expect(jobSpy).toHaveBeenCalled();
    });
  });
});
