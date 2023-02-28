
const queryPromise = async (query, fn) => {
  return new Promise((resolve, reject) => {
    const connection = fn();
    connection.query(query, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
      connection.end();
    });
  });
};
module.exports = queryPromise;
