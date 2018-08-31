import dotenv from "dotenv";

dotenv.config();


const config = {
    development: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT
    },
    test: {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.TEST_DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT
    }
}

export default config;