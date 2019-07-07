import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export const getRouterState = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams }
    } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}

export const getActiveRoute = createSelector(
  getRouterState,
  (routerState: RouterReducerState<RouterStateUrl>) => {
    const activeUrl: string = routerState.state.url;
    const index = activeUrl.indexOf('/', activeUrl.indexOf('/') + 1);
    return index > 0 ? activeUrl.slice(0, index) : activeUrl;
  }
);
