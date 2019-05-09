import { CommonActions, CommonActionTypes } from '../actions';

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
  action: CommonActions
): CommonState {
  switch (action.type) {
    case CommonActionTypes.SHOW_LOADING: {
      return { ...state, showLoading: action.payload };
    }

    case CommonActionTypes.SHOW_MODAL: {
      return { ...state, modal: null };
    }
    case CommonActionTypes.CLOSE_MODAL: {
      return { ...state, modal: action.payload };
    }

    default: {
      return state;
    }
  }
}
