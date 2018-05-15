"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AccountEventType;
(function (AccountEventType) {
    AccountEventType["Open"] = "open";
    AccountEventType["Close"] = "close";
    AccountEventType["Deposit"] = "deposit";
    AccountEventType["Withdraw"] = "withdraw";
})(AccountEventType = exports.AccountEventType || (exports.AccountEventType = {}));
class AccountCreatedEvent {
    constructor(id, openingBalance) {
        this.type = AccountEventType.Open;
        this.id = id;
        this.balance = openingBalance;
        this.timestamp = new Date();
    }
}
exports.AccountCreatedEvent = AccountCreatedEvent;
class AccountClosedEvent {
    constructor(id) {
        this.type = AccountEventType.Close;
        this.id = id;
        this.timestamp = new Date();
    }
}
exports.AccountClosedEvent = AccountClosedEvent;
class MoneyWithDrawnEvent {
    constructor(id, amount) {
        this.type = AccountEventType.Withdraw;
        this.id = id;
        this.amount = amount;
        this.timestamp = new Date();
    }
}
exports.MoneyWithDrawnEvent = MoneyWithDrawnEvent;
class MoneyDepositedEvent {
    constructor(id, amount) {
        this.type = AccountEventType.Deposit;
        this.id = id;
        this.amount = amount;
        this.timestamp = new Date();
    }
}
exports.MoneyDepositedEvent = MoneyDepositedEvent;
