import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  template: `
    <div class="auth__container" fxFlexFill>
      <router-outlet></router-outlet>
    </div>  `,
  styleUrls: ['./auth.scss']
})
export class AuthComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
