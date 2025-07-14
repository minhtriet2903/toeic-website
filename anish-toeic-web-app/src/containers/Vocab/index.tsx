import { Button, Select } from "antd";
import { useEffect, useState } from "react";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { getVocabularies, Vocabulary } from "../../query";
import { getWordFamily } from "../../query/Vocab/getWordFamily";
import { handleFetchAudio } from "../../utils";

const Vocab = () => {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>();
  const [wordFamily, setWordFamily] = useState<Vocabulary[]>();
  const [selectedVocabId, setSelectedVocabId] = useState<string>("");
  const [selectedWord, setSelectedWord] = useState<Vocabulary>();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    getVocabularies({ search }).then((res) => {
      setVocabularies(res.data);
    });
  }, [search]);

  useEffect(() => {
    if (selectedWord) {
      getWordFamily(selectedWord?.word).then((res) => {
        setWordFamily(res.data);
      });
    }
  }, [selectedWord]);

  const handleSearch = (search: string) => {
    setSearch(search);
  };

  const handleChange = (selectedVocabId: string) => {
    setSelectedVocabId(selectedVocabId);
    setSelectedWord(
      vocabularies?.filter((item) => item._id === selectedVocabId)[0]
    );
  };

  return (
    <div className="pt-32 pb-12 flex flex-col items-center w-full">
      <div className="w-5/6 my-10 text-center">
        <h1 className="text-4xl font-bold">Dictionaries</h1>
        <p>
          Choose any English or translation dictionary to search in that
          dictionary.
        </p>
      </div>
      <div className="bg-sky-50 p-4 rounded-xl w-1/2 flex">
        <Select
          showSearch
          size="large"
          placeholder="input a word"
          className="w-full"
          value={selectedVocabId}
          options={(vocabularies || []).map((vocab: Vocabulary) => ({
            value: vocab._id,
            label: vocab.word,
          }))}
          filterOption={false}
          notFoundContent={null}
          onSearch={handleSearch}
          onChange={handleChange}
        />
      </div>
      {selectedWord && (
        <div className="mt-10 w-5/6 flex justify-center">
          <div className="w-4/5 space-y-2">
            <p className="font-bold text-xl">{selectedWord?.word}</p>
            <div className="flex items-center">
              <Button
                onClick={() => handleFetchAudio(selectedWord?.audioUrl ?? "")}
              >
                <HiOutlineSpeakerWave />
              </Button>
              <p className="ml-2">/{selectedWord?.pronunciation}/</p>
            </div>
            <div>
              <p className="font-semibold">{selectedWord?.meaning}</p>
            </div>
            {selectedWord?.example && (
              <div>
                <p className="font-bold">Ví dụ</p>
                <p className="font-semibold">
                  <p>{selectedWord?.example}</p>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="w-5/6 mt-10">
        <h1 className="text-xl font-bold mb-4 text-center rounded-xl flex">
          Từ vựng gia đình
        </h1>
        <div className="mt-5 flex flex-wrap">
          {wordFamily?.map((item) => (
            <div
              key={item._id}
              className="w-1/5 border border-sky-200 p-2 rounded-xl m-2"
            >
              <div className="flex items-center cursor-pointer">
                <Button type="link" className="pl-0">
                  <p className="font-semibold">{item.word}</p>
                  <p>/{item.pronunciation}/</p>
                </Button>
              </div>
              <p>{item.meaning}</p>
              <div className="bg-sky-50 p-1 text-sm font-semibold rounded-3xl w-fit m-1">
                Contractor
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-5/6 mt-10">
        <h1 className="text-xl font-bold mb-4 text-center rounded-xl flex">
          Từ đồng nghĩa
        </h1>
      </div>
      <div className="w-5/6 mt-10">
        <h1 className="text-xl font-bold mb-4 text-center rounded-xl flex">
          Từ cùng chủ đề
        </h1>
      </div>
    </div>
  );
};

export default Vocab;
