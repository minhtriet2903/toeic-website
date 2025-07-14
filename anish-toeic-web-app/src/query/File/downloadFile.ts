import axiosInstance from "../../config/axiosInstance";
import { downloadFileUrl } from "./apis";

export function download(fileName: string) {
  const config = {
    headers: {
      responseType: "blob",
    },
  };

  return axiosInstance.get(
    downloadFileUrl.replace(":fileName", fileName),
    config
  );
}
