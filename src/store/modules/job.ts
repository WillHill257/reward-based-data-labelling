import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { createJob, getJob, getImages, postImages } from "@/api/Job.api";

export interface JobState {
  title: string;
  description: string;
  author: string;
  url: string;
  items: string[]
}

@Module({
  namespaced: true,
  name: "job",
  stateFactory: true
})
export default class JobModule extends VuexModule implements JobState {
  title = "";
  description = "";
  author = "";
  url = "";
  items = [];
  jobId = "";

  @Mutation
  GET_IMAGES(payload: any) {
    this.title = payload.title;
    this.description = payload.description;
    this.author = payload.author;
    this.url = payload.url;
  }


  @Mutation
  CREATE_JOB(payload: any) {
    this.title = payload.title;
    this.description = payload.description;
    this.author = payload.author;
    this.url = payload.url;
  }

  @Mutation
  POST_IMAGES(payload: any) {
    this.title = payload.title;
    this.description = payload.description;
    this.author = payload.author;
    this.url = payload.url;
  }

  @Mutation
  GET_JOB(payload: any): void {
    this.title = payload.title;
    this.description = payload.description;
    this.author = payload.author;
    this.url = payload.url;
  }


  @Action
  async createJob(payload: any) {
    try {
      console.log("trying");
      const response: any = await createJob(
        payload.title,
        payload.description,
        payload.author
      );
      this.context.commit("CREATE_JOB", response.data);
      return response;
    } catch (error) {
      // pass back the error message
      return Promise.reject(error.response.data.error);
    }
  }

  @Action
  async postImages(payload: any) {
    try {
      console.log("trying");
      const response: any = await postImages(payload.url);
      this.context.commit("POST_IMAGES", response.data);
      return response
    } catch (error) {
      // pass back the error message
      return Promise.reject(error.response.data.error);
    }
  }

  @Action
  async getJob(payload: any) {
    try {
      const response: any = await getJob(payload);
      this.context.commit("GET_JOB", response.data);
      return response;
    } catch (error) {
      // pass back the error message
      return Promise.reject(error.response.data.error);
    }
  }

  @Action
  async getImages(payload: any) {
    try {
      const response: any = await getImages(payload);
      this.context.commit("GET_IMAGES", response.data);
      return response;
    } catch (error) {
      // pass back the error message
      return Promise.reject(error.response.data.error);
    }
  }


}
