import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";
import { getModule } from "vuex-module-decorators";
import UserModule from "@/store/modules/user";

const Vue = createLocalVue();
Vue.use(Vuex);

/**
 * Factory function returns a new store instance
 */
const factory = () => {
  const store = new Vuex.Store({
    modules: {
      user: UserModule,
    },
  });
  return getModule(UserModule, store);
};

/**
 * The test case
 */
describe("UserModule", () => {
  it("has to get a store instance", async (done) => {
    const service = factory();
    expect(service).toBeInstanceOf(Object);
    done();
  });
});
