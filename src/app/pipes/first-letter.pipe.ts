import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetter'
})
export class FirstLetterPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (value !== '' && !!value) {
      return value.charAt(0);
    }
    return null;
  }
}
