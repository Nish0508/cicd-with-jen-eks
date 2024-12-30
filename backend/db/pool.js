import * as mysql from "mysql";
import { dbConfig } from "./config.js";
import { queryDb } from "./utils.js";

export const dbPool = mysql.createPool({
  connectionLimit: 10,
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});

export const queryDbPool = (query, args) => {
  return queryDb(dbPool, query, args);
};
