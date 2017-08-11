import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthGuard implements CanActivate {
  auth: Observable<firebase.User>;

  constructor(
    public router: Router,
    public afAuth: AngularFireAuth,
  ) {
    this.auth = afAuth.authState;
  }

  canActivate(): Promise<boolean> {
    return new Promise(Resolve => {
      this.auth.subscribe(state => {
        if (state) {
          return Resolve(true);
        } else {
          this.router.navigate(['/login']);
          return Resolve(false);
        }
      })
    })
  }
}
