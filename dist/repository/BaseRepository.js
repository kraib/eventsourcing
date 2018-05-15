"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRepository {
    append(event) {
        throw new Error("Method not implemented.");
    }
    undo(accounts, lastX) {
        throw new Error("Method not implemented.");
    }
    reset() {
        throw new Error("Method not implemented.");
    }
    query() {
        throw new Error("Method not implemented.");
    }
    queryBalanceById(account) {
        throw new Error("Method not implemented.");
    }
    getEvents() {
        throw new Error("Method not implemented.");
    }
    rebuild(number) {
        throw new Error("Method not implemented.");
    }
}
exports.BaseRepository = BaseRepository;
