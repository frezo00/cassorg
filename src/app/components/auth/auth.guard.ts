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

import { AppState } from '../../store';
import { Go } from '../../router/store/router.actions';
import { SaveUserLoginDataBegin } from '../auth/store/auth.actions';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private store: Store<AppState>,
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
          this.store.dispatch(new Go({ path: '/auth/login' }));
          return false;
        }
        this.store.dispatch(new SaveUserLoginDataBegin());
        return true;
      })
    );
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.getAuthState().pipe(
      take(1),
      map(isAuth => {
        if (!isAuth) {
          this.store.dispatch(new Go({ path: '/auth/login' }));
          return false;
        }
        this.store.dispatch(new SaveUserLoginDataBegin());
        return true;
      })
    );
  }
}
