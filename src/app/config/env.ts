import dotenv from "dotenv";
dotenv.config();

type NodeEnvironment = "development" | "production";

interface EnvConfig {
  DB_URL: string;
  PORT: string;
  NODE_ENV: NodeEnvironment;
  SALT_VALUE: string;
  JWT_SECRET: string;
  EXPIRES_IN: string;
  SUPER_ADMIN_EMAIL:string;
  SUPER_ADMIN_PASSWORD:string;
}

const isValidNodeEnv = (nodeEnv: string): nodeEnv is NodeEnvironment =>
  nodeEnv === "development" || nodeEnv === "production";

const requiredEnvVariables: (keyof EnvConfig)[] = [
  "DB_URL",
  "NODE_ENV",
  "PORT",
  "SALT_VALUE",
  "JWT_SECRET",
  "EXPIRES_IN",
  "SUPER_ADMIN_EMAIL",
  "SUPER_ADMIN_PASSWORD"
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
