import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Subscription,
  SubscriptionDocument,
} from 'src/schema/subscription.schema';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<SubscriptionDocument>,
  ) {}

  async create(subscription: Subscription): Promise<Subscription> {
    const newSubscription = new this.subscriptionModel(subscription);
    return newSubscription.save();
  }

  async findAll(): Promise<Subscription[]> {
    return this.subscriptionModel.find().exec();
  }

  async findOne(id: string): Promise<Subscription | null> {
    return this.subscriptionModel.findById(id).exec();
  }

  async update(
    id: string,
    subscriptions: Subscription,
  ): Promise<Subscription | null> {
    return this.subscriptionModel
      .findByIdAndUpdate(id, subscriptions, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Subscription | null> {
    return this.subscriptionModel.findByIdAndDelete(id).exec();
  }
}
