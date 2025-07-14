import axiosInstance from "../../config/axiosInstance";
import { createUserUrl } from "./apis";
import { CreateUserPayload } from "./types";

export function createUser(body: CreateUserPayload) {
  return axiosInstance.post(createUserUrl, {
    ...body,
  });
}
