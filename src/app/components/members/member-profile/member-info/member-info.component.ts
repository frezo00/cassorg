import { Component, OnInit, Input } from '@angular/core';
import { IMember } from '../../../../models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  AppState,
  getAllMembersExceptOne,
  GetMembersBegin,
  Go
} from '../../../../store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.scss']
})
export class MemberInfoComponent implements OnInit {
  @Input()
  member: IMember;
  siblings$: Observable<IMember[]>;
  showSiblings: false;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    if (!!this.member && !!this.member.siblings) {
      this.store.dispatch(new GetMembersBegin());
      this.siblings$ = this.store.select(
        getAllMembersExceptOne(this.member.id)
      );
    }
  }

  getSiblingsData(): Observable<IMember[]> {
    return this.siblings$.pipe(
      map((siblings: IMember[]) =>
        siblings.filter((sibling: IMember) =>
          this.member.siblings.find((s: string) => s === sibling.id)
        )
      )
    );
  }

  goToSibling(siblingId: string): void {
    this.store.dispatch(new Go({ path: `/members/${siblingId}` }));
  }
}
