import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-member-image',
  templateUrl: './member-image.component.html',
  styleUrls: ['./member-image.component.scss']
})
export class MemberImageComponent implements OnInit {
  @Input()
  photoURL: string;
  @Output()
  imageChanged: EventEmitter<any> = new EventEmitter();
  tempImage: any;

  constructor() {}

  ngOnInit() {}

  onSelectedImage(event) {
    const profileImage = event.target.files[0];
    if (!!profileImage) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.tempImage = e.target.result;
      };
      reader.readAsDataURL(profileImage);
      this.imageChanged.emit(profileImage);
    }
  }
}
