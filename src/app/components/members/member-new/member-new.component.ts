import { Component, OnInit, ViewChild } from '@angular/core';
import { MemberFormComponent } from '../member-form/member-form.component';

@Component({
  selector: 'app-member-new',
  templateUrl: './member-new.component.html',
  styleUrls: ['./member-new.component.scss']
})
export class MemberNewComponent implements OnInit {
  @ViewChild(MemberFormComponent, { static: true }) form: MemberFormComponent;

  constructor() {}

  ngOnInit() {}
}
