import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enrollment, EnrollmentDocument } from 'src/schema/enrollment.schema';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectModel(Enrollment.name)
    private readonly enrollmentModel: Model<EnrollmentDocument>,
  ) {}

  async create(createEnrollmentDto: CreateEnrollmentDto): Promise<Enrollment> {
    const newEnrollment = new this.enrollmentModel(createEnrollmentDto);
    return newEnrollment.save();
  }

  async findAll(): Promise<Enrollment[]> {
    return this.enrollmentModel.find().populate('studentId courseId').exec();
  }

  async findByUserId(userId: string): Promise<Enrollment[]> {
    return this.enrollmentModel.find({ userId }).populate('courseId').exec();
  }

  async findByCourseId(courseId: string): Promise<Enrollment[]> {
    return this.enrollmentModel.find({ courseId }).populate('userId').exec();
  }

  async getEnrolledUsers(courseId: string): Promise<Enrollment[]> {
    const enrollments = await this.enrollmentModel
      .find({ courseId })
      .select('userId')
      .exec();

    return enrollments;
  }

  async isUserEnrolled(userId: string, courseId: string): Promise<boolean> {
    const enrollment = await this.enrollmentModel.findOne({ userId, courseId });
    return !!enrollment;
  }

  async update(
    id: string,
    updateEnrollmentDto: UpdateEnrollmentDto,
  ): Promise<Enrollment> {
    const updatedEnrollment = await this.enrollmentModel
      .findByIdAndUpdate(id, updateEnrollmentDto, { new: true })
      .exec();
    if (!updatedEnrollment) {
      throw new NotFoundException(`Enrollment with ID ${id} not found`);
    }
    return updatedEnrollment;
  }

  async remove(id: string): Promise<Enrollment> {
    const deletedEnrollment = await this.enrollmentModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedEnrollment) {
      throw new NotFoundException(`Enrollment with ID ${id} not found`);
    }
    return deletedEnrollment;
  }
}
