import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/auth.decorator';
import { SearchDto } from 'src/dto/search.dto';
import { Vocabulary } from 'src/schema/vocabulary.schema';
import { extractImportVocabularies, parseDocx } from 'src/utils';
import { CreateVocabularyDto } from '../vocabulary/dto';
import { VocabularyService } from './vocabulary.service';

@Controller('vocabularies')
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  @Public()
  @Get()
  async getVocabularies(@Query() query: SearchDto): Promise<Vocabulary[]> {
    return this.vocabularyService.getAllVocab(query);
  }

  @Get('/:id')
  async getVocabulary(@Res() response, @Param('id') vocabId: string) {
    try {
      return await this.vocabularyService.getVocabulary(vocabId);
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('word-family/:word')
  async getWordFamily(@Param('word') word: string): Promise<Vocabulary[]> {
    return this.vocabularyService.getWordFamily(word);
  }

  @Post()
  async createVocabulary(@Body() createVocabularyDto: CreateVocabularyDto) {
    return this.vocabularyService.createVocabulary(createVocabularyDto);
  }

  @Public()
  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const content = await parseDocx(file.buffer); // Parse the file
    const vocabularies = extractImportVocabularies(content); // Extract vocabularies
    await this.vocabularyService.addVocabularies(vocabularies);
    return { message: 'Vocabularies imported successfully' };
  }

  @Delete('/:id')
  async deleteVocabulary(@Res() response, @Param('id') vocabId: string) {
    try {
      const deletedVocabulary =
        await this.vocabularyService.deleteVocabulary(vocabId);
      return response.status(HttpStatus.OK).json({
        message: 'Vocabulary deleted successfully',
        deletedVocabulary,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
