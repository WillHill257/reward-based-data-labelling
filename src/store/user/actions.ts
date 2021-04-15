import { ActionTree } from "vuex";
import { RootState } from "../types";
import { UserState } from "./types";

import { signupUser, loginUser } from "@/api/Users.api";

export const actions: ActionTree<UserState, RootState> = {
  async signupUser({ commit }, user: UserState) {
    try {
      const response: any = await signupUser(
        user.firstName,
        user.lastName,
        user.email,
        user.password
      );
      console.log('Here');
      commit("SIGNUP_USER", response.data);
    } catch (error) {
      console.log(error);
    }
  },

  async loginUser({ commit }, user: UserState) {
    try {
      const response: any = await loginUser(
        user.email,
        user.password
      );
      console.log('Here');
      commit("SIGNUP_USER", response.data);
    } catch (error) {
      console.log(error);
    }
  },
};
