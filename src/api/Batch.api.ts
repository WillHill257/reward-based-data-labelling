import httpClient from "./httpClient";

const END_POINT = "/batch";

const acceptBatch = (jobId: string): Promise<any> => {
  console.log("Accepting job...");

  return httpClient.get(END_POINT + "/next/" + jobId).then((res: any) => {
    if (res.status != 400) {
      console.log(res);
      return httpClient.put(END_POINT + "/labeller/" + res.data._id);
    }
  });
};

export { acceptBatch };
