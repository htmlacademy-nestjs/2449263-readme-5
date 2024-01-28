import { Types } from 'mongoose';
import { BAD_MONGO_ID_ERROR } from './pipe-constant';
import {
  ArgumentMetadata, BadRequestException, Injectable,
  PipeTransform
} from '@nestjs/common';


@Injectable()
export class MongoIdValidationPipe implements PipeTransform {
  public transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error('This pipe must be used only with params!')
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(BAD_MONGO_ID_ERROR);
    }

    return value;
  }
}