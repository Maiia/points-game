import dotenv from 'dotenv';
dotenv.config();

export const config = {
    db: {
        connectionString: process.env.DATABASE_URL as string,
    },
};