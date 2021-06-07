import { loginUser, signupUser } from "@/api/Users.api";
import httpClient from "@/api/httpClient";

jest.mock("@/api/httpClient");

describe("User api", () => {
  it("It should log a user in", () => {
    const userLogin = {
      email: "somebody@gmail.com",
      password: "12345678",
    };

    const expected = {
      profilePicturePath: "generic.jpeg",
      jobs: [],
      firstName: "Some",
      surname: "One",
      email: userLogin.email,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYTRmMTEwM2MyZmEzNDBiNGMyNGQ1YSIsImlhdCI6MTYyMTQyMjg2MSwiZXhwIjoxNjIxNDI0NjYxfQ.-SwaADjkwyAz8S68ap7doYODBtviAuafGorGLdWPTSg",
    };

    httpClient.post.mockResolvedValue(expected);

    loginUser(userLogin.email, userLogin.password).then((res) => {
      expect(res).toEqual(expected);
    });
  });

  it("It should register a user", () => {
    const user = {
      firstName: "Some",
      surname: "One",
      email: "someone@example.com",
      password: "plaintext",
    };

    const expected = {
      profilePicturePath: "generic.jpeg",
      jobs: [],
      firstName: user.firstName,
      surname: user.surname,
      email: user.email,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjE0MjMyNzcsImV4cCI6MTYyMTQyNTA3N30.T07xprT6scyHRo5ygqqKNZlRO8PxTMf5NjM-4mpbcWM",
    };

    httpClient.post.mockResolvedValue(expected);

    signupUser(user.firstName, user.surname, user.email, user.password).then(
      (res) => {
        expect(res).toEqual(expected);
      }
    );
  });
});
