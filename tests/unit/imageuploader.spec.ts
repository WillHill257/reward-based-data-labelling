import { shallowMount } from "@vue/test-utils";
import ImageUploader from "@/components/CreateJob/components/ImageUploader.vue";
// import CreateJob from "@/components/CreateJob/CreateJob.vue";
import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

describe("ImageUploader", () => {
  describe("on loaded", () => {
    test("should have all the necessary UI elements", () => {
      const wrapper = shallowMount(ImageUploader);

      expect(wrapper.find("#dragAndDropContainer").exists()).toBe(true);
      expect(wrapper.html()).toContain(
        "Drop your file(s) here, or click to select them."
      );
    });
  });

  describe("on files dropped", () => {
    test("should call the onDrop function", () => {
      const wrapper: any = shallowMount(ImageUploader, {
        propsData: { onFilesUploaded: jest.fn() },
      });

      const onDropSpy = jest.spyOn(wrapper.vm, "onDrop");
      const container = wrapper.find("#dragAndDropContainer");
      container.trigger("drop");

      expect(onDropSpy).toHaveBeenCalled();
    });

    // test("should call onFilesUploaded", () => {
    //   // const createJob: any = shallowMount(CreateJob);
    //   const mockOnFilesUploaded = jest.fn();
    //   const wrapper: any = shallowMount(ImageUploader, {
    //     propsData: {
    //       onFilesUploaded: mockOnFilesUploaded,
    //     },
    //   });
    //
    //   wrapper.vm.onDrop(); // calls the ondrop function in the ImageUploader component
    //   expect(mockOnFilesUploaded).toHaveBeenCalled();
    // });
  });
});
