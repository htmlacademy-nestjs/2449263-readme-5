import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { 
  DEFAULT_PORT, DEFAULT_MONGO_PORT, DEFAULT_STATIC_ROOT, 
  ENVIRONMENTS 
} from './file-storage-config.constant';

type Environment = typeof ENVIRONMENTS[number];


export interface fileStorageConfig {
  environment: string;
  port: number;
  uploadDirectory: string | undefined;
  staticRoot: string | undefined;
  db: {
    host: string | undefined;
    port: number | undefined;
    user: string | undefined;
    name: string | undefined;
    password: string | undefined;
    authBase: string | undefined;
  }
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  port: Joi.number().port().default(DEFAULT_PORT),
  uploadDirectory: Joi.string().required(),
  staticRoot: Joi.string().default(DEFAULT_STATIC_ROOT),
  db: Joi.object({
    host: Joi.string().valid().hostname().required(),
    port: Joi.number().port(),
    name: Joi.string().required(),
    user: Joi.string().required(),
    password: Joi.string().required(),
    authBase: Joi.string().required(),
  }),
});

function validateConfig(config: fileStorageConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`Invalid file-storage config: ${error.message}`);
  }
}

function getConfig(): fileStorageConfig {
  const config: fileStorageConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
    uploadDirectory: process.env.UPLOAD_DIRECTORY_PATH,
    staticRoot: process.env.STATIC_ROOT,
    db: {
      host: process.env.MONGO_HOST,
      port: parseInt(process.env.MONGO_PORT ?? DEFAULT_MONGO_PORT.toString(), 10),
      name: process.env.MONGO_DB,
      user: process.env.MONGO_USER,
      password: process.env.MONGO_PASSWORD,
      authBase: process.env.MONGO_AUTH_BASE,
    }
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
