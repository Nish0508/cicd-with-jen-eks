import dotenv from "dotenv";

dotenv.config();

const isProd = process.env.NODE_ENV === "production";

export const dbConfig = isProd
  ? {
      host: process.env.DB_HOST_PROD,
      user: process.env.DB_USER_PROD,
      password: process.env.DB_PASSWORD_PROD,
      database: process.env.DB_DATABASE_PROD
    }
  : {
      host: process.env.DB_HOST || process.env.LOCAL_DB_HOST,
      user: process.env.DB_USER || process.env.LOCAL_DB_USER,
      password: process.env.DB_PASSWORD || process.env.LOCAL_DB_PASSWORD,
      database: process.env.DB_DATABASE || process.env.LOCAL_DB_DATABASE
    };
