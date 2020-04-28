import { Request, Response } from 'express';

import { IDonator } from '../entities/IDonator';

import { Error } from '../models/Error';
import { IPagedList } from '../models/IPagedList';
import { PaginationInfo } from '../models/PaginationInfo';

import { IParamsDictionaryExtended } from '../types/IParamsDictionaryExtended';

import { CACHE_KEYS } from '../constants/cacheKeys';

import { cacheRepository } from '../data/cacheRepository';
import { donatorsRepository } from '../data/donatorsRepository';

const pageSize = 10;

export const donatorsController = {
  getTop: (req: Request<IParamsDictionaryExtended>, res: Response<IPagedList<IDonator> | Error>): void => {
    let page = Number.parseInt(req.query.page as string);

    if (Number.isNaN(page) || (page < 1)) {
      page = 1;
    }

    const { cachedValue } = req.params;

    if (cachedValue) {
      const donators = JSON.parse(cachedValue) as IDonator[];

      res.send({
        data: donators.slice((page - 1) * pageSize, page * pageSize),
        paginationInfo: new PaginationInfo(donators.length, pageSize, page)
      });

      return;
    }

    donatorsRepository.getTop()
      .then(donators => {
        cacheRepository.set(CACHE_KEYS.TOP_DONATORS, donators);

        res.send({
          data: donators.slice((page - 1) * pageSize, page * pageSize),
          paginationInfo: new PaginationInfo(donators.length, pageSize, page)
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  }
};
