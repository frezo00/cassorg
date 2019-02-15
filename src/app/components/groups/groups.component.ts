import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groups',
  template: `
    <div class="module-container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class GroupsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
