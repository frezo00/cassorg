import { Component, OnInit, ViewChild } from '@angular/core';

import { GroupFormComponent } from '../group-form/group-form.component';

@Component({
  selector: 'app-group-new',
  templateUrl: './group-new.component.html',
  styleUrls: ['./group-new.component.scss']
})
export class GroupNewComponent implements OnInit {
  @ViewChild(GroupFormComponent) form: GroupFormComponent;

  constructor() {}

  ngOnInit() {}
}
