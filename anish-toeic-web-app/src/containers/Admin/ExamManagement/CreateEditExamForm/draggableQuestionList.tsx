import { Button } from "antd";
import React, { useState } from "react";
import { FieldArrayWithId } from "react-hook-form";
import { BsArrowsMove } from "react-icons/bs";
import { CiCircleCheck } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import { Exam } from "../../../../query";
import { questionTypeOptions } from "./helpers";

interface QuestionListProps {
  questions: FieldArrayWithId<Exam, "questions", "id">[];
  onSelectQuestion: (index: number) => void;
  selectedQuestionIndex: number | null;
  removeQuestion: (index: number) => void;
  moveQuestion: (fromIndex: number, toIndex: number) => void;
  handleAddQuestion: () => void;
}

const DraggableQuestionList: React.FC<QuestionListProps> = ({
  questions,
  onSelectQuestion,
  selectedQuestionIndex,
  removeQuestion,
  moveQuestion,
  handleAddQuestion,
}) => {
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedItemIndex(index);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Required to allow a drop
  };

  const handleDrop = (index: number) => {
    if (draggedItemIndex === null) return;

    moveQuestion(draggedItemIndex, index); // Update the questions order
    setDraggedItemIndex(null); // Reset dragged index
  };

  const handleRemoveQuestion = (index: number) => {
    removeQuestion(index);

    if (questions.length > 1) {
      onSelectQuestion(questions.length - 2);
    } else {
      onSelectQuestion(0);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-4">Questions List</h3>
      {questions.map((question, index) => (
        <div
          key={`${question.title}-${index}`}
          role="button"
          tabIndex={0}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(index)}
          className={`bg-sky-50 rounded-xl flex justify-between items-center ${
            index === selectedQuestionIndex && "border-sky-500 border"
          } mb-4`}
        >
          <div className="w-1/12 flex justify-center m-3">
            <BsArrowsMove />
          </div>
          <div className="w-10/12 px-4 border-x-2 p-3">
            <Button
              type="text"
              className="font-bold h-full mb-1 px-0 text-wrap text-left"
              onClick={() => onSelectQuestion(index)}
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
          <div className="w-1/12 flex justify-center m-3">
            <Button
              type="text"
              onClick={() => handleRemoveQuestion(index)}
              danger
            >
              <FaRegTrashCan />
            </Button>
          </div>
        </div>
      ))}
      <Button type="dashed" className="my-4 w-full" onClick={handleAddQuestion}>
        Thêm câu hỏi
      </Button>
    </div>
  );
};

export default DraggableQuestionList;
