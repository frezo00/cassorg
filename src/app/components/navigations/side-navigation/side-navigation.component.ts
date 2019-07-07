import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUserLogin } from '../../../models';
import { INavigationList } from '../../../models/navigation.model';
import { AppState, getActiveRoute, getUserLoginData, Go } from '../../../store';
import { navigationList } from '../navigations.constants';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html'
})
export class SideNavigationComponent implements OnInit {
  navList: INavigationList[];
  activeUrl$: Observable<string>;
  loggedInUser$: Observable<IUserLogin>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.navList = navigationList;
    this.activeUrl$ = this.store.select(getActiveRoute);
    this.loggedInUser$ = this.store.select(getUserLoginData);
  }

  onLinkClick(link: string): void {
    this.store.dispatch(new Go(link));
  }
}
