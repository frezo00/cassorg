import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ContentChild
} from '@angular/core';
import { ActivityFormComponent } from '../../../components/activities/activity-form/activity-form.component';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html'
})
export class ModalPageComponent implements OnInit {
  @Input() heading: string;
  @Input() action: string;
  @Output() closed = new EventEmitter();
  @Output() saved = new EventEmitter();
  @ContentChild(ActivityFormComponent) form: ActivityFormComponent;

  constructor() {}

  ngOnInit() {}

  onClose() {
    console.log('closed');
    this.closed.emit();
    // this.form.onCancel();
  }

  onSave() {
    console.log('saved');
    this.form.onSubmit();
    this.saved.emit();
  }
}
