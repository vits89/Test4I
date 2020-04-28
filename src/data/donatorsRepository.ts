import mysql from 'mysql';

import { IDonator } from '../entities/IDonator';
import { Error } from '../models/Error';
import { IDonatorsRepository } from '../interfaces/IDonatorsRepository';

import { dbConnectionConfig } from '../config/dbConnectionConfig';

export const donatorsRepository: IDonatorsRepository = {
  getTop(): Promise<IDonator[]> {
    const connection = mysql.createConnection(dbConnectionConfig);

    connection.connect(err => {
      if (err) throw new Error(err.sqlMessage);
    });

    return new Promise<IDonator[]>((resolve, reject) => {
      const query =
        `SELECT u.*, SUM(d.amount) AS sum
           FROM users u
           JOIN donators d ON d.donator_id = u.id
       GROUP BY u.id
       ORDER BY sum DESC`;

      connection.query(query, (error, results: IDonator[]) => {
        if (error) {
          reject(new Error(error.sqlMessage));
        } else {
          resolve(results);
        }
      });

      connection.end();
    });
  }
};
