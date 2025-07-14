import { Card, Input, Pagination, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { Course, getCourses } from "../../../query";
import { routePaths } from "../../../routes/helpers";

const CourseListView: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    getCourses({ search }).then((res) => {
      setCourses(res.data);
    });
  }, [search]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleViewCourseDetail = (courseId: string) => {
    navigate(routePaths.courseDetail.replace(":id", courseId));
  };

  return (
    <div className="flex flex-col items-center w-full py-28 space-y-8 bg-sky-50">
      <div className="text-center mb-4">
        <p className="font-bold text-2xl">Khám phá các khóa học</p>
      </div>
      <div className="w-full px-4 sm:w-2/3 md:w-1/2">
        <Input
          addonBefore={<CiSearch />}
          placeholder="Find a course that you want"
          size="large"
          onChange={onSearch}
        />
      </div>
      <div className="flex space-x-2">
        <p className="font-semibold">Filter</p>
        <Tag color="cyan">TOEIC</Tag>
      </div>
      <div className="flex justify-center w-5/6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full px-4">
          {courses?.map((course) => (
            <Card
              key={course._id}
              hoverable
              cover={
                <img
                  alt=""
                  src={
                    course.imageUrl
                      ? `${import.meta.env.ANISH_SERVICE_DOMAIN}:$${
                          import.meta.env.ANISH_SERVICE_PORT
                        }/uploads/${course.imageUrl}`
                      : "./course_default_img.png"
                  }
                  className="px-12 py-4"
                />
              }
              onClick={() => handleViewCourseDetail(course._id)}
            >
              <Meta
                title={
                  <div className="flex flex-col items-start">
                    <Tag bordered={false} color="cyan" className="mb-2">
                      TOEIC
                    </Tag>
                    <p className="text-lg font-semibold text-wrap">
                      {course.title}
                    </p>
                  </div>
                }
              />
            </Card>
          ))}
        </div>
      </div>
      <Pagination className="w-full px-4 flex justify-center" />
    </div>
  );
};

export default CourseListView;
