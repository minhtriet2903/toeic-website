const getVocabulariesUrl = "/vocabularies";
const getWordFamilyUrl = "/vocabularies/word-family/:word";
const createVocabulariesUrl = "/vocabularies";
const getVocabularyUrl = "/vocabularies/:id";
const editVocabularyUrl = "/vocabularies/:id";
const deleteVocabularyUrl = "/vocabularies/:id";

const importVocabulariesUrl = `${
  import.meta.env.ANISH_SERVICE_URL
}/vocabularies/import`;

export {
  createVocabulariesUrl,
  deleteVocabularyUrl,
  editVocabularyUrl,
  getVocabulariesUrl,
  getVocabularyUrl,
  getWordFamilyUrl,
  importVocabulariesUrl,
};
