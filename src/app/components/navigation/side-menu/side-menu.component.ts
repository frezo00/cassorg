import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['../navigation.scss']
})
export class SideMenuComponent implements OnInit {
  @Output()
  toggleSide = new EventEmitter();

  navList: Array<{ title: string; icon: string; link: string }>;

  constructor() {}

  ngOnInit() {
    this.navList = [
      { title: 'Početna', icon: 'home', link: '/' },
      { title: 'Upisi', icon: 'how_to_vote', link: '/applicants' },
      { title: 'Članovi', icon: 'people', link: '/members' },
      { title: 'Grupe', icon: 'group_work', link: '/groups' },
      { title: 'Aktivnosti', icon: 'assessment', link: '/activities' },
      { title: 'Statistika', icon: 'trending_up', link: '/statistics' }
    ];
  }

  toggleSidenav() {
    this.toggleSide.emit();
  }
}
