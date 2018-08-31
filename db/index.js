import { Pool } from "pg";
import dotenv from "dotenv";
import config from "./config";

dotenv.config();
let mode;

if (process.env.NODE_ENV === "production") {
    mode = process.env.DATABASE_URL;
}else{
    mode = config[process.env.NODE_ENV || "development"];
}

const db = new Pool(mode);

export default db;