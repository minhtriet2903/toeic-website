import { Button, TableColumnsType } from "antd";
import { File } from "../../../query";

const columns = (): TableColumnsType<File> => [
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Loại tài liệu",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Ngày tải lên",
    dataIndex: "createdDate",
    key: "createdDate",
  },
  {
    title: "Người tải lên",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "",
    key: "action",
    render(_) {
      return (
        <div className="flex flex-row justify-center space-x-3">
          <Button download>Tải</Button>
        </div>
      );
    },
  },
];

export default columns;
