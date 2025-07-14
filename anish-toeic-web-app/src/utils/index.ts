import { fetchFile } from "../query";

export const errorMessages = {
  requiredField: "This field is required",
};

export const isEmptyObj = (object: Object) => {
  return Object.keys(object).length === 0;
};

export const normalizeFileName = (fileName: string) => {
  return fileName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ /g, "_");
};

export const handleFetchAudio = async (fileName: string) => {
  const response = await fetchFile(fileName);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const audio = new Audio(url);
  audio.load();
  audio.play();
};

export const baseUrl = `${import.meta.env.ANISH_SERVICE_DOMAIN}:${
  import.meta.env.ANISH_SERVICE_PORT
}/uploads/`;

export interface QueryParams {
  search?: string;
  top?: number;
  sort?: string;
  page?: number;
  limit?: number;
}

export const removeEscapeSequences = (input: string) => {
  return input.replace(/\\[ntrbf\\"'xu0-9a-fA-F]{1,6}/g, "");
};
