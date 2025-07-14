import axiosInstance from "../../config/axiosInstance";
import { editVocabularyUrl } from "./apis";
import { Vocabulary } from "./types";

export function editVocabulary(body: Vocabulary) {
  return axiosInstance.put(editVocabularyUrl.replace(":id", body._id), {
    ...body,
  });
}
