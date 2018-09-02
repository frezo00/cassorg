import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CommonState, OpenModal, getOpenModal } from '../store';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Output()
  confirm: EventEmitter<boolean> = new EventEmitter();
  openModal: Observable<boolean>;

  constructor(private store: Store<CommonState>) {}

  ngOnInit() {
    this.openModal = this.store.select(getOpenModal);
  }

  onCancel() {
    this.store.dispatch(new OpenModal(false));
  }

  onConfirm() {
    this.store.dispatch(new OpenModal(false));
    this.confirm.emit();
  }
}
