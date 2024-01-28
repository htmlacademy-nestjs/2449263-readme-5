import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { FileStorageConfigModule, getMongooseOptions } from '@project/libs/config/file-storage';


@Module({
  imports: [
    FileUploaderModule, 
    FileStorageConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions())
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
