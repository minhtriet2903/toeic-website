import { Button, TableColumnsType } from "antd";
import { Exam } from "../../../../query";

const columns = (
  showDeleteConfirm: (id: string) => void,
  editExam: (id: string) => void
): TableColumnsType<Exam> => [
  {
    title: "Tên bài kiểm tra",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Tên bài học",
    dataIndex: "lessonId",
    key: "lessonId",
    render(lesson) {
      return <div>{lesson.title}</div>;
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
          <Button onClick={() => editExam(record._id)}>Sửa</Button>
          <Button onClick={() => showDeleteConfirm(record._id)} danger>
            Xóa
          </Button>
        </div>
      );
    },
  },
];

export default columns;
