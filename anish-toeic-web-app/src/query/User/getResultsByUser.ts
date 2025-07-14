import axiosInstance from "../../config/axiosInstance";
import { getResultsByUserUrl } from "./apis";

export function getResultsByUser(id: string) {
  return axiosInstance.get(getResultsByUserUrl.replace(":id", id));
}
