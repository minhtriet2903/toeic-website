import React from "react";

interface LabelValueProps {
  label: string;
  value: string | React.ReactNode;
}

const LabelValue: React.FC<LabelValueProps> = ({ label, value }) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="font-bold text-gray-700">{label}:</span>
      <span className="text-gray-900">{value}</span>
    </div>
  );
};

export default LabelValue;
