import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson, LessonDocument } from 'src/schema/lesson.schema';
import { CreateLessonDto, UpdateLessonDto } from './dto/create-lesson.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson.name)
    private readonly lessonModel: Model<LessonDocument>,
  ) {}

  async create(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const newLesson = new this.lessonModel(createLessonDto);
    return newLesson.save();
  }

  async findAll(): Promise<Lesson[]> {
    return this.lessonModel
      .find()
      .populate({ path: 'courseId', select: 'title' })
      .exec();
  }

  async getLessonsByCourseId(courseId: string): Promise<Lesson[]> {
    return this.lessonModel.find({ courseId }).exec();
  }

  async findOne(id: string): Promise<Lesson> {
    const lesson = await this.lessonModel.findById(id).exec();
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    return lesson;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto): Promise<Lesson> {
    const updatedLesson = await this.lessonModel
      .findByIdAndUpdate(id, updateLessonDto, { new: true })
      .exec();
    if (!updatedLesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    return updatedLesson;
  }

  async remove(id: string): Promise<Lesson> {
    const deletedLesson = await this.lessonModel.findByIdAndDelete(id).exec();
    if (!deletedLesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    return deletedLesson;
  }
}
