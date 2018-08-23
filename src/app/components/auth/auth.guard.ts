import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
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
    return this.store.select(fromStore.getUserLoginData).pipe(
      take(1),
      map(isAuth => {
        if (!isAuth) {
          this.store.dispatch(new fromStore.CheckIfUserLoggedIn());
          return false;
        }
        return true;
      })
    );
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select(fromStore.getUserLoginData).pipe(
      take(1),
      map(isAuth => {
        if (!isAuth) {
          this.store.dispatch(new fromStore.CheckIfUserLoggedIn());
          return false;
        }
        return true;
      })
    );
  }
}
