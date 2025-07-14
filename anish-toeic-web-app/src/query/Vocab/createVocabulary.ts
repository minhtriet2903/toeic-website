import axiosInstance from "../../config/axiosInstance";
import { createVocabulariesUrl } from "./apis";
import { CreateVocabularyPayload } from "./types";

export function createVocabulary(body: CreateVocabularyPayload) {
  return axiosInstance.post(createVocabulariesUrl, {
    ...body,
  });
}
