import axios from "axios";
import { verifyGoogleTokenUrl } from "./apis";

export function verifyGoogleToken(token: string) {
  return axios.get(verifyGoogleTokenUrl + token, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
}
