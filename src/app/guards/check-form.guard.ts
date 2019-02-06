import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, filter } from 'rxjs/operators';

import { AppState, getModal, ShowModal } from '../store';

@Injectable({
  providedIn: 'root'
})
export class CheckFormGuard implements CanDeactivate<any> {
  constructor(private store: Store<AppState>) {}

  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const formProperty: string = Object.keys(component.form).find(
      (key: string) => key.includes('Form')
    );
    return component.form[formProperty].dirty ||
      component.form[formProperty].touched
      ? this.waitForModal(nextState.url)
      : true;
  }

  waitForModal(nextUrl: string): Observable<boolean> {
    this.store.dispatch(
      new ShowModal({
        nextUrl,
        title: 'Odbaci promjene?',
        content: 'Imate nespremljene promjene na ovoj stranici.'
      })
    );
    return this.store.select(getModal).pipe(
      filter((bool: boolean) => bool !== null),
      take(1)
    );
  }
}
