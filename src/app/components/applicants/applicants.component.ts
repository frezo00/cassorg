import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, GetApplicantsBegin } from '../../store';
import { IApplicant } from '../../models';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss']
})
export class ApplicantsComponent implements OnInit {
  applicants: Observable<IApplicant[]>;
  activeDetails = -1;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new GetApplicantsBegin());
    this.applicants = this.store.select(state => state.users.applicants);
  }

  showInfo(index: number): void {
    if (index === this.activeDetails) {
      this.activeDetails = -1;
    } else {
      this.activeDetails = index;
    }
  }
}
