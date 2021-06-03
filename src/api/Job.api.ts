import httpClient from "./httpClient";

const END_POINT = "/job";

const createJob = (
  title: string,
  description: string,
  labels: Array<string>,
  rewards: number,
  numLabellersRequired: number
): Promise<any> => {
  console.log("Creating Job...");
  const params = {
    title: title,
    description: description,
    labels: labels,
    rewards: rewards,
    numLabellersRequired: numLabellersRequired,
  };

  return httpClient.post(END_POINT, params);
};

const getJob = (url: string): Promise<any> => {
  console.log("Getting job...");
  const req: Promise<any> = httpClient.get(url);
  return req;
};

const getImages = (url: string): Promise<any> => {
  console.log("Getting images...");
  const req: Promise<any> = httpClient.get(url);
  return req;
};

const acceptJob = (jobId: string): Promise<any> => {
  console.log("Accepting job...");
  return httpClient.put("/job/labeller/" + jobId);
};

const getAvailableJobs = (): Promise<any> => {
  // get all the jobs the current user can accept
  return httpClient.get("/job/available");
};

const getAuthoredJobs = (): Promise<any> => {
  // get all the jobs the current user has created
  return httpClient.get("/job/authored");
};

const getAcceptedJobs = (): Promise<any> => {
  // get all the jobs the current user has accepted
  return httpClient.get("/job/accepted");
};

export {
  createJob,
  getJob,
  getImages,
  acceptJob,
  getAvailableJobs,
  getAuthoredJobs,
  getAcceptedJobs,
};
