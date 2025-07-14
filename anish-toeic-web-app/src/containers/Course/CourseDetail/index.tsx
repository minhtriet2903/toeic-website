import { Breadcrumb, Button, Progress } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Course,
  Exam,
  getCourse,
  getExamsByLessonId,
  getLessonsByCourseId,
  Lesson,
} from "../../../query";
import { routePaths } from "../../../routes/helpers";
import CourseItems from "./CourseItems";
import { breadcrumbItems } from "./helpers";

export interface CourseItem {
  title: string;
  description: string;
  index: number;
}

const CourseDetail = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [course, setCourse] = useState<Course>();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [examsByLesson, setExamsByLesson] = useState<Exam[]>([]);
  const [selectedCourseItemKey, setSelectedCourseItemKey] =
    useState<string>("introduction");

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

  const selectedLesson = useMemo(() => {
    if (selectedCourseItemKey !== "introduction") {
      return lessons.find((lesson) => lesson._id === selectedCourseItemKey);
    }
  }, [selectedCourseItemKey, lessons]);

  useEffect(() => {
    selectedLesson &&
      getExamsByLessonId(selectedLesson?._id).then((res) =>
        setExamsByLesson(res.data)
      );
  }, [selectedLesson]);

  const navigateToTest = (examId: string) => {
    selectedLesson && navigate(routePaths.examDetail.replace(":id", examId));
  };

  return (
    course && (
      <div className="p-10 space-y-3">
        <Breadcrumb items={breadcrumbItems(course)} />
        <div className="flex justify-around space-x-4">
          <div className="w-1/3">
            <CourseItems
              course={course}
              lessons={lessons}
              selectedCourseItemKey={selectedCourseItemKey}
              setSelectedCourseItemKey={setSelectedCourseItemKey}
            />
          </div>
          {selectedCourseItemKey === "introduction" ? (
            <div className="w-full space-y-4">
              <p className="font-bold text-xl">New Economy TOEIC Test 1</p>
              <p>
                <p className="font-semibold">Thông tin đề thi</p>
                Thời gian làm bài: 45 phút | 100 câu hỏi
              </p>
              <p>
                <p className="text-red-700 font-semibold">Chú ý:</p>
              </p>
            </div>
          ) : (
            <div className="w-full space-y-4">
              <p className="font-bold text-xl">{selectedLesson?.title}</p>
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedLesson?.description ?? "",
                }}
              />
              {examsByLesson.map((exam) => (
                <div key={exam._id}>
                  <p className="font-bold text-xl">{exam?.title}</p>
                  <Button
                    type="primary"
                    onClick={() => navigateToTest(exam._id)}
                  >
                    Làm bài
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div className="w-1/3">
            <div className="border border-dashed p-4 rounded-xl space-y-2">
              <p className="font-semibold">Theo dõi hành trình của bạn</p>
              <Progress
                percent={70}
                status="active"
                strokeColor={{ from: "#108ee9", to: "#87d068" }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CourseDetail;
