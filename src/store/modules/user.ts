import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { signupUser, loginUser } from "@/api/Users.api";

export interface UserState {
  firstName: string;
  lastName: string;
  email: string;
}

@Module({
  namespaced: true,
  name: "user",
  stateFactory: true, // prevents store caching - so each client app receives its own instance of global state
})
export default class UserModule extends VuexModule implements UserState {
  firstName = "";
  lastName = "";
  email = "";

  // Getters
  get getFirstName() {
    return this.firstName;
  }

  //Mutations
  //Mutation functions MUST NOT be async functions. Also do not define them as arrow ➡️ functions, since we need to rebind them at runtime.
  @Mutation
  SIGNUP_USER(payload: any) {
    console.log("Mutating signup");
    this.firstName = payload.firstName;
    this.lastName = payload.lastName;
    this.email = payload.email;
  }

  @Mutation
  LOGIN_USER(payload: any): void {
    this.firstName = payload.firstName;
    this.lastName = payload.lastName;
    this.email = payload.email;
  }

  //Actions
  @Action
  async signupUser(payload: any) {
    try {
      const response: any = await signupUser(
        payload.firstName,
        payload.lastName,
        payload.email,
        payload.password
      );
      console.log(response);
      this.context.commit("SIGNUP_USER", response.data);
    } catch (error) {
      // pass back the error message
      return Promise.reject(error.response.data.error);
    }
  }

  @Action
  async loginUser(payload: any) {
    try {
      const response: any = await loginUser(payload.email, payload.password);
      this.context.commit("LOGIN_USER", response.data);
    } catch (error) {
      // pass back the error message
      return Promise.reject(error.response.data.error);
    }
  }
}
