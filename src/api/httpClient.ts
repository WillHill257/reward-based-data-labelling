import axios from "axios";

//https://haxzie.com/architecting-http-clients-vue-js-network-layer

const httpClient = axios.create({
  baseURL: `http://${process.env.VUE_APP_BASE_URL}:${process.env.VUE_APP_API_PORT}/api`,
  timeout: 1000, // indicates, 1000ms ie. 1 second
  headers: {
    "Content-Type": "application/json",
  },
});

const getAuthToken = () => localStorage.getItem("token");

const authInterceptor = (config: any) => {
  config.headers["Authorization"] = getAuthToken();
  return config;
};

httpClient.interceptors.request.use(authInterceptor);

// interceptor to catch errors
const errorInterceptor = (error:any) => {
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
      localStorage.removeItem("token");
      // router.push("/auth");
      break;

    default:
      console.error(error.response.status, error.message);
  }
  return Promise.reject(error);
};

// Interceptor for responses
const responseInterceptor = (response:any) => {
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
