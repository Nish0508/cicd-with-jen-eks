export const queryDb = (db, query, args) => {
  return new Promise((resolve, reject) => {
    db.query(query, args, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
