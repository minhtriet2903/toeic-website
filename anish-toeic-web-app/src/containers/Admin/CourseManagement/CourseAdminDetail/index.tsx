import { Breadcrumb, Button, notification } from "antd";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  Course,
  enrollUserToCourse,
  getCourse,
  GetEnrollmentByCourseResponse,
  getEnrollmentsByCourse,
  getUsers,
  removeUserFromCourse,
  updateCourse,
  UpdateCoursePayload,
  User,
} from "../../../../query";
import GeneralInformationForm from "./GeneralInformation";
import { breadcrumbItems } from "./helpers";
import LessonList from "./LessonList";
import StudentList from "./StudentList";

const CourseAdminDetail = () => {
  let { id } = useParams();
  const [course, setCourse] = useState<Course>();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [enrollments, setEnrollments] =
    useState<GetEnrollmentByCourseResponse>();
  const [enrolledUsers, setEnrolledUsers] = useState<User[]>([]);
  const [nonEnrolledUsers, setNonEnrolledUsers] = useState<User[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateCoursePayload>({
    defaultValues: {
      _id: id,
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (id) {
      getCourse(id).then((res) => {
        setCourse(res.data);
        reset(res.data);
      });

      getEnrollmentsByCourse(id).then((res) => {
        setEnrollments(res.data);
      });
    }
  }, [id]);

  useEffect(() => {
    getUsers().then((res) => {
      setAllUsers(res.data);
    });
  }, []);

  const handleEditCourse: SubmitHandler<UpdateCoursePayload> = (data) => {
    updateCourse(data).then((res) => {
      if (res) {
        notification.success({
          message: "Course updated successfully",
        });
        setCourse(res.data);
      }
    });
  };

  const handleRefetchEnrollments = () => {
    if (id) {
      getEnrollmentsByCourse(id).then((res) => {
        setEnrollments(res.data);
      });
    }
  };

  const handleEnrollUser = (userId: string) => {
    course &&
      enrollUserToCourse({ userId, courseId: course._id }).then((res) => {
        if (res) {
          notification.success({
            message: "User enrolled successfully",
          });
          handleRefetchEnrollments();
        }
      });
  };

  useEffect(() => {
    if (enrollments && allUsers) {
      let enrolledList: User[] = [];
      let nonEnrolledList: User[] = [];

      allUsers.forEach((user) => {
        const isEnrolled = enrollments.enrolledUsers.findIndex(
          (enrolledUser) => enrolledUser.userId === user._id
        );
        if (isEnrolled === -1) nonEnrolledList.push(user);
        else enrolledList.push(user);
      });

      setEnrolledUsers(enrolledList);
      setNonEnrolledUsers(nonEnrolledList);
    }
  }, [allUsers, enrollments]);

  const handleRemoveUser = (userId: string) => {
    if (enrollments) {
      const enrollmentOfUser = enrollments.enrolledUsers.find(
        (enrolledUser) => enrolledUser.userId === userId
      );
      enrollmentOfUser?._id &&
        removeUserFromCourse(enrollmentOfUser?._id).then((res) => {
          if (res) {
            notification.success({
              message: "User removed successfully",
            });
            handleRefetchEnrollments();
          }
        });
    }
  };

  return (
    course && (
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Breadcrumb items={breadcrumbItems(course)} />
          <Button type="primary" onClick={handleSubmit(handleEditCourse)}>
            Lưu
          </Button>
        </div>
        <GeneralInformationForm
          control={control}
          errors={errors}
          setValue={setValue}
          watch={watch}
        />
        <div className="flex space-x-4">
          <LessonList />
          <StudentList
            students={enrolledUsers}
            onUpdateStudentList={handleRemoveUser}
          />
          <StudentList
            students={nonEnrolledUsers}
            isGetAllUsers
            onUpdateStudentList={handleEnrollUser}
          />
        </div>
      </div>
    )
  );
};

export default CourseAdminDetail;
