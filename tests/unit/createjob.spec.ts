import { shallowMount } from "@vue/test-utils";
import CreateJob from "@/components/CreateJob/CreateJob.vue";
describe("CreateJob", () => {
  const wrapper = shallowMount(CreateJob);

  test("All fields exist", () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.find("#title-input").exists()).toBe(true);
    expect(wrapper.find("#description-input").exists()).toBe(true);
    expect(wrapper.find("#discard-input").exists()).toBe(true);
    expect(wrapper.find("#submit-input").exists()).toBe(true);


  })
})