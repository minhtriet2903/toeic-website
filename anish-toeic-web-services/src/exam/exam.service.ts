import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnswerDto, CreateResultDto } from 'src/result/dto/create-result.dto';
import { Exam, ExamDocument } from 'src/schema/exam.schema';
import { Question, QuestionDocument } from 'src/schema/question.schema';
import { CreateExamDto, UpdateExamDto } from './dto/create-exam.dto';
import { SubmitExamDto } from './dto/submit-exam.dto';
import { QuestionService } from './question/question.service';

@Injectable()
export class ExamService {
  constructor(
    @InjectModel(Exam.name) private readonly examModel: Model<ExamDocument>,
    @InjectModel(Question.name)
    private readonly questionModel: Model<QuestionDocument>,
    private readonly questionService: QuestionService,
  ) {}

  async createExam(createExamDto: CreateExamDto): Promise<Exam> {
    const newExam = new this.examModel(createExamDto);
    return newExam.save();
  }

  async findAllExams(): Promise<Exam[]> {
    return this.examModel
      .find()
      .populate({ path: 'lessonId', select: 'title' })
      .exec();
  }

  async findExamsByLessonId(lessonId: string): Promise<Exam[]> {
    return this.examModel.find({ lessonId }).exec();
  }

  async findExamById(id: string): Promise<Exam> {
    return this.examModel.findById(id).exec();
  }

  async updateExam(id: string, updateExamDto: UpdateExamDto): Promise<Exam> {
    const updatedExam = await this.examModel
      .findByIdAndUpdate(id, updateExamDto, { new: true })
      .exec();

    return updatedExam;
  }

  async deleteExam(id: string): Promise<Exam> {
    // Optionally, delete associated questions before deleting the exam
    await this.questionService.deleteQuestionsByExamId(id);
    return this.examModel.findByIdAndDelete(id).exec();
  }

  async checkExam(submitExamDto: SubmitExamDto): Promise<CreateResultDto> {
    const { examId, answers, userId } = submitExamDto;

    // Fetch all questions with correct answers for this exam
    const questions = await this.questionModel.find({ examId }).lean().exec();

    let score = 0;
    const feedback: AnswerDto[] = [];
    answers.forEach((submittedAnswer) => {
      const question = questions.find(
        (q) => q._id.toString() === submittedAnswer.questionId,
      );

      if (question) {
        const correctAnswer = question.answers.find(
          (answer) => answer.isCorrect,
        );
        const isCorrect = correctAnswer
          ? correctAnswer.text === submittedAnswer.answer
          : false;

        if (isCorrect) {
          score++;
        }

        feedback.push({
          questionId: question._id as string,
          selectedAnswer: submittedAnswer.answer,
          isCorrect: isCorrect,
        });
      }
    });

    // Optionally, you can calculate the percentage or grading here
    const totalQuestions = questions.length;

    return {
      userId,
      examId,
      score,
      correctAnswers: score,
      totalQuestions,
      answers: feedback,
    };
  }
}
