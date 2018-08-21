import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  showImg: boolean;

  constructor(public location: Location) {}

  ngOnInit() {
    this.showImg = false;
  }
}
