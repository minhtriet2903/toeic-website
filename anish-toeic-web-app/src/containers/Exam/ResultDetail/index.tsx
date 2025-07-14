import { Alert, Radio, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../../../components";
import { ExamResult, getResult, QuestionResult } from "../../../query";
import QuestionList from "./QuestionList";

interface ResultDetailProps {}

const ResultDetail: React.FC<ResultDetailProps> = () => {
  let { id } = useParams();
  const [result, setResult] = useState<ExamResult>();
  const [selectedQuestionFeedback, setSelectedQuestionFeedback] = useState<
    QuestionResult[]
  >([]);

  useEffect(() => {
    if (id) getResult(id).then((res) => setResult(res));
  }, [id]);

  return result ? (
    <div className="mt-40 flex justify-around mb-10">
      <div className="w-1/4 p-2 border rounded-xl h-fit">
        <QuestionList
          result={result}
          setSelectedQuestionFeedback={setSelectedQuestionFeedback}
        />
      </div>
      <div className="w-2/3">
        {selectedQuestionFeedback.map((feedback, index) => (
          <div
            key={`feedback-${feedback.questionId._id}`}
            className="space-y-2 mb-4"
          >
            {feedback.questionId.parentId === -1 && (
              <div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: feedback.questionId.content ?? "",
                  }}
                />
                {feedback.questionId.imageUrl && (
                  <div className="flex justify-center mb-4">
                    <img
                      src={`${import.meta.env.ANISH_SERVICE_DOMAIN}:${
                        import.meta.env.ANISH_SERVICE_PORT
                      }/uploads/${feedback.questionId.imageUrl}`}
                      alt=""
                    />
                  </div>
                )}
              </div>
            )}
            <p className="font-semibold mb-2">{`Câu ${
              feedback.questionId.index + 1
            }: ${feedback.questionId.title}`}</p>
            <Radio.Group value={feedback.selectedAnswer}>
              <Space direction="vertical">
                {feedback?.questionId?.answers?.map((answer, answerIndex) => (
                  <Radio
                    key={`answer-${index}-${answerIndex}`}
                    value={answer.text}
                  >
                    {answer.text}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
            {feedback?.isCorrect ? (
              <Alert
                message={feedback.selectedAnswer}
                type="success"
                showIcon
              />
            ) : (
              <div className="space-y-2">
                <Alert
                  message={feedback.selectedAnswer}
                  type="error"
                  showIcon
                />
                <Alert
                  message={
                    feedback.questionId.answers.filter(
                      (item) => item.isCorrect
                    )[0].text
                  }
                  type="success"
                  showIcon
                />
              </div>
            )}
            <div
              className="font-semibold"
              dangerouslySetInnerHTML={{
                __html: feedback.questionId.explanation ?? "",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ResultDetail;
