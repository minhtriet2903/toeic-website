import { Button, Modal, notification, Table } from "antd";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  createExam,
  CreateExamPayload,
  deleteExam,
  Exam,
  getExams,
} from "../../../../query";
import { routePaths } from "../../../../routes/helpers";
import columns from "./columns";
import CreateExamForm from "./CreateExamForm";

const ExamTable = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState<Exam[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CreateExamPayload>({
    defaultValues: {},
    mode: "onBlur",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleInitExam: SubmitHandler<CreateExamPayload> = (data) => {
    createExam(data).then((res) => {
      if (res.data)
        notification.info({
          message: "Done",
        });
      setIsModalOpen(false);
      navigate(
        routePaths.adminDetail
          .replace(":tab", "exam")
          .replace(":id", res.data._id)
      );
    });
  };

  useEffect(() => {
    getExams().then((res) => {
      setExams(res.data);
    });
  }, []);

  const handleDeleteContest = (id: string) => {
    deleteExam(id).then((res) => {
      if (res) {
        notification.success({
          message: "Delete Success",
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
        handleDeleteContest(id);
      },
    });
  };

  const editExam = (id: string) => {
    navigate(routePaths.adminDetail.replace(":tab", "exam").replace(":id", id));
  };

  return (
    <div className="flex flex-col w-full mt-4">
      <Modal
        title="Tiêu đề bài kiểm tra"
        open={isModalOpen}
        onOk={handleSubmit(handleInitExam)}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={isSubmitting}
      >
        <CreateExamForm control={control} errors={errors} />
      </Modal>
      <div className="space-x-3">
        <Button className="w-fit ml-5" onClick={showModal}>
          Thêm bài kiểm tra
        </Button>
      </div>
      <div className="w-full p-5">
        <Table
          columns={columns(showDeleteConfirm, editExam)}
          dataSource={exams}
        ></Table>
      </div>
    </div>
  );
};

export default ExamTable;
