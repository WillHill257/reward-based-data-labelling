import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { signupUser, loginUser } from "@/api/Users.api";
import store from "@/store";

export interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
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
  token = localStorage.getItem("token") || "";

  // Getters
  get getFirstName(): string {
    return this.firstName;
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  //Mutations
  //Mutation functions MUST NOT be async functions. Also do not define them as arrow ➡️ functions, since we need to rebind them at runtime.
  @Mutation
  SIGNUP_USER(payload: any) {
    console.log("Mutating signup");
    this.firstName = payload.firstName;
    this.lastName = payload.lastName;
    this.email = payload.email;
    this.token = payload.token;
  }

  @Mutation
  LOGIN_USER(payload: any): void {
    this.firstName = payload.firstName;
    this.lastName = payload.surname;
    this.email = payload.email;
    this.token = payload.token;
  }

  @Mutation
  LOGOUT_USER(payload: any): void {
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.token = "";
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
      localStorage.setItem("token", this.token);
      this.context.commit("SIGNUP_USER", response.data);
    } catch (error) {
      // pass back the error message
      localStorage.removeItem("token");
      return Promise.reject(error.response.data.error);
    }
  }

  @Action
  async loginUser(payload: any) {
    try {
      const response: any = await loginUser(payload.email, payload.password);
      localStorage.setItem("token", response.data.token);
      this.context.commit("LOGIN_USER", response.data);
      console.log(response.data.token);
    } catch (error) {
      // pass back the error message
      localStorage.removeItem("token");
      return Promise.reject(error.response.data.error);
    }
  }

  @Action
  async logoutUser() {
    this.context.commit("LOGOUT_USER");
    localStorage.removeItem("token");
  }
}
