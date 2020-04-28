export class PaginationInfo {
  totalPages: number;

  constructor(
    public totalItems: number,
    public itemsPerPage: number,
    public currentPage: number
  ) {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }
}
