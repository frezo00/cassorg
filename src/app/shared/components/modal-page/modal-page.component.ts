import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html'
})
export class ModalPageComponent implements OnInit {
  @Input() heading: string;

  constructor() {}

  ngOnInit() {}
}
