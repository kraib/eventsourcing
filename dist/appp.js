"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AccountAggregate_1 = require("./AccountAggregate");
const AccountRepository_1 = require("./repository/AccountRepository");
const agg = new AccountAggregate_1.AccountAggregate(cb, "Account");
const repo = new AccountRepository_1.AccountRepository();
function cb(event) {
    repo.append(event);
}
agg.createAccount();
agg.makeAccountDeposit("Account", 100);
agg.makeAccountDeposit("Account", 200);
agg.makeAccountWithdraw("Account", 200);
console.log("repo", repo.query());
