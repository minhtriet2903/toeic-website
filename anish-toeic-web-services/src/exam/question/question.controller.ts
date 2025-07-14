import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/auth.decorator';
import { Roles } from 'src/auth/roles.decorator';
import {
  extractImportQuestions,
  extractImportReadingQuestions,
} from 'src/utils';
import { extractImportListeningQuestions } from 'src/utils/extractImportListeningQuestions';
import {
  CreateQuestionDto,
  UpdateQuestionDto,
} from './dto/create-question.dto';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.createQuestion(createQuestionDto);
  }

  @Post('many')
  async createQuestions(@Body() createQuestionsDto: CreateQuestionDto[]) {
    return this.questionService.createQuestions(createQuestionsDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateQuestionDto) {
    return this.questionService.updateQuestion(id, updateCourseDto);
  }

  @Public()
  @Post(':examId/import')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('examId') examId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const content = file.buffer.toString('utf-8');
    const questions = extractImportQuestions(examId, content);
    await this.questionService.deleteQuestionsByExamId(examId);
    await this.questionService.createQuestions(questions);
    return { message: 'Questions imported successfully' };
  }

  @Public()
  @Post(':examId/import/reading')
  @UseInterceptors(FileInterceptor('file'))
  async uploadReadingFile(
    @Param('examId') examId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const content = file.buffer.toString('utf-8');
    const questions = extractImportReadingQuestions(examId, content);
    await this.questionService.deleteQuestionsByExamId(examId);
    await this.questionService.createQuestions(questions);
    return { message: 'Reading questions imported successfully' };
  }

  @Public()
  @Post(':examId/import/listening')
  @UseInterceptors(FileInterceptor('file'))
  async uploadListeningFile(
    @Param('examId') examId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const content = file.buffer.toString('utf-8');
    const questions = extractImportListeningQuestions(examId, content);
    await this.questionService.deleteQuestionsByExamId(examId);
    await this.questionService.createQuestions(questions);
    return { message: 'Listening questions imported successfully' };
  }

  @Get(':examId')
  async getQuestionsByExamId(@Param('examId') examId: string) {
    return this.questionService.getAllQuestionsByExamId(examId);
  }

  @Roles('admin', 'user')
  @Get(':examId/test')
  async getExamQuestions(@Param('examId') examId: string) {
    return this.questionService.getQuestionsForTest(examId);
  }

  @Delete(':id')
  async deleteQuestion(@Param('id') id: string) {
    return this.questionService.deleteQuestion(id);
  }
}
