import { Button, TableColumnsType } from "antd";
import { ExamResult } from "../../../query";

const columns = (
  viewResultDetail: (id: string) => void
): TableColumnsType<ExamResult> => [
  {
    title: "Exam",
    dataIndex: "examId",
    key: "examId",
    render(exam) {
      return exam ? <div>{exam.title}</div> : <p>No data</p>;
    },
  },
  {
    title: "User taken",
    dataIndex: "userId",
    key: "userId",
    render(user) {
      return <div>{user.name}</div>;
    },
  },
  {
    title: "score",
    dataIndex: "score",
    key: "score",
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
      if (record.examId)
        return (
          <div className="flex flex-row justify-center space-x-3">
            <Button onClick={() => viewResultDetail(record._id)} danger>
              Xem
            </Button>
          </div>
        );
    },
  },
];

export default columns;
