import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, Go, GetSingleApplicantBegin } from '../../../store';
import { IApplicant } from '../../../models';

@Component({
  selector: 'app-applicant-profile',
  templateUrl: './applicant-profile.component.html',
  styleUrls: ['./applicant-profile.component.scss']
})
export class ApplicantProfileComponent implements OnInit {
  applicant: IApplicant;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.store
      .select(state => state.applicants.currentApplicantProfile)
      .subscribe((applicant: IApplicant) => (this.applicant = applicant));
  }

  ngOnInit() {
    this.store.dispatch(
      new GetSingleApplicantBegin(this.route.snapshot.paramMap.get('id'))
    );
  }

  acceptApplicant(): void {
    this.store.dispatch(new Go('/applicants/new-user'));
  }

  removeApplicant(): void {
    console.log('remove');
  }
}
