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

export { createJob, getJob, getImages };
