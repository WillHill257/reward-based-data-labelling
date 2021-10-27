import { createLocalVue, mount, shallowMount } from "@vue/test-utils";
import LabelImages from "@/views/Label.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import flushPromises from "flush-promises";
import * as ItemApi from "@/api/Item.api";

const vuetify = new Vuetify();

Vue.use(Vuetify);

describe("Labelling Page - Checking method calls", () => {
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

describe("Labelling Page - Checking methods behave as expected", () => {
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

describe("Labelling Page - Loaded UI elements", () => {
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
    expect(wrapper.find("#progressBar").exists()).toBe(true);
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

describe("Labelling Page - Checking methods", () => {
  test("canFinishMethod - batchData not present", async () => {
    const wrapper: any = shallowMount(LabelImages, {
      vuetify,
      propsData: {
        jobID: "6135cfe89c361f61fee112f0", // random
        batchID: "6135cfe89c361f61fee112f1", //random
      },
    });
    // update the batchData

    wrapper.vm.$data.batchData = null;

    // make sure the changes are in effect
    await wrapper.vm.$nextTick();
    await flushPromises();

    const result = wrapper.vm.canFinishMethod();
    expect(result).toBe(false);
  });

  test("canFinishMethod - batchData correctly present", async () => {
    const wrapper: any = shallowMount(LabelImages, {
      vuetify,
      propsData: {
        jobID: "6135cfe89c361f61fee112f0", // random
        batchID: "6135cfe89c361f61fee112f1", //random
      },
    });
    // update the batchData

    wrapper.vm.$data.batchData = {
      _id: "6135fe34b96a23707ba24e2d",
      batch_number: 0,
      job: "6135fe34b96a23707ba24e2c",
      labellers: [
        {
          completed: true,
          _id: "6135fe3eb96a23707ba24e49",
          labeller: "612e5fffbd71d580e76062ee",
          expiry: " 2021-09-07T11:40:46.539Z",
        },
      ],
      __v: 0,
      images: [
        {
          batchNumber: 0,
          _id: "6135fe34b96a23707ba24e30",
          value: "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
          job: "6135fe34b96a23707ba24e2c",
          labels: {
            labeller: "6135fe34b96a23707ba24fff",
            value: ["something"],
          },
          __v: 1,
        },
      ],
    };

    // make sure the changes are in effect
    await wrapper.vm.$nextTick();
    await flushPromises();

    const result = wrapper.vm.canFinishMethod();
    expect(result).toBe(true);
  });

  test("canFinishMethod - batchData.labels is empty", async () => {
    const wrapper: any = shallowMount(LabelImages, {
      vuetify,
      propsData: {
        jobID: "6135cfe89c361f61fee112f0", // random
        batchID: "6135cfe89c361f61fee112f1", //random
      },
    });
    // update the batchData

    wrapper.vm.$data.batchData = {
      _id: "6135fe34b96a23707ba24e2d",
      batch_number: 0,
      job: "6135fe34b96a23707ba24e2c",
      labellers: [
        {
          completed: true,
          _id: "6135fe3eb96a23707ba24e49",
          labeller: "612e5fffbd71d580e76062ee",
          expiry: " 2021-09-07T11:40:46.539Z",
        },
      ],
      __v: 0,
      images: [
        {
          batchNumber: 0,
          _id: "6135fe34b96a23707ba24e30",
          value: "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
          job: "6135fe34b96a23707ba24e2c",
          labels: {},
          __v: 1,
        },
      ],
    };

    // make sure the changes are in effect
    await wrapper.vm.$nextTick();
    await flushPromises();

    const result = wrapper.vm.canFinishMethod();
    expect(result).toBe(false);
  });

  test("canFinishMethod - batchData.labels has empty value array", async () => {
    const wrapper: any = shallowMount(LabelImages, {
      vuetify,
      propsData: {
        jobID: "6135cfe89c361f61fee112f0", // random
        batchID: "6135cfe89c361f61fee112f1", //random
      },
    });
    // update the batchData

    wrapper.vm.$data.batchData = {
      _id: "6135fe34b96a23707ba24e2d",
      batch_number: 0,
      job: "6135fe34b96a23707ba24e2c",
      labellers: [
        {
          completed: true,
          _id: "6135fe3eb96a23707ba24e49",
          labeller: "612e5fffbd71d580e76062ee",
          expiry: " 2021-09-07T11:40:46.539Z",
        },
      ],
      __v: 0,
      images: [
        {
          batchNumber: 0,
          _id: "6135fe34b96a23707ba24e30",
          value: "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
          job: "6135fe34b96a23707ba24e2c",
          labels: {
            labeller: "6135fe34b96a23707ba24fff",
            value: [],
          },
          __v: 1,
        },
      ],
    };

    // make sure the changes are in effect
    await wrapper.vm.$nextTick();
    await flushPromises();

    const result = wrapper.vm.canFinishMethod();
    expect(result).toBe(false);
  });

  test("updateLabels - batchData not present", async () => {
    const wrapper: any = shallowMount(LabelImages, {
      vuetify,
      propsData: {
        jobID: "6135cfe89c361f61fee112f0", // random
        batchID: "6135cfe89c361f61fee112f1", //random
      },
    });
    // do the relevant mocking
    const sendLabelsSpy = jest.spyOn(ItemApi, "sendLabels");
    sendLabelsSpy.mockResolvedValue({ status: 200 });

    // update the batchData
    wrapper.vm.$data.batchData = null;

    // make sure the changes are in effect
    await wrapper.vm.$nextTick();
    await flushPromises();

    const result = wrapper.vm.updateLabels(0);
    expect(sendLabelsSpy).toHaveBeenCalledTimes(0);
  });

  test("updateLabels - successful update", async () => {
    const wrapper: any = shallowMount(LabelImages, {
      vuetify,
      propsData: {
        jobID: "6135cfe89c361f61fee112f0", // random
        batchID: "6135cfe89c361f61fee112f1", //random
      },
    });

    // do the relevant mocking
    const sendLabelsSpy = jest.spyOn(ItemApi, "sendLabels");
    sendLabelsSpy.mockResolvedValue({ status: 200 });

    const canFinishMethodSpy = jest.spyOn(wrapper.vm, "canFinishMethod");

    // update the batchData
    wrapper.vm.$data.batchData = {
      _id: "6135fe34b96a23707ba24e2d",
      batch_number: 0,
      job: "6135fe34b96a23707ba24e2c",
      labellers: [
        {
          completed: true,
          _id: "6135fe3eb96a23707ba24e49",
          labeller: "612e5fffbd71d580e76062ee",
          expiry: " 2021-09-07T11:40:46.539Z",
        },
      ],
      __v: 0,
      images: [
        {
          batchNumber: 0,
          _id: "6135fe34b96a23707ba24e30",
          value: "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
          job: "6135fe34b96a23707ba24e2c",
          labels: {
            labeller: "6135fe34b96a23707ba24fff",
            value: ["something"],
          },
          __v: 1,
        },
      ],
    };

    // make sure the changes are in effect
    await wrapper.vm.$nextTick();
    await flushPromises();

    await wrapper.vm.updateLabels(0);
    await flushPromises();

    expect(sendLabelsSpy).toHaveBeenCalledTimes(1);
    expect(canFinishMethodSpy).toHaveBeenCalledTimes(1);
  });

  test("updateLabels - unsuccessful update", async () => {
    const wrapper: any = shallowMount(LabelImages, {
      vuetify,
      propsData: {
        jobID: "6135cfe89c361f61fee112f0", // random
        batchID: "6135cfe89c361f61fee112f1", //random
      },
    });

    console.log("here");
    // do the relevant mocking
    const sendLabelsSpy = jest.spyOn(ItemApi, "sendLabels");
    sendLabelsSpy.mockRejectedValue({ status: 400 });

    // this should NOT be called
    const canFinishMethodSpy = jest.spyOn(wrapper.vm, "canFinishMethod");
    // update the batchData
    wrapper.vm.$data.batchData = {
      _id: "6135fe34b96a23707ba24e2d",
      batch_number: 0,
      job: "6135fe34b96a23707ba24e2c",
      labellers: [
        {
          completed: true,
          _id: "6135fe3eb96a23707ba24e49",
          labeller: "612e5fffbd71d580e76062ee",
          expiry: " 2021-09-07T11:40:46.539Z",
        },
      ],
      __v: 0,
      images: [
        {
          batchNumber: 0,
          _id: "", // incorrect
          value: "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
          job: "6135fe34b96a23707ba24e2c",
          labels: {
            labeller: "6135fe34b96a23707ba24fff",
            value: ["something"],
          },
          __v: 1,
        },
      ],
    };

    // make sure the changes are in effect
    await wrapper.vm.$nextTick();
    await flushPromises();

    await wrapper.vm.updateLabels(0);
    await flushPromises();

    expect(sendLabelsSpy).toHaveBeenCalled();
    expect(canFinishMethodSpy).toHaveBeenCalledTimes(0);
  });

  test("setLabelActive - label exists", async () => {
    const availableLabels = ["one", "two"];

    const wrapper: any = shallowMount(LabelImages, {
      vuetify,
      propsData: {
        jobID: "6135cfe89c361f61fee112f0", // random
        batchID: "6135cfe89c361f61fee112f1", //random
      },
      data() {
        return {
          availableLabels: availableLabels,
        };
      },
    });

    // update the batchData
    wrapper.vm.$data.batchData = {
      _id: "6135fe34b96a23707ba24e2d",
      batch_number: 0,
      job: "6135fe34b96a23707ba24e2c",
      labellers: [
        {
          completed: true,
          _id: "6135fe3eb96a23707ba24e49",
          labeller: "612e5fffbd71d580e76062ee",
          expiry: " 2021-09-07T11:40:46.539Z",
        },
      ],
      __v: 0,
      images: [
        {
          batchNumber: 0,
          _id: "6135fe3eb96a23707ba24e50",
          value: "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
          job: "6135fe34b96a23707ba24e2c",
          labels: {
            labeller: "6135fe34b96a23707ba24fff",
            value: ["something"],
          },
          __v: 1,
        },
      ],
    };

    // const mockedElementDOM = {
    //   classList: { contains: jest.fn(), remove: jest.fn(), add: jest.fn() },
    // };

    // make sure the changes are in effect
    await wrapper.vm.$nextTick();
    await flushPromises();

    await wrapper.vm.setLabelActive(availableLabels[0]);
    await wrapper.vm.$nextTick();
    await flushPromises();

    const element = wrapper.find(".label-" + availableLabels[0]);
    expect(element.classes("label-" + availableLabels[0])).toBe(true);
  });

  test("setLabelActive - label does not exist", async () => {
    const wrapper: any = mount(LabelImages, {
      vuetify,
      propsData: {
        jobID: "6135cfe89c361f61fee112f0", // random
        batchID: "6135cfe89c361f61fee112f1", //random
      },
    });

    // update the batchData
    const availableLabels = ["one", "two"];
    wrapper.vm.$data.availableLabels = availableLabels;
    wrapper.vm.$data.batchData = {
      _id: "6135fe34b96a23707ba24e2d",
      batch_number: 0,
      job: "6135fe34b96a23707ba24e2c",
      labellers: [
        {
          completed: true,
          _id: "6135fe3eb96a23707ba24e49",
          labeller: "612e5fffbd71d580e76062ee",
          expiry: " 2021-09-07T11:40:46.539Z",
        },
      ],
      __v: 0,
      images: [
        {
          batchNumber: 0,
          _id: "6135fe3eb96a23707ba24e50",
          value: "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
          job: "6135fe34b96a23707ba24e2c",
          labels: {
            labeller: "6135fe34b96a23707ba24fff",
            value: ["something"],
          },
          __v: 1,
        },
      ],
    };

    // make sure the changes are in effect
    await wrapper.vm.$nextTick();
    await flushPromises();

    await wrapper.vm.setLabelActive("three");
    await flushPromises();

    const element = wrapper.find("." + "three");
    expect(element.exists()).toBe(false);
  });

  test("loadLabels - successful load", async () => {
    const activeLabels = ["one", "two"];

    const wrapper: any = shallowMount(LabelImages, {
      vuetify,
      propsData: {
        jobID: "6135cfe89c361f61fee112f0", // random
        batchID: "6135cfe89c361f61fee112f1", //random
      },
      // data() {
      //   return {
      //     availableLabels: availableLabels,
      //   };
      // },
    });

    // update the batchData
    wrapper.vm.$data.batchData = {
      _id: "6135fe34b96a23707ba24e2d",
      batch_number: 0,
      job: "6135fe34b96a23707ba24e2c",
      labellers: [
        {
          completed: true,
          _id: "6135fe3eb96a23707ba24e49",
          labeller: "612e5fffbd71d580e76062ee",
          expiry: " 2021-09-07T11:40:46.539Z",
        },
      ],
      __v: 0,
      images: [
        {
          batchNumber: 0,
          _id: "6135fe34b96a23707ba24e30",
          value: "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
          job: "6135fe34b96a23707ba24e2c",
          labels: {
            labeller: "6135fe34b96a23707ba24fff",
            value: activeLabels,
          },
          __v: 1,
        },
      ],
    };

    // make sure the changes are in effect
    await wrapper.vm.$nextTick();
    await flushPromises();

    await wrapper.vm.loadLabels(0);
    await flushPromises();

    // ensure the selectedLabels are the same
    expect(wrapper.vm.$data.selectedLabels).toEqual(activeLabels);
  });

  test("loadLabels - image.labels empty", async () => {
    const activeLabels = ["one", "two"];

    const wrapper: any = shallowMount(LabelImages, {
      vuetify,
      propsData: {
        jobID: "6135cfe89c361f61fee112f0", // random
        batchID: "6135cfe89c361f61fee112f1", //random
      },
    });

    // update the batchData
    wrapper.vm.$data.batchData = {
      _id: "6135fe34b96a23707ba24e2d",
      batch_number: 0,
      job: "6135fe34b96a23707ba24e2c",
      labellers: [
        {
          completed: true,
          _id: "6135fe3eb96a23707ba24e49",
          labeller: "612e5fffbd71d580e76062ee",
          expiry: " 2021-09-07T11:40:46.539Z",
        },
      ],
      __v: 0,
      images: [
        {
          batchNumber: 0,
          _id: "6135fe34b96a23707ba24e30",
          value: "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
          job: "6135fe34b96a23707ba24e2c",
          labels: {},
          __v: 1,
        },
      ],
    };

    // make sure the changes are in effect
    await wrapper.vm.$nextTick();
    await flushPromises();

    await wrapper.vm.loadLabels(0);
    await flushPromises();

    // ensure the selectedLabels are the same
    expect(wrapper.vm.$data.selectedLabels).toEqual([]);
  });

  test("nextImage - normal index range", async () => {
    const wrapper: any = shallowMount(LabelImages, {
      vuetify,
      propsData: {
        jobID: "6135cfe89c361f61fee112f0", // random
        batchID: "6135cfe89c361f61fee112f1", //random
      },
    });

    // update the batchData
    wrapper.vm.$data.images = [
      "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
      "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
      "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
    ];
    wrapper.vm.$data.batchData = {
      _id: "6135fe34b96a23707ba24e2d",
      batch_number: 0,
      job: "6135fe34b96a23707ba24e2c",
      labellers: [
        {
          completed: true,
          _id: "6135fe3eb96a23707ba24e49",
          labeller: "612e5fffbd71d580e76062ee",
          expiry: " 2021-09-07T11:40:46.539Z",
        },
      ],
      __v: 0,
      images: [
        {
          batchNumber: 0,
          _id: "6135fe34b96a23707ba24e30",
          value: "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
          job: "6135fe34b96a23707ba24e2c",
          labels: {
            labeller: "6135fe34b96a23707ba24fff",
            value: ["something"],
          },
          __v: 1,
        },
        {
          batchNumber: 0,
          _id: "6135fe34b96a23707ba24e31",
          value: "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
          job: "6135fe34b96a23707ba24e2c",
          labels: {
            labeller: "6135fe34b96a23707ba24fff",
            value: ["something"],
          },
          __v: 1,
        },
        {
          batchNumber: 0,
          _id: "6135fe34b96a23707ba24e32",
          value: "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
          job: "6135fe34b96a23707ba24e2c",
          labels: {
            labeller: "6135fe34b96a23707ba24fff",
            value: ["something"],
          },
          __v: 1,
        },
      ],
    };
    wrapper.vm.$data.imagenext = 0;

    const updateLabelsSpy = jest.spyOn(wrapper.vm, "updateLabels");
    const loadLabelsSpy = jest.spyOn(wrapper.vm, "loadLabels");

    const result = await wrapper.vm.nextImage();

    // make sure the changes are in effect
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(updateLabelsSpy).toBeCalledTimes(1);
    expect(loadLabelsSpy).toBeCalledTimes(1);
    expect(wrapper.vm.$data.imagenext).toEqual(1);
  });

  test("nextImage - overlap index range", async () => {
    const wrapper: any = shallowMount(LabelImages, {
      vuetify,
      propsData: {
        jobID: "6135cfe89c361f61fee112f0", // random
        batchID: "6135cfe89c361f61fee112f1", //random
      },
    });

    // update the batchData
    wrapper.vm.$data.images = ["2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg"];
    wrapper.vm.$data.batchData = {
      _id: "6135fe34b96a23707ba24e2d",
      batch_number: 0,
      job: "6135fe34b96a23707ba24e2c",
      labellers: [
        {
          completed: true,
          _id: "6135fe3eb96a23707ba24e49",
          labeller: "612e5fffbd71d580e76062ee",
          expiry: " 2021-09-07T11:40:46.539Z",
        },
      ],
      __v: 0,
      images: [
        {
          batchNumber: 0,
          _id: "6135fe34b96a23707ba24e30",
          value: "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
          job: "6135fe34b96a23707ba24e2c",
          labels: {
            labeller: "6135fe34b96a23707ba24fff",
            value: ["something"],
          },
          __v: 1,
        },
      ],
    };
    wrapper.vm.$data.imagenext = 0;

    const updateLabelsSpy = jest.spyOn(wrapper.vm, "updateLabels");
    const loadLabelsSpy = jest.spyOn(wrapper.vm, "loadLabels");

    const result = await wrapper.vm.nextImage();

    // make sure the changes are in effect
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(updateLabelsSpy).toBeCalledTimes(1);
    expect(loadLabelsSpy).toBeCalledTimes(1);
    expect(wrapper.vm.$data.imagenext).toEqual(0);
  });

  test("prevImage - normal index range", async () => {
    const wrapper: any = shallowMount(LabelImages, {
      vuetify,
      propsData: {
        jobID: "6135cfe89c361f61fee112f0", // random
        batchID: "6135cfe89c361f61fee112f1", //random
      },
    });

    // update the batchData
    wrapper.vm.$data.images = [
      "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
      "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
      "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
    ];
    wrapper.vm.$data.batchData = {
      _id: "6135fe34b96a23707ba24e2d",
      batch_number: 0,
      job: "6135fe34b96a23707ba24e2c",
      labellers: [
        {
          completed: true,
          _id: "6135fe3eb96a23707ba24e49",
          labeller: "612e5fffbd71d580e76062ee",
          expiry: " 2021-09-07T11:40:46.539Z",
        },
      ],
      __v: 0,
      images: [
        {
          batchNumber: 0,
          _id: "6135fe34b96a23707ba24e30",
          value: "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
          job: "6135fe34b96a23707ba24e2c",
          labels: {
            labeller: "6135fe34b96a23707ba24fff",
            value: ["something"],
          },
          __v: 1,
        },
        {
          batchNumber: 0,
          _id: "6135fe34b96a23707ba24e31",
          value: "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
          job: "6135fe34b96a23707ba24e2c",
          labels: {
            labeller: "6135fe34b96a23707ba24fff",
            value: ["something"],
          },
          __v: 1,
        },
        {
          batchNumber: 0,
          _id: "6135fe34b96a23707ba24e32",
          value: "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
          job: "6135fe34b96a23707ba24e2c",
          labels: {
            labeller: "6135fe34b96a23707ba24fff",
            value: ["something"],
          },
          __v: 1,
        },
      ],
    };
    wrapper.vm.$data.imagenext = 2;

    const updateLabelsSpy = jest.spyOn(wrapper.vm, "updateLabels");
    const loadLabelsSpy = jest.spyOn(wrapper.vm, "loadLabels");
		
    const result =await wrapper.vm.prevImage();
    // make sure the changes are in effect
    await wrapper.vm.$nextTick();
    await flushPromises();

    expect(updateLabelsSpy).toBeCalledTimes(1);
    expect(loadLabelsSpy).toBeCalledTimes(1);
    expect(wrapper.vm.$data.imagenext).toEqual(1);
  });

  test("prevImage - overlap index range", async () => {
    const wrapper: any = shallowMount(LabelImages, {
      vuetify,
      propsData: {
        jobID: "6135cfe89c361f61fee112f0", // random
        batchID: "6135cfe89c361f61fee112f1", //random
      },
    });

    // update the batchData
    wrapper.vm.$data.images = ["2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg"];
    wrapper.vm.$data.batchData = {
      _id: "6135fe34b96a23707ba24e2d",
      batch_number: 0,
      job: "6135fe34b96a23707ba24e2c",
      labellers: [
        {
          completed: true,
          _id: "6135fe3eb96a23707ba24e49",
          labeller: "612e5fffbd71d580e76062ee",
          expiry: " 2021-09-07T11:40:46.539Z",
        },
      ],
      __v: 0,
      images: [
        {
          batchNumber: 0,
          _id: "6135fe34b96a23707ba24e30",
          value: "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
          job: "6135fe34b96a23707ba24e2c",
          labels: {
            labeller: "6135fe34b96a23707ba24fff",
            value: ["something"],
          },
          __v: 1,
        },
      ],
    };
    wrapper.vm.$data.imagenext = 0;

    const updateLabelsSpy = jest.spyOn(wrapper.vm, "updateLabels");
    const loadLabelsSpy = jest.spyOn(wrapper.vm, "loadLabels");
    const result = await wrapper.vm.prevImage();

    // make sure the changes are in effect
    await wrapper.vm.$nextTick();
    await flushPromises();

    expect(updateLabelsSpy).toBeCalledTimes(1);
    expect(loadLabelsSpy).toBeCalledTimes(1);
    expect(wrapper.vm.$data.imagenext).toEqual(0);
  });

  test("progress bar - returns value", async () => {
    const wrapper: any = shallowMount(LabelImages, {
      vuetify,
      propsData: {
        jobID: "6135cfe89c361f61fee112f0", // random
        batchID: "6135cfe89c361f61fee112f1", //random
      },
    });

    // update the batchData
    wrapper.vm.$data.images = [
      "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
      "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
    ];
    wrapper.vm.$data.batchData = {
      _id: "6135fe34b96a23707ba24e2d",
      batch_number: 0,
      job: "6135fe34b96a23707ba24e2c",
      labellers: [
        {
          completed: true,
          _id: "6135fe3eb96a23707ba24e49",
          labeller: "612e5fffbd71d580e76062ee",
          expiry: " 2021-09-07T11:40:46.539Z",
        },
      ],
      __v: 0,
      images: [
        {
          batchNumber: 0,
          _id: "6135fe34b96a23707ba24e30",
          value: "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
          job: "6135fe34b96a23707ba24e2c",
          labels: {
            labeller: "6135fe34b96a23707ba24fff",
            value: ["something"],
          },
          __v: 1,
        },
        {
          batchNumber: 0,
          _id: "6135fe34b96a23707ba24e31",
          value: "2dmLzMOYP1K1SQMwBObYpMsTbHHR4Inmz7my.jpg",
          job: "6135fe34b96a23707ba24e2c",
          labels: {
            labeller: "6135fe34b96a23707ba24fff",
            value: [],
          },
          __v: 1,
        },
      ],
    };

    wrapper.vm.$data.progressCount = 0;

    await wrapper.vm.calcProgress();
    await flushPromises();

    expect(wrapper.vm.$data.progressCount).toEqual(50);
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
