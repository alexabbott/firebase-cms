import { Injectable } from '@angular/core';

function getWindow(): any {
  return window;
}

@Injectable()
export class WindowRefService {

  get NativeWindow(): any {
    return getWindow();
  }

}
