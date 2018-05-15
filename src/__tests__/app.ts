import { AccountsService } from "../app";
import { AccountRepository } from "../repository/AccountRepository";
const service = new AccountsService(new AccountRepository());

afterAll(() => {
  service.reset();
  return;
});

test("can create accounts", () => {
  service.createAccount("account");
  expect(Object.keys(service.getRepository().query()).length).toBe(1);
  expect(service.getRepository().queryBalanceById("account")).toBe(0);
  expect(service.createAccount("account")).toThrow("Account already exists");
  return;
});

test("can make deposits", () => {
  service.createAccount("deposit-account");
  service.makeDeposit("deposit-account", 100);
  service.makeDeposit("deposit-account", 200);
  expect(service.getRepository().queryBalanceById("deposit-account")).toBe(300);
  return;
});

test("can make with draw", () => {
  service.createAccount("withdraw-account");
  service.makeDeposit("withdraw-account", 100);
  service.makeWithDraw("withdraw-account", 50);
  expect(service.getRepository().queryBalanceById("withdraw-account")).toBe(50);
  expect(service.makeWithDraw("withdraw-account", 50)).toThrow(
    "Account does not exist"
  );
  return;
});
// to-be implemented
test("can undo", () => {
  service.createAccount("undo-account");
  service.makeDeposit("undo-account", 100);
  service.makeWithDraw("undo-account", 50);
  expect(service.undo("undo-account", 0)).toBe(100);
  return;
});
