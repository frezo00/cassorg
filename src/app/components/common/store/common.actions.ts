import { Action } from '@ngrx/store';

export enum CommonActionTypes {
  SHOW_LOADING = '[Common] Show Loading'
}

export class ShowLoading implements Action {
  readonly type = CommonActionTypes.SHOW_LOADING;

  constructor(public payload: boolean) {}
}

export type CommonActions = ShowLoading;
