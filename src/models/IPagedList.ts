import { PaginationInfo } from './PaginationInfo';

export interface IPagedList<T> {
  data: T[];
  paginationInfo: PaginationInfo;
}
