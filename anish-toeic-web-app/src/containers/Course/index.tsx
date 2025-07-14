import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { checkUserEnrolled } from "../../query/Course/checkUserEnrolled";
import CourseDescription from "./CourseDescription";
import CourseDetail from "./CourseDetail";
import CourseListView from "./ListView";

const Course = () => {
  let { id } = useParams();
  const { user } = useAuth();
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    if (id && user) {
      checkUserEnrolled(id, user._id).then((res) => {
        setIsEnrolled(res.data.isEnrolled);
      });
    }
  }, [id, user]);

  const handleRenderCourseDetail = () => {
    return isEnrolled ? <CourseDetail /> : <CourseDescription />;
  };

  return (
    <div className="pt-16">
      {id ? handleRenderCourseDetail() : <CourseListView />}
    </div>
  );
};

export default Course;
