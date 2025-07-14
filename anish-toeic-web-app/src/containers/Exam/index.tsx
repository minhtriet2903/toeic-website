import {
  Button,
  Modal,
  notification,
  Radio,
  RadioChangeEvent,
  Space,
} from "antd";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CiTimer } from "react-icons/ci";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../components";
import CountdownBar from "../../components/CountdownBar";
import Timer from "../../components/Timer";
import { useAuth } from "../../context/AuthContext";
import {
  Exam,
  ExamResult,
  getExam,
  getQuestionsForTest,
  Question,
  submitExam,
  SubmitExamPayload,
} from "../../query";
import { routePaths } from "../../routes/helpers";
import { handleFetchAudio } from "../../utils";
import QuestionList from "./QuestionList";
import TestResultModal from "./ResultModal";

const ExamPage = () => {
  let { id } = useParams();
  let { user } = useAuth();
  const navigate = useNavigate();
  const [exam, setExam] = useState<Exam>();
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [result, setResult] = useState<ExamResult>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<SubmitExamPayload>({
    values: {
      examId: id ?? "",
      userId: user?._id ?? "",
      answers:
        exam?.questions?.map((item) => ({
          questionId: item._id ?? "",
          answer: "",
        })) || [],
    },
  });

  useEffect(() => {
    if (id) {
      getExam(id).then((exam) => {
        getQuestionsForTest(id).then((questions) => {
          setExam({ ...exam, questions: questions });
        });
      });
    }
  }, []);

  const onChangeAnswer = (e: RadioChangeEvent, questionId: string) => {
    const answerIndex = exam?.questions?.findIndex(
      (item) => item._id === questionId
    );
    if (answerIndex !== undefined) {
      setValue(`answers.${answerIndex}.answer`, e.target.value);
    }
  };

  const onSubmitExam = (data: SubmitExamPayload) => {
    submitExam(data).then((res) => {
      if (res.data)
        notification.info({
          message: "Submit successfully",
        });
      setResult(res.data);
      showModal();
    });
    showModal();
  };

  const handleTimerFinish = () => {
    notification.info({ message: "Timer finished!" });
    handleSubmit(onSubmitExam);
  };

  const handleCloseResultModal = () => {
    setIsModalOpen(false);
    navigate(routePaths.profile);
  };

  return exam ? (
    <div>
      <Modal
        title="Kết quả"
        open={isModalOpen}
        onCancel={handleCloseResultModal}
        confirmLoading={isSubmitting}
        footer={null}
      >
        {result ? <TestResultModal result={result} /> : <Loading />}
      </Modal>
      <div className="flex justify-around items-center p-4 border-b border-gray-100 fixed top-0 left-0 right-0 bg-white z-50">
        <div className="font-bold">Anish Toeic</div>
        <div className="flex flex-row space-x-10 font-bold text-grey mr-10">
          Test
        </div>
        {exam?.duration !== -1 && (
          <div>
            <div className="flex items-center space-x-2">
              <CiTimer /> <p>{exam?.duration}</p>
            </div>
            <Timer duration={45 * 60} onFinish={handleTimerFinish} />
          </div>
        )}
      </div>
      <div className="mt-24">
        <CountdownBar duration={4 * 60} className="my-4" />
        <div className="flex justify-around mb-10">
          <div className="w-1/4 p-2 border rounded-xl h-fit">
            <QuestionList
              exam={exam}
              watch={watch}
              setSelectedQuestions={setSelectedQuestions}
            />
            <div className="flex justify-end mt-2">
              <Button type="primary" onClick={handleSubmit(onSubmitExam)}>
                Nộp bài
              </Button>
            </div>
          </div>
          <div className="w-2/3">
            <div>
              <div className="flex justify-between items-center mb-4">
                <Button
                  icon={<FiChevronLeft />}
                  // onClick={() => navigateToQuestion(-1)}
                >
                  Prev
                </Button>
                <Button
                  icon={<FiChevronRight />}
                  // onClick={() => navigateToQuestion(1)}
                >
                  Next
                </Button>
              </div>
            </div>
            {selectedQuestions.map((question, index) => (
              <div key={`question-${question._id}`} className="space-y-2 mb-4">
                {question.parentId === -1 && (
                  <div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: question.content ?? "",
                      }}
                    />
                    {question.imageUrl && (
                      <div className="flex justify-center mb-4">
                        <img
                          src={`${import.meta.env.ANISH_SERVICE_DOMAIN}:${
                            import.meta.env.ANISH_SERVICE_PORT
                          }/uploads/${question.imageUrl}`}
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                )}
                <div>
                  <p className="font-semibold mb-2">{`Câu ${
                    question.index + 1
                  }: ${question.title}`}</p>
                  {question.audioUrl && (
                    <Button
                      onClick={() => handleFetchAudio(question?.audioUrl ?? "")}
                    >
                      <HiOutlineSpeakerWave />
                    </Button>
                  )}
                </div>
                <Radio.Group
                  onChange={(e) => onChangeAnswer(e, question._id ?? "")}
                  value={watch(`answers.${question.index}.answer`)}
                >
                  <Space direction="vertical">
                    {question.answers.map((answer, answerIndex) => (
                      <Radio
                        key={`answer-${index}-${answerIndex}`}
                        value={answer.text}
                      >
                        {answer.text}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default ExamPage;
