import * as CommonActions from './common.actions';

export interface CommonState {
  showLoading: boolean;
  openModal: boolean;
}

const initialState: CommonState = {
  showLoading: false,
  openModal: false
};

export function commonReducer(
  state = initialState,
  action: CommonActions.CommonActions
): CommonState {
  switch (action.type) {
    case CommonActions.CommonActionTypes.SHOW_LOADING: {
      return { ...state, showLoading: action.payload };
    }
    case CommonActions.CommonActionTypes.OPEN_MODAL: {
      return { ...state, openModal: action.payload };
    }

    default: {
      return state;
    }
  }
}
