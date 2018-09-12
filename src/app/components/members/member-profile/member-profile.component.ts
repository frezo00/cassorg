import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState, GetSingleMemberBegin } from '../../../store';
import { IMember } from '../../../models';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss']
})
export class MemberProfileComponent implements OnInit {
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

  someMethod() {}
}
