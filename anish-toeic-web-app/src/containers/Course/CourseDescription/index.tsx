import { Collapse } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Course,
  getCourse,
  getLessonsByCourseId,
  Lesson,
} from "../../../query";

const CourseDescription = () => {
  let { id } = useParams();
  const [course, setCourse] = useState<Course>();
  const [lessons, setLessons] = useState<Lesson[]>();

  useEffect(() => {
    if (id) {
      getCourse(id).then((res) => {
        setCourse(res.data);
      });

      getLessonsByCourseId(id).then((res) => {
        setLessons(res.data);
      });
    }
  }, [id]);

  const items = lessons?.map((lesson) => ({
    key: lesson?._id,
    label: lesson?.title,
    children: (
      <div
        dangerouslySetInnerHTML={{
          __html: lesson?.description ?? "",
        }}
      />
    ),
  }));

  return (
    <div className="flex justify-center pt-32">
      <div className="w-2/3">
        <div className="flex">
          <div className="w-2/3 space-y-3">
            <p className="font-bold text-4xl">{course?.title}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: course?.description ?? "",
              }}
            />
            <p className="font-bold text-lg">Nội dung khóa học</p>
            <Collapse ghost items={items} />
          </div>
          {course?.imageUrl && (
            <div className="w-1/3 border-dashed p-6 border rounded-xl">
              <img
                alt=""
                src={`${import.meta.env.ANISH_SERVICE_DOMAIN}:${
                  import.meta.env.ANISH_SERVICE_PORT
                }/uploads/${course?.imageUrl}`}
                className="rounded-xl"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDescription;
