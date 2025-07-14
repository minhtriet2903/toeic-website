interface Course {
  _id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  isPublic: boolean;
  createdAt: Date;
  createdUser: string;
}

type CreateCoursePayload = {
  title: string;
  description?: string;
  price?: string;
  imageUrl?: string;
  createdUser?: string;
};

type UpdateCoursePayload = {
  _id: string;
  title?: string;
  description?: string;
  price?: string;
  isPublic?: boolean;
  imageUrl?: string;
};

interface GetEnrolledUserResponse {
  _id: string;
  userId: string;
}

interface GetEnrollmentByCourseResponse {
  courseId: string;
  enrolledUsers: GetEnrolledUserResponse[];
}

export type {
  Course,
  CreateCoursePayload,
  GetEnrolledUserResponse,
  GetEnrollmentByCourseResponse,
  UpdateCoursePayload,
};
