import httpClient from "./httpClient";

const END_POINT = "/user";

const loginUser = (email: string, password: string): Promise<any> => {
  console.log("Logging in " + email);
  const data = { email: email, password: password };
  const req: Promise<any> = httpClient.post("/auth/login", data);
  console.log(req);
  return req;
};

const signupUser = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<any> => {
  console.log("Signing up...");

  const data = {
    firstName: firstName,
    surname: lastName,
    email: email,
    password: password,
  };

  return httpClient.post("/auth/register", data);
};

export { loginUser, signupUser };
