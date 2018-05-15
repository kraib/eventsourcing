import { AggregateRoot } from "./AggregateRoot";
import {
  AccountCreatedEvent,
  AccountEventType,
  AccountClosedEvent,
  MoneyDepositedEvent,
  MoneyWithDrawnEvent
} from "./events/AccountEvent";

export class AccountAggregate extends AggregateRoot {
  private id: string;

  constructor(applyEvent: Function, id: string) {
    super(applyEvent);
    this.id = id;
  }

  public createAccount() {
    this.applyEvent(new AccountCreatedEvent(this.id, 0));
  }
  public closeAccount() {
    this.applyEvent(new AccountClosedEvent(this.id));
  }
  public makeAccountDeposit(amount: number) {
    this.applyEvent(new MoneyDepositedEvent(this.id, amount));
  }
  public makeAccountWithdraw(amount: number) {
    this.applyEvent(new MoneyWithDrawnEvent(this.id, amount));
  }
}
