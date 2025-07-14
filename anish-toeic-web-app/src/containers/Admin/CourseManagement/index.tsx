import { useParams } from "react-router-dom";
import CourseAdminDetail from "./CourseAdminDetail";
import CourseTable from "./CourseTable";

const CourseManagement = () => {
  let { id } = useParams();

  return id ? <CourseAdminDetail /> : <CourseTable />;
};

export default CourseManagement;
