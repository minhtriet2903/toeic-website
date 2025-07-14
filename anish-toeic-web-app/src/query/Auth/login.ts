import axiosInstance from "../../config/axiosInstance";
import { loginUrl } from "./apis";
import { LoginPayload } from "./types";

export function login(body: LoginPayload) {
  return axiosInstance.post(loginUrl, {
    ...body,
  });
}
