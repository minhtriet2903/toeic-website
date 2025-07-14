import { Breadcrumb, Button, Input, notification } from "antd";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import {
  getLesson,
  Lesson,
  updateLesson,
  UpdateLessonPayload,
} from "../../../../query";
import ExamListView from "./ExamListView";
import { breadcrumbItems } from "./helpers";

const LessonAdminDetail = () => {
  let { id } = useParams();
  const [lesson, setLesson] = useState<Lesson>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateLessonPayload>({
    defaultValues: {
      _id: id,
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (id) {
      getLesson(id).then((res) => {
        setLesson(res.data);
        reset(res.data);
      });
    }
  }, [id]);

  const handleUpdateLesson: SubmitHandler<UpdateLessonPayload> = (data) => {
    updateLesson(data).then((res) => {
      if (res.data)
        notification.info({
          message: "Success",
        });
    });
  };

  return (
    lesson && (
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Breadcrumb items={breadcrumbItems(lesson)} />
          <Button type="primary" onClick={handleSubmit(handleUpdateLesson)}>
            Lưu
          </Button>
        </div>
        <div className="border border-dashed p-4 rounded-xl w-2/3">
          <div>
            <p>Tên bài học</p>
            <Controller
              name={`title`}
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    placeholder="Enter lesson title"
                    status={errors?.title && "error"}
                  />
                  <p className="text-red-600">{errors?.title?.message}</p>
                </div>
              )}
            />
          </div>
          <div className=" mt-2">
            <p>Mô tả bài học</p>
            <Controller
              name={`description`}
              control={control}
              render={({ field }) => (
                <div className="h-32">
                  <ReactQuill {...field} theme="snow" className="h-2/3" />
                  <p className="text-red-600">{errors?.description?.message}</p>
                </div>
              )}
            />
          </div>
        </div>
        <ExamListView />
      </div>
    )
  );
};

export default LessonAdminDetail;
