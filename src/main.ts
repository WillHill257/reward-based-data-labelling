import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";
import "./assets/styles/global.css";
import httpClient from "@/api/httpClient";
Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

// Vue.use(networkmanager, { httpClient: httpClient });

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
