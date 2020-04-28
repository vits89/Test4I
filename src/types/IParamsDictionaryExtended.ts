import { ParamsDictionary } from 'express-serve-static-core';

export interface IParamsDictionaryExtended extends ParamsDictionary {
  cachedValue: string;
}
