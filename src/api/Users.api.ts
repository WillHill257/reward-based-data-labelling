import httpClient from "./httpClient";

const END_POINT = "/user";

const loginUser = (email: string, password: string): Promise<any> => {
  const data = { email: email, password: password };
  const req: Promise<any> = httpClient.post("/auth/login", data);
  return req;
};

const signupUser = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<any> => {
  const data = {
    firstName: firstName,
    surname: lastName,
    email: email,
    password: password,
  };

  return httpClient.post("/auth/register", data);
};

const getLeaderBoard = () => {
  const req: Promise<any> = httpClient.get(`${END_POINT}/leaderboard`);
  return req;
};

const getUser = (): Promise<any> => {
  return httpClient.get(END_POINT);
};

const getRating = (): Promise<any> =>{
  return httpClient.get(END_POINT+ "/rating");
}

export { loginUser, signupUser, getLeaderBoard, getUser, getRating };
