import * as dotenv from "dotenv";
dotenv.config();

export interface IConfig {
  CLOUDINARY_API_NAME: string;
  CLOUDINARY_KEY: string;
  CLOUDINARY_SECRET: string;
}

const config = {
  ENV: process.env.ENVIRONMENT,
  CLOUDINARY_API_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_API_SECRET,
};

export default config;
