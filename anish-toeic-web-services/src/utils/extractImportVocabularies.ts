import { CreateVocabularyDto } from 'src/vocabulary/dto/create-vocabulary.dto';

function parseVocabularyString(input: string): CreateVocabularyDto {
  const [wordPart, explanationPart] = input.split('Giải thích:');
  const [word, pronunciation] = wordPart.split('/');
  const [explanation, rest] = explanationPart.split('Từ loại:');
  const [meaning, examplePart] = rest.split('Ví dụ:');

  return {
    word: word.trim(),
    pronunciation: pronunciation.trim(),
    explanation: explanation.trim(),
    meaning: meaning.replace('Từ loại:', '').trim(),
    example: examplePart.trim(),
  };
}

export function extractImportVocabularies(text: string): CreateVocabularyDto[] {
  const lines = text.split('\n');

  const vocabularies = lines
    .map((line) => {
      if (line.trim() !== '' && line.length > 30) {
        return parseVocabularyString(line);
      }
      return null;
    })
    .filter((vocab) => vocab !== null);

  return vocabularies;
}
