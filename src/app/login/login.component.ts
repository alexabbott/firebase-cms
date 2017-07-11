import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router }    from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { GlobalService } from '../global.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: Observable<firebase.User>;

  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth, public globalService: GlobalService, public router: Router, public snackBar: MdSnackBar) {

    this.user = afAuth.authState;
    this.user.subscribe(currentUser => {

      if (currentUser) {
        let checkUser = db.list('/users', {
          query: {
            orderByChild: 'email',
            equalTo: currentUser.email
          }
        });

        checkUser.subscribe(user => {
          if (user.length > 0) {
            globalService.user.next(currentUser);

            this.db.object('/users/' + this.hashCode(currentUser.email)).set({
              uid: currentUser.uid,
              email: currentUser.email,
              photoURL: currentUser.photoURL
            });

            this.router.navigateByUrl('admin');
          } else {
            this.logout();
            let snackBarRef = this.snackBar.open('You are not an authorized user', 'OK!', {
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
