import httpClient from "./httpClient";

const END_POINT = "/job";


const createJob = (
  title: string,
  description: string,
  author: string
): Promise<any> => {
  console.log("Creating Job...");
  const params = {
    title: title,
    description: description,
    author: author,
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
