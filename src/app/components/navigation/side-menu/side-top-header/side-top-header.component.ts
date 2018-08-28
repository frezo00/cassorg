import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../../../../store';
import { IProject } from '../../../../models';

@Component({
  selector: 'app-side-top-header',
  templateUrl: './side-top-header.component.html',
  styleUrls: ['../../navigation.scss']
})
export class SideTopHeaderComponent implements OnInit {
  project: Observable<IProject>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.project = this.store.select(fromApp.getActiveProject);
  }
}
