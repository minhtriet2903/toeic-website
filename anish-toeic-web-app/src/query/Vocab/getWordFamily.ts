import axiosInstance from "../../config/axiosInstance";
import { getWordFamilyUrl } from "./apis";

export function getWordFamily(word: string) {
  return axiosInstance.get(getWordFamilyUrl.replace(":word", word));
}
