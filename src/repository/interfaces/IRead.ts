export interface IRead<K> {
  query(number: number): K;
  queryBalanceById(id: string): number;
  getEvents(): void;
  rebuild(number: number): void;
}
