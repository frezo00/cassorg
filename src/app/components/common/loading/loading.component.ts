import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div class="spinner">
      <div class="cube1"></div>
      <div class="cube2"></div>
    </div> `,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
