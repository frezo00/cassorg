import { Action } from '@ngrx/store';
import { IApplicant, ISort } from '../../../models';

export enum ApplicantsActionTypes {
  // Get ALL Applicants
  GET_APPLICANTS_BEGIN = '[Applicants] Get Applicants Begin',
  GET_APPLICANTS_SUCCESS = '[Applicants] Get Applicants Success',

  // Sort and Limit Applicants
  SORT_APPLICANTS = '[Applicants] Sort Applicants',
  LIMIT_APPLICANTS = '[Applicants] Limit Applicants',

  // Get SINGLE Applicant
  GET_SINGLE_APPLICANT_BEGIN = '[Applicants] Get Single Applicant Begin',
  GET_SINGLE_APPLICANT_SUCCESS = '[Applicants] Get Single Applicant Success',

  // Errors
  APPLICANTS_ERRORS = '[Applicants] Applicants Errors'
}

// Get ALL Applicants
export class GetApplicantsBegin implements Action {
  readonly type = ApplicantsActionTypes.GET_APPLICANTS_BEGIN;
}
export class GetApplicantsSuccess implements Action {
  readonly type = ApplicantsActionTypes.GET_APPLICANTS_SUCCESS;
  constructor(public payload: IApplicant[]) {}
}

// Sort and Limit Applicants
export class SortApplicants implements Action {
  readonly type = ApplicantsActionTypes.SORT_APPLICANTS;
  constructor(public payload: ISort) {}
}
export class LimitApplicants implements Action {
  readonly type = ApplicantsActionTypes.LIMIT_APPLICANTS;
  constructor(public payload: number) {}
}

// Get SINGLE Applicant
export class GetSingleApplicantBegin implements Action {
  readonly type = ApplicantsActionTypes.GET_SINGLE_APPLICANT_BEGIN;
  constructor(public payload: string) {}
}
export class GetSingleApplicantSuccess implements Action {
  readonly type = ApplicantsActionTypes.GET_SINGLE_APPLICANT_SUCCESS;
  constructor(public payload: IApplicant) {}
}

// Errors
export class ApplicantsErrors implements Action {
  readonly type = ApplicantsActionTypes.APPLICANTS_ERRORS;
  constructor(public payload: any) {}
}

export type ApplicantsActions =
  | GetApplicantsBegin
  | GetApplicantsSuccess
  | SortApplicants
  | LimitApplicants
  | GetSingleApplicantBegin
  | GetSingleApplicantSuccess
  | ApplicantsErrors;
