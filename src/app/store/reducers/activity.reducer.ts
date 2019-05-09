import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ActivitiesActions, ActivitiesActionTypes } from '../actions';
import { IActivity } from '../../models';

export interface ActivitiesState extends EntityState<IActivity> {
  errors: any;
}
export const activitiesAdapter: EntityAdapter<IActivity> = createEntityAdapter<
  IActivity
>();

const initialState: ActivitiesState = activitiesAdapter.getInitialState({
  // additional entity state properties
  errors: null
});

export function activitiesReducer(
  state = initialState,
  action: ActivitiesActions
): ActivitiesState {
  switch (action.type) {
    case ActivitiesActionTypes.GET_ACTIVITIES_SUCCESS: {
      return activitiesAdapter.addAll(action.payload, state);
    }

    default: {
      return state;
    }
  }
}
