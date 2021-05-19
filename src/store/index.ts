import Vue from "vue";
import Vuex from "vuex";
import UserModule from "./modules/user";

Vue.use(Vuex);

const store = new Vuex.Store({
  getters: {

  },
  modules: {
    user: UserModule,
  },
});

export default store;
