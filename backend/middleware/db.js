import { SentryErrorClass } from "../utils/errorHandling.js";
import { dbPool } from "../db/pool.js";

const dbMiddleware = async (req, res, next) => {
  try {
    // console.log(JSON.stringify(db_server_credentials))
    // console.log(pool)
    req.mysqlDb = dbPool;
    next();
  } catch (err) {
    const message = `Error in db ${err}`;
    new SentryErrorClass(err, message);
    res.status(500).json({
      status: 500,
      message: "Error from the database"
    });
  }
};

export default dbMiddleware;
