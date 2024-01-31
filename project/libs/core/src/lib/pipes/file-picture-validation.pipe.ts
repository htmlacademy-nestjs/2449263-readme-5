import {
  Injectable, PipeTransform, ArgumentMetadata, BadRequestException
} from '@nestjs/common';

import { 
  FilePicture, 
  BAD_FILE_PICTURE_ERROR,
  FILE_PICTURE_MAXSIZE_BYTES
} 
from './pipe-constant'; 


@Injectable()
export class FilePictureValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || !Object.values(FilePicture).includes(value.mimetype) || 
      value.size > FILE_PICTURE_MAXSIZE_BYTES) 
    {
      throw new BadRequestException(BAD_FILE_PICTURE_ERROR);
    }
    return value;
  }
}