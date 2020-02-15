import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { exhaustMap, map, tap } from 'rxjs/operators';

import { AppState } from '../reducers';
import { CommonActionTypes, CloseModal, ShowModal } from '../actions';
import { IModal } from '../../models';
import { ModalComponent } from '../../components/common/modal/modal.component';

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
