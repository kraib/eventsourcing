import { IWrite } from "./interfaces/IWrite";
import { IRead } from "./interfaces/IRead";

export abstract class BaseRepository<T, K> implements IWrite<T, K>, IRead<K> {
  append(event: T) {
    throw new Error("Method not implemented.");
  }
  undo(accounts: K, lastX: number) {
    throw new Error("Method not implemented.");
  }
  reset() {
    throw new Error("Method not implemented.");
  }
  query(): K {
    throw new Error("Method not implemented.");
  }
  queryBalanceById(account: string): number {
    throw new Error("Method not implemented.");
  }
  getEvents() {
    throw new Error("Method not implemented.");
  }
  rebuild(number: number) {
    throw new Error("Method not implemented.");
  }
}
