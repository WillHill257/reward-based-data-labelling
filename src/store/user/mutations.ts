import { MutationTree } from "vuex";
import { UserState } from "./types";

export enum MutationTypes {
  SIGNUP_USER = "SIGNUP_USER",
  LOGIN_USER = "LOGIN_USER",
}

export type Mutations<S = UserState> = {
  [MutationTypes.SIGNUP_USER](state: S, payload: any): void;
  [MutationTypes.LOGIN_USER](state: S, payload: any): void;
};

export const mutations: MutationTree<UserState> = {
  SIGNUP_USER(state, payload): void {
    console.log("Mutating signup");
    state.firstName = payload.firstName;
    state.lastName = payload.lastName;
    state.email = payload.email;
  },
  LOGIN_USER(state, payload): void {
    state.firstName = payload.firstName;
    state.lastName = payload.lastName;
    state.email = payload.email;
  },
};
