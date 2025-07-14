import { Button, TableColumnsType } from "antd";
import { File } from "../../../../query";

const columns = (): TableColumnsType<File> => [
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "",
    key: "action",
    render(_) {
      return (
        <div className="flex flex-row justify-center space-x-3">
          <Button download>Tải</Button>
          <Button danger>Xóa</Button>
        </div>
      );
    },
  },
];

export default columns;
