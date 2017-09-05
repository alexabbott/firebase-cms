import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name:'search',
  pure: false
})
@Injectable()
export class SearchPipe implements PipeTransform {

  transform(items :any ,term :any): any {
    if (term === undefined || term === '') return items;

    if (items) {
      return items.filter((item) => {
        if (item.title && item.description && term) {
          return item.title.toLowerCase().includes(term.toLowerCase()) || item.description.toLowerCase().includes(term.toLowerCase());
        }

        if (item.title && item.body && term) {
          return item.title.toLowerCase().includes(term.toLowerCase()) || item.body.toLowerCase().includes(term.toLowerCase());
        }
      })
    }
  }
}