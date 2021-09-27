import Vue from "vue";
import Vuex from "vuex";
import { UserModule } from "./modules/user";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [vuexLocal.plugin],
  // modules: {
  //   UserModule,
  // },
});

export default store;
