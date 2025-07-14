const getQuestionsByExamIdUrl = "/questions/:examId";
const addQuestionUrl = "/questions";
const deleteQuestionUrl = "/questions/:id";
const updateQuestionUrl = "/questions/:id";
const getQuestionsForTestUrl = "/questions/:examId/test";

const importQuestionsUrl = `${
  import.meta.env.ANISH_SERVICE_URL
}/questions/:examId/import`;

const importReadingQuestionsUrl = `${
  import.meta.env.ANISH_SERVICE_URL
}/questions/:examId/import/reading`;

const importListeningQuestionsUrl = `${
  import.meta.env.ANISH_SERVICE_URL
}/questions/:examId/import/listening`;

export {
  addQuestionUrl,
  deleteQuestionUrl,
  getQuestionsByExamIdUrl,
  getQuestionsForTestUrl,
  importListeningQuestionsUrl,
  importQuestionsUrl,
  importReadingQuestionsUrl,
  updateQuestionUrl,
};
