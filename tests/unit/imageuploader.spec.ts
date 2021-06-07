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

    test("should process the files dropped", () => {
      const wrapper: any = shallowMount(ImageUploader, {
        propsData: { onFilesUploaded: jest.fn() },
      });

      const item = {
        webkitGetAsEntry: function () {
          return file;
        },
      };
      const file = new File([new ArrayBuffer(1)], "file.jpg");

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

    test("should compress files when dropped onto drag and drop area", () => {
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

      const item = {
        isFile: true,
        name: "test.png",
        file: (callback: any) => {
          const file = new File([new ArrayBuffer(1)], "file.jpg");
          callback(file);
        },
      };
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

      const directory = {
        isDirectory: true,
        createReader: mockCreateReader,
      };

      imageUploader.vm.traverseFileTree(directory);
      expect(traverseFileTreeSpy).toHaveBeenCalledTimes(2);
    });

    test("should reject uploaded files if it is not an image", () => {
      const imageUploader: any = shallowMount(ImageUploader, {
        propsData: {
          onFilesUploaded: jest.fn(),
        },
      });

      const item = {
        isFile: true,
        name: "test.txt",
        file: (callback: any) => {
          const file = new File([new ArrayBuffer(1)], "file.jpg");
          callback(file);
        },
      };

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

      function createFile(name: string, type: string) {
        const blob: any = new Blob([""], { type: type });
        blob["lastModifiedDate"] = null;
        blob["name"] = name;
        return <File>blob;
      }

      const testEvent = {
        path: [{ files: [createFile("test.png", "image/png")] }],
      };

      imageUploader.vm.onFileDialogChange(testEvent);
      expect(Compressor).toHaveBeenCalled();
    });
  });
});
