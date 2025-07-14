import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Modal, notification, Table } from "antd";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import {
  Course,
  createCourse,
  CreateCoursePayload,
  deleteCourse,
  getCourses,
} from "../../../../query";
import { routePaths } from "../../../../routes/helpers";
import columns from "./columns";
import CreateCourseForm from "./CreateCourseForm";
import { schema } from "./CreateCourseForm/helpers";

const CourseTable = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState<string>("");

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm<CreateCoursePayload>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    getCourses({ search }).then((res) => {
      setCourses(res.data);
    });
  }, [search]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCreateCourse: SubmitHandler<CreateCoursePayload> = (data) => {
    if (!user) {
      notification.warning({
        message: `Need to login to do this action`,
      });
      return;
    }
    createCourse({ ...data, createdUser: user._id }).then((res) => {
      if (res.data) {
        notification.info({
          message: "Success",
        });
        setIsModalOpen(false);
        onEditCourse(res.data._id);
      }
    });
  };

  const handleDeleteCourse = (id: string) => {
    deleteCourse(id).then((res) => {
      if (res) {
        notification.success({
          message: `Delete Successfully`,
        });
        getCourses({ search }).then((res) => {
          setCourses(res.data);
        });
      }
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

  const onEditCourse = (id: string) => {
    navigate(
      routePaths.adminDetail.replace(":tab", "course").replace(":id", id)
    );
  };

  return (
    <div className="flex flex-col w-full p-5 space-y-3">
      <Modal
        title="Thêm khóa học"
        open={isModalOpen}
        onOk={handleSubmit(handleCreateCourse)}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={isSubmitting}
      >
        <CreateCourseForm control={control} watch={watch} setValue={setValue} />
      </Modal>
      <div className="flex justify-between">
        <div>
          <Input placeholder="tìm kiếm" onChange={onSearch} />
        </div>
        <Button className="w-fit ml-5" onClick={showModal}>
          Thêm khóa học
        </Button>
      </div>
      <div>
        <Table
          columns={columns(showDeleteConfirm, onEditCourse)}
          dataSource={courses}
        ></Table>
      </div>
    </div>
  );
};

export default CourseTable;
