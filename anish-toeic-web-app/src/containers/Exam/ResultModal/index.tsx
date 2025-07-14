import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ExamResult } from "../../../query";
import { routePaths } from "../../../routes/helpers";

interface TestResultModalProps {
  result?: ExamResult;
}

const TestResultModal: React.FC<TestResultModalProps> = ({ result }) => {
  const navigate = useNavigate();

  const handleViewResultDetail = () => {
    result && navigate(routePaths.resultDetail.replace(":id", result?._id));
  };

  return (
    <div>
      <div className="flex space-x-2">
        <div className="border border-green-400 bg-green-200 border-dashed p-2 rounded-xl">
          <p className="text-lg">
            Your Score: <span className="font-bold">{result?.score}</span>/100
          </p>
        </div>
      </div>
      <Button
        type="link"
        className="p-0 text-lg"
        onClick={handleViewResultDetail}
      >
        Xem chi tiết
      </Button>
    </div>
  );
};

export default TestResultModal;
