import { GetterTree } from "vuex";
import { RootState } from "../types";
import { UserState } from "./types";

// Getters should always be syncronous
export const getters: GetterTree<UserState, RootState> = {
  getUser(state): UserState {
    return state;
  },
};
