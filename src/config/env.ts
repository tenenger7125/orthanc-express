import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

interface EnvSchema {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  DATABASE_URL: string;
  API_KEY: string;
  JWT_ACCESS_TOKEN_SECRET: string;
  JWT_REFRESH_TOKEN_SECRET: string;
  ORTHANC_USERNAME: string;
  ORTHANC_PASSWORD: string;
  DICOM_SOURCE_AET: string;
  DICOM_SOURCE_IP: string;
  DICOM_SOURCE_PORT: number;
  DICOM_TARGET_AET: string;
  DICOM_TARGET_IP: string;
  DICOM_TARGET_PORT: number;
}

// Define the schema
const envSchema = Joi.object<EnvSchema>({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  PORT: Joi.number().required(),
  DATABASE_URL: Joi.string().uri().required(),
  API_KEY: Joi.string().required(),
  JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
  ORTHANC_USERNAME: Joi.string().required(),
  ORTHANC_PASSWORD: Joi.string().required(),
  DICOM_SOURCE_AET: Joi.string().required(),
  DICOM_SOURCE_IP: Joi.string().required(),
  DICOM_SOURCE_PORT: Joi.number().required(),
  DICOM_TARGET_AET: Joi.string().required(),
  DICOM_TARGET_IP: Joi.string().required(),
  DICOM_TARGET_PORT: Joi.number().required(),

  // Add more variables as needed
});

// Validate the environment variables
const { error, value: envVars } = envSchema.validate(process.env, {
  abortEarly: false, // 모두 수집
  allowUnknown: true, // 에러는 내지 말고
  stripUnknown: true, // 반환 객체에서는 제거;
});

if (error) {
  console.error('Config validation error(s):');
  error.details.forEach(detail => {
    console.error(`- ${detail.message}`);
  });
  throw new Error('Environment variables validation failed.');
}

const config = {
  nodeEnv: envVars.NODE_ENV,
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  apiKey: envVars.API_KEY,
  jwtAccessTokenSecret: envVars.JWT_ACCESS_TOKEN_SECRET,
  jwtRefreshTokenSecret: envVars.JWT_REFRESH_TOKEN_SECRET,
  orthancUsername: envVars.ORTHANC_USERNAME,
  orthancPassword: envVars.ORTHANC_PASSWORD,
  dicomSourceAet: envVars.DICOM_SOURCE_AET,
  dicomSourceIp: envVars.DICOM_SOURCE_IP,
  dicomSourcePort: envVars.DICOM_SOURCE_PORT,
  dicomTargetAet: envVars.DICOM_TARGET_AET,
  dicomTargetIp: envVars.DICOM_TARGET_IP,
  dicomTargetPort: envVars.DICOM_TARGET_PORT,
};

export default config;
