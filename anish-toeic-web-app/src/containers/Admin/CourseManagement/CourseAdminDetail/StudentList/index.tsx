import { Button } from "antd";
import React from "react";
import { User } from "../../../../../query";

interface QuestionDetailProps {
  students: User[];
  isGetAllUsers?: boolean;
  onUpdateStudentList: (userId: string) => void;
}

const StudentList: React.FC<QuestionDetailProps> = ({
  students,
  isGetAllUsers,
  onUpdateStudentList,
}) => {
  return (
    <div className="border border-dashed p-4 rounded-xl w-1/2">
      <p>{`Danh sách học viên ${
        isGetAllUsers ? "trong hệ thống" : "trong lớp"
      }`}</p>
      <div className="max-h-48 overflow-auto">
        {students.map((student) => (
          <div
            key={student._id}
            className="bg-sky-50 p-2 rounded-xl mt-2 flex justify-between"
          >
            <div>{student.name}</div>
            {isGetAllUsers ? (
              <Button
                type="dashed"
                onClick={() => onUpdateStudentList(student._id)}
              >
                Thêm vào lớp
              </Button>
            ) : (
              <Button
                type="dashed"
                danger
                onClick={() => onUpdateStudentList(student._id)}
              >
                Xóa
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
