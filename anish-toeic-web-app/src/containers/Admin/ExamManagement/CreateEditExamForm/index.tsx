import { Button, Input, notification, Select, Upload, UploadProps } from "antd";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { BiUpload } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Loading } from "../../../../components";
import {
  Exam,
  getExam,
  getQuestionsByExamId,
  importListeningQuestionsUrl,
  importQuestionsUrl,
  importReadingQuestionsUrl,
  Question,
  updateExam,
} from "../../../../query";
import { routePaths } from "../../../../routes/helpers";
import { errorMessages } from "../../../../utils";
import EditQuestionDetailForm from "./DetailInformation";
import { examDurationOptions } from "./helpers";
import QuestionList from "./QuestionList";

const EditExamForm = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question>();
  const [isEditingDetail, setIsEditingDetail] = useState<boolean>(false);
  const [isRefetchExamData, setIsRefetchExamData] = useState<boolean>(true);

  const props = (importUrl: string): UploadProps => ({
    name: "file",
    action: importUrl,

    onChange(info) {
      if (info.file.status === "done") setIsRefetchExamData(true);
    },
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Exam>({
    defaultValues: {
      _id: id,
    },
    mode: "onBlur",
  });

  const parentQuestions =
    selectedQuestion &&
    questions.filter(
      (question) =>
        question._id !== selectedQuestion._id && question.parentId === -1
    );

  useEffect(() => {
    if (isRefetchExamData && id) {
      getExam(id).then((exam) => {
        reset(exam);
      });
      getQuestionsByExamId(id).then((questions) => {
        setQuestions(questions);
        setSelectedQuestion(questions[0]);
      });
      setIsRefetchExamData(false);
    }
  }, [id, isRefetchExamData]);

  const handleUpdateExam: SubmitHandler<Exam> = (data) => {
    if (id)
      updateExam(data).then((res) => {
        if (res.data)
          notification.info({
            message: "Save Exam successfully",
          });
      });
  };

  const onPreviewExam = () => {
    if (id) navigate(routePaths.examDetail.replace(":id", id));
  };

  const handleSelectQuestion = (question: Question) => {
    if (isEditingDetail) {
      Swal.fire({
        title: "Are you editing selected question?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, save it!",
      }).then((result) => {
        if (result.isConfirmed) {
          setSelectedQuestion(question);
        }
      });
    } else setSelectedQuestion(question);
  };

  return id ? (
    <div className="px-10 w-full mb-20">
      <div className="flex justify-between items-center">
        <p className="my-4 font-bold text-xl">Thêm mới bài kiểm tra</p>
        <div className="flex space-x-2">
          <Upload {...props(importQuestionsUrl.replace(":examId", id))}>
            <Button icon={<BiUpload />}>Click to Import Questions</Button>
          </Upload>
          <Upload {...props(importReadingQuestionsUrl.replace(":examId", id))}>
            <Button icon={<BiUpload />}>
              Click to Import Reading Questions
            </Button>
          </Upload>
          <Upload
            {...props(importListeningQuestionsUrl.replace(":examId", id))}
          >
            <Button icon={<BiUpload />}>
              Click to Import Listening Questions
            </Button>
          </Upload>
          <Button onClick={onPreviewExam}>Preview</Button>
          <Button type="primary" onClick={handleSubmit(handleUpdateExam)}>
            Lưu bài kiểm tra
          </Button>
        </div>
      </div>
      <div className="flex space-x-6">
        <div className="w-1/2">
          <p>Tên bài kiểm tra</p>
          <Controller
            name={`title`}
            control={control}
            rules={{
              required: errorMessages.requiredField,
            }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nhập tiêu đề"
                status={errors?.title && "error"}
              />
            )}
          />
          <p className="text-red-600">{errors?.title?.message}</p>
        </div>
        <div className="w-1/2">
          <p>Thời gian làm bài</p>
          <Controller
            name={`duration`}
            control={control}
            rules={{
              required: errorMessages.requiredField,
            }}
            render={({ field }) => (
              <Select
                {...field}
                className="w-1/3"
                defaultValue={45}
                options={examDurationOptions}
              />
            )}
          />
        </div>
      </div>
      <div className="flex mr-4">
        <div className="w-3/5">
          <p className="font-bold my-5">Câu hỏi</p>
          {selectedQuestion && (
            <EditQuestionDetailForm
              question={selectedQuestion}
              parentQuestions={parentQuestions}
              setIsEditingDetail={setIsEditingDetail}
              setIsRefetchExamData={setIsRefetchExamData}
            />
          )}
        </div>
        <div className="w-2/5 ml-5 space-y-3">
          <QuestionList
            questions={questions}
            handleSelectQuestion={handleSelectQuestion}
            selectedQuestion={selectedQuestion}
            setIsRefetchExamData={setIsRefetchExamData}
          />
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default EditExamForm;
