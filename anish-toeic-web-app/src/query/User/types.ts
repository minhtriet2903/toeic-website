interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: Date;
}

type CreateUserPayload = {
  name: string;
  email: string;
  password: string;
};

export type { CreateUserPayload, User };
