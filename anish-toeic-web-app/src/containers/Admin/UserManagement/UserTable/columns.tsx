import { Button, TableColumnsType, Tag } from "antd";
import { User } from "../../../../query";

const columns = (
  showDeleteConfirm: (id: string) => void
): TableColumnsType<User> => [
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render(status) {
      return <Tag color="green">{status}</Tag>;
    },
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    render(createdAt) {
      return <div>{new Date(createdAt).toLocaleDateString("vi-VN")}</div>;
    },
  },
  {
    title: "",
    key: "action",
    align: "center",
    render(_, record) {
      return (
        <div className="flex flex-row justify-center space-x-3">
          <Button onClick={() => showDeleteConfirm(record._id)} danger>
            Xóa
          </Button>
        </div>
      );
    },
  },
];

export default columns;
