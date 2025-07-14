import { Button, Input, Modal, notification, Table } from "antd";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  createUser,
  CreateUserPayload,
  getUsers,
  User,
} from "../../../../query";
import { routePaths } from "../../../../routes/helpers";
import columns from "./columns";
import CreateUserForm from "./CreateUserForm";

const UserTable = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    getUsers({ search }).then((res) => {
      setUsers(res.data);
    });
  }, [search]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleDeleteUser = (id: string) => {
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
        handleDeleteUser(id);
      },
    });
  };

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateUserPayload>({
    defaultValues: {},
    mode: "onBlur",
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleInitExam: SubmitHandler<CreateUserPayload> = (data) => {
    createUser(data).then((res) => {
      if (res.data)
        notification.info({
          message: "Create successfully",
        });
      setIsModalOpen(false);
      navigate(routePaths.admin.replace(":tab", "user"));
    });
  };

  return (
    <div className="flex flex-col w-full p-5 space-y-3">
      <Modal
        title="Thêm học sinh"
        open={isModalOpen}
        onOk={handleSubmit(handleInitExam)}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={isSubmitting}
      >
        <CreateUserForm control={control} />
      </Modal>
      <div className="flex justify-between">
        <div>
          <Input placeholder="tìm kiếm" onChange={onSearch} />
        </div>
        <Button className="w-fit ml-5" onClick={showModal}>
          Thêm tài khoản
        </Button>
      </div>

      <Table columns={columns(showDeleteConfirm)} dataSource={users}></Table>
    </div>
  );
};

export default UserTable;
