import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SearchDto } from 'src/dto/search.dto';
import { Vocabulary } from 'src/schema/vocabulary.schema';
import { extractWordRoot } from 'src/utils';
import { CreateVocabularyDto } from '../vocabulary/dto';

@Injectable()
export class VocabularyService {
  constructor(
    @InjectModel('Vocabulary')
    private readonly vocabularyModel: Model<Vocabulary>,
  ) {}

  async getAllVocab(query: SearchDto): Promise<Vocabulary[]> {
    const filter = query.search
      ? {
          word: { $regex: query.search, $options: 'i' },
        }
      : {};

    return await this.vocabularyModel.find(filter).exec();
  }

  async getVocabulary(vocabularyId: string): Promise<Vocabulary> {
    const existingVocabulary = await this.vocabularyModel
      .findById(vocabularyId)
      .exec();
    if (!existingVocabulary) {
      throw new NotFoundException(`Vocabulary #${vocabularyId} not found`);
    }
    return existingVocabulary;
  }

  async getWordFamily(word: string): Promise<Vocabulary[]> {
    const wordRoot = extractWordRoot(word.toLowerCase());

    return this.vocabularyModel
      .find({ word: { $regex: `^${wordRoot}`, $options: 'i' } })
      .exec();
  }

  async createVocabulary(
    createVocabularyDto: CreateVocabularyDto,
  ): Promise<Vocabulary> {
    const newVocabulary = new this.vocabularyModel(createVocabularyDto);
    return newVocabulary.save();
  }

  async addVocabularies(vocabularies: CreateVocabularyDto[]) {
    return this.vocabularyModel.insertMany(vocabularies);
  }

  async deleteVocabulary(vocabularyId: string): Promise<Vocabulary> {
    const deletedVocabulary =
      await this.vocabularyModel.findByIdAndDelete(vocabularyId);
    if (!deletedVocabulary) {
      throw new NotFoundException(`Vocabulary #${vocabularyId} not found`);
    }
    return deletedVocabulary;
  }
}
