import mysql from 'mysql';

import { IUser } from '../entities/IUser';
import { Error } from '../models/Error';
import { IUsersRepository } from '../interfaces/IUsersRepository';

import { dbConnectionConfig } from '../config/dbConnectionConfig';

export const usersRepository: IUsersRepository = {
  addDonation(amount: number, donateeId: number, donatorId: number): Promise<number> {
    const connection = mysql.createConnection(dbConnectionConfig);

    connection.connect(err => {
      if (err) throw new Error(err.sqlMessage);
    });

    return new Promise<number>((resolve, reject) => {
      const query =
        `INSERT INTO donators (donator_id, donatee_id, amount)
              VALUES (?, ?, ?)`;

      connection.query(query, [donatorId, donateeId, amount], (error, results: { insertId: number }) => {
        if (error) {
          reject(new Error(error.sqlMessage));
        } else {
          resolve(results.insertId);
        }
      });

      connection.end();
    });
  },
  getDonators(id: number): Promise<IUser[]> {
    const connection = mysql.createConnection(dbConnectionConfig);

    connection.connect(err => {
      if (err) throw new Error(err.sqlMessage);
    });

    return new Promise<IUser[]>((resolve, reject) => {
      const query =
        `SELECT DISTINCT u.*
           FROM users u
           JOIN donators d ON d.donator_id = u.id
          WHERE d.donatee_id = ?`;

      connection.query(query, id, (error, results: IUser[]) => {
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
