export class Error {
  public message: string;

  constructor(message?: string) {
    this.message = message ?? 'Something went wrong. Please contact administrator.';
  }
}
