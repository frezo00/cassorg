import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { INavigationList } from '../../../models/navigation.model';
import { AppState, Go } from '../../../store';
import { navigationList } from '../navigation.constants';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html'
})
export class BottomNavigationComponent implements OnInit {
  navList: INavigationList[];
  activeUrl: string;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.navList = navigationList;
    this.getActiveUrl();
  }

  getActiveUrl(): void {
    this.store
      .select(state => state.router.state.url)
      .subscribe((url: string) => {
        const index = url.indexOf('/', url.indexOf('/') + 1);
        this.activeUrl = index > 0 ? url.slice(0, index) : url;
      });
  }

  onNavClick(link: string): void {
    this.store.dispatch(new Go(link));
  }
}
