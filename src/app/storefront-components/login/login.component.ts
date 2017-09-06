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
  newEmail: string;
  newPassword: string;
  showSignUp: boolean;

  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth, public globalService: GlobalService, public router: Router, public snackBar: MdSnackBar) {

    this.admin = afAuth.authState;
    this.showSignUp = false;
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
            this.db.object('/admins/' + this.globalService.hashCode(currentAdmin.email)).update({
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

  signUpWithEmail() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.newEmail, this.newPassword);
  }

  loginWithEmail() {
    this.afAuth.auth.signInWithEmailAndPassword(this.newEmail, this.newPassword);
  }

  ngOnInit() {
  }

}
