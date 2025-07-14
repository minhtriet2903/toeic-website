interface Vocabulary {
  _id: string;
  word: string;
  meaning: string;
  explanation: string;
  pronunciation: string;
  example: string;
  audioUrl?: string;
  createdAt: Date;
}

type CreateVocabularyPayload = {
  word: string;
  meaning: string;
  example: string;
  explanation: string;
  pronunciation: string;
  audioUrl?: string;
};

export type { CreateVocabularyPayload, Vocabulary };
