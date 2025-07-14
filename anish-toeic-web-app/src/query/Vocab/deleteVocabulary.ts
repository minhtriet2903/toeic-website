import axiosInstance from "../../config/axiosInstance";
import { deleteVocabularyUrl } from "./apis";

export function deleteVocabulary(id: string) {
  return axiosInstance.delete(deleteVocabularyUrl.replace(":id", id));
}
