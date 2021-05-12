// import { expect } from "chai";
// import {
//   createLocalVue,
//   createWrapper,
//   mount,
//   shallowMount,
// } from "@vue/test-utils";
// import ListJobs from "@/views/ListJobs.vue";
// import axios from "axios";
// import Vue from "vue";
// import Vuetify from "vuetify";

// declare const global: any;
// Vue.use(Vuetify);
// describe("Testing View Jobs screen", () => {
//   const localVue = createLocalVue();
//   let vuetify: Vuetify;
//   beforeEach(() => {
//     global.requestAnimationFrame = (cb: any) => cb();
//     vuetify = new Vuetify();
//   });

//   describe("when loaded", () => {
//     it("should have all the necessary UI elements with correct information", () => {
//       const wrapper = mount(ListJobs, { localVue, vuetify });
//       expect(
//         wrapper.find("#job-title").exists(),
//         'Element with ID "job-title" is not found in the DOM, but is required.'
//       ).to.equal(true);
//       expect(
//         wrapper.find("#job-type").exists(),
//         'Element with ID "job-type" is not found in the DOM, but is required.'
//       ).to.equal(true);
//       expect(
//         wrapper.find("#job-description").exists(),
//         'Element with ID "job-description" is not found in the DOM, but is required'
//       ).to.equal(true);
//       expect(
//         wrapper.find("#btn-view-job").exists(),
//         'Element with ID: "btn-view-job" is not found in the DOM, but is required'
//       ).to.equal(true);

//     });
//   });
// });
