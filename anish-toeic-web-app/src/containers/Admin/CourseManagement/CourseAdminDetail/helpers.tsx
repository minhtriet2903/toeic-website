import { Course } from "../../../../query";
import { routePaths } from "../../../../routes/helpers";

export const breadcrumbItems = (course: Course) => [
  {
    title: <a href={routePaths.admin.replace(":tab", "course")}>Khóa học</a>,
  },
  {
    title: `${course.title}`,
  },
];
