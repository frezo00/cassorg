import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IProject } from '../../../../models';
import { AppState, getActiveProject } from '../../../../store';

@Component({
  selector: 'app-side-top-header',
  templateUrl: './side-top-header.component.html',
  styleUrls: ['../../navigation.scss']
})
export class SideTopHeaderComponent implements OnInit {
  project: Observable<IProject>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.project = this.store.select(getActiveProject);
  }
}
