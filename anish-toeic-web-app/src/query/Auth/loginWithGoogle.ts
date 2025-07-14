import axiosInstance from "../../config/axiosInstance";
import { loginWithGoogleUrl } from "./apis";

export function loginWithGoogle(email: string) {
  return axiosInstance.post(loginWithGoogleUrl, {
    email,
  });
}
