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
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private store: Store<fromStore.AppState>,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.getAuthState().pipe(
      take(1),
      map(isAuth => {
        if (!isAuth) {
          this.store.dispatch(new fromStore.Go({ path: '/auth/login' }));
          return false;
        }
        this.store.dispatch(new fromStore.SaveUserLoginData());
        return true;
      })
    );
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.getAuthState().pipe(
      take(1),
      map(isAuth => {
        if (!isAuth) {
          this.store.dispatch(new fromStore.Go({ path: '/auth/login' }));
          return false;
        }
        this.store.dispatch(new fromStore.SaveUserLoginData());
        return true;
      })
    );
  }
}
