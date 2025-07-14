import { Table } from "antd";
import { useEffect, useState } from "react";
import { File, getAllResources } from "../../../query";
import columns from "./columns";

const ResourceTable = () => {
  const [files, setFiles] = useState<File[]>();

  useEffect(() => {
    getAllResources().then((res) => setFiles(res.data));
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="w-full p-5">
        <Table columns={columns()} dataSource={files}></Table>
      </div>
    </div>
  );
};

export default ResourceTable;
