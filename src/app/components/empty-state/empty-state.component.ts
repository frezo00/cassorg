import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() btnText: string;
  @Input() action: string;

  constructor() {}

  ngOnInit() {}

  doAction() {
    console.log(this.action);
  }
}
