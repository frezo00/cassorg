import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-bar',
  templateUrl: './alert-bar.component.html',
  styleUrls: ['./alert-bar.component.scss']
})
export class AlertBarComponent implements OnInit {
  isClosed: boolean;

  constructor() {}

  ngOnInit() {
    this.isClosed = false;
  }
}
