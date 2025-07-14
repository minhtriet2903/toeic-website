interface Subscription {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string;
  target: number;
}

type CreateSubscriptionPayload = {
  name: string;
  phoneNumber: string;
  email: string;
  target: number;
};

export type { CreateSubscriptionPayload, Subscription };
