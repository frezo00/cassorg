import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, GetApplicantsBegin } from '../../../store';
import { IApplicant } from '../../../models';

@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.scss']
})
export class ApplicantListComponent implements OnInit {
  applicants: Observable<IApplicant[]>;
  activeDetails = -1;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new GetApplicantsBegin());
    this.applicants = this.store.select(state => state.applicants.applicants);
  }

  showInfo(index: number): void {
    if (index === this.activeDetails) {
      this.activeDetails = -1;
    } else {
      this.activeDetails = index;
    }
  }
}
