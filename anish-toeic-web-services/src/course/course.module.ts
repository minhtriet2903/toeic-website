import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnrollmentService } from 'src/enrollment/enrollment.service';
import { LessonService } from 'src/lesson/lesson.service';
import { CourseSchema } from 'src/schema/course.schema';
import { EnrollmentSchema } from 'src/schema/enrollment.schema';
import { LessonSchema } from 'src/schema/lesson.schema';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Course', schema: CourseSchema },
      { name: 'Enrollment', schema: EnrollmentSchema },
      { name: 'Lesson', schema: LessonSchema },
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService, EnrollmentService, LessonService],
})
export class CourseModule {}
