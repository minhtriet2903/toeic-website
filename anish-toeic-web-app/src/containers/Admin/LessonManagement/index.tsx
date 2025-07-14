import { useParams } from "react-router-dom";
import LessonAdminDetail from "./LessonAdminDetail";
import LessonTable from "./LessonTable";

const LessonManagement = () => {
  let { id } = useParams();

  return id ? <LessonAdminDetail /> : <LessonTable />;
};

export default LessonManagement;
