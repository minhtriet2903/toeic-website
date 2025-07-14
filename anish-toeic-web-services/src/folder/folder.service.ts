import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Folder } from 'src/schema/folder.schema';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';

@Injectable()
export class FolderService {
  constructor(
    @InjectModel(Folder.name) private readonly folderModel: Model<Folder>,
  ) {}

  async create(dto: CreateFolderDto): Promise<Folder> {
    return await this.folderModel.create(dto);
  }

  async findAll(): Promise<Folder[]> {
    return await this.folderModel.find().exec();
  }

  async findOne(id: string): Promise<Folder> {
    const folder = await this.folderModel.findById(id);
    if (!folder) throw new NotFoundException('Folder not found');
    return folder;
  }

  async update(id: string, dto: UpdateFolderDto): Promise<Folder> {
    const folder = await this.folderModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!folder) throw new NotFoundException('Folder not found');
    return folder;
  }

  async remove(id: string): Promise<Folder> {
    const folder = await this.folderModel.findByIdAndDelete(id);
    if (!folder) throw new NotFoundException('Folder not found');
    return folder;
  }

  async findByNameAndOwner(
    name: string,
    ownerId: string,
  ): Promise<Folder | null> {
    return this.folderModel.findOne({ name, ownerId }).exec();
  }
}
