import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss']
})
export class SubheaderComponent implements OnInit {
  @Input()
  showBackButton = false;
  @Input()
  showActionButton = false;
  @Input()
  actionText = '';
  @Input()
  actionRoute = '';
  @Input()
  title: string;
  @Input()
  subtitle: string;

  constructor(public location: Location) {}

  ngOnInit() {}
}
