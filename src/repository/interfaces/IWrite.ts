export interface IWrite<T, K> {
  append(event: T): void;
  undo(accounts: K, lastX: number): void;
  reset(): void;
}
