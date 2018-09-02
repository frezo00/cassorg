import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  AppState,
  OpenModal,
  getOpenModal,
  getGroups,
  GetGroupsBegin
} from '../../../store';
import { ModalService } from '../../common/modal/modal.service';
import { GroupFormComponent } from '../group-form/group-form.component';
import { IGroup } from '../../../models';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit, OnDestroy {
  openModal: Observable<boolean>;
  groups: Observable<IGroup[]>;

  constructor(
    private store: Store<AppState>,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.openModal = this.store.select(getOpenModal);
    this.groups = this.store.select(getGroups);
    this.store.dispatch(new GetGroupsBegin());
    this.modalService.addDynamicComponent(GroupFormComponent);
  }

  ngOnDestroy() {
    this.modalService.removeDynamicComponent();
  }

  openNewGroupModal() {
    this.store.dispatch(new OpenModal(true));
  }
}
