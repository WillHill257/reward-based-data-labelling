import { shallowMount , createLocalVue, mount} from "@vue/test-utils";
import Login from "@/views/Login.vue";
import axios from "axios";
import Vue from "vue";
import Vuetify from "vuetify";
import Vuex from "vuex"
import App from "@/App.vue"
import { loginUser, signupUser } from "@/api/Users.api";
import VueForm from "vue"
import { UserModule } from "@/store/modules/user";
Vue.use(Vuetify);
describe("Testing basic visual aspects of login screen", () => {
  test("An email field is displayed", () => {
    const wrapper = shallowMount(Login, {
      mocks: { $http: axios },
    });
    expect(wrapper.find("#login-email-input").exists()).toBe(true);

  });

  it("A password field is displayed", () => {
    const wrapper = shallowMount(Login, {
      mocks: { $http: axios },
    });
    expect(wrapper.find("#login-password-input").exists()).toBe(true);
  });

  describe("testing buttons", () => 
  {
    test("checking login", () =>
    {
    const wrapper  = shallowMount(Login);

    const loginOnClick = jest.fn();
    wrapper.setMethods({
      loginOnClick: loginOnClick
    });

    wrapper.vm.$data.email = "";
    wrapper.vm.$data.password = "";
    wrapper.find("#login-confirm-button").trigger("click");
    expect(loginOnClick).toHaveBeenCalled();
    })

    // test("checking register", () =>
    // {
    //   const mockRouter = {
    //     push: jest.fn()
    //   }
    // const wrapper  = shallowMount(Login,{
    //   mocks: {
    //     $router: mockRouter
    //   }});



    // wrapper.vm.$data.email = "";
    // wrapper.vm.$data.password = "";
    // wrapper.find("#register-button").trigger("click");
    // expect(mockRouter.push()).toHaveBeenCalled();
    // })

  })

  describe("testing errors",   () =>
  {
  const wrapper: any = shallowMount(Login);
   wrapper.vm.$data.error = "";
   wrapper.vm.$data.alert  = false;
  
  test("testing seErrorMesssage", ()=>
  {
  wrapper.vm.setErrorMessage("hello")
  expect(wrapper.vm.$data.Error).toEqual("hello")
  expect(wrapper.vm.$data.alert).toEqual(true)
  })
  });



  describe("testing usermodule",  () =>{
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const modules = {
      UserModule: {
        state: {},
        actions: {
          loginUser: jest.fn()
        },
        namespaced: true
      } 
    };
test("testing module functions", async () =>{
  const store = new Vuex.Store({modules});
  const wrapper:any = shallowMount(Login,{localVue,store});
  const loginSpy = jest.spyOn(UserModule, "loginUser")
  wrapper.vm.validate = jest.fn().mockReturnValue(true)
  wrapper.vm.$data.email = "fname@gmail.com";
  wrapper.vm.$data.password = "fnamefname1";
  await wrapper.find("#login-confirm-button").trigger("click");
  expect(loginSpy).toHaveBeenCalled();
 
  
})

test("testing rules",async ()=>{
  const wrapper:any = shallowMount(Login);
  wrapper.vm.$data.password = "";
  console.log(wrapper.find({div:"#login-password-input"}))

})


  })

});


