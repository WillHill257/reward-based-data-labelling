import httpClient from "./httpClient";

const END_POINT = "/user";

const loginUser = (email: string, password: string): Promise<any> => {
  console.log("Logging in...");
  const params = { email: email, password: password };
  const req: Promise<any> = httpClient.get(END_POINT + "/login", {
    params: params,
  });
  return req;
};

const signupUser = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<any> => {
  console.log("Signing up...");
  const params = {
    firstName: firstName,
    surname: lastName,
    email: email,
    password: password,
  };

  return httpClient.post(END_POINT, params);
};

export { loginUser, signupUser };
