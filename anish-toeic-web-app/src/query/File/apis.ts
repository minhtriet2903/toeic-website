const getAllResourcesUrl = "/files";
const downloadFileUrl = "/files/download/:fileName";

const uploadFileUrl = `${import.meta.env.ANISH_SERVICE_URL}/files/upload`;

const fetchFileUrl = `${
  import.meta.env.ANISH_SERVICE_URL
}/files/download/:fileName`;

export { downloadFileUrl, fetchFileUrl, getAllResourcesUrl, uploadFileUrl };
