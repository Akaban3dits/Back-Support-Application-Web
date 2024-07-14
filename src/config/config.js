import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;

export const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432,
};

export const jwtSecret = process.env.JWT_SECRET;
