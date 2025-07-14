import { Lesson } from "../../../../query";
import { routePaths } from "../../../../routes/helpers";

export const breadcrumbItems = (lesson: Lesson) => [
  {
    title: <a href={routePaths.admin.replace(":tab", "lesson")}>Bài học</a>,
  },
  {
    title: `${lesson.title}`,
  },
];
