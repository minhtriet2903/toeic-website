import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Subscription } from 'src/schema/subscription.schema';
import { SubscriptionService } from './subscription.service';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  async create(@Body() subscription: Subscription): Promise<Subscription> {
    return this.subscriptionService.create(subscription);
  }

  @Get()
  async findAll(): Promise<Subscription[]> {
    return this.subscriptionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Subscription | null> {
    return this.subscriptionService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() subscription: Subscription,
  ): Promise<Subscription | null> {
    return this.subscriptionService.update(id, subscription);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Subscription | null> {
    return this.subscriptionService.delete(id);
  }
}
