import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members',
  template: `
    <section class="o-section">
      <router-outlet></router-outlet>
    </section>
  `
})
export class MembersComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
