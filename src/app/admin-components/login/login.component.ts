import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router }    from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { GlobalService } from '../../services/global.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  admin: Observable<firebase.User>;

  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth, public globalService: GlobalService, public router: Router, public snackBar: MdSnackBar) {

    this.admin = afAuth.authState;
    this.admin.subscribe(currentAdmin => {

      if (currentAdmin) {
        let checkAdmin = db.list('/admins', {
          query: {
            orderByChild: 'email',
            equalTo: currentAdmin.email
          }
        });

        checkAdmin.subscribe(admin => {
          if (admin.length > 0) {
            this.db.object('/admins/' + this.hashCode(currentAdmin.email)).set({
              uid: currentAdmin.uid,
              email: currentAdmin.email,
              photoURL: currentAdmin.photoURL,
              active: true
            });

            this.router.navigateByUrl('admin');
          } else {
            this.logout();
            let snackBarRef = this.snackBar.open('You are not an authorized administrator', 'OK!', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  hashCode(input:string) {
    let hash = 0, i, chr;
    if (input.length === 0) return hash;
    for (i = 0; i < input.length; i++) {
      chr   = input.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

  ngOnInit() {
  }

}
