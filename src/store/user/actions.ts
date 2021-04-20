import { ActionTree, ActionContext } from "vuex";
import { UserState } from "./types";
import { Mutations, MutationTypes } from "./mutations";

import { signupUser, loginUser } from "@/api/Users.api";
import { RootState } from "../types";

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<UserState, UserState>, "commit">;

export enum ActionTypes {
  signupUser = "signupUser",
  loginUser = "loginUser",
}

export interface Actions {
  [ActionTypes.signupUser](
    { commit }: AugmentedActionContext,
    payload: any
  ): Promise<any>;
}

export const actions: ActionTree<UserState, RootState> = {
  async signupUser({ commit }, payload: any) {
    try {
      const response: any = await signupUser(
        payload.firstName,
        payload.lastName,
        payload.email,
        payload.password
      );
      console.log(response);
      commit(MutationTypes.SIGNUP_USER, response.data);
    } catch (error) {
      console.log(error);
    }
  },

  async loginUser({ commit }, payload: any) {
    try {
      const response: any = await loginUser(payload.email, payload.password);
      commit(MutationTypes.LOGIN_USER, response.data);
    } catch (error) {
      console.log(error);
    }
  },
};
