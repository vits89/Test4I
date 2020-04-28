import { IDbConnectionConfig } from '../models/IDbConnectionConfig';

export const dbConnectionConfig: IDbConnectionConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number.parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'leaderboard'
}
