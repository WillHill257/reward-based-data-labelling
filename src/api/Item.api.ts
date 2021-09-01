import httpClient from "./httpClient";

const END_POINT = "/images";
const STATIC_FILES = "/uploads/jobs";

const getImage = (jobID: string, filename: string): Promise<any> => {
  // get the batch data, with the related image data
  return httpClient.get(STATIC_FILES + "/" + jobID + "/" + filename);
};

const computeFetchEndpoint = (jobID: string, filename: string): string => {
  // get the batch data, with the related image data
  return STATIC_FILES + "/" + jobID + "/" + filename;
};

const sendLabels = (labelId: string, labels: string[]): Promise<any> => {
  const payload: any = { labels: labels };
  return httpClient.put(END_POINT + `/${labelId}`, payload);
};

export { getImage, computeFetchEndpoint, sendLabels };
