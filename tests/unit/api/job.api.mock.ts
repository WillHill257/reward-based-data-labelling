import httpClient from "@/api/httpClient";
import MockAdapter from "axios-mock-adapter";
import { JobState } from "@/store/modules/job";
import { AxiosRequestConfig } from "axios";
// const $instance = axios.create();
const mock: MockAdapter = new MockAdapter(httpClient);

// set base endpoint
const END_POINT = "/job";

// set up base job object
let job: JobState = {
  title: "",
  description: "",
  author: "",
  url: "",
  items: [],
};

// test login
mock.onGet(END_POINT + "/job").reply((config: AxiosRequestConfig) => {
  // if (config.params)
  return [200, JSON.stringify(job)];
});

// test sign up
mock.onPost(END_POINT).reply((config: AxiosRequestConfig) => {
  // extract meaningful data from body
  const jobLocal: JobState = JSON.parse(config.data);
  job = jobLocal;
  return [201, job];
});

// make mock api available
export default httpClient;
