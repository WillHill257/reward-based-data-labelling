import Vue from "vue";
import Vuex from "vuex";
import UserModule from "./modules/user";
import JobModule from "@/store/modules/job";

Vue.use(Vuex);

const store = new Vuex.Store({
  getters: {

  },
  modules: {
    user: UserModule,
    job: JobModule
  },
});

export default store;
