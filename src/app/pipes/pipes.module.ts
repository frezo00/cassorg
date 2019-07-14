import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgePipe } from './age/age.pipe';
import { FirstLetterPipe } from './first-letter/first-letter.pipe';
import { InitialsPipe } from './initials/initials.pipe';
import { ObjectToArrayPipe } from './obj-to-array/object-to-array.pipe';
import { SearchPipe } from './search/search.pipe';
import { UserSizePipe } from './user-size/user-size.pipe';

@NgModule({
  declarations: [
    AgePipe,
    FirstLetterPipe,
    ObjectToArrayPipe,
    InitialsPipe,
    SearchPipe,
    UserSizePipe
  ],
  imports: [CommonModule],
  exports: [AgePipe, FirstLetterPipe, ObjectToArrayPipe, InitialsPipe, SearchPipe, UserSizePipe]
})
export class PipesModule {}
