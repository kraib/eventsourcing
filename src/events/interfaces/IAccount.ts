import { AccountEventType } from "../AccountEvent";

export interface AccountEvent {
  readonly type: AccountEventType;
  readonly id: string;
  readonly amount?: number;
}
