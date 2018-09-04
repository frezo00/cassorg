import { IApplicant } from '../../../models';
import { ApplicantsActions, ApplicantsActionTypes } from './applicants.actions';

export interface ApplicantsState {
  applicants: IApplicant[];
  currentApplicantProfile: IApplicant;
  errors: any;
}

const initialState: ApplicantsState = {
  applicants: null,
  currentApplicantProfile: null,
  errors: null
};

export function applicantsReducer(
  state = initialState,
  action: ApplicantsActions
): ApplicantsState {
  switch (action.type) {
    case ApplicantsActionTypes.GET_APPLICANTS_SUCCESS: {
      return { ...state, applicants: action.payload };
    }
    case ApplicantsActionTypes.GET_SINGLE_APPLICANT_SUCCESS: {
      return { ...state, currentApplicantProfile: action.payload };
    }
    case ApplicantsActionTypes.APPLICANTS_ERRORS: {
      return { ...state, errors: action.payload };
    }

    default: {
      return state;
    }
  }
}
