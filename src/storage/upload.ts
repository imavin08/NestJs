import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import dayjs from 'dayjs';

import { UploadFileResponseType, ImageDataType } from './dto/dto';
import { getGoogleStorage, getBucketName } from './storage';

@Injectable()
export class StorageService {
  async save(file: ImageDataType): Promise<UploadFileResponseType> {
    if (!file) {
      return;
    }
    try {
      const bucket = this.getBucket();
      const { buffer, imageName, format } = file;
      const date = dayjs().format('YYYY-MM-DD');
      const id = uuid();
      const newFile = bucket.file(`images/${date}/${id}.${format}`);
      await newFile.save(buffer, { public: true });
      const url = newFile.publicUrl();
      const {
        metadata: { name, mediaLink, size },
      } = newFile;
      return { id, imageName, url, mediaLink, size, fileId: name };
    } catch (error) {
      console.log(error.message);
    }
  }

  //   async delete(fileUrl: string): Promise<void> {
  //     let imagePath = fileUrl.split('/').pop();
  //     imagePath = imagePath.replace(/%2F/gi, '/');
  //     try {
  //       const bucket = this.getBucket();
  //       const file = bucket.file(imagePath);

  //       await file.delete();
  //     } catch (err) {
  //       console.log(err.message, 'FileService: dont save');
  //     }
  //   }

  private getBucket() {
    return getGoogleStorage().bucket(getBucketName());
  }
}
