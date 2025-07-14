import axiosInstance from "../../config/axiosInstance";
import { enrolUserUrl } from "./apis";
import { EnrollUserPayload } from "./types";

export function enrollUserToCourse(body: EnrollUserPayload) {
  return axiosInstance.post(enrolUserUrl, {
    ...body,
  });
}
