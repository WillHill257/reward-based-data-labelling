import { MutationTree } from "vuex";
import { UserState } from "./types";

export enum MutationTypes {
  SIGNUP_USER = "SIGNUP_USER",
  LOGIN_USER = "LOGIN_USER",
}

export const mutations: MutationTree<UserState> = {
  [MutationTypes.SIGNUP_USER](state, payload: any): void {
    state.firstName = payload.firstName;
    state.lastName = payload.lastName;
    state.email = payload.email;
  },
  [MutationTypes.LOGIN_USER](state, payload: any): void {
    state.firstName = payload.firstName;
    state.lastName = payload.lastName;
    state.email = payload.email;
  },
};
