import url from "url";
import path from "path";

export const isProd = process.env.NODE_ENV === "production";

export const isDevelopment = process.env.NODE_ENV === "development";

export const PORT = process.env.PORT || 8000;

console.log(`is Prod - ${isProd}`);

export const cookieSecret = isProd ? process.env.COOKIE_SECRET_PROD : process.env.COOKIE_SECRET;

export const corsSettings = isProd
  ? {
      credentials: true,
      origin: [
        "https://app.mentalyc.com",
        "https://www.app.mentalyc.com",
        "https://checkout.stripe.com",
        "https://d39ju18n9z38j5.cloudfront.net"
      ],
      methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
      exposedHeaders: ["frontend-version"]
    }
  : {
      credentials: true,
      origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:5173",
        "https://www.test.mentalyc.com",
        "https://www.testus.mentalyc.com",
        "https://www.staging.mentalyc.com",
        "https://test.mentalyc.com",
        "https://testus.mentalyc.com",
        "https://checkout.stripe.com"
      ],
      methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
      exposedHeaders: ["frontend-version"]
    };

export const SERVER_ROOT_DIR = path.dirname(url.fileURLToPath(import.meta.url));
