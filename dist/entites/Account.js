"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AccountType;
(function (AccountType) {
    AccountType["Savings"] = "Savings";
})(AccountType = exports.AccountType || (exports.AccountType = {}));
class Account {
    constructor(type, id, openingBalance) {
        this.type = type;
        this.id = id;
        this.balance = openingBalance;
        this.timestamp = new Date();
    }
}
exports.Account = Account;
