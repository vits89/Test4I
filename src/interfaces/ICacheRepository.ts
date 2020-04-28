export interface ICacheRepository {
  get(key: string): Promise<string>;
  set<T>(key: string, value: T): boolean;
}
