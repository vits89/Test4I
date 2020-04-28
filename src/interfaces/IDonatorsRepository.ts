import { IDonator } from '../entities/IDonator';

export interface IDonatorsRepository {
  getTop(): Promise<IDonator[]>;
}
