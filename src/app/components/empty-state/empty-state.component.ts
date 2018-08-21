import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() firstBtnText: string;
  @Input() secondBtnText: string;
  @Input() action: string;

  @Output() firstAction = new EventEmitter<any>();
  @Output() secondAction = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  primaryAction() {
    this.firstAction.emit();
  }

  secondaryAction() {
    this.firstAction.emit();
  }
}
