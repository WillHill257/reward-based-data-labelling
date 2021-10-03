import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { UserModule } from "@/store/modules/user";
import store from "@/store/index";

//https://haxzie.com/architecting-http-clients-vue-js-network-layer

// create a base axios instance
const httpClient = axios.create({
  baseURL: `http://${process.env.VUE_APP_BASE_URL}:${process.env.VUE_APP_API_PORT}/api`,
  timeout: 1000, // indicates, 1000ms ie. 1 second
  headers: {
    "Content-Type": "application/json",
  },
});

// fetch the JWT from browser storage
const getAuthToken = () => localStorage.getItem("token");

// apply this to every request that is made
const requestInterceptor = (config: AxiosRequestConfig) => {
  const token = getAuthToken();

  // add the authentication header, if a token exists
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }

  return config;
};

// manage all network request errors
const requestErrorInterceptor = (error: AxiosError) => {
  Promise.reject(error);
};

// tell the axios client to use the interceptors
httpClient.interceptors.request.use(
  requestInterceptor,
  requestErrorInterceptor
);

// interceptor to catch errors
//TODO: Implement refresh tokens https://medium.com/swlh/handling-access-and-refresh-tokens-using-axios-interceptors-3970b601a5da
const errorInterceptor = (error: AxiosError) => {
  // check if it's a server error
  if (!error.response) {
    console.error("Network/Server error");
    return Promise.reject(error);
  }

  // all the error responses
  switch (error.response.status) {
    case 400:
      console.error(error.response.status, error.message);
      break;

    case 401: // authentication error, logout the user
      console.error(error.response.status, error.message);
      localStorage.removeItem("token");
      UserModule.logoutUser();
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
