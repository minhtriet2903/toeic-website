import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { UseFormWatch } from "react-hook-form";
import { Exam, Question, SubmitExamPayload } from "../../../query";

interface QuestionListProps {
  exam: Exam;
  watch: UseFormWatch<SubmitExamPayload>;
  setSelectedQuestions: (questions: Question[]) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
  exam,
  watch,
  setSelectedQuestions,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  const groupedQuestionsBySection = React.useMemo(() => {
    return exam?.questions.reduce<{ [key: number]: Question[] }>(
      (acc, question) => {
        const section = question.section;
        if (!acc[section]) {
          acc[section] = [];
        }
        acc[section].push(question);
        return acc;
      },
      {}
    );
  }, [exam?.questions]);

  const onSelectQuestion = (question: Question) => {
    setCurrentQuestionIndex(question.index);

    if (question.parentId !== -1) {
      const parentQuestion = exam?.questions?.filter(
        (item) => item.index === question.parentId
      );
      const subQuestions = exam?.questions?.filter(
        (item) => item.parentId === question.parentId
      );
      setSelectedQuestions([...parentQuestion, ...subQuestions]);
    } else {
      const groupQuestions = exam?.questions?.filter(
        (item) => item.parentId === question.index
      );

      setSelectedQuestions([question, ...groupQuestions]);
    }
  };

  useEffect(() => {
    if (exam) {
      onSelectQuestion(exam.questions[0]);
    }
  }, [exam]);

  return (
    <div>
      <p>Câu hỏi</p>
      <div className="mt-2">
        {Object.entries(groupedQuestionsBySection).map(
          ([section, questions]) => (
            <div key={section}>
              <p>Section {section}</p>
              <div className="flex flex-wrap">
                {questions.map((question) => {
                  const isAnswered = watch?.(
                    `answers.${question.index}.answer`
                  );

                  return (
                    <Button
                      key={`question-${question._id}-${question.index}`}
                      className={`w-fit m-1 ${
                        currentQuestionIndex === question.index
                          ? "border-orange-600 border-2"
                          : ""
                      }  ${isAnswered ? "bg-blue-500" : ""}`}
                      onClick={() => onSelectQuestion(question)}
                    >
                      {question.index + 1}
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
