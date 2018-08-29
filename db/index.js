import { Pool, Client } from "pg";
import config from "./config";

const db = new Pool(config);

export default db;