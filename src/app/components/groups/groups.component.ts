import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groups',
  template: `
    <section class="o-section">
      <router-outlet></router-outlet>
    </section>
  `
})
export class GroupsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
