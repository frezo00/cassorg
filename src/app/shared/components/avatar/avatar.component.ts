import { Component, Input, OnInit } from '@angular/core';

import { Color } from '../../../enums';
import { getRandomColor } from '../../../utils';

@Component({
  selector: 'cas-avatar',
  templateUrl: './avatar.component.html'
})
export class AvatarComponent implements OnInit {
  @Input() url: string;
  @Input() text: string;

  randomColor: Color[keyof Color];

  ngOnInit(): void {
    if (!this.url) {
      this.randomColor = getRandomColor();
    }
  }
}
