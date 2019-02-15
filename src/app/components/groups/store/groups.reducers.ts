import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { GroupsActions, GroupsActionTypes } from './groups.actions';
import { IGroup } from '../../../models';

export interface GroupsState extends EntityState<IGroup> {
  errors: any;
}
export const groupsAdapter: EntityAdapter<IGroup> = createEntityAdapter<
  IGroup
>();

const initialState: GroupsState = groupsAdapter.getInitialState({
  // additional entity state properties
  errors: null
});

export function groupsReducer(
  state = initialState,
  action: GroupsActions
): GroupsState {
  switch (action.type) {
    case GroupsActionTypes.GET_GROUPS_SUCCESS: {
      return groupsAdapter.addAll(action.payload, state);
    }
    case GroupsActionTypes.GROUP__ERRORS: {
      return { ...state, errors: action.payload };
    }

    default: {
      return state;
    }
  }
}
