import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FileService {
  async saveFile(img: Express.Multer.File) {
    try {
      const typeFile = img.originalname.split('.');
      const fileName = `${uuid.v4()}.${typeFile[typeFile.length - 1]}`;
      const pathFile = path.resolve(__dirname, '../../src', 'public');

      if (!fs.existsSync(pathFile)) {
        fs.mkdirSync(pathFile, { recursive: true });
      }
      fs.writeFileSync(path.join(pathFile, fileName), img.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        'произошла ошибка с сохранением',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
