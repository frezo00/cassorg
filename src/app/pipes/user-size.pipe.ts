import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userSize'
})
export class UserSizePipe implements PipeTransform {
  transform(value: string, args?: any): any {
    if (Number(value)) {
      return this.checkValue(Number(value));
    } else {
      return 'članova';
    }
  }

  public checkValue(num: number): string {
    if (num % 10 === 1) {
      return 'član';
    } else if (num % 10 === 2 || num % 10 === 3 || num % 10 === 4) {
      return 'člana';
    }
    return 'članova';
  }
}
