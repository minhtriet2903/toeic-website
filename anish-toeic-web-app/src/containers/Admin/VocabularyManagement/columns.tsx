import { Button, TableColumnsType } from "antd";
import { Vocabulary } from "../../../query";

const columns = (
  showDeleteConfirm: (id: string) => void,
  onEditVocabulary: (vocab: Vocabulary) => void
): TableColumnsType<Vocabulary> => [
  {
    title: <div className="text-center">Từ</div>,
    dataIndex: "word",
    key: "word",
  },
  {
    title: <div className="text-center">Giải thích</div>,
    dataIndex: "meaning",
    key: "meaning",
  },
  {
    title: <div className="text-center">Ví dụ</div>,
    dataIndex: "example",
    key: "example",
  },
  {
    title: <div className="text-center">File nghe</div>,
    dataIndex: "audioUrl",
    key: "audioUrl",
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
          <Button onClick={() => onEditVocabulary(record)}>Sửa</Button>
          <Button onClick={() => showDeleteConfirm(record._id)} danger>
            Xóa
          </Button>
        </div>
      );
    },
  },
];

export default columns;
