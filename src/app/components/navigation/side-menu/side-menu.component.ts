import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { Go, AppState } from '../../../store';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['../navigation.scss']
})
export class SideMenuComponent implements OnInit {
  @Output() toggleSide = new EventEmitter();
  url: string;

  navList: Array<{ title: string; icon: string; link: string }>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isActive();
    this.navList = [
      { title: 'Početna', icon: 'home', link: '/' },
      { title: 'Upisi', icon: 'how_to_vote', link: '/applicants' },
      { title: 'Članovi', icon: 'people', link: '/members' },
      { title: 'Grupe', icon: 'group_work', link: '/groups' },
      { title: 'Aktivnosti', icon: 'assessment', link: '/activities' },
      { title: 'Statistika', icon: 'trending_up', link: '/statistics' }
    ];
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
