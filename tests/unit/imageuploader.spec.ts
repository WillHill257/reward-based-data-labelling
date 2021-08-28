import { shallowMount } from "@vue/test-utils";
import ImageUploader from "@/components/CreateJob/components/ImageUploader.vue";
import CreateJob from "@/components/CreateJob/CreateJob.vue";
// import CreateJob from "@/components/CreateJob/CreateJob.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import Compressor from "compressorjs";
const vuetify = new Vuetify();
jest.mock("compressorjs");

Vue.use(Vuetify);

describe("ImageUploader", () => {
  describe("on loaded", () => {
    test("should have all the necessary UI elements", () => {
      //mock view
      const wrapper = shallowMount(ImageUploader);

      //checking the image upload container is there
      expect(wrapper.find("#dragAndDropContainer").exists()).toBe(true);
      expect(wrapper.html()).toContain(
        "Drop your file(s) here, or click to select them."
      );
    });
  });

  describe("on files dropped", () => {
    test("should call the onDrop function", async () => {
      //mock view
      const wrapper: any = shallowMount(ImageUploader, {
        propsData: { onFilesUploaded: jest.fn() },
      });

      //spy on the drop of images to make sure they are there
      const onDropSpy = jest.spyOn(wrapper.vm, "onDrop");
      const container = wrapper.find("#dragAndDropContainer");
      await container.trigger("drop");

      //expect to have checked for the images
      expect(onDropSpy).toHaveBeenCalled();
    });

    test("should call the onclick function", async () => {
      //mock screen
      const wrapper: any = shallowMount(ImageUploader, {
        propsData: { onFilesUploaded: jest.fn() },
      });

      //makes sure that when the upload image block is clicked we can enter images
      const onClickSpy = jest.spyOn(wrapper.vm, "onClick");
      const container = wrapper.find("#dragAndDropContainer");
      await container.trigger("click");

      expect(onClickSpy).toHaveBeenCalled();
    });

    test("should process the files dropped", () => {
      // mock view
      const wrapper: any = shallowMount(ImageUploader, {
        propsData: { onFilesUploaded: jest.fn() },
      });

      //mock item
      const item = {
        webkitGetAsEntry: function () {
          return file;
        },
      };
      const file = new File([new ArrayBuffer(1)], "file.jpg");

      //make sure file tree traversal is working correctly
      const testEvent = {
        preventDefault: function () {
          return;
        },
        dataTransfer: {
          items: [item],
        },
      };
      const spy = jest.spyOn(wrapper.vm, "traverseFileTree");

      wrapper.vm.onDrop(testEvent);
      expect(spy).toHaveBeenCalled();
    });

    test("should add to files uploaded variable in CreateJob, when files dropped", () => {
      //mock view
      const createJob: any = shallowMount(CreateJob, {
        propsData: { isShowDialog: true },
        vuetify,
      });
      //mock image uploader component
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

    test("should compress files when dropped onto drag and drop area", () => {
      // mock image uploader
      const imageUploader: any = shallowMount(ImageUploader, {
        propsData: {
          onFilesUploaded: jest.fn(),
        },
      });
      // function createFile(name: string, type: string, callback: any) {
      //   const blob: any = new Blob([""], { type: type });
      //   blob["lastModifiedDate"] = null;
      //   blob["name"] = name;
      //   callback(<File>blob);
      // }

      //mock item
      const item = {
        isFile: true,
        name: "test.png",
        file: (callback: any) => {
          const file = new File([new ArrayBuffer(1)], "file.jpg");
          callback(file);
        },
      };
      //expect tree to have been traversed correctly
      imageUploader.vm.traverseFileTree(item);
      expect(Compressor).toHaveBeenCalled();
    });

    test("should get folder content if the file dropped was a directory", () => {
      const imageUploader: any = shallowMount(ImageUploader, {
        propsData: {
          onFilesUploaded: jest.fn(),
        },
      });
      // function createFile(name: string, type: string, callback: any) {
      //   const blob: any = new Blob([""], { type: type });
      //   blob["lastModifiedDate"] = null;
      //   blob["name"] = name;
      //   callback(<File>blob);
      // }
      const mockCreateReader = () => {
        return {
          readEntries: (callback: any) => {
            const item = {
              isFile: true,
              name: "test.png",
              file: (callback: any) => {
                const file = new File([new ArrayBuffer(1)], "file.jpg");
                callback(file);
              },
            };
            callback([item]);
          },
        };
      };

      const traverseFileTreeSpy = jest.spyOn(
        imageUploader.vm,
        "traverseFileTree"
      );

      //check entering directory
      const directory = {
        isDirectory: true,
        createReader: mockCreateReader,
      };

      imageUploader.vm.traverseFileTree(directory);
      expect(traverseFileTreeSpy).toHaveBeenCalledTimes(2);
    });

    test("should reject uploaded files if it is not an image", () => {
      //mock image uploader
      const imageUploader: any = shallowMount(ImageUploader, {
        propsData: {
          onFilesUploaded: jest.fn(),
        },
      });

      //mock item (image)
      const item = {
        isFile: true,
        name: "test.txt",
        file: (callback: any) => {
          const file = new File([new ArrayBuffer(1)], "file.jpg");
          callback(file);
        },
      };

      //check that file type error is emmitted
      imageUploader.vm.traverseFileTree(item);
      expect(imageUploader.emitted("filetypeerror")).toBeTruthy();
    });

    test("should compress files when chosen from file selection dialog", () => {
      const createJob: any = shallowMount(CreateJob, {
        propsData: { isShowDialog: true },
        vuetify,
      });
      const imageUploader: any = shallowMount(ImageUploader, {
        propsData: {
          onFilesUploaded: createJob.vm.onFilesUploaded,
        },
      });

      //mock the file creation
      function createFile(name: string, type: string) {
        const blob: any = new Blob([""], { type: type });
        blob["lastModifiedDate"] = null;
        blob["name"] = name;
        return <File>blob;
      }

      const testEvent = {
        path: [{ files: [createFile("test.png", "image/png")] }],
      };

      //expected compressory
      imageUploader.vm.onFileDialogChange(testEvent);
      expect(Compressor).toHaveBeenCalled();
    });
  });
});
