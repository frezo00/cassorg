import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applicants',
  template: `
    <div class="module__container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class ApplicantsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
