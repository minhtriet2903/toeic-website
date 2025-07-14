import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FolderService } from 'src/folder/folder.service';
import { FileSchema } from 'src/schema/file.schema';
import { FolderSchema } from 'src/schema/folder.schema';
import { FolderModule } from '../folder/folder.module';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'File', schema: FileSchema },
      { name: 'Folder', schema: FolderSchema },
    ]),
    FolderModule,
  ],
  controllers: [FileController],
  providers: [FileService, FolderService],
})
export class FileModule {}
