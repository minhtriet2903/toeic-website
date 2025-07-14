const getCoursesUrl = "/courses";
const getFreeCoursesUrl = "/courses/free";
const getCourseUrl = "/courses/:id";
const updateCourseUrl = "/courses/:id";
const createCourseUrl = "/courses";
const deleteCourseUrl = "/courses/:id";
const getEnrollmentsByCourseUrl = "/courses/:id/enrollments";
const getLessonsByCourseIdUrl = "/courses/:id/lessons";
const checkUserEnrolledUrl = "/courses/:id/enrollment/:userId";

export {
  checkUserEnrolledUrl,
  createCourseUrl,
  deleteCourseUrl,
  getCoursesUrl,
  getCourseUrl,
  getEnrollmentsByCourseUrl,
  getFreeCoursesUrl,
  getLessonsByCourseIdUrl,
  updateCourseUrl,
};
