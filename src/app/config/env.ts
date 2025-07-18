import dotenv from "dotenv";
dotenv.config();

type NodeEnvironment = "development" | "production";

interface EnvConfig {
  DB_URL: string;
  PORT: string;
  NODE_ENV: NodeEnvironment;
  SALT_VALUE: string;
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  ACCESS_EXPIRES_IN: string;
  REFRESH_EXPIRES_IN:string;
  SUPER_ADMIN_EMAIL:string;
  SUPER_ADMIN_PASSWORD:string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK_URL:string;
  EXPRESS_SESSION_SECRET:string;
  FRONTEND_URL:string;
}

const isValidNodeEnv = (nodeEnv: string): nodeEnv is NodeEnvironment =>
  nodeEnv === "development" || nodeEnv === "production";

const requiredEnvVariables: (keyof EnvConfig)[] = [
  "DB_URL",
  "NODE_ENV",
  "PORT",
  "SALT_VALUE",
  "JWT_ACCESS_SECRET",
  "ACCESS_EXPIRES_IN",
  "JWT_REFRESH_SECRET",
  "REFRESH_EXPIRES_IN",
  "SUPER_ADMIN_EMAIL",
  "SUPER_ADMIN_PASSWORD",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_CALLBACK_URL",
  "EXPRESS_SESSION_SECRET",
  "FRONTEND_URL"
];

const loadEnvVariables = (): EnvConfig => {
  const config: Partial<EnvConfig> = {};

  requiredEnvVariables.forEach((key) => {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Missing required environment variable: ${key}`);
    }

    if (key === "NODE_ENV") {
      if (!isValidNodeEnv(value)) {
        throw new Error(`Invalid NODE_ENV value: ${value}`);
      }
      config[key] = value;
    } else {
      config[key] = value;
    }
  });

  return config as EnvConfig;
};

export const envVars = loadEnvVariables();
