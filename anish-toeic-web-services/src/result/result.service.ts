import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Result } from 'src/schema/result.schema';
import { CreateResultDto } from './dto/create-result.dto';

@Injectable()
export class ResultService {
  constructor(
    @InjectModel(Result.name) private readonly resultModel: Model<Result>,
  ) {}

  async createResult(createResultDto: CreateResultDto): Promise<Result> {
    const result = new this.resultModel(createResultDto);
    return result.save();
  }

  async findAll(): Promise<Result[]> {
    return this.resultModel
      .find()
      .select('userId examId score createdAt')
      .populate({ path: 'userId', select: 'name' })
      .populate({ path: 'examId', select: 'title' })
      .exec();
  }

  async getResultById(id: string): Promise<Result> {
    const result = await this.resultModel
      .findById(id)
      .populate({
        path: 'answers',
        populate: {
          path: 'questionId',
          select: 'parentId explanation index section title content answers',
        },
      })
      .exec();
    if (!result) {
      throw new NotFoundException(`Result with ID "${id}" not found`);
    }
    return result;
  }

  async getResultsByUser(userId: string): Promise<Result[]> {
    return this.resultModel
      .find({ userId })
      .select('examId score correctAnswers totalQuestions')
      .exec();
  }

  async getResultsByExam(examId: string): Promise<Result[]> {
    return this.resultModel.find({ examId }).exec();
  }

  async deleteResult(id: string): Promise<void> {
    const result = await this.resultModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Result with ID "${id}" not found`);
    }
  }
}
