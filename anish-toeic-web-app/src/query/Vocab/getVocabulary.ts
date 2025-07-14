import axiosInstance from "../../config/axiosInstance";
import { getVocabularyUrl } from "./apis";

export function getVocabulary() {
  return axiosInstance.get(getVocabularyUrl);
}
