import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { INavigationList } from '../../../models/navigation.model';
import { IUserLogin } from '../../../models';
import { AppState, getUserLoginData, Go } from '../../../store';
import { navigationList } from '../navigation.constants';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['../navigation.scss']
})
export class SideMenuComponent implements OnInit {
  @Output() toggleSide = new EventEmitter();
  url: string;
  loggedInUser$: Observable<IUserLogin>;
  navList: INavigationList[];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isActive();
    this.navList = navigationList;
    this.loggedInUser$ = this.store.select(getUserLoginData);
  }

  isActive(): void {
    this.store
      .select(state => state.router.state.url)
      .subscribe((url: string) => {
        const index = url.indexOf('/', url.indexOf('/') + 1);
        this.url = index > 0 ? url.slice(0, index) : url;
      });
  }

  goTo(link: string): void {
    this.store.dispatch(new Go(link));
    this.toggleSide.emit();
  }
}
