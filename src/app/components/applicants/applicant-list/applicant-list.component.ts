import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, GetApplicantsBegin, SortApplicants } from '../../../store';
import { IApplicant, ISort } from '../../../models';

@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.scss']
})
export class ApplicantListComponent implements OnInit {
  applicants: Observable<IApplicant[]>;
  searchText = '';
  searchKeys: string[] = ['firstName', 'lastName'];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new GetApplicantsBegin());
    this.applicants = this.store.select(state => state.applicants.applicants);
  }

  setSort(order: ISort) {
    this.store.dispatch(new SortApplicants(order));
  }
}
