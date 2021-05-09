import { shallowMount } from "@vue/test-utils";
import ImageUploader from "@/components/CreateJob/components/ImageUploader.vue";
import CreateJob from "@/components/CreateJob/CreateJob.vue";
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
    const file = new File([new ArrayBuffer(1)], "file.jpg");

    test("should call the onDrop function", async () => {
      const wrapper: any = shallowMount(ImageUploader, {
        propsData: { onFilesUploaded: jest.fn() },
      });

      const onDropSpy = jest.spyOn(wrapper.vm, "onDrop");
      const container = wrapper.find("#dragAndDropContainer");
      await container.trigger("drop");

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
    test("should add to files uploaded variable in CreateJob, when files dropped", () => {
      let testEvent = {
        dataTransfer: {
          files: [file, file],
        },
      };
      const createJob: any = shallowMount(CreateJob, {
        propsData: { isShowDialog: true },
      });
      const imageUploader: any = shallowMount(ImageUploader, {
        propsData: {
          onFilesUploaded: createJob.vm.onFilesUploaded,
        },
      });

      imageUploader.vm.onDrop(testEvent); // calls the ondrop function in the ImageUploader component
      testEvent = {
        dataTransfer: {
          files: [file],
        },
      };
      imageUploader.vm.onDrop(testEvent); // calls the ondrop function in the ImageUploader component
      expect(createJob.vm.filesUploaded.length).toBe(3);
    });
  });
});
