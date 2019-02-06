import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState, GetSingleApplicantBegin, Go } from '../../../store';
import { IApplicant, IMember } from '../../../models';

@Component({
  selector: 'app-applicant-user-form',
  templateUrl: './applicant-user-form.component.html',
  styleUrls: ['./applicant-user-form.component.scss']
})
export class ApplicantUserFormComponent implements OnInit {
  applicant: IApplicant;
  member: IMember;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    this.store
      .select(state => state.applicants.currentApplicantProfile)
      .subscribe((applicant: IApplicant) => {
        if (!!applicant) {
          this.applicant = applicant;
          this.member = this.applicantToMember(applicant);
        } else {
          this.store.dispatch(new Go('/applicants'));
        }
      });
    /* this.store.dispatch(
      new GetSingleApplicantBegin(this.route.snapshot.paramMap.get('id'))
    ); */
  }

  applicantToMember(applicant: IApplicant): IMember {
    return {
      firstName: applicant.firstName,
      lastName: applicant.lastName,
      birthdate: applicant.birthdate,
      phoneNumber: applicant.phoneNumber,
      parents: applicant.parentsNames,
      email: applicant.email,
      note: applicant.message,
      applicantId: applicant.id
    } as IMember;
  }
}
