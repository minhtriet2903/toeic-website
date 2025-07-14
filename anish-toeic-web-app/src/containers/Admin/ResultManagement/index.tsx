import { Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExamResult, getResults } from "../../../query";
import { routePaths } from "../../../routes/helpers";
import columns from "./columns";

const ResultManagement = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<ExamResult[]>();

  useEffect(() => {
    getResults().then((res) => {
      setResults(res.data);
    });
  }, []);

  const viewResultDetail = (id: string) => {
    navigate(routePaths.resultDetail.replace(":id", id));
  };

  return (
    <div className="flex flex-col w-full mt-4">
      <div className="w-full p-5">
        <Table columns={columns(viewResultDetail)} dataSource={results}></Table>
      </div>
    </div>
  );
};

export default ResultManagement;
