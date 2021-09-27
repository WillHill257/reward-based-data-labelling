import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import jobResults from "@/views/jobResults.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import flushPromises from "flush-promises";
import { VuexModule } from "vuex-module-decorators";
import Vuex, { Store } from "vuex";
import * as Job from "@/api/Job.api";
import { nextTick } from "vue/types/umd";
jest.mock("../../src/api/Job.api", () => ({
  getJob: jest.fn(),
  getImages: jest.fn(),
}));

const vuetify = new Vuetify();

Vue.use(Vuetify);



describe("testing mounted", () => {
  test("test mounted", async () => {
    // mock job reponse
    const mockJobResponse = {
      data: {

        labels: ["testlabel"],


        canAccept: true,
      },
    };

    // spy on job
    const getJobSpy = jest.spyOn(Job, "getJob");
    getJobSpy.mockResolvedValue(mockJobResponse);

    const wrapper: any = shallowMount(jobResults, { vuetify });
    await flushPromises();
    //set dummy data

    expect(wrapper.vm.$data.labels.length).toEqual(0);


  });

  test("test fetch job error", async () => {
    // test error messages
    const mockJobResponse = {
      data: {
        error: "test error",
      },
    };

    //spy on job to view error messages
    const getJobSpy = jest.spyOn(Job, "getJob");
    getJobSpy.mockRejectedValue(mockJobResponse);

    const wrapper: any = shallowMount(jobResults, { vuetify });


    await flushPromises();
    // set dmmy data to null values

    expect(wrapper.vm.$data.labels.length).toEqual(0);


  });
});


  test("fetch image function", async () => {
      
    // spy on colelction of images for display
    const getImagesSpy = jest.spyOn(Job, "getImages");
    const mockImagesResponse = {
      data: [
        "./testImages/testImage0.png",
        "./testImages/testImage1.png",
        "./testImages/testImage2.png",
      ],
    };
    getImagesSpy.mockResolvedValue(mockImagesResponse);

    const wrapper: any = mount(jobResults, { vuetify })
    

    
    // makes sure add image works
    const addImagesSpy = jest.spyOn(wrapper.vm, "addImages");
    await wrapper.vm.fetchImages();
    expect(addImagesSpy).toHaveBeenCalledTimes(1);
  });

  test("fetch image function error", async () => {
    const getImagesSpy = jest.spyOn(Job, "getImages");
    //mock error data
    const mockImagesResponse = {
      data: {
        error: "test error",
      },
    };

    // spy on image response
    getImagesSpy.mockResolvedValue(mockImagesResponse);

    const wrapper: any = shallowMount(jobResults, { vuetify });
    const addImagesSpy = jest.spyOn(wrapper.vm, "addImages");
    //expect to have seen images using the spy
    await wrapper.vm.fetchImages();
    expect(addImagesSpy).toHaveBeenCalledTimes(0);
  });

  describe("test label assignment",  () => {
  test("test label assignment", async () => {
    const getJobSpy = jest.spyOn(Job, "getJob");
    const mockLabelResponse = {
        data: {
            images:[{
                assignedLabels:[undefined]
            }, {
              assignedLabels:["hello", "hello2"]
          }]
        }
    }
    getJobSpy.mockResolvedValue(mockLabelResponse);

    const wrapper: any = shallowMount(jobResults, {
      vuetify,
    });


    await flushPromises();
    expect(getJobSpy).toHaveBeenCalled();
    expect(wrapper.vm.$data.labels[0]).toEqual("Unlabelled");
    expect(wrapper.vm.$data.labels[1]).toEqual("hello");

  });
  }),
 
  test("test bottom visible",async () => {
    // mock view job
    const wrapper: any = shallowMount(jobResults, {
      vuetify,
    });
   

    const getImageSpy = jest.spyOn(wrapper.vm, "addImages");
    const getLabelSpy = jest.spyOn(wrapper.vm, "addLabels");

    //check that the bottom is visible
    const bottomVisible = wrapper.vm.bottomVisible();
    expect(bottomVisible).toEqual(true || false);
    wrapper.vm.$options.watch.bottom.call(wrapper.vm,5)
    expect(getImageSpy).toHaveBeenCalledTimes(0);
    expect(getLabelSpy).toHaveBeenCalledTimes(0);
  });



