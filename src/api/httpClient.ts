import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import UserModule from "@/store/modules/user";
import { getModule } from "vuex-module-decorators";
import router from "@/router";
//https://haxzie.com/architecting-http-clients-vue-js-network-layer

// const userMod = getModule(UserModule);

const httpClient = axios.create({
  baseURL: `http://${process.env.VUE_APP_BASE_URL}:${process.env.VUE_APP_API_PORT}/api`,
  timeout: 1000, // indicates, 1000ms ie. 1 second
  headers: {
    "Content-Type": "application/json",
  },
});

const getAuthToken = () => localStorage.getItem("token");

const requestInterceptor = (config: AxiosRequestConfig) => {
  const token = getAuthToken();
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  // config.headers['Content-Type'] = 'application/json';
  return config;
};

const requestErrorInterceptor = (error: AxiosError) => {
  Promise.reject(error);
};

httpClient.interceptors.request.use(
  requestInterceptor,
  requestErrorInterceptor
);

// interceptor to catch errors
//TODO: Implement refresh tokens https://medium.com/swlh/handling-access-and-refresh-tokens-using-axios-interceptors-3970b601a5da
const errorInterceptor = (error: AxiosError) => {
  // check if it's a server error
  if (!error.response) {
    console.log("Network/Server error");
    return Promise.reject(error);
  }

  // all the error responses
  switch (error.response.status) {
    case 400:
      console.error(error.response.status, error.message);
      break;

    case 401: // authentication error, logout the user
      console.error(error.response.status, error.message);
      // localStorage.removeItem("token");
      // userMod.logoutUser();
      router.push("/login");
      break;

    default:
      console.error(error.response.status, error.message);
  }
  return Promise.reject(error);
};

// Interceptor for responses
const responseInterceptor = (response: AxiosResponse) => {
  switch (response.status) {
    case 200:
      // yay!
      break;
    // any other cases
    default:
    // default case
  }

  return response;
};

httpClient.interceptors.response.use(responseInterceptor, errorInterceptor);

export default httpClient;
