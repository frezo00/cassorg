import { Action } from '@ngrx/store';
import { IRouter } from '../../models';

export enum NavigationActionTypes {
  GO = '[Navigation] Go',
  BACK = '[Navigation] Back',
  FORWARD = '[Navigation] Forward',
  NOT_FOUND = '[Navigation] Not Found'
}

export class Go implements Action {
  readonly type = NavigationActionTypes.GO;
  constructor(public payload: string) {}
}

export class Back implements Action {
  readonly type = NavigationActionTypes.BACK;
}

export class Forward implements Action {
  readonly type = NavigationActionTypes.FORWARD;
}

export class NotFound implements Action {
  readonly type = NavigationActionTypes.NOT_FOUND;
}

export type NavigationActions = Go | Back | Forward | NotFound;
