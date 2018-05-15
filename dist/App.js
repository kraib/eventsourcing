"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountAggregate_1 = require("./AccountAggregate");
class AccountsService {
    constructor(repo) {
        this.eventHandler = (event) => {
            this.repository.append(event);
        };
        this.reset = () => {
            this.aggregates = {};
            this.repository.reset();
        };
        this.createAccount = (account) => {
            if (!this.aggregates[account]) {
                this.aggregates[account] = new AccountAggregate_1.AccountAggregate(this.eventHandler, account);
                this.aggregates[account].createAccount();
            }
            else {
                throw "Account already exists";
            }
        };
        this.undo = (account, numberOfTransactions) => {
            this.repository.undo({ [account]: 0 }, numberOfTransactions);
        };
        this.makeDeposit = (account, amount) => {
            if (this.aggregates[account]) {
                this.aggregates[account].makeAccountDeposit(amount);
            }
            else {
                throw "Account does not exists";
            }
        };
        this.makeWithDraw = (account, amount) => {
            if (this.aggregates[account]) {
                this.aggregates[account].makeAccountWithdraw(amount);
            }
            else {
                throw "Account does not exists";
            }
        };
        this.repository = repo;
        this.aggregates = {};
    }
    getRepository() {
        return this.repository;
    }
}
exports.AccountsService = AccountsService;
