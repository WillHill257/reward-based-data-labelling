import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import { signupUser, loginUser } from "@/api/Users.api";
import { updateReward } from "@/api/Batch.api";
import router from "@/router";
import store from "@/store";

export interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  rewardCount: number;
}

@Module({
  name: "user",
  dynamic: true,
  stateFactory: true, // prevents store caching - so each client app receives its own instance of global state
  store,
})
class User extends VuexModule implements UserState {
  firstName = "";
  lastName = "";
  email = "";
  token = localStorage.getItem("token") || "";
  rewardCount = 0;

  // Getters
  get getFirstName(): any {
    return this.firstName;
  }

  get getReward(): number {
    return this.rewardCount;
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  //Mutations
  //Mutation functions MUST NOT be async functions. Also do not define them as arrow ➡️ functions, since we need to rebind them at runtime.
  @Mutation
  SIGNUP_USER(payload: any) {
    this.firstName = payload.firstName;
    this.lastName = payload.lastName;
    this.email = payload.email;
    this.token = payload.token;
    this.rewardCount = payload.rewardCount;
  }

  @Mutation
  LOGIN_USER(payload: any): void {
    this.firstName = payload.firstName;
    this.lastName = payload.lastName;
    this.email = payload.email;
    this.token = payload.token;
    this.rewardCount = payload.rewardCount;
  }

  @Mutation
  LOGOUT_USER(): void {
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.token = "";
    this.rewardCount = 0;
  }

  @Mutation
  UPDATE_REWARD(reward: number): void {
    this.rewardCount = reward;
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
      localStorage.setItem("token", response.data.token);
      this.context.commit("SIGNUP_USER", response.data);
    } catch (error: any) {
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
    } catch (error: any) {
      // pass back the error message
      localStorage.removeItem("token");
      return Promise.reject(error.response.data.error);
    }
  }

  @Action
  async logoutUser() {
    this.context.commit("LOGOUT_USER");
    localStorage.clear();
    router.push("/login");
  }

  @Action
  async updateUserReward(jobId: string, success: any, failure: any) {
    updateReward(jobId)
      .then((res: any) => {
        console.log(res.body.reward);
        this.context.commit("UPDATE_REWARD", res.body.reward);
        success();
      })
      .catch(() => {
        failure();
      });
  }
}

export const UserModule = getModule(User);
