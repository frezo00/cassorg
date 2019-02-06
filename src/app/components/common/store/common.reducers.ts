import * as CommonActions from './common.actions';

export interface CommonState {
  showLoading: boolean;
  modal: boolean;
}

const initialState: CommonState = {
  showLoading: false,
  modal: null
};

export function commonReducer(
  state = initialState,
  action: CommonActions.CommonActions
): CommonState {
  switch (action.type) {
    case CommonActions.CommonActionTypes.SHOW_LOADING: {
      return { ...state, showLoading: action.payload };
    }

    case CommonActions.CommonActionTypes.SHOW_MODAL: {
      return { ...state, modal: null };
    }
    case CommonActions.CommonActionTypes.CLOSE_MODAL: {
      return { ...state, modal: action.payload };
    }

    default: {
      return state;
    }
  }
}
