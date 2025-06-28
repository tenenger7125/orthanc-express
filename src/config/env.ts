import Joi from 'joi';
import dotenv from 'dotenv';

dotenv.config();

// Define the schema
const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  PORT: Joi.number().required(),
  DATABASE_URL: Joi.string().uri().required(),
  API_KEY: Joi.string().required(),
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
};

export default config;
