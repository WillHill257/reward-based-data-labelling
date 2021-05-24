import { shallowMount } from "@vue/test-utils";
import ImageUploader from "@/components/CreateJob/components/ImageUploader.vue";
import CreateJob from "@/components/CreateJob/CreateJob.vue";
// import CreateJob from "@/components/CreateJob/CreateJob.vue";
import Vue from "vue";
import Vuetify from "vuetify";
const vuetify = new Vuetify();

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
    test("should call the onDrop function", async () => {
      const wrapper: any = shallowMount(ImageUploader, {
        propsData: { onFilesUploaded: jest.fn() },
      });

      const onDropSpy = jest.spyOn(wrapper.vm, "onDrop");
      const container = wrapper.find("#dragAndDropContainer");
      await container.trigger("drop");

      expect(onDropSpy).toHaveBeenCalled();
    });

    test("should call the onclick function", async () => {
      const wrapper: any = shallowMount(ImageUploader, {
        propsData: { onFilesUploaded: jest.fn() },
      });

      const onClickSpy = jest.spyOn(wrapper.vm, "onClick");
      const container = wrapper.find("#dragAndDropContainer");
      await container.trigger("click");

      expect(onClickSpy).toHaveBeenCalled();
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
      const createJob: any = shallowMount(CreateJob, {
        propsData: { isShowDialog: true },
        vuetify,
      });
      const imageUploader: any = shallowMount(ImageUploader, {
        propsData: {
          onFilesUploaded: createJob.vm.onFilesUploaded,
        },
      });

      function createFile(name: string, type: string, callback: any) {
        const blob: any = new Blob([""], { type: type });
        blob["lastModifiedDate"] = null;
        blob["name"] = name;
        callback(<File>blob);
      }

      const file: any = {
        isFile: true,
        isDirectory: false,
        name: "image.png",
        file: () =>
          createFile("file.png", "image/png", (file: any) => {
            imageUploader.vm.onFilesUploaded(file);
          }),
      };

      imageUploader.vm.traverseFileTree(file); // add a file to createJob
      expect(createJob.vm.filesUploaded.length).toBe(1);
      imageUploader.vm.traverseFileTree(file); // add another file to createJob
      expect(createJob.vm.filesUploaded.length).toBe(2);
    });
  });
});
