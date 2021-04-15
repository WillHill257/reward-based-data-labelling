import { Module } from "vuex";
import { RootState } from "../types";
import { UserState } from "./types";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";

const state: UserState = {
  firstName: "",
  lastName: "",
  email: "",
  password: ""
};

export const user: Module<UserState, RootState> = {
  namespaced : true,
  state,
  getters,
  actions,
  mutations,
};
