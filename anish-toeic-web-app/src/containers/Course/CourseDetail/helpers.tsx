import { Course } from "../../../query";
import { routePaths } from "../../../routes/helpers";

export const breadcrumbItems = (course: Course) => [
  {
    title: <a href={routePaths.courses}>Khóa học</a>,
  },
  {
    title: `${course.title}`,
  },
];
