import axiosInstance from "../../config/axiosInstance";
import { checkUserEnrolledUrl } from "./apis";

export function checkUserEnrolled(id: string, userId: string) {
  return axiosInstance.get(
    checkUserEnrolledUrl.replace(":id", id).replace(":userId", userId)
  );
}
