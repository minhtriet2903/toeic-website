import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Public } from 'src/auth/auth.decorator';
import { EnrollmentService } from 'src/enrollment/enrollment.service';
import { LessonService } from 'src/lesson/lesson.service';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly lessonService: LessonService,
    private readonly enrollmentService: EnrollmentService,
  ) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Public()
  @Get()
  findAll(
    @Query('top') top?: number,
    @Query('sort') sort?: string,
    @Query('search') search?: string,
  ) {
    return this.courseService.findAll(top, sort, search);
  }

  @Get('free')
  getFreeCourses() {
    return this.courseService.getFreeCourses();
  }

  @Get(':id/enrollments')
  async getEnrolledUsers(@Param('id') courseId: string) {
    const users = await this.enrollmentService.getEnrolledUsers(courseId);
    if (!users) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }
    return {
      courseId,
      enrolledUsers: users,
    };
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Public()
  @Get(':id/lessons')
  getLessonsByCourseId(@Param('id') id: string) {
    return this.lessonService.getLessonsByCourseId(id);
  }

  @Get(':id')
  getEnrollmentsBy(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Public()
  @Get(':id/enrollment/:userId')
  async checkEnrollment(
    @Param('userId') userId: string,
    @Param('id') courseId: string,
  ) {
    const isEnrolled = await this.enrollmentService.isUserEnrolled(
      userId,
      courseId,
    );
    return { isEnrolled };
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const lessons = await this.lessonService.getLessonsByCourseId(id);
    if (lessons.length > 0) {
      throw new BadRequestException(
        `Course with ID ${id} has associated lessons and cannot be deleted.`,
      );
    }
    return this.courseService.remove(id);
  }
}
