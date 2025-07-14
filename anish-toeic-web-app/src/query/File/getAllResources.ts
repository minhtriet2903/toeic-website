import axiosInstance from "../../config/axiosInstance";
import { getAllResourcesUrl } from "./apis";

export function getAllResources() {
  return axiosInstance.get(getAllResourcesUrl);
}
