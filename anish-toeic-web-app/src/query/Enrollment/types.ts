import { Course } from "../Course";

interface Enrollment {
  _id: string;
  userId: string;
  courseId: string | Course;
  status?: string;
  createdAt: Date;
}

interface EnrollUserPayload {
  userId: string;
  courseId: string;
  status?: string;
}

export type { Enrollment, EnrollUserPayload };
