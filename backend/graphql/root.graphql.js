import { SentryErrorClass } from "../utils/errorHandling.js";

// const tutorials = require("../controllers/tutorial.controller.js");

const queryDB = (req, sql, args) =>
  new Promise((resolve, reject) => {
    req.mysqlDb.query(sql, args, (err, rows, fields) => {
      if (err) {
        const sentryError = new SentryErrorClass(err, `in mysql error - ${err}`);
        return reject(sentryError);
      }
      rows.changedRows !== undefined || rows.affectedRows !== undefined || rows.insertId !== undefined ? resolve(true) : resolve(rows);
    });
    // req.mysqlDb.end(function (errCon) {
    //   defLogger.info("connection closed")
    // });
  });

export const root = {
  getTherapistByEmail: (args, req) => queryDB(req, "select * from mentalyc_users where user_email = ? and user_type = 'therapist'", [args.user_email]).then((data) => data[0]),
};
