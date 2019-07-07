import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { INavigation } from '../../../models/navigation.model';
import { AppState, getActiveRoute, Go } from '../../../store';
import { navigationList } from '../navigations.constants';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html'
})
export class BottomNavigationComponent implements OnInit {
  navList: INavigation[];
  activeUrl$: Observable<string>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.navList = navigationList;
    this.activeUrl$ = this.store.select(getActiveRoute);
  }

  onLinkClick(link: string): void {
    this.store.dispatch(new Go(link));
  }
}
