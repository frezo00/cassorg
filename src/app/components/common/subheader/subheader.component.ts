import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  actionText = '';
  @Input()
  title: string;
  @Input()
  subtitle: string;
  @Output() action: EventEmitter<any> = new EventEmitter();

  constructor(public location: Location) {}

  ngOnInit() {}

  onAction() {
    this.action.emit();
  }
}
