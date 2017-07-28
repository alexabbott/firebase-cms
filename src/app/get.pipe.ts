import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'get' })
export class GetPipe implements PipeTransform {
  transform(val, args) {
    if (val === null || !val || !val[0]) return val;
    if (val) {
      return val[0];
    }
  }
}
