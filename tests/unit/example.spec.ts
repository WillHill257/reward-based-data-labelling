import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

describe("HelloWorld.vue", () => {
  it("It renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
      mocks: { $http: axios },
    });
    expect(wrapper.text()).to.include(msg);
  });
});
