import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {
  transform(value: string): string {
    return value && value.trim().length
      ? value
          .split(' ')
          .slice(0, 2)
          .map((word: string) =>
            word
              .trim()
              .charAt(0)
              .toUpperCase()
          )
          .join('')
      : '';
  }
}
