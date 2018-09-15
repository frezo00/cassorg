import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import {
  switchMap,
  withLatestFrom,
  filter,
  map,
  catchError,
  tap
} from 'rxjs/operators';
import {
  ApplicantsActionTypes,
  GetApplicantsSuccess,
  ApplicantsErrors,
  GetSingleApplicantBegin,
  GetSingleApplicantSuccess,
  UpdateApplicantBegin,
  UpdateApplicantSuccess
} from './applicants.actions';
import { getApplicants } from './applicants.selectors';
import { AppState } from '../../../store';
import { ApplicantsService } from '../applicants.service';
import { IApplicant } from '../../../models';
import { DocumentSnapshot } from '@angular/fire/firestore';

@Injectable()
export class ApplicantsEffects {
  @Effect()
  getApplicants$: Observable<Action> = this.actions$.pipe(
    ofType(ApplicantsActionTypes.GET_APPLICANTS_BEGIN),
    withLatestFrom(this.store$.select(getApplicants)),
    filter(([action, applicants]) => !applicants), // only continue if applicants don't exist
    switchMap(() =>
      this.applicantsService.getApplicants().pipe(
        map((applicants: IApplicant[]) => new GetApplicantsSuccess(applicants)),
        catchError(error => of(new ApplicantsErrors(error)))
      )
    )
  );

  @Effect()
  getSingleApplicant$: Observable<Action> = this.actions$.pipe(
    ofType(ApplicantsActionTypes.GET_SINGLE_APPLICANT_BEGIN),
    withLatestFrom(this.store$.select(getApplicants)),
    switchMap(
      ([action, applicants]: [GetSingleApplicantBegin, IApplicant[]]) => {
        if (!applicants) {
          return from(
            this.applicantsService.getApplicantById(action.payload)
          ).pipe(
            map(
              (applicant: DocumentSnapshot<IApplicant>) =>
                new GetSingleApplicantSuccess({
                  ...applicant.data(),
                  id: applicant.id
                } as IApplicant)
            ),
            catchError(error => of(new ApplicantsErrors(error)))
          );
        } else {
          const currentApplicant: IApplicant = applicants.find(
            applicant => applicant.id === action.payload
          );
          return of(new GetSingleApplicantSuccess(currentApplicant));
        }
      }
    )
  );

  @Effect()
  updateApplicant$: Observable<Action> = this.actions$.pipe(
    ofType(ApplicantsActionTypes.UPDATE_APPLICANT_BEGIN),
    map((action: UpdateApplicantBegin) => action.payload),
    /* withLatestFrom(this.store$.select(getApplicants)),
    filter(([action, applicants]) => !applicants), */
    switchMap((applicantId: string) =>
      from(this.applicantsService.updateApplicant(applicantId)).pipe(
        map(() => new UpdateApplicantSuccess()),
        catchError(error => of(new ApplicantsErrors(error)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private applicantsService: ApplicantsService
  ) {}
}
