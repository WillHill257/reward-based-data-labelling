import { shallowMount, mount } from "@vue/test-utils";
import HomePage from "@/views/HomePage.vue";
import Vue from "vue";
import Vuetify from "vuetify";

Vue.use(Vuetify);

const vuetify = new Vuetify();

let jobs = [
  {
    _id: "0",
    title: "Title",
    type: "Type",
    labels: ["a", "b"],
    description: "Description",
  },
];

describe("When loaded", () => {
  console.log = jest.fn();
  const wrapper = mount(HomePage, {
    attachTo: document.body,
    vuetify,
    stubs: ["router-link"],
  });
  it("should be vue instance", () => {
    expect(wrapper.vm).toBeTruthy();
  });

  // all the ui elements we expect on the page should appear
  it("should have all the necessary UI elements", () => {
    /*expect(wrapper.find(".authored").exists()).toBe(true);
    expect(wrapper.find(".accepted").exists()).toBe(true);
    expect(wrapper.find(".available").exists()).toBe(true);
    expect(wrapper.find(".authored").html()).toContain("Mine");
    expect(wrapper.find(".accepted").html()).toContain("Currently Doing");
    expect(wrapper.find(".available").html()).toContain("Available");
    expect(wrapper.find(".authored").props().endpoint).toBe("authored");
    expect(wrapper.find(".accepted").props().endpoint).toBe("accepted");
    expect(wrapper.find(".available").props().endpoint).toBe("available");*/
    expect(wrapper.find("#user-greeting").exists()).toBe(true);
    expect(wrapper.find("#available-rewards").exists()).toBe(true);
  });
  
  // test("testing handleresponselist", async ()=>{
  //   const wrapper: any= shallowMount(HomePage)
  //   const a =new  Image(1,1);
  //   const temp = [a, a, a ]
  //   const tempnew =  wrapper.vm.handleResponseList(temp)
  //   let x = tempnew[1]
  //   expect(1).toBe(1);
  // })

})
