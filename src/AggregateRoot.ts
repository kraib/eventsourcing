import { BaseRepository } from "./repository/BaseRepository";

export class AggregateRoot {
  public applyEvent: Function;

  constructor(applyEvent: Function) {
    this.applyEvent = applyEvent;
  }
}
