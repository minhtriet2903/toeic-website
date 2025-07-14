import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionDocument } from 'src/schema/question.schema';
import {
  CreateQuestionDto,
  UpdateQuestionDto,
} from './dto/create-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
  ) {}

  async createQuestion(
    createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const newQuestion = new this.questionModel(createQuestionDto);
    return newQuestion.save();
  }

  // Method to create multiple questions
  async createQuestions(
    createQuestionsDto: CreateQuestionDto[],
  ): Promise<Question[]> {
    const createdQuestions =
      await this.questionModel.insertMany(createQuestionsDto);

    return createdQuestions;
  }

  async getAllQuestions(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }

  async getAllQuestionsByExamId(examId: string): Promise<Question[]> {
    return this.questionModel.find({ examId }).exec();
  }
  async getQuestionsForTest(examId: string): Promise<Question[]> {
    return this.questionModel
      .aggregate([
        { $match: { examId } },
        {
          $project: {
            explanation: 0, // Excludes the explanation field
            'answers.isCorrect': 0, // Excludes the isCorrect field from answers
          },
        },
        { $sort: { index: 1 } },
      ])
      .exec();
  }

  async getQuestionById(id: string): Promise<Question> {
    return this.questionModel.findById(id).exec();
  }

  async updateQuestion(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    return this.questionModel
      .findByIdAndUpdate(id, updateQuestionDto, { new: true })
      .exec();
  }

  async updateQuestionsForExam(
    questions: UpdateQuestionDto[],
  ): Promise<UpdateQuestionDto[]> {
    const updatedQuestions = [];

    for (const questionDto of questions) {
      if (questionDto._id) {
        // Update existing question
        const updatedQuestion = await this.questionModel.findByIdAndUpdate(
          questionDto._id,
          { questionDto },
          { new: true },
        );
        updatedQuestions.push(updatedQuestion);
      } else {
        // Create new question
        const newQuestion = new this.questionModel(questionDto);
        const savedQuestion = await newQuestion.save();
        updatedQuestions.push(savedQuestion);
      }
    }

    return updatedQuestions;
  }

  async deleteQuestion(id: string): Promise<Question> {
    const questionToDelete = await this.questionModel.findById(id).exec();
    if (!questionToDelete) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    const { examId } = questionToDelete;

    await this.questionModel.findByIdAndDelete(id).exec();

    //reorder remaining questions indices
    const remainingQuestions = await this.questionModel
      .find({ examId })
      .sort({ index: 1 }) // Sort by the current index
      .exec();

    for (let i = 0; i < remainingQuestions.length; i++) {
      remainingQuestions[i].index = i;
      await remainingQuestions[i].save();
    }

    return questionToDelete;
  }

  async deleteQuestionsByExamId(examId: string): Promise<void> {
    await this.questionModel.deleteMany({ examId }).exec();
  }
}
