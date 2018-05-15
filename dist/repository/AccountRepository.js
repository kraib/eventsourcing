"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const os_1 = require("os");
const _ = require("lodash");
const BaseRepository_1 = require("./BaseRepository");
const AccountEvent_1 = require("../events/AccountEvent");
class AccountRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super();
        this.events = [];
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
    append(event) {
        fs.appendFileSync(this.eventLogPath, JSON.stringify(event) + os_1.EOL);
    }
    getEvents() {
        const eventLines = fs.readFileSync(this.eventLogPath, "utf-8");
        this.events = fs
            .readFileSync(this.eventLogPath, "utf-8")
            .split(os_1.EOL)
            .filter((eventLineStr) => eventLineStr.length)
            .map((eventLineStr) => {
            return JSON.parse(eventLineStr);
        });
    }
    rebuild() {
        this.getEvents();
        this.accounts = this.events.reduce((accounts, event) => {
            if (event.type === AccountEvent_1.AccountEventType.Open) {
                accounts[event.id] = 0;
            }
            else if (event.type === AccountEvent_1.AccountEventType.Close) {
                delete accounts[event.id];
            }
            else if (event.type === AccountEvent_1.AccountEventType.Deposit) {
                accounts[event.id] += event.amount || 0;
            }
            else if (event.type === AccountEvent_1.AccountEventType.Withdraw) {
                accounts[event.id] -= event.amount || 0;
            }
            return accounts;
        }, {});
    }
    undo(accounts, lastX) {
        this.rebuild();
        const events = this.events.splice(-lastX).reduceRight((accounts, event) => {
            if (event.type === AccountEvent_1.AccountEventType.Open) {
                delete accounts[event.id];
            }
            else if (event.type === AccountEvent_1.AccountEventType.Close) {
                accounts[event.id] = event.amount || 0;
            }
            else if (event.type === AccountEvent_1.AccountEventType.Deposit) {
                accounts[event.id] -= event.amount || 0;
            }
            else if (event.type === AccountEvent_1.AccountEventType.Withdraw) {
                accounts[event.id] += event.amount || 0;
            }
            return accounts;
        }, _.clone(accounts));
        console.log(events, "e");
    }
    query() {
        this.rebuild();
        return this.accounts;
    }
    queryBalanceById(id) {
        this.rebuild();
        return this.accounts[id];
    }
}
exports.AccountRepository = AccountRepository;
