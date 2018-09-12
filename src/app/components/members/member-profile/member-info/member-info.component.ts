import { Component, OnInit, Input } from '@angular/core';
import { IMember } from '../../../../models';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.scss']
})
export class MemberInfoComponent implements OnInit {
  @Input() member: IMember;

  constructor() { }

  ngOnInit() {
  }

}
