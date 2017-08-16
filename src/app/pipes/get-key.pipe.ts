import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'getKey' })
export class GetKeyPipe implements PipeTransform {
  transform(val, args) {
    if (val === null || !val || !val[0]) return val;
    if (val) {
      return val.filter((v) => {
        return v.$key === args;
      })[0];
    }
  }
}
