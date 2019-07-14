import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToArray'
})
export class ObjectToArrayPipe implements PipeTransform {
  transform(obj: object): string[] {
    return Object.keys(obj).map((key: string) => obj[key]);
  }
}
