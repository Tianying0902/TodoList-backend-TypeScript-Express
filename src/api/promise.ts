import { QueryPromise,ITodo } from "../types";
const queryPromise:QueryPromise = async (query:string, fn:Function) => {
  return new Promise((resolve, reject) => {
    const connection = fn();
    connection.query(query, (err:string, data:Promise<void>) => {
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
