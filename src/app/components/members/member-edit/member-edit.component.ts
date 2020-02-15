import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, GetSingleMemberBegin } from '../../../store';
import { IMember } from '../../../models';
import { MemberFormComponent } from '../member-form/member-form.component';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  @ViewChild(MemberFormComponent, { static: false }) form: MemberFormComponent;
  member: IMember;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.store
      .select(state => state.members.currentMemberProfile)
      .subscribe((member: IMember) => (this.member = member));
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.store.dispatch(new GetSingleMemberBegin(params.get('id')));
    });
  }
}
