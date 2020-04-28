import { NextFunction, Request, RequestHandler, Response } from 'express';

import { IParamsDictionaryExtended } from '../types/IParamsDictionaryExtended';

import { cacheRepository } from '../data/cacheRepository';

export const setCachedValue = (key?: string): RequestHandler<IParamsDictionaryExtended> => {
  return (req: Request<IParamsDictionaryExtended>, res: Response, next: NextFunction) => {
    if (!key) {
      const { id } = req.params;

      if (id) {
        key = id;
      } else {
        next();
      }
    }

    cacheRepository.get(key as string)
      .then(value => {
        if (value) {
          req.params.cachedValue = value;
        }

        next();
      })
      .catch(err => {
        res.status(500).send(err);
      });
  };
};
