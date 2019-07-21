import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activities',
  template: `
    <section class="o-section">
      <router-outlet></router-outlet>
    </section>
  `
})
export class ActivitiesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
