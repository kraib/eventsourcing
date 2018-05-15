export enum AccountType {
  Savings = "Savings"
}
export interface Accounts {
  [id: string]: number;
}
export class Account {
  private type: AccountType;
  private id: string;
  private balance: number;
  private timestamp: Date;

  constructor(type: AccountType, id: string, openingBalance: number) {
    this.type = type;
    this.id = id;
    this.balance = openingBalance;
    this.timestamp = new Date();
  }
}
