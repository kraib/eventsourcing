"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AggregateRoot_1 = require("./AggregateRoot");
const AccountEvent_1 = require("./events/AccountEvent");
class AccountAggregate extends AggregateRoot_1.AggregateRoot {
    constructor(applyEvent, id) {
        super(applyEvent);
        this.id = id;
    }
    createAccount() {
        this.applyEvent(new AccountEvent_1.AccountCreatedEvent(this.id, 0));
    }
    closeAccount() {
        this.applyEvent(new AccountEvent_1.AccountClosedEvent(this.id));
    }
    makeAccountDeposit(amount) {
        this.applyEvent(new AccountEvent_1.MoneyDepositedEvent(this.id, amount));
    }
    makeAccountWithdraw(amount) {
        this.applyEvent(new AccountEvent_1.MoneyWithDrawnEvent(this.id, amount));
    }
}
exports.AccountAggregate = AccountAggregate;
