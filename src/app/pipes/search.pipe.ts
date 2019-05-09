import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], searchedText: string, keys: string[]): any {
    if (!items) {
      return [];
    }
    if (items.length === 0 || !searchedText) {
      return items;
    }

    searchedText = searchedText
      .toLowerCase()
      .replace(/ /g, '')
      .trim();

    return items.filter(item => {
      let fullName = '';
      keys.forEach(key => {
        fullName += item[key];
      });
      return fullName
        .toLowerCase()
        .replace(/ /g, '')
        .trim()
        .includes(searchedText);
    });
  }
}
