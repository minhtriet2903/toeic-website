import { Button, notification } from "antd";
import React from "react";
import { BsArrowsMove } from "react-icons/bs";
import { CiCircleCheck } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { addQuestion, deleteQuestion, Question } from "../../../../../query";
import { initQuestion, questionTypeOptions } from "../helpers";

interface QuestionListProps {
  questions: Question[];
  handleSelectQuestion: (question: Question) => void;
  selectedQuestion?: Question;
  setIsRefetchExamData: (value: boolean) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  handleSelectQuestion,
  selectedQuestion,
  setIsRefetchExamData,
}) => {
  let { id } = useParams();

  const handleAddQuestion = () => {
    if (id)
      addQuestion(initQuestion(id, questions.length)).then((res) => {
        if (res.data) {
          handleSelectQuestion(res.data);
          setIsRefetchExamData(true);
        }
      });
  };

  const handleDeleteQuestion = (id: string) => {
    if (id)
      deleteQuestion(id).then((res) => {
        if (res.data) {
          notification.success({
            message: "Delete Success",
          });
          setIsRefetchExamData(true);
        }
      });
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-4">Questions List</h3>
      <div className="max-h-screen overflow-y-scroll">
        {questions.map((question, index) => (
          <div
            key={question._id}
            className={`bg-sky-50 rounded-xl flex justify-between items-center mb-4 ${
              selectedQuestion &&
              question._id === selectedQuestion._id &&
              "border-sky-500 border"
            } ${
              question.parentId && question.parentId > 0 && "ml-4 !bg-gray-100"
            }`}
          >
            <div className="w-1/12 flex justify-center m-2">
              <BsArrowsMove />
            </div>
            <div className="w-10/12 px-4 border-x-2 p-2">
              <Button
                type="text"
                className="font-bold h-full mb-1 px-0 text-wrap text-left"
                onClick={() => handleSelectQuestion(question)}
              >
                Câu {index + 1}: {question.title}
              </Button>
              <div className="flex items-center">
                <CiCircleCheck className="mr-2" />
                <p>
                  {
                    questionTypeOptions.find(
                      (item) => item.value === question.type
                    )?.label
                  }
                </p>
              </div>
            </div>
            <div className="w-1/12 flex justify-center m-2">
              <Button
                type="text"
                danger
                onClick={() => handleDeleteQuestion(question._id)}
              >
                <FaRegTrashCan />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Button type="dashed" className="my-4 w-full" onClick={handleAddQuestion}>
        Thêm câu hỏi
      </Button>
    </div>
  );
};

export default QuestionList;
