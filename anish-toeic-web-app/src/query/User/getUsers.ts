import axiosInstance from "../../config/axiosInstance";
import { QueryParams } from "../../utils";
import { getUsersUrl } from "./apis";

export function getUsers(params: QueryParams = {}) {
  return axiosInstance.get(getUsersUrl, {
    params,
  });
}
