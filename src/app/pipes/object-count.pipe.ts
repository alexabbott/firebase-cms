import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectCount'
})
export class ObjectCountPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return Object.keys(value).length;
    } else {
      return 0;
    }
  }

}
