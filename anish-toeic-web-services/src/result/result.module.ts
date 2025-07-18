import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Result, ResultSchema } from 'src/schema/result.schema';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Result.name, schema: ResultSchema }]),
  ],
  providers: [ResultService],
  controllers: [ResultController],
})
export class ResultModule {}
