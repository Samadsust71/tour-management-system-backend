"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const isValidNodeEnv = (nodeEnv) => nodeEnv === "development" || nodeEnv === "production";
const requiredEnvVariables = [
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
    "SUPER_ADMIN_PHONE",
    "SUPER_ADMIN_ADDRESS",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_CALLBACK_URL",
    "EXPRESS_SESSION_SECRET",
    "FRONTEND_URL",
    // SSL
    "SSL_STORE_ID",
    "SSL_STORE_PASS",
    "SSL_PAYMENT_API",
    "SSL_VALIDATION_API",
    "SSL_SUCCESS_BACKEND_URL",
    "SSL_FAIL_BACKEND_URL",
    "SSL_CANCEL_BACKEND_URL",
    "SSL_SUCCESS_FRONTEND_URL",
    "SSL_FAIL_FRONTEND_URL",
    "SSL_CANCEL_FRONTEND_URL",
    "SSL_IPN_URL",
    // CLOUDINARY
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
    // SMTP
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
    "SMTP_FROM",
    "SMTP_CONNECTION_TIMEOUT",
    // Redis
    "REDIS_HOST",
    "REDIS_PORT",
    "REDIS_PASSWORD",
    "REDIS_USERNAME"
];
const loadEnvVariables = () => {
    const config = {};
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
        }
        else {
            config[key] = value;
        }
    });
    return config;
};
exports.envVars = loadEnvVariables();
