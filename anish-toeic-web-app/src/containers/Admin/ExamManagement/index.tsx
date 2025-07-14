import { useParams } from "react-router-dom";
import CreateEditExamForm from "./CreateEditExamForm";
import ExamTable from "./ExamTable";

const ExamManagement = () => {
  let { id } = useParams();

  return id ? <CreateEditExamForm /> : <ExamTable />;
};

export default ExamManagement;
