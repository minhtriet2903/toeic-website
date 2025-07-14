import { Button, Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  createExam,
  CreateExamPayload,
  Exam,
  getExamsByLessonId,
} from "../../../../../query";
import { routePaths } from "../../../../../routes/helpers";
import CreateExamForm from "../../../ExamManagement/ExamTable/CreateExamForm";

const ExamListView: React.FC = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [associatedExams, setAssociatedExams] = useState<Exam[]>([]);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CreateExamPayload>({
    defaultValues: {
      lessonId: id,
      duration: 45,
    },
    mode: "onBlur",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCreateLesson: SubmitHandler<CreateExamPayload> = (data) => {
    createExam(data).then((res) => {
      if (res.data) {
        notification.info({
          message: "Success",
        });
        setIsModalOpen(false);

        if (id) {
          getExamsByLessonId(id).then((res) => {
            setAssociatedExams(res.data);
          });
        }
      }
    });
  };

  useEffect(() => {
    if (id)
      getExamsByLessonId(id).then((res) => {
        setAssociatedExams(res.data);
      });
  }, []);

  const onEditExam = (id: string) => {
    navigate(routePaths.adminDetail.replace(":tab", "exam").replace(":id", id));
  };

  return (
    <div>
      <Modal
        title="Thêm bài kiểm tra"
        open={isModalOpen}
        onOk={handleSubmit(handleCreateLesson)}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={isSubmitting}
      >
        <CreateExamForm control={control} errors={errors} />
      </Modal>
      <div className="flex items-center justify-between mb-4">
        <p className="font-bold">Danh sách bài kiểm tra</p>
        <Button type="primary" onClick={showModal}>
          Thêm bài kiểm tra
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {associatedExams.map((exam) => (
          <div
            key={exam._id}
            className="border border-gray-300 p-4 rounded shadow"
          >
            <Button
              type="link"
              className="p-0"
              onClick={() => onEditExam(exam._id)}
            >
              {exam.title}
            </Button>
            <p>Description: {exam.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamListView;
