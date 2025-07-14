import axiosInstance from "../../config/axiosInstance";
import { getResultsUrl } from "./apis";

export function getResults() {
  return axiosInstance.get(getResultsUrl);
}
