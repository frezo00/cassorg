import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html'
})
export class ModalPageComponent implements OnInit {
  @Input() heading: string;
  @Output() closed = new EventEmitter();
  @Output() saved = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onClose() {
    console.log('closed');
    this.closed.emit();
  }

  onSave() {
    console.log('saved');
    this.saved.emit();
  }
}
