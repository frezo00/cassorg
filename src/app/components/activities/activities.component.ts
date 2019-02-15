import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activities',
  template: `
    <div class="module-container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class ActivitiesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
