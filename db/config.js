import dotenv from "dotenv";

dotenv.config();

// const config = {
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASS
// };

const config = {
    connectionString: process.env.DATABASE_URL
}

export default config;