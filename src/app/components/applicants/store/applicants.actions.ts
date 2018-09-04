import { Action } from '@ngrx/store';
import { IApplicant } from '../../../models';

export enum ApplicantsActionTypes {
  // Get ALL Applicants
  GET_APPLICANTS_BEGIN = '[Applicants] Get Applicants Begin',
  GET_APPLICANTS_SUCCESS = '[Applicants] Get Applicants Success',

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
  | GetSingleApplicantBegin
  | GetSingleApplicantSuccess
  | ApplicantsErrors;
