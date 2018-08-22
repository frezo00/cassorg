import * as CommonActions from './common.actions';

export interface CommonState {
  showLoading: boolean;
}

const initialState: CommonState = {
  showLoading: false
};

export function commonReducer(
  state = initialState,
  action: CommonActions.CommonActions
): CommonState {
  switch (action.type) {
    case CommonActions.CommonActionTypes.SHOW_LOADING: {
      return { ...state, showLoading: action.payload };
    }

    default: {
      return state;
    }
  }
}
