import { IUser } from '../entities/IUser';

export interface IUsersRepository {
  addDonation(amount: number, donateeId: number, donatorId: number): Promise<number>;
  getDonators(id: number): Promise<IUser[]>;
}
