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
} from '@nestjs/common';
import { ExamService } from 'src/exam/exam.service';
import { Lesson } from 'src/schema/lesson.schema';
import { CreateLessonDto, UpdateLessonDto } from './dto/create-lesson.dto';
import { LessonService } from './lesson.service';

@Controller('lessons')
export class LessonController {
  constructor(
    private readonly lessonService: LessonService,
    private readonly examService: ExamService,
  ) {}

  @Post()
  async create(@Body() createLessonDto: CreateLessonDto): Promise<Lesson> {
    return this.lessonService.create(createLessonDto);
  }

  @Get()
  async findAll(): Promise<Lesson[]> {
    return this.lessonService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Lesson> {
    const lesson = await this.lessonService.findOne(id);
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    return lesson;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ): Promise<Lesson> {
    return this.lessonService.update(id, updateLessonDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Lesson> {
    const lesson = await this.lessonService.findOne(id);
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    const exams = await this.examService.findExamsByLessonId(id);
    if (exams.length > 0) {
      throw new BadRequestException(
        `Cannot delete Lesson with ID ${id} because it is referenced by one or more Exams`,
      );
    }
    return this.lessonService.remove(id);
  }
}
