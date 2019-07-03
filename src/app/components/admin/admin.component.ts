import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { toggleSideMenu } from '../../animations/side-menu.animation';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  animations: [toggleSideMenu]
})
export class AdminComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  tabletQuery: MediaQueryList;
  toggleMenu: boolean;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 599px)');
    this.tabletQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.tabletQuery.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  ngOnInit(): void {
    this.toggleMenu = true;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
