import {
  Button,
  Input,
  Modal,
  notification,
  Table,
  Upload,
  UploadProps,
} from "antd";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiUpload } from "react-icons/bi";
import {
  createVocabulary,
  CreateVocabularyPayload,
  deleteVocabulary,
  editVocabulary,
  getVocabularies,
  importVocabulariesUrl,
  Vocabulary,
} from "../../../query";
import columns from "./columns";
import CreateEditVocabularyForm from "./CreateEditVocabularyForm";

const UserManagement = () => {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>();
  const [reload, setReload] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState<string>("");

  const props: UploadProps = {
    name: "file",
    action: importVocabulariesUrl,

    onChange(info) {
      if (info.file.status === "done")
        getVocabularies().then((res) => {
          setVocabularies(res.data);
        });
    },
  };

  const {
    control,
    getValues,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm<Vocabulary>();

  useEffect(() => {
    getVocabularies({ search }).then((res) => {
      setVocabularies(res.data);
    });
  }, [reload, isSubmitted, search]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onCloseCreateVocabularyModal = () => {
    setIsModalOpen(false);
  };

  const onGetFileName = (fileName: string) => {
    setValue("audioUrl", fileName);
  };

  const handleAddVocabulary: SubmitHandler<CreateVocabularyPayload> = (
    data
  ) => {
    createVocabulary(data).then((res) => {
      if (res.data)
        notification.info({
          message: "Create successfully",
        });
      onCloseCreateVocabularyModal();
    });
  };

  const handleEditVocabulary: SubmitHandler<Vocabulary> = (data) => {
    editVocabulary(data).then((res) => {
      if (res.data)
        notification.info({
          message: "Edit successfully",
        });
      onCloseCreateVocabularyModal();
    });
  };

  const handleDeleteUser = (id: string) => {
    deleteVocabulary(id).then((res) => {
      if (res)
        notification.success({
          message: "Delete Successfully",
        });
      setReload(!reload);
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

  const onEditVocabulary = (vocab?: Vocabulary) => {
    reset(vocab);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full p-5 space-y-3">
      <div className="flex justify-between">
        <div>
          <Input placeholder="tìm kiếm" onChange={onSearch} />
        </div>
        <div className="space-x-3 flex">
          <Upload {...props}>
            <Button icon={<BiUpload />}>Click to Import vocabularies</Button>
          </Upload>
          <Button className="w-fit ml-5" onClick={() => onEditVocabulary()}>
            Thêm từ vựng
          </Button>
        </div>
      </div>

      <Table
        columns={columns(showDeleteConfirm, onEditVocabulary)}
        dataSource={vocabularies}
      ></Table>
      <Modal
        title="Thêm từ vựng"
        open={isModalOpen}
        onOk={handleSubmit(
          getValues("_id") ? handleEditVocabulary : handleAddVocabulary
        )}
        onCancel={onCloseCreateVocabularyModal}
        confirmLoading={isSubmitting}
      >
        <CreateEditVocabularyForm
          control={control}
          errors={errors}
          onGetFileName={onGetFileName}
        />
      </Modal>
    </div>
  );
};

export default UserManagement;
