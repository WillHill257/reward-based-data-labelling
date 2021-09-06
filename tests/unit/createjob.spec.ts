import { shallowMount, createLocalVue } from "@vue/test-utils";
import CreateJob from "@/components/CreateJob/CreateJob.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import { Job } from "@/store/modules/job";
import * as JobApi from "@/api/Job.api";
import axios from "axios";
import flushPromises from "flush-promises";
import * as ItemApi from "@/api/Item.api";

// jest.mock("../../src/api/Job.api", () => ({
//   createJob: jest.fn(),
// }));
// jest.mock("axios", () => ({
//   post: jest.fn(),
// }));

const vuetify = new Vuetify();

Vue.use(Vuetify);
describe("CreateJob", () => {
  const wrapper = shallowMount(CreateJob, {
    propsData: {
      isShowDialog: false,
    },
    vuetify,
  });
  describe("When loaded", () => {
    it("should be vue instance", () => {
      expect(wrapper.vm).toBeTruthy();
    });

    it("should have all the necessary UI elements", () => {
      //the card on which the components sit
      expect(wrapper.find("#createJobCard").exists()).toBe(true);
      //the components
      expect(wrapper.find("#title-input").exists()).toBe(true);
      expect(wrapper.find("#description-input").exists()).toBe(true);
      expect(wrapper.find("#reward-input").exists()).toBe(true);
      expect(wrapper.find("#label-input").exists()).toBe(true);
      expect(wrapper.find("#numLabellers").exists()).toBe(true);
      //the buttons
      expect(wrapper.find("#discard-input").exists()).toBe(true);
      expect(wrapper.find("#submit-input").exists()).toBe(true);
    });
  });

  describe("Checking buttons", () => {
    test("Close function called when discard button is clicked", () => {
      //mock the screen
      const wrapper = shallowMount(CreateJob, {
        vuetify,
      });
      //mock the method to close the dialog
      const closeDialog = jest.fn();
      wrapper.setMethods({
        closeDialog: closeDialog,
      });
      //if the discard button is pressed
      wrapper.find("#discard-input").trigger("click");
      expect(closeDialog).toHaveBeenCalled();
    });
    test("Submit function called when submit button is clicked", () => {
      //mock the screen
      const wrapper = shallowMount(CreateJob, {
        vuetify,
      });
      //mocking the submit method
      const onSubmitClicked = jest.fn();
      wrapper.setMethods({
        onSubmitClicked: onSubmitClicked,
      });
      //press the submit button
      wrapper.find("#submit-input").trigger("click");
      expect(onSubmitClicked).toHaveBeenCalled();
    });
  });

  describe("When loaded", () => {
    test("Checking errors throw correctly", () => {
      const wrapper: any = shallowMount(CreateJob, {
        vuetify,
      });
      //title missing
      wrapper.vm.$data.title = "";
      wrapper.vm.onSubmitClicked();
      expect(wrapper.vm.$data.errorMessage).toEqual("Title required");
      //description missing
      wrapper.vm.$data.title = "Something";
      wrapper.vm.$data.description = "";
      wrapper.vm.onSubmitClicked();
      expect(wrapper.vm.$data.errorMessage).toEqual("Description required");
      //No files uploaded
      wrapper.vm.$data.description = "Something";
      wrapper.vm.$data.filesUploaded = [];
      wrapper.vm.onSubmitClicked();
      expect(wrapper.vm.$data.errorMessage).toEqual("No files to upload");
      //labels missing
      wrapper.vm.$data.description = "Something";
      wrapper.vm.$data.filesUploaded = [""];
      wrapper.vm.$data.labelArray = [];
      wrapper.vm.onSubmitClicked();
      expect(wrapper.vm.$data.errorMessage).toEqual("Label(s) required");
      //number of labellers left empty
      wrapper.vm.$data.description = "Something";
      wrapper.vm.$data.filesUploaded = [""];
      wrapper.vm.$data.labelArray = ["a"];
      wrapper.vm.$data.selectedNumber = 0;
      wrapper.vm.$data.reward = 1;
      wrapper.vm.onSubmitClicked();
      expect(wrapper.vm.$data.errorMessage).toEqual(
        "Please select number of labellers required"
      );
      //successful request - no error message
      wrapper.vm.$data.description = "Something";
      wrapper.vm.$data.filesUploaded = [""];
      wrapper.vm.$data.labelArray = ["a"];
      wrapper.vm.$data.selectedNumber = 2;
      wrapper.vm.$data.reward = 10;

      wrapper.vm.onSubmitClicked();
      const expectedJson = {
        title: wrapper.vm.$data.title,
        description: wrapper.vm.$data.description,
        labels: wrapper.vm.$data.labelArray,
        rewards: wrapper.vm.$data.reward,
        numLabellersRequired: wrapper.vm.$data.selectedNumber,
      };
      expect(wrapper.vm.$data.jobJson).toEqual(expectedJson);
      expect(true).toEqual(true);
    });
  });

  describe("Validation", () => {
    /*test("Checking errors throw correctly when full", () => {
      //TODO
      const wrapper:any = shallowMount(CreateJob, {
        vuetify
      });
      wrapper.vm.$data.title = "Something"
      wrapper.vm.$data.description = "Something"
      wrapper.vm.$data.reward = 2
      wrapper.vm.$data.labelData = "a, b, c"
      wrapper.vm.$data.labelArray = ["a", "b", "c"]
      wrapper.vm.$data.selectedNumber = 2
      wrapper.vm.onSubmitClicked()
      //expect(true).toBe(true);
      expect(wrapper.vm.$data.descriptionRules).toBeFalsy();
      expect(wrapper.vm.$data.titleRules).toBeFalsy();
      expect(wrapper.vm.$data.labellerRules).toBeFalsy();
      expect(wrapper.vm.$data.rewardRules).toBeFalsy();
      expect(wrapper.vm.$data.descriptionRules).toEqual("Description is required");
      expect(wrapper.vm.$data.titleRules).toEqual("Title is required");
      expect(wrapper.vm.$data.labellerRules).toEqual("The number of labellers is required");
      expect(wrapper.vm.$data.rewardRules).toEqual("Reward is required");
    });*/
    // test("Checking errors throw correctly when empty", () => {
    //   const wrapper: any = shallowMount(CreateJob, {
    //     vuetify,
    //     propsData: {
    //       descriptionRules: [(v: string) => !!v || "Description is required"],
    //       titleRules: [(v: string) => !!v || "Title is required"],
    //       labellerRules: [
    //         [(v: string) => !!v || "The number of labellers is required"],
    //         [
    //           (v: string) =>
    //             !isNaN(parseFloat(v)) ||
    //             "The number of labellers must be a numeric value",
    //         ],
    //         [
    //           (v: string) =>
    //             parseFloat(v) >= 1 || "There must be at least one labeller",
    //         ],
    //       ],
    //       rewardRules: [
    //         [(v: string) => !!v || "Reward is required"],
    //         [
    //           (v: string) =>
    //             !isNaN(parseFloat(v)) || "The reward must be a numeric value",
    //         ],
    //         [
    //           (v: string) =>
    //             parseFloat(v) >= 1 || "The reward must be at least one",
    //         ],
    //       ],
    //     },
    //   });
    //   wrapper.vm.$data.title = "";
    //   wrapper.vm.$data.description = "";
    //   wrapper.vm.$data.reward = "";
    //   wrapper.vm.$data.labelData = "";
    //   wrapper.vm.$data.selectedNumber = "";
    //   wrapper.vm.onSubmitClicked();
    //   expect(wrapper.vm.$data.descriptionRules).toBeTruthy();
    //   expect(wrapper.vm.$data.titleRules).toBeTruthy();
    //   expect(wrapper.vm.$data.labellerRules).toBeTruthy();
    //   expect(wrapper.vm.$data.rewardRules).toBeTruthy();
    //   //expect(wrapper.vm.$data.descriptionRules).toHaveBeenCalled();
    //   /*expect(wrapper.vm.$data.descriptionRules).toEqual("Description is required");
    //   expect(wrapper.vm.$data.titleRules).toEqual("Title is required");
    //   expect(wrapper.vm.$data.labellerRules).toEqual("The number of labellers is required");
    //   expect(wrapper.vm.$data.rewardRules).toEqual("Reward is required");*/
    // });
    // test("Checking errors throw correctly numeric values out of bounds", () => {
    //   const wrapper: any = shallowMount(CreateJob, {
    //     vuetify,
    //   });
    //   wrapper.vm.$data.title = "Something";
    //   wrapper.vm.$data.description = "Something";
    //   wrapper.vm.$data.reward = "-1";
    //   wrapper.vm.$data.labelData = "Something";
    //   wrapper.vm.$data.selectedNumber = "-1";
    //   wrapper.vm.onSubmitClicked();
    //   /*const labelRules = [
    //   [[expect.]]
    //   ]
    //   const expected = expect.arrayContaining([
    //     labelRules
    //   ])*/
    //   expect(wrapper.vm.$data.labellerRules).toBeTruthy();
    //   expect(wrapper.vm.$data.rewardRules).toBeTruthy();
    // });
    // test("Checking errors throw correctly for non-numeric values", () => {
    //   const wrapper: any = shallowMount(CreateJob, {
    //     vuetify,
    //   });
    //   wrapper.vm.$data.title = "Something";
    //   wrapper.vm.$data.description = "Something";
    //   wrapper.vm.$data.reward = "a";
    //   wrapper.vm.$data.labelData = "Something";
    //   wrapper.vm.$data.selectedNumber = "a";
    //   wrapper.vm.onSubmitClicked();
    //   expect(wrapper.vm.$data.labellerRules).toBeTruthy();
    //   expect(wrapper.vm.$data.rewardRules).toBeTruthy();
    //   /*expect(wrapper.vm.$data.labellerRules).toEqual("The number of labellers must be a numeric value");
    //   expect(wrapper.vm.$data.rewardRules).toEqual("The reward must be a numeric value");*/
    // });
  });

  /*
    closeDialog()

    this.title = "";
    this.description = "";
    this.filesUploaded = [];
    this.labelArray = new Array<string>();
  */

  describe("Onclose dialogue", () => {
    test("Checking dialogue closes on sumbit", () => {
      const wrapper: any = shallowMount(CreateJob, {
        vuetify,
      });
      wrapper.vm.$data.title = "Something";
      wrapper.vm.$data.description = "Something";
      wrapper.vm.$data.reward = "2";
      wrapper.vm.$data.labelData = "a, b, c";
      wrapper.vm.$data.selectedNumber = "2";
      wrapper.vm.onSubmitClicked();
      const closeDialog = jest.fn();
      const onSubmitClicked = jest.fn();
      wrapper.setMethods({
        closeDialog: closeDialog,
        onSubmitClicked: onSubmitClicked,
      });
      wrapper.find("#submit-input").trigger("click");
      wrapper.find("#discard-input").trigger("click");
      expect(onSubmitClicked).toHaveBeenCalled();
      expect(closeDialog).toHaveBeenCalled();
    });

    it("the onCloseDiagogue function is called", () => {
      const wrapper: any = shallowMount(CreateJob, { vuetify });
      wrapper.vm.$data.title = "Something";
      wrapper.vm.$data.description = "Something";
      wrapper.vm.$data.reward = "2";
      wrapper.vm.$data.labelData = "a, b, c";
      wrapper.vm.$data.selectedNumber = "2";
      wrapper.vm.closeDialog();
      expect(wrapper.emitted("update:isShowDialog")).toBeTruthy();
      expect(wrapper.vm.$data.title).toBe("");
      expect(wrapper.vm.$data.description).toBe("");
      expect(wrapper.vm.$data.filesUploaded.length).toBe(0);
      expect(wrapper.vm.$data.labelArray.length).toBe(0);
    });

    it("things are reset", () => {
      const wrapper = shallowMount(CreateJob, { vuetify });
      const closeDialog = jest.fn();
      wrapper.setMethods({
        closeDialog: closeDialog,
      });
      wrapper.find("#submit-input").trigger("click");
      expect(wrapper.vm.$data.title).toBe("");
      expect(wrapper.vm.$data.description).toBe("");
      //let expectedfiles:any = [];
      expect(wrapper.vm.$data.filesUploaded.length).toBe(0);
      expect(wrapper.vm.$data.labelArray.length).toBe(0);
      //expect(closeDialog).toHaveBeenCalled();
    });
  });

  /*removeItem(index: any) {
      this.filesUploaded.splice(index, 1);
    },*/

  /*describe("Store", () => {

    it("Job module", async () => {
      const modules = {
        JobModule: {
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
      const wrapper:any = shallowMount(CreateJob,{localVue,store});
      const jobSpy = jest.spyOn(JobModule, "createJob")
      wrapper.vm.validate = jest.fn().mockReturnValue(true)
      //enter data
      wrapper.vm.$data.title = "Something"
      wrapper.vm.$data.description = "Something"
      wrapper.vm.$data.reward = "2"
      wrapper.vm.$data.labelData = "a, b, c"
      wrapper.vm.$data.selectedNumber = "2"

      await wrapper.find("#submit-input").trigger("click");
      expect(jobSpy).toHaveBeenCalled();

      
      await wrapper.vm.onSubmitClicked()

      expect(modules.JobModule.actions.createJob).toHaveBeenCalled();
    });
  }); */

  describe("Store", () => {
    it("Job module", async () => {
      const modules = {
        Job: {
          state: {},
          actions: {
            createJob: jest.fn(),
          },
          namespaced: true,
        },
      };
      const localVue = createLocalVue();
      localVue.use(Vuex);

      const store = new Vuex.Store({ modules });
      const wrapper: any = shallowMount(CreateJob, {
        localVue,
        store,
        vuetify,
      });
      const jobSpy = jest.spyOn(Job, "createJob");
      //enter data
      wrapper.vm.$data.title = "Something";
      wrapper.vm.$data.description = "Something";
      wrapper.vm.$data.reward = "2";
      wrapper.vm.$data.labelData = "a, b, c";
      wrapper.vm.$data.selectedNumber = "2";
      wrapper.vm.$data.filesUploaded = ["1", "2"];
      await wrapper.find("#submit-input").trigger("click");

      expect(jobSpy).toHaveBeenCalled();
    });

    // it("Job module", async () => {
    //   const modules = {
    //     Job: {
    //       state: {},
    //       actions: {
    //         createJob: jest.fn(),
    //       },
    //       namespaced: true,
    //     },
    //   };
    //   const localVue = createLocalVue();
    //   localVue.use(Vuex);

    //   const store = new Vuex.Store({ modules });
    //   const wrapper: any = shallowMount(CreateJob, {
    //     localVue,
    //     store,
    //     vuetify,
    //   });

    //   //enter data
    //   wrapper.vm.$data.title = "Something";
    //   wrapper.vm.$data.description = "Something";
    //   wrapper.vm.$data.reward = "2";
    //   wrapper.vm.$data.labelData = "a, b, c";
    //   wrapper.vm.$data.selectedNumber = "2";
    //   wrapper.vm.$data.filesUploaded = ["1", "2"];

    //   const expectedJson = {
    //     title: wrapper.vm.$data.title,
    //     description: wrapper.vm.$data.description,
    //     labels: wrapper.vm.$data.labelArray,
    //     rewards: wrapper.vm.$data.reward,
    //     numLabellersRequired: wrapper.vm.$data.selectedNumber,
    //   };

    //   // const jobMod = getModule(JobModule, store);

    //   wrapper.vm.$store = store;
    //   wrapper.vm.onSubmitClicked();
    //   expect(1).toEqual(1);
    // });
  });

  describe("Store", () => {
    it("Job module", async () => {
      const modules = {
        Job: {
          state: {},
          actions: {
            createJob: jest.fn(),
          },
          namespaced: true,
        },
      };
      const localVue = createLocalVue();
      localVue.use(Vuex);

      const store = new Vuex.Store({ modules });
      const wrapper: any = shallowMount(CreateJob, {
        localVue,
        store,
        vuetify,
      });
      const jobSpy = jest.spyOn(Job, "createJob");
      //enter data
      wrapper.vm.$data.title = "Something";
      wrapper.vm.$data.description = "Something";
      wrapper.vm.$data.reward = "2";
      wrapper.vm.$data.labelData = "a, b, c";
      wrapper.vm.$data.selectedNumber = "2";
      wrapper.vm.$data.filesUploaded = ["1", "2"];
      await wrapper.find("#submit-input").trigger("click");

      expect(jobSpy).toHaveBeenCalled();
    });
  });

  describe("on submit clicked", () => {
    test("should handle the correct response", async () => {
      //practice response
      const mockResponse = {
        data: {
          _id: "123",
        },
      };
      //mock view
      const wrapper: any = shallowMount(CreateJob, {
        vuetify,
      });
      wrapper.vm.$data.title = "Something";
      wrapper.vm.$data.description = "Something";
      wrapper.vm.$data.reward = "2";
      wrapper.vm.$data.labelData = "a, b, c";
      wrapper.vm.$data.selectedNumber = "2";
      wrapper.vm.$data.filesUploaded = ["1", "2"];

      //spy on api to see if we get the correct response
      const createJobSpy = jest.spyOn(JobApi, "createJob");
      createJobSpy.mockResolvedValue(mockResponse);

      //spy on upload images to see if it behaves correctly
      const uploadImagesSpy = jest.spyOn(ItemApi, "uploadImages");

      wrapper.vm.onSubmitClicked();

      await flushPromises();

      expect(uploadImagesSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("on files uploaded", () => {
    test("should add files to data", () => {
      // create a dummy file
      const mockFile = {
        name: "filename",
      };
      //mock the view
      const wrapper: any = shallowMount(CreateJob, {
        vuetify,
      });
      //check that files upload correctly
      wrapper.vm.onFilesUploaded(mockFile);
      expect(wrapper.vm.$data.filesUploaded.length).toEqual(1);
    });

    test("should throw error when file type is incorrect", () => {
      // if a user uploads a file that is not one of the two accepted types (.jpg or .png) does the system display the appropriate error
      const wrapper: any = shallowMount(CreateJob, {
        vuetify,
      });
      //mock file type error method
      wrapper.vm.onFileTypeError();
      expect(wrapper.vm.$data.errorVisibility).toEqual("visible");
      expect(wrapper.vm.$data.errorMessage).toEqual(
        "Warning: the files uploaded contain forbidden file type/s. (Accepted file types: .jpg and .png)"
      );
    });

    test("should be able to remove image", () => {
      // create a mock file
      const mockFile = {
        name: "filename",
      };
      // create a mock view
      const wrapper: any = shallowMount(CreateJob, {
        vuetify,
      });
      //upload two mock files
      wrapper.vm.onFilesUploaded(mockFile);
      wrapper.vm.onFilesUploaded(mockFile);
      //check that the expected number of files is 2
      expect(wrapper.vm.$data.filesUploaded.length).toEqual(2);
      //remove one
      wrapper.vm.removeItem(1);
      //check that it has been removed
      expect(wrapper.vm.$data.filesUploaded.length).toEqual(1);
    });
  });

  describe("uploadImage", () => {
    test("uploads an image", async () => {
      // mock view
      const wrapper: any = shallowMount(CreateJob, {
        vuetify,
      });

      //spy on the close dailogue function
      const closeDialogSpy = jest.spyOn(wrapper.vm, "closeDialog");
      const postSpy = jest.spyOn(ItemApi, "uploadImages");
      postSpy.mockResolvedValue({ status: 200 });

      let formData = new FormData();

      await wrapper.vm.upload(formData);
      await flushPromises();

      //expect it to have been called if the dialogu was closed
      expect(closeDialogSpy).toHaveBeenCalledTimes(1);
    });
  });
});
