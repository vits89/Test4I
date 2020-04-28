import { Request, Response } from 'express';

import { IUser } from '../entities/IUser';

import { Error } from '../models/Error';
import { IDonation } from '../models/IDonation';
import { IPagedList } from '../models/IPagedList';
import { PaginationInfo } from '../models/PaginationInfo';

import { IParamsDictionaryExtended } from '../types/IParamsDictionaryExtended';

import { cacheRepository } from '../data/cacheRepository';
import { usersRepository } from '../data/usersRepository';

const pageSize = 10;

export const usersController = {
  donate: (req: Request, res: Response<Error | null>): void => {
    const id = Number.parseInt(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).send(new Error('User ID not is number.'));

      return;
    }

    const donation = req.body as IDonation;

    usersRepository.addDonation(donation.amount, donation.donateeId, id)
      .then(_ => {
        res.sendStatus(204);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },
  getDonators: (req: Request<IParamsDictionaryExtended>, res: Response<IPagedList<IUser> | Error>): void => {
    const id = Number.parseInt(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).send(new Error('User ID not is number.'));

      return;
    }

    let page = Number.parseInt(req.query.page as string);

    if (Number.isNaN(page) || (page < 1)) {
      page = 1;
    }

    const { cachedValue } = req.params;

    if (cachedValue) {
      const donators = JSON.parse(cachedValue) as IUser[];

      res.send({
        data: donators.slice((page - 1) * pageSize, page * pageSize),
        paginationInfo: new PaginationInfo(donators.length, pageSize, page)
      });

      return;
    }

    usersRepository.getDonators(id)
      .then(donators => {
        cacheRepository.set(id.toString(), donators);

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
