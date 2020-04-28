import redis from 'redis';
import { promisify } from 'util';

import { ICacheRepository } from '../interfaces/ICacheRepository';

import { cacheConnectionConfig } from '../config/cacheConnectionConfig';

const redisClient = redis.createClient(cacheConnectionConfig);

const getAsync = promisify(redisClient.get).bind(redisClient);

export const cacheRepository: ICacheRepository = {
  get(key: string): Promise<string> {
    return getAsync(key);
  },
  set<T>(key: string, value: T, expiration: number = 300): boolean {
    return redisClient.setex(key, expiration, JSON.stringify(value));
  }
};
