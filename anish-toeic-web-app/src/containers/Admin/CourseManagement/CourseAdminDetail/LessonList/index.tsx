import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineRight } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import {
  createLesson,
  CreateLessonPayload,
  getLessonsByCourseId,
  Lesson,
} from "../../../../../query";
import { routePaths } from "../../../../../routes/helpers";
import CreateLessonForm from "../../../LessonManagement/LessonTable/CreateLessonForm";
import { schema } from "../../../LessonManagement/LessonTable/CreateLessonForm/helpers";

const LessonList: React.FC = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateLessonPayload>({
    defaultValues: {
      courseId: id,
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCreateLesson: SubmitHandler<CreateLessonPayload> = (data) => {
    createLesson(data).then((res) => {
      if (res.data) {
        notification.info({
          message: "Success",
        });
        setIsModalOpen(false);

        if (id) {
          getLessonsByCourseId(id).then((response) => {
            setLessons(response.data);
          });
        }
      }
    });
  };

  useEffect(() => {
    if (id)
      getLessonsByCourseId(id).then((response) => {
        setLessons(response.data);
      });
  }, []);

  const onEditLesson = (id: string) => {
    navigate(
      routePaths.adminDetail.replace(":tab", "lesson").replace(":id", id)
    );
  };

  return (
    <div className="border border-dashed p-4 rounded-xl w-1/2">
      <Modal
        title="Thêm khóa học"
        open={isModalOpen}
        onOk={handleSubmit(handleCreateLesson)}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={isSubmitting}
      >
        <CreateLessonForm control={control} />
      </Modal>
      <div className="flex items-center justify-between">
        <p>Danh sách bài học</p>
        <Button type="primary" onClick={showModal}>
          Thêm bài học
        </Button>
      </div>
      <div className="max-h-48 overflow-auto">
        {lessons.map((lesson) => (
          <div
            key={lesson._id}
            className="bg-sky-50 p-2 rounded-xl mt-2 flex justify-between"
          >
            <div>{lesson.title}</div>
            <Button type="dashed" onClick={() => onEditLesson(lesson._id)}>
              <AiOutlineRight />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonList;
