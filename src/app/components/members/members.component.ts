import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members',
  template: `
    <div class="module-container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class MembersComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
