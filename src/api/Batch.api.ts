import httpClient from "./httpClient";

const END_POINT = "/batch";

const getCompleteBatch = (batchID: string): Promise<any> => {
  // get the batch data, with the related image data
  return httpClient.get(END_POINT + "/" + batchID);
};

const getNextBatch = (jobId: string): Promise<any> => {
  return httpClient.get(END_POINT + "/next/" + jobId);
};

const deleteLabeller = (batchID: string): Promise<any> => {
  return httpClient.delete(END_POINT + "/labeller/" + batchID);
};

const markBatchFinished = (batchID: string): Promise<any> => {
  // set this user's completed flag true for this batch
  return httpClient.put(END_POINT + "/complete/" + batchID);
};

const updateReward = (jobID: string): Promise<any> => {
  // set this user's completed flag true for this batch
  return httpClient.put(END_POINT + "/reward/" + jobID);
};

export { getCompleteBatch, getNextBatch, deleteLabeller, markBatchFinished, updateReward };
