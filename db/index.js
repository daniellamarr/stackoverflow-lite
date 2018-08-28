import { Pool, Client } from "pg";



const dbConfig = new Pool({
    user: 'stackapp',
    host: 'localhost',
    database: 'postgres',
    password: 'madamtankoisbae',
    port: 60404
});

export default dbConfig;