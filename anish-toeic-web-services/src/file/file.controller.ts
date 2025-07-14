import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { CurrentUser, Public } from 'src/auth/auth.decorator';
import { editFileName } from 'src/config';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
    }),
  )
  public async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser('sub') userId: string,
  ) {
    const fileRecord: CreateFileDto = {
      filename: file.originalname,
      path: file.path,
      size: file.size,
      type: file.mimetype,
      ownerId: userId,
    };

    const savedFile = await this.fileService.create(fileRecord);
    return { message: 'File uploaded successfully', file: savedFile };
  }

  @Public()
  @Get('download/:fileName')
  downloadFile(@Param('fileName') filename: string, @Res() res: Response) {
    const file = `./uploads/${filename}`;
    return res.download(file);
  }

  @Get()
  async findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.fileService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateFileDto) {
    return this.fileService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.fileService.remove(id);
  }
}
