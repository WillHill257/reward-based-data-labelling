import httpClient from "@/api/httpClient";
import MockAdapter from "axios-mock-adapter";
import { UserState } from "@/store/modules/user";
import { AxiosRequestConfig } from "axios";
// const $instance = axios.create();
const mock: MockAdapter = new MockAdapter(httpClient);

// set base endpoint
const END_POINT = "/user";

// set up base user object
let user: UserState = {
  firstName: "",
  lastName: "",
  email: "",
  token: "",
};

// test login
mock.onGet(END_POINT + "/login").reply((config: AxiosRequestConfig) => {
  // if (config.params)
  return [200, JSON.stringify(user)];
});

// test sign up
mock.onPost(END_POINT).reply((config: AxiosRequestConfig) => {
  // extract meaningful data from body
  const userLocal: UserState = JSON.parse(config.data);
  user = userLocal;
  return [201, user];
});

// make api api available
export default httpClient;
