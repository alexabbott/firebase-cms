import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'get' })
export class GetPipe implements PipeTransform {
  transform(val, args) {
    if (val === null || !val || !val[0]) return val;
    if (val) {
      console.log('val', val);
      console.log('args', args);
      return val.filter((v) => {
        return v.uid === args;
      })[0];
    }
  }
}
