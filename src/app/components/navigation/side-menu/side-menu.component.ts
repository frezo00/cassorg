import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['../navigation.scss']
})
export class SideMenuComponent implements OnInit {
  @Output() toggleSide = new EventEmitter();

  isGroupOpened: false;
  navList: Array<{ title: string; icon: string; link: string }>;

  constructor() {}

  ngOnInit() {
    this.navList = [
      { title: 'Dashboard', icon: 'home', link: '/' },
      { title: 'Users', icon: 'people', link: '/users' },
      { title: 'Groups', icon: 'group_work', link: '/groups' },
      { title: 'Activities', icon: 'assessment', link: '/activities' },
      { title: 'Statistics', icon: 'trending_up', link: '/statistics' }
    ];
  }

  toggleSidenav() {
    this.toggleSide.emit();
  }
}
