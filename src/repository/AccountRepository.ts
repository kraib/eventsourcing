import * as fs from "fs";
import * as path from "path";
import { EOL } from "os";
import * as _ from "lodash";
import { BaseRepository } from "./BaseRepository";
import { AccountEvent } from "../events/interfaces/IAccount";
import {
  AccountEventType,
  AccountClosedEvent,
  AccountCreatedEvent,
  MoneyWithDrawnEvent,
  MoneyDepositedEvent
} from "../events/AccountEvent";
import { Accounts } from "../entites/Account";

export class AccountRepository extends BaseRepository<AccountEvent, Accounts> {
  private eventLogPath: string;
  private accounts: Accounts;
  private events: AccountEvent[] = [];
  constructor() {
    super();
    this.accounts = {};
    this.eventLogPath = path.join(__dirname, "../event_log.txt");
    this.reset();
    this.getEvents();
  }

  reset() {
    this.accounts = {};
    this.events = [];
    fs.writeFileSync(this.eventLogPath, "");
  }
  append(event: AccountEvent) {
    fs.appendFileSync(this.eventLogPath, JSON.stringify(event) + EOL);
  }
  getEvents() {
    const eventLines = fs.readFileSync(this.eventLogPath, "utf-8");
    this.events = fs
      .readFileSync(this.eventLogPath, "utf-8")
      .split(EOL)
      .filter((eventLineStr: string) => eventLineStr.length)
      .map((eventLineStr: string) => {
        return JSON.parse(eventLineStr);
      });
  }

  rebuild() {
    this.getEvents();
    this.accounts = this.events.reduce(
      (accounts: Accounts, event: AccountEvent) => {
        if (event.type === AccountEventType.Open) {
          accounts[event.id] = 0;
        } else if (event.type === AccountEventType.Close) {
          delete accounts[event.id];
        } else if (event.type === AccountEventType.Deposit) {
          accounts[event.id] += event.amount || 0;
        } else if (event.type === AccountEventType.Withdraw) {
          accounts[event.id] -= event.amount || 0;
        }
        return accounts;
      },
      {}
    );
  }

  undo(accounts: Accounts, lastX: number) {
    this.rebuild();
    const events = this.events.splice(-lastX).reduceRight((accounts, event) => {
      if (event.type === AccountEventType.Open) {
        delete accounts[event.id];
      } else if (event.type === AccountEventType.Close) {
        accounts[event.id] = event.amount || 0;
      } else if (event.type === AccountEventType.Deposit) {
        accounts[event.id] -= event.amount || 0;
      } else if (event.type === AccountEventType.Withdraw) {
        accounts[event.id] += event.amount || 0;
      }
      return accounts;
    }, _.clone(accounts));
    console.log(events, "e");
  }
  query(): Accounts {
    this.rebuild();
    return this.accounts;
  }
  queryBalanceById(id: string): number {
    this.rebuild();
    return this.accounts[id];
  }
}
