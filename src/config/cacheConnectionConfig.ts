import { ICacheConnectionConfig } from '../models/ICacheConnectionConfig';

export const cacheConnectionConfig: ICacheConnectionConfig = {
  host: process.env.CACHE_HOST || 'localhost',
  port: Number.parseInt(process.env.CACHE_PORT || '6379')
}
