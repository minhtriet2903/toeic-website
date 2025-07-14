import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { ResultService } from './result.service';

@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Get()
  async getAllResults() {
    return this.resultService.findAll();
  }

  @Post()
  async createResult(@Body() createResultDto: CreateResultDto) {
    return this.resultService.createResult(createResultDto);
  }

  @Get(':id')
  async getResultById(@Param('id') id: string) {
    return this.resultService.getResultById(id);
  }

  @Get('exam/:examId')
  async getResultsByExam(@Param('examId') examId: string) {
    return this.resultService.getResultsByExam(examId);
  }

  @Delete(':id')
  async deleteResult(@Param('id') id: string) {
    await this.resultService.deleteResult(id);
    return { message: 'Result deleted successfully' };
  }
}
