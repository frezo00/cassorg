import {
  Component,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { ModalService } from '../common/modal/modal.service';
import { GroupFormComponent } from '../groups/group-form/group-form.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  tabletQuery: MediaQueryList;
  @ViewChild('modal', { read: ViewContainerRef })
  viewContainerRef: ViewContainerRef;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public modalService: ModalService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 599px)');
    this.tabletQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.tabletQuery.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  ngOnInit() {
    this.modalService.setRootViewContainerRef(this.viewContainerRef);
    // this.modalService.addDynamicComponent(GroupFormComponent);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
