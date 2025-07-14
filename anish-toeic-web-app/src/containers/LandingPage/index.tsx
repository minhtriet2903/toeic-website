import { Button, Card, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Course, getCourses } from "../../query";
import { routePaths } from "../../routes/helpers";
import SubscriptionForm from "./SubscriptionForm";

const LandingPage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>();

  useEffect(() => {
    getCourses({ top: 4 }).then((res) => {
      setCourses(res.data);
    });
  }, []);

  const handleNavigateToCourses = () => {
    navigate(routePaths.courses);
  };

  const handleViewCourseDetail = (courseId: string) => {
    navigate(routePaths.courseDetail.replace(":id", courseId));
  };

  return (
    <div className="pt-44 pb-12 flex flex-col items-center w-full">
      <div className="w-full md:w-5/6 p-6 flex flex-col justify-center items-center h-auto md:h-[450px] bg-sky-100 rounded-2xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          TOEIC cho mọi người!
        </h1>
        <h2 className="text-xl md:text-2xl my-4">
          Nơi dành riêng cho các bạn mất gốc luyện Toeic, giao tiếp.
        </h2>
        <Button
          type="primary"
          size="large"
          className="mt-10 font-semibold"
          onClick={() => {
            const subscriptionFormElement =
              document.getElementById("subscription-form");
            if (subscriptionFormElement) {
              window.scrollTo({
                top: subscriptionFormElement.offsetTop,
                behavior: "smooth",
              });
            }
          }}
        >
          Đăng ký nhận thông tin
        </Button>
      </div>
      <div className="w-full md:w-5/6 my-10 flex flex-col items-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold leading-tight text-center">
          Bắt đầu hành trình TOEIC của bạn nào
        </h2>
        <div className="flex flex-wrap justify-center gap-8 w-full">
          {courses?.map((course) => (
            <Card
              key={course._id}
              hoverable
              className="w-full sm:w-1/2 md:w-1/4 xl:w-1/5"
              cover={
                <img
                  alt=""
                  src={
                    course.imageUrl
                      ? `${import.meta.env.ANISH_SERVICE_DOMAIN}:${
                          import.meta.env.ANISH_SERVICE_PORT
                        }/uploads/${course.imageUrl}`
                      : "./course_default_img.png"
                  }
                  className="p-4"
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
        <Button
          type="link"
          className="text-lg"
          onClick={handleNavigateToCourses}
        >
          Xem tất cả danh sách khóa học
        </Button>
      </div>
      <div id="subscription-form">
        <SubscriptionForm />
      </div>
      <div className="text-center py-10 w-full px-4">
        <h2 className="text-2xl md:text-3xl font-bold leading-tight">
          Góc chia sẻ
        </h2>
      </div>
    </div>
  );
};

export default LandingPage;
