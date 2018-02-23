import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-top-header',
  template: `
    <div class="menu-header" fxLayout="column" fxLayoutAlign="start strech">
      <div class="menu-actions" fxLayoutAlign="space-between center">
        <button class="menu-icon-button" mat-icon-button>
          <mat-icon>star</mat-icon>
          <span fxHide>Set Favourite</span>
        </button>
        <div class="more-actions" fxLayoutAlign="end center">
          <button class="menu-icon-button" mat-icon-button>
            <mat-icon>compare_arrows</mat-icon>
            <span fxHide>Set Favourite</span>
          </button>
          <button class="menu-icon-button" mat-icon-button>
            <mat-icon>add</mat-icon>
            <span fxHide>Set Favourite</span>
          </button>
        </div>
      <!-- <mat-icon fontSet="fa" fontIcon="fa-exchange"></mat-icon>
            <mat-icon fontSet="fa" fontIcon="fa-plus"></mat-icon> -->
      </div>
      <div class="category-box" fxLayout="row" fxLayoutAlign="space-between center">
        <h3>Category Name</h3>
        <button class="menu-icon-button" mat-icon-button>
          <mat-icon>edit</mat-icon>
          <span fxHide>Edit</span>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['../../navigation.scss']
})
export class SideTopHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
