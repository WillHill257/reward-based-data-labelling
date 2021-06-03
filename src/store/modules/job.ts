import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { createJob, getJob, getImages } from "@/api/Job.api";
import store from "@/store";

export interface JobState {
  title: string;
  description: string;
  author: string;
  url: string;
  items: any;
}

@Module({
  dynamic: true,
  name: "job",
  stateFactory: true,
  store,
})
export default class JobModule extends VuexModule implements JobState {
  jobId = "";
  title = "";
  description = "";
  author = "";
  url = "";
  items = [];

  get getTitle(): string {
    return this.title;
  }

  // ///
  // title: this.title,
  // description: this.description,
  // author: this.author,
  // labels: this.labelArray,
  // rewards: this.reward,
  // numLabellersRequired: this.selectedNumber,
  // ///

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
        payload.labels,
        payload.rewards,
        payload.numLabellersRequired
      );
      this.context.commit("CREATE_JOB", response.data);
      return response;
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
