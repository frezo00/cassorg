import { Action } from '@ngrx/store';

export enum RouterActionTypes {
  GO = '[Router] Go',
  BACK = '[Router] Back',
  FORWARD = '[Class] Forward',
  NOT_FOUND = '[Class] Not Found'
}

export class Go implements Action {
  readonly type = RouterActionTypes.GO;

  constructor(public payload: { path: string }) {}
}

export class Back implements Action {
  readonly type = RouterActionTypes.BACK;
}

export class Forward implements Action {
  readonly type = RouterActionTypes.FORWARD;
}

export class NotFound implements Action {
  readonly type = RouterActionTypes.NOT_FOUND;
}

export type RouterActions = Go | Back | Forward | NotFound;
