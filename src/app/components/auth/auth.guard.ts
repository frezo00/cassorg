import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators';

import * as fromStore from '../../store';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private store: Store<fromStore.AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(fromStore.getIsAuthenticated).pipe(
      take(1),
      map(isAuth => {
        if (!isAuth) {
          this.store.dispatch(new fromStore.CheckLoggedInUser());
          return false;
        }
        return true;
      })
    );
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(fromStore.getIsAuthenticated).pipe(
      take(1),
      map(isAuth => {
        if (!isAuth) {
          this.store.dispatch(new fromStore.CheckLoggedInUser());
          return false;
        }
        return true;
      })
    );
  }
}
