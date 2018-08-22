import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  template: `
    <div class="auth__container" fxFlexFill>
      <div class="auth__wrapper" fxLayout="column" fxLayoutAlign="space-between center">
        <div class="auth__bg-image"></div>
        <div class="auth__logo">
          <img src="assets/images/big_title.png" alt="Logo">
        </div>
        <div class="auth__content" fxLayoutAlign="center center">
          <div fxFlex="100%" fxFlex.sm="70%" fxFlex.md="50%" fxFlex.gt-md="30%">
            <router-outlet></router-outlet>
          </div>
        </div>
        <div class="auth__rights">
          <p>&copy; 2018. Sva prava pridržana</p>
        </div>
      </div>
    </div>
    `,
  styleUrls: ['./auth.scss']
})
export class AuthComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
