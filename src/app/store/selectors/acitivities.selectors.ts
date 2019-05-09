import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivitiesState, activitiesAdapter } from '../reducers';
import { getGroups } from '../selectors/groups.selectors';

import { IActivity, IGroup } from '../../models';

export const getActivitiesState = createFeatureSelector<ActivitiesState>(
  'activities'
);

/** Helper Entity Selectors for Activities **/
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = activitiesAdapter.getSelectors();

export const selectAllActivities = createSelector(
  getActivitiesState,
  selectAll
);
export const selectTotalActivities = createSelector(
  getActivitiesState,
  selectTotal
);
export const selectIdsActivities = createSelector(
  getActivitiesState,
  selectIds
);

/** Custom Selectors for Activities **/
export const getActivities = createSelector(
  selectAllActivities,
  getGroups,
  (activities: IActivity[], groups: IGroup[]) =>
    !!activities && !!groups
      ? activities.map((a: IActivity) => {
          return {
            ...a,
            group: groups.find((g: IGroup) => g.id === a.group)
          } as IActivity;
        })
      : null
);
