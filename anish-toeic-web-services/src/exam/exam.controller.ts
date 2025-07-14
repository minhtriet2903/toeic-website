import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Roles } from 'src/auth/roles.decorator';
import { ResultService } from 'src/result/result.service';
import { CreateExamDto, UpdateExamDto } from './dto/create-exam.dto';
import { SubmitExamDto } from './dto/submit-exam.dto';
import { ExamService } from './exam.service';

@Controller('exams')
export class ExamController {
  constructor(
    private readonly examService: ExamService,
    private readonly resultService: ResultService,
  ) {}

  @Post()
  async createExam(@Body() createExamDto: CreateExamDto) {
    return this.examService.createExam(createExamDto);
  }

  @Get()
  async findAllExams() {
    return this.examService.findAllExams();
  }

  @Roles('admin', 'user')
  @Get(':id')
  async findExamById(@Param('id') id: string) {
    return this.examService.findExamById(id);
  }

  @Roles('admin', 'user')
  @Get('lesson/:lessonId')
  async findExamsByLessonId(@Param('lessonId') lessonId: string) {
    return this.examService.findExamsByLessonId(lessonId);
  }

  @Post('submit')
  async submitExam(@Body() submitExamDto: SubmitExamDto) {
    const examSubmissionResult =
      await this.examService.checkExam(submitExamDto);
    const result = await this.resultService.createResult(examSubmissionResult);
    return result;
  }

  @Put(':id')
  async updateExam(
    @Param('id') id: string,
    @Body() updateExamDto: UpdateExamDto,
  ) {
    return this.examService.updateExam(id, updateExamDto);
  }

  @Patch(':id')
  async patchExam(
    @Param('id') id: string,
    @Body() updateExamDto: UpdateExamDto,
  ) {
    return this.examService.updateExam(id, updateExamDto);
  }

  @Delete(':id')
  async deleteExam(@Param('id') id: string) {
    const results = await this.resultService.getResultsByExam(id);
    if (results.length > 0) {
      throw new HttpException(
        'Exam has associated results and cannot be deleted',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.examService.deleteExam(id);
  }
}
