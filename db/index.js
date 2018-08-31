import { Pool } from "pg";
import dotenv from "dotenv";
import config from "./config";
import parseUrl from "parse-database-url";

dotenv.config();
let mode;

if (process.env.NODE_ENV === "production") {
    mode = parseUrl(process.env.DATABASE_URL);
}else{
    mode = config[process.env.NODE_ENV || "development"];
}

const db = new Pool(mode);

export default db;