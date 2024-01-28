import 'multer';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { extension } from 'mime-types';
import dayjs from 'dayjs';

import { FileStorageConfig } from '@project/libs/config/file-storage';
import { FileRepository } from './file.repository';
import { FileEntity } from './file.entity';
import { StoredFile } from '@project/libs/types';


@Injectable()
export class FileUploaderService {
  private readonly logger = new Logger(FileUploaderService.name);
  private readonly DATE_FORMAT = 'YYYY MM';

  constructor(
    @Inject(FileStorageConfig.KEY)
    private readonly config: ConfigType<typeof FileStorageConfig>,
    private readonly fileRepository: FileRepository,
  ) {}

  private getUploadDirectoryPath(): string {
    return this.config.uploadDirectory!;
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.getUploadDirectoryPath(), this.getSubUploadDirectoryPath(), filename);
  }

  private getSubUploadDirectoryPath(): string {
    const [year, month] = dayjs().format(this.DATE_FORMAT).split(' ');
    return join(year, month);
  }

  public async writeFile(file: Express.Multer.File): Promise<StoredFile | undefined> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath();
      const subDirectory = this.getSubUploadDirectoryPath();
      const fileExtension = extension(file.mimetype) || '';
      const filename = `${randomUUID()}.${fileExtension}`;
      const path = this.getDestinationFilePath(filename);

      await ensureDir(join(uploadDirectoryPath, subDirectory));
      await writeFile(path, file.buffer);

      return {
        filename,
        fileExtension,
        subDirectory,
        path,
      };

    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error while saving file: ${error.message}`);
        throw new Error(`Can't save file`);
      }
    }
  }

  public async saveFile(file: Express.Multer.File): Promise<FileEntity> {
    const storedFile = await this.writeFile(file);
    const fileEntity = FileEntity.fromObject({
      hashName: storedFile!.filename,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: storedFile!.path,
      size: file.size,
      subDirectory: storedFile!.subDirectory,
    });

    return this.fileRepository.save(fileEntity);
  }

  public async getFile(fileId: string): Promise<FileEntity> {
    const existFile = await this.fileRepository.findById(fileId);

    if (! existFile) {
      throw new NotFoundException(`File not found: ${fileId}`);
    }

    return existFile;
  }
}
