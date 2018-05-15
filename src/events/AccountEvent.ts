import { AccountEvent } from "./interfaces/IAccount";

export enum AccountEventType {
  Open = "open",
  Close = "close",
  Deposit = "deposit",
  Withdraw = "withdraw"
}

export class AccountCreatedEvent implements AccountEvent {
  type: AccountEventType;
  id: string;
  balance: number;
  timestamp: Date;

  constructor(id: string, openingBalance: number) {
    this.type = AccountEventType.Open;
    this.id = id;
    this.balance = openingBalance;
    this.timestamp = new Date();
  }
}
export class AccountClosedEvent implements AccountEvent {
  type: AccountEventType;
  id: string;
  timestamp: Date;

  constructor(id: string) {
    this.type = AccountEventType.Close;
    this.id = id;
    this.timestamp = new Date();
  }
}

export class MoneyWithDrawnEvent implements AccountEvent {
  type: AccountEventType;
  id: string;
  amount: number;
  timestamp: Date;

  constructor(id: string, amount: number) {
    this.type = AccountEventType.Withdraw;
    this.id = id;
    this.amount = amount;
    this.timestamp = new Date();
  }
}
export class MoneyDepositedEvent implements AccountEvent {
  type: AccountEventType;
  id: string;
  amount: number;
  timestamp: Date;

  constructor(id: string, amount: number) {
    this.type = AccountEventType.Deposit;
    this.id = id;
    this.amount = amount;
    this.timestamp = new Date();
  }
}
