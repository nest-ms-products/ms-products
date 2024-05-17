import { config } from 'dotenv';
import * as joi from 'joi';
interface EnVars {
  PORT: number;
}

if (process.env.NODE_ENV !== 'prod') {
  const configFile = `.env.${process.env.NODE_ENV}`;
  config({ path: configFile });
} else {
  config();
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const enVars: EnVars = value;

export const envs = {
  port: enVars.PORT,
};
