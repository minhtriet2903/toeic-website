import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs/promises';
import { Document, Model } from 'mongoose';
import * as path from 'path';
import { File } from 'src/schema/file.schema';
import { Folder } from 'src/schema/folder.schema';
import { FolderService } from '../folder/folder.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File.name) private readonly fileModel: Model<File>,
    @InjectModel(Folder.name)
    private readonly folderModel: Model<Folder & Document>,
    private readonly folderService: FolderService,
  ) {}

  async create(createFileDto: CreateFileDto): Promise<File> {
    if (!createFileDto.folderId) {
      // Find existing "My Resource" folder
      const existingFolder = await this.folderService.findByNameAndOwner(
        'My Resource',
        createFileDto.ownerId,
      );

      if (existingFolder) {
        createFileDto.folderId = existingFolder._id.toString();
      } else {
        // Create new "My Resource" folder if not found
        const newFolder = await this.folderService.create({
          name: 'My Resource',
          ownerId: createFileDto.ownerId,
          parentId: null,
        });
        createFileDto.folderId = newFolder._id.toString();
      }
    }

    return this.fileModel.create(createFileDto);
  }

  async findAll(): Promise<File[]> {
    return this.fileModel.find({ deletedAt: null }).exec();
  }

  async findOne(id: string): Promise<File> {
    const file = await this.fileModel
      .findOne({ _id: id, deletedAt: null })
      .exec();
    if (!file) throw new NotFoundException('File not found');
    return file;
  }

  async update(id: string, updateDto: UpdateFileDto): Promise<File> {
    const updated = await this.fileModel
      .findOneAndUpdate({ _id: id, deletedAt: null }, updateDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('File not found');
    return updated;
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const file = await this.fileModel.findById(id);
    if (!file) {
      throw new NotFoundException('File not found');
    }

    // Delete file from disk
    try {
      const filePath = path.resolve(file.path);
      await fs.access(filePath);
      await fs.unlink(filePath);
    } catch (err) {
      console.error('File deletion error:', err);
    }

    // Delete file record from DB
    await this.fileModel.deleteOne({ _id: id });

    return { deleted: true };
  }
}
