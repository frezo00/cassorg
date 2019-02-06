import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { GroupFormComponent } from '../group-form/group-form.component';
import { AppState, getSingleGroup, GetSingleGroupBegin } from '../../../store';
import { IGroup } from '../../../models';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit {
  @ViewChild(GroupFormComponent) form: GroupFormComponent;
  group$: Observable<IGroup>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.store.dispatch(new GetSingleGroupBegin(params['id']));
      this.group$ = this.store.select(getSingleGroup(params['id']));
    });
  }
}
