import { Action } from '@ngrx/store';
import { IModal } from '../../models';

export enum CommonActionTypes {
  SHOW_LOADING = '[Common] Show Loading',

  // Modal
  SHOW_MODAL = '[Common] Show Modal',
  CLOSE_MODAL = '[Common] Close Modal'
}

export class ShowLoading implements Action {
  readonly type = CommonActionTypes.SHOW_LOADING;
  constructor(public payload: boolean) {}
}

// Modal
export class ShowModal implements Action {
  readonly type = CommonActionTypes.SHOW_MODAL;
  constructor(public payload: IModal) {}
}
export class CloseModal implements Action {
  readonly type = CommonActionTypes.CLOSE_MODAL;
  constructor(public payload: boolean) {}
}

export type CommonActions = ShowLoading | ShowModal | CloseModal;
