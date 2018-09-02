import { Action } from '@ngrx/store';

export enum CommonActionTypes {
  SHOW_LOADING = '[Common] Show Loading',
  OPEN_MODAL = '[Common] Open Modal'
}

export class ShowLoading implements Action {
  readonly type = CommonActionTypes.SHOW_LOADING;

  constructor(public payload: boolean) {}
}
export class OpenModal implements Action {
  readonly type = CommonActionTypes.OPEN_MODAL;

  constructor(public payload: boolean) {}
}

export type CommonActions = | ShowLoading | OpenModal;
