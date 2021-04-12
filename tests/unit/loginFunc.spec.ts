/*import request from "chai-http";
import chai from "chai";
import chaiHttp from "chai-http";*/
//const expect = chai.expect;


import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import Login from "@/views/Login.vue";
import axios from "axios";


//chai.use(chaiHttp);

describe("Login function", function(){
  it("Should return and error if user not found", function(){
    const wrapper = shallowMount(Login, {
      mocks: { $http: axios },
    });
    expect(
      wrapper.find("#globalError").exists(),
      'Element with ID "globalError" is not found in the DOM, but is required.'
    ).to.equal(true);
  })
})

/*describe("Login API", function () {
  it("Should success if credential is valid", function (done) {
    chai
      .request("http://localhost:4000")
      .get("/api/user/login/")
      .set("Content-Type", "application/json")
      .query({ email: "hey@kabi.com", password: "Ahyes" })
      .end((err: any, res: any) => {
        expect(res).to.have.status(422);
        expect(res).to.have.header(
          "Content-Type",
          "application/json; charset=utf-8"
        );
        expect(res).to.be.json;
        expect(res.body).not.to.be.empty;
        expect(res.body).to.have.property("firstName");
        expect(res.body).to.have.property("surname");
        expect(res.body).to.have.property("email");
        expect(res.body).to.not.have.property("password");
        expect(res.body).to.have.property("profilePicturePath");
        done();
      });
  });
});*/

//send dummy data to input
//check response
//see if reposnse is expected

//Checking that the data validation works
//- msg for all
//empty fields
//email contains @
//
