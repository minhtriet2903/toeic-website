export const editFileName = (req, file, callback) => {
  callback(null, `${file.originalname}`);
};
