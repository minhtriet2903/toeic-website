import { fetchFileUrl } from "./apis";

export async function fetchFile(fileName: string) {
  const response = await fetch(fetchFileUrl.replace(":fileName", fileName), {
    method: "GET",
  });
  return response;
}
