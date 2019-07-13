import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-expanded',
  templateUrl: './header-expanded.component.html',
  styleUrls: ['./header-expanded.component.scss']
})
export class HeaderExpandedComponent implements OnInit {
  @Input() title: string;
  @Input() imageUrl: string;

  constructor() {}

  ngOnInit() {}
}
