import { Button, TableColumnsType } from "antd";
import { Course } from "../../../../query";

const columns = (
  showDeleteConfirm: (id: string) => void,
  editCourse: (id: string) => void
): TableColumnsType<Course> => [
  {
    title: <div>Tên khóa học</div>,
    dataIndex: "title",
    key: "title",
  },
  {
    title: <div>Giá</div>,
    dataIndex: "price",
    key: "price",
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
    title: "Người tạo",
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
          <Button onClick={() => editCourse(record._id)}>Sửa</Button>
          <Button onClick={() => showDeleteConfirm(record._id)} danger>
            Xóa
          </Button>
        </div>
      );
    },
  },
];

export default columns;
