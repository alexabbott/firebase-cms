import { Injectable }     from '@angular/core';
import { Router, CanActivate }    from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public afAuth: AngularFireAuth, public router: Router) {}

  canActivate() {
    return this.afAuth.authState.map((auth) => {
        if (!auth) {
          this.router.navigateByUrl('login');
          return false;
        }
        return true;
    }).take(1);
  }
}