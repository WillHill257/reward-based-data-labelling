import httpClient from "./httpClient";

const END_POINT = "/job";

const createJob = (
  title: string,
  description: string,
  labels: Array<string>,
  rewards: number,
  numLabellersRequired: number
): Promise<any> => {
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
  const req: Promise<any> = httpClient.get(url);
  return req;
};

const getImages = (url: string): Promise<any> => {
  const req: Promise<any> = httpClient.get(url);
  return req;
};

const acceptJob = (jobId: string): Promise<any> => {
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

const getAllJobs = (): Promise<any> => {
  // get all the jobs
  return httpClient.get("/job");
};

const exportJobToCSV = (jobID: string): Promise<any> => {
  return httpClient.get(END_POINT + "/export/" + jobID);
};

export {
  createJob,
  getJob,
  getImages,
  acceptJob,
  getAvailableJobs,
  getAuthoredJobs,
  getAcceptedJobs,
  getAllJobs,
  exportJobToCSV,
};
