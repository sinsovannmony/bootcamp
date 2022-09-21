import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { extname } from 'path/posix';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FilesService {
  async create(file: Express.Multer.File) {
    try {
      const filename = this.generateFilename(file.originalname);
      const ws = fs.createWriteStream(`./uploads/${filename}`);
      ws.write(file.buffer);
      const done = await ws.on('close', (s) => true);
      return {
        statusCode: 201,
        msg: 'File uploaded',
        data: done,
      };
    } catch (error) {
      return error;
    }
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
  private generateFilename(originalName: string) {
    // Generating a 32 random chars long string
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    console.log(randomName);
    return `${originalName}-${randomName}${extname(originalName)}`;
  }
}
