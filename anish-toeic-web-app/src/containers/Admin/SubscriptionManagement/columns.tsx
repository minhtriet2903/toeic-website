import { Button, TableColumnsType } from "antd";
import { Subscription } from "../../../query";

const columns = (
  showDeleteConfirm: (id: string) => void
): TableColumnsType<Subscription> => [
  {
    title: <div className="text-center">Tên</div>,
    dataIndex: "name",
    key: "name",
  },
  {
    title: <div className="text-center">Số điện thoại</div>,
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: <div className="text-center">Email</div>,
    dataIndex: "email",
    key: "email",
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
