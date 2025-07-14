import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { ExamResult, QuestionResult } from "../../../../query";

interface QuestionListProps {
  result: ExamResult;
  setSelectedQuestionFeedback: (questions: QuestionResult[]) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
  result,
  setSelectedQuestionFeedback,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const groupedQuestionsBySection = React.useMemo(() => {
    return result?.answers?.reduce<{ [key: number]: QuestionResult[] }>(
      (acc, question) => {
        const section = question.questionId.section;
        if (!acc[section]) {
          acc[section] = [];
        }
        acc[section].push(question);
        return acc;
      },
      {}
    );
  }, [result?.answers]);

  const onSelectQuestion = (feedback: QuestionResult) => {
    setCurrentQuestionIndex(feedback.questionId.index);

    if (feedback.questionId.parentId !== -1) {
      const parentQuestion = result?.answers?.filter(
        (item) => item.questionId.index === feedback.questionId.parentId
      );
      const subQuestions = result?.answers?.filter(
        (item) => item.questionId.parentId === feedback.questionId.parentId
      );
      setSelectedQuestionFeedback([...parentQuestion, ...subQuestions]);
    } else {
      const groupQuestions = result?.answers?.filter(
        (item) => item.questionId.parentId === feedback.questionId.index
      );

      setSelectedQuestionFeedback([feedback, ...groupQuestions]);
    }
  };

  useEffect(() => {
    if (result) {
      onSelectQuestion(result?.answers[0]);
    }
  }, [result]);

  return (
    <div>
      <p>Câu hỏi</p>
      <div className="mt-2">
        {Object.entries(groupedQuestionsBySection).map(
          ([section, feedbacks]) => (
            <div key={section}>
              <p>Section {section}</p>
              <div className="flex flex-wrap">
                {feedbacks.map((feedback) => {
                  return (
                    <Button
                      key={`feedback-${feedback.questionId._id}`}
                      className={`w-fit m-1 ${
                        currentQuestionIndex === feedback?.questionId?.index
                          ? "border-black border-2"
                          : ""
                      }  ${
                        feedback?.isCorrect ? "bg-green-500" : "bg-red-500"
                      }`}
                      onClick={() => onSelectQuestion(feedback)}
                    >
                      {feedback?.questionId?.index + 1}
                    </Button>
                  );
                })}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default QuestionList;
