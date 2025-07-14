import { Spin } from "antd";
import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Spin size="large" />
      <p className="mt-4 text-lg text-gray-600">Loading...</p>
    </div>
  );
};

export default Loading;
