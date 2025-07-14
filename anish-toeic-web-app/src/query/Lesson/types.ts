import { Course } from "../Course";

interface Lesson {
  _id: string;
  title: string;
  description: string;
  courseId: Course;
  createdAt: Date;
}

type CreateLessonPayload = {
  title: string;
  description?: string;
  courseId: string;
};

type UpdateLessonPayload = {
  _id: string;
  title: string;
  description?: string;
};

export type { CreateLessonPayload, Lesson, UpdateLessonPayload };
