import { AccountAggregate } from "./AccountAggregate";
import { AccountEvent } from "./events/interfaces/IAccount";
import { BaseRepository } from "./repository/BaseRepository";
import { Accounts, Account, AccountType } from "./entites/Account";
export interface Configuration {
  repository: BaseRepository<AccountEvent, Accounts>;
}
export class AccountsService {
  public repository: BaseRepository<AccountEvent, Accounts>;
  aggregates: { [id: string]: AccountAggregate };
  constructor(repo: BaseRepository<AccountEvent, Accounts>) {
    this.repository = repo;
    this.aggregates = {};
  }
  public getRepository() {
    return this.repository;
  }
  public eventHandler = (event: AccountEvent) => {
    this.repository.append(event);
  };
  public reset = () => {
    this.aggregates = {};
    this.repository.reset();
  };
  public createAccount = (account: string) => {
    if (!this.aggregates[account]) {
      this.aggregates[account] = new AccountAggregate(
        this.eventHandler,
        account
      );
      this.aggregates[account].createAccount();
    } else {
      throw "Account already exists";
    }
  };
  public undo = (account: string, numberOfTransactions: number) => {
    this.repository.undo({ [account]: 0 }, numberOfTransactions);
  };
  public makeDeposit = (account: string, amount: number) => {
    if (this.aggregates[account]) {
      this.aggregates[account].makeAccountDeposit(amount);
    } else {
      throw "Account does not exists";
    }
  };
  public makeWithDraw = (account: string, amount: number) => {
    if (this.aggregates[account]) {
      this.aggregates[account].makeAccountWithdraw(amount);
    } else {
      throw "Account does not exists";
    }
  };
}
