import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  Inject
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CommonState, CloseModal } from '../store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IModal } from '../../../models';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Output() confirm: EventEmitter<boolean> = new EventEmitter();
  // openModal: Observable<boolean>;

  constructor(
    private store: Store<CommonState>,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IModal
  ) {}

  ngOnInit() {
    // this.openModal = this.store.select(getOpenModal);
  }

  onCancel() {
    // this.store.dispatch(new CloseModal(false));
    this.dialogRef.close();
  }

  onConfirm() {
    // this.store.dispatch(new CloseModal(true));
    // this.confirm.emit();
  }
}
