import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html'
})
export class AvatarComponent implements OnInit {
  @Input() avatarUrl: string;
  @Input() text: string;

  hasAvatarUrl: boolean;

  ngOnInit() {
    this.hasAvatarUrl = true;
    if (!this.avatarUrl || !this.avatarUrl.trim()) {
      this.hasAvatarUrl = false;
    }
  }
}
