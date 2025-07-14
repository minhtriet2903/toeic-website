import { Avatar, Button, Tabs, TabsProps } from "antd";
import { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  ExamResult,
  getEnrollmentsByUser,
  getResultsByUser,
} from "../../query";
import { logout } from "../../query/Auth";
import { Enrollment } from "../../query/Enrollment";
import { routePaths } from "../../routes/helpers";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userEnrollments, setUserEnrollments] = useState<Enrollment[]>([]);
  const [userResults, setUserResults] = useState<ExamResult[]>([]);

  useEffect(() => {
    if (user?._id !== undefined) {
      getEnrollmentsByUser(user?._id).then((res) =>
        setUserEnrollments(res.data)
      );

      getResultsByUser(user?._id).then((res) => setUserResults(res.data));
    }
  }, [user]);

  const logOut = () => {
    logout();
    navigate("/login");
  };

  const handleViewCourseDetail = (courseId: string) => {
    navigate(routePaths.courseDetail.replace(":id", courseId));
  };

  const handleViewResultDetail = (resultId: string) => {
    navigate(routePaths.resultDetail.replace(":id", resultId));
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Khóa học của tôi",
      children:
        userEnrollments.length > 0 ? (
          userEnrollments?.map((enrollment) => (
            <div
              key={enrollment._id}
              className="border rounded-xl p-4 flex space-x-4 mb-4"
            >
              <img
                alt=""
                src={
                  typeof enrollment.courseId === "object" &&
                  enrollment.courseId.imageUrl
                    ? `${import.meta.env.ANISH_SERVICE_DOMAIN}:${
                        import.meta.env.ANISH_SERVICE_PORT
                      }/uploads/${enrollment.courseId.imageUrl}`
                    : `./course_default_img.png`
                }
                height={120}
                width={120}
              />
              <div className="w-full space-y-2 flex flex-col justify-between">
                <div className="space-y-1">
                  <Button
                    type="link"
                    className="font-bold p-0"
                    onClick={() =>
                      typeof enrollment.courseId === "object" &&
                      handleViewCourseDetail(enrollment.courseId._id)
                    }
                  >
                    {typeof enrollment.courseId === "object" &&
                      enrollment.courseId.title}
                  </Button>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        typeof enrollment.courseId === "object"
                          ? enrollment.courseId.description
                          : "",
                    }}
                  />
                </div>
                <p>
                  Ngày đăng ký{" "}
                  {new Date(enrollment.createdAt).toLocaleDateString("vi-VN")}
                </p>
                {/* <Progress percent={30} /> */}
              </div>
            </div>
          ))
        ) : (
          <div>Không có dữ liệu</div>
        ),
    },
    {
      key: "2",
      label: "Các bài kiểm tra của tôi",
      children:
        userResults.length > 0 ? (
          userResults.map((result) => (
            <div
              key={result._id}
              className="border rounded-xl p-4 flex space-x-4 mb-4"
            >
              <div className="w-full space-y-2 flex flex-col justify-between">
                <div className="space-y-1">
                  <Button
                    type="link"
                    className="font-bold p-0"
                    onClick={() => handleViewResultDetail(result._id)}
                  >
                    {typeof result.examId === "object"
                      ? result.examId.title
                      : result.examId}
                  </Button>
                  <p className="font-semibold">Kết quả {result.score} /100</p>
                  <p>
                    Ngày làm{" "}
                    {new Date(result.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>Không có dữ liệu</div>
        ),
    },
  ];

  return (
    <div className="pt-36 pb-12 flex flex-col items-center w-full space-y-4">
      <div className="flex flex-col items-center space-y-4">
        <Avatar
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 120, xxl: 100 }}
          icon={<CiUser />}
        />
        <p>{user?.name}</p>
        <p>{user?.email}</p>
        <Button onClick={logOut}>Logout</Button>
      </div>
      <div className="w-2/3">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
};

export default Profile;
