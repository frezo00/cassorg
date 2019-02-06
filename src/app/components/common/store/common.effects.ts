import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { exhaustMap, map, tap } from 'rxjs/operators';

import { ModalComponent } from '../modal/modal.component';
import { CommonActionTypes, CloseModal, ShowModal } from './common.actions';
import { AppState } from '../../../store';
import { IModal } from '../../../models';

@Injectable()
export class CommonEffects {
  @Effect() showModal$: Observable<Action> = this.actions$.pipe(
    ofType(CommonActionTypes.SHOW_MODAL),
    map((action: ShowModal) => action.payload),
    exhaustMap((modalData: IModal) => {
      const dialogRef = this.dialog.open(ModalComponent, {
        data: modalData
      });
      return dialogRef.afterClosed();
    }),
    map((result: any) =>
      !result ? new CloseModal(false) : new CloseModal(true)
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private dialog: MatDialog
  ) {}
}
