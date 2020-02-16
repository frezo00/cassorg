import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cas-header-expanded',
  templateUrl: './header-expanded.component.html'
})
export class HeaderExpandedComponent implements OnInit {
  @Input() title: string;
  @Input() imageUrl: string;
  @Output() back = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onBack() {
    this.back.emit();
  }

  onEdit() {
    console.log('edit');
  }

  onDelete() {
    console.log('delete');
  }
}
