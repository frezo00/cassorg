import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-participants-form',
  templateUrl: './activity-participants-form.component.html'
})
export class ActivityParticipantsFormComponent implements OnInit {
  toggleBtn: 'groups' | 'members';

  constructor() {}

  ngOnInit() {
    this.toggleBtn = 'groups';
  }
}
