import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Modal, notification, Table } from "antd";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  createLesson,
  CreateLessonPayload,
  getLessons,
  Lesson,
} from "../../../../query";
import { routePaths } from "../../../../routes/helpers";
import columns from "./columns";
import CreateLessonForm from "./CreateLessonForm";
import { schema } from "./CreateLessonForm/helpers";

const LessonTable = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateLessonPayload>({
    defaultValues: {},
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    getLessons({ search }).then((res) => {
      setLessons(res.data);
    });
  }, [search]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCreateLesson: SubmitHandler<CreateLessonPayload> = (data) => {
    createLesson(data).then((res) => {
      if (res.data)
        notification.info({
          message: "Success",
        });
      setIsModalOpen(false);
      onEditLesson(res.data._id);
    });
  };

  const handleDeleteCourse = (id: string) => {
    notification.success({
      message: `Delete ${id} Successfully`,
    });
  };

  const showDeleteConfirm = (id: string) => {
    Modal.confirm({
      title: "Delete Item",
      content: `Are you sure you want to delete this item?`,
      okText: "Delete",
      okType: "danger",
      onOk: () => {
        handleDeleteCourse(id);
      },
    });
  };

  const onEditLesson = (id: string) => {
    navigate(
      routePaths.adminDetail.replace(":tab", "lesson").replace(":id", id)
    );
  };

  return (
    <div className="flex flex-col w-full p-5 space-y-3">
      <Modal
        title="Thêm khóa học"
        open={isModalOpen}
        onOk={handleSubmit(handleCreateLesson)}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={isSubmitting}
      >
        <CreateLessonForm control={control} />
      </Modal>
      <div className="flex justify-between">
        <div>
          <Input placeholder="tìm kiếm" onChange={onSearch} />
        </div>
        <Button className="w-fit ml-5" onClick={showModal}>
          Thêm khóa học
        </Button>
      </div>
      <Table
        columns={columns(showDeleteConfirm, onEditLesson)}
        dataSource={lessons}
      ></Table>
    </div>
  );
};

export default LessonTable;
