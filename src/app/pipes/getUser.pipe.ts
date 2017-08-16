import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'getUser' })
export class GetUserPipe implements PipeTransform {
  transform(val, args) {
    if (val === null || !val || !val[0]) return val;
    if (val) {
      return val.filter((v) => {
        return v.uid === args;
      })[0];
    }
  }
}
