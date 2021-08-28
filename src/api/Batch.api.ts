import httpClient from "./httpClient";

const END_POINT = "/batch";

const acceptBatch = (jobId: string): Promise<any> => {
  console.log("Accepting job...");

  return httpClient.get("/next/" + jobId).then((res: any) => {
    if (res.status != 400) {
      return httpClient.put("/labeller/" + res.body._id);
    }
  });
};

export { acceptBatch };
