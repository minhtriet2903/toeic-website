import axiosInstance from "../../config/axiosInstance";
import { QueryParams } from "../../utils";
import { getVocabulariesUrl } from "./apis";

export function getVocabularies(params: QueryParams = {}) {
  return axiosInstance.get(getVocabulariesUrl, {
    params,
  });
}
