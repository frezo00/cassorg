import { Component, OnInit, Input } from '@angular/core';
import { IApplicant } from '../../../models';

@Component({
  selector: 'app-applicant-user-form',
  templateUrl: './applicant-user-form.component.html',
  styleUrls: ['./applicant-user-form.component.scss']
})
export class ApplicantUserFormComponent implements OnInit {
  @Input()
  applicant: IApplicant;

  constructor() {}

  ngOnInit() {}
}
