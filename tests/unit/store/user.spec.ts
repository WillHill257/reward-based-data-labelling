import Vuex from "vuex";
import { createLocalVue } from "@vue/test-utils";
import { getModule } from "vuex-module-decorators";
import UserModule, { UserState } from "@/store/modules/user";

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
describe("User Module", () => {
  it("has to get a store instance", async (done) => {
    const service = factory();
    expect(service).toBeInstanceOf(Object);
    done();
  });
});

describe("User Module Mutations", () => {
  // todo use full user object
  it("signs up user", () => {
    // get mock store and create mock user
    const service = factory();
    const user: UserState = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      token: "sometoken"
    };

    // mutate
    service.SIGNUP_USER(user);

    // check the fields are the correct values
    expect(service.firstName).toBe(user.firstName);
    expect(service.lastName).toBe(user.lastName);
    expect(service.email).toBe(user.email);
  });

  it("logs in user", () => {
    // get mock store and create mock user
    const service = factory();
    const user: UserState = {
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      token: "sometoken"
    };

    // mutate
    service.LOGIN_USER(user);

    // check the fields are the correct values
    expect(service.firstName).toBe(user.firstName);
    expect(service.lastName).toBe(user.lastName);
    expect(service.email).toBe(user.email);
  });
});
