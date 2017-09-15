import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Title, Meta } from '@angular/platform-browser';
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

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public globalService: GlobalService,
    public router: Router,
    public snackBar: MdSnackBar,
    private title: Title,
    private meta: Meta
  ) {

    this.admin = afAuth.authState;

    if (this.router.url.includes('login')) {
      this.showSignUp = false;
    } else if (this.router.url.includes('register')) {
      this.showSignUp = true;
    }

    this.admin.subscribe(currentAdmin => {

      if (currentAdmin) {
        let checkAdmin = db.list('/admins', {
          query: {
            orderByChild: 'email',
            equalTo: currentAdmin.email
          }
        }).take(1);

        checkAdmin.subscribe(admin => {
          if (admin.length > 0) {
            this.db.object('/admins/' + currentAdmin.uid).update({
              uid: currentAdmin.uid,
              email: currentAdmin.email,
              photoURL: currentAdmin.photoURL,
              role: admin[0].role,
              active: true
            });

            this.router.navigateByUrl('admin');
          } else {
            this.router.navigateByUrl('');
          }
        });
      }
    });
  }

  ngOnInit() {
    this.title.setTitle('Login');
    this.meta.updateTag({ content: 'Login to the admin panel' }, "name='description'");
  }

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  signUpWithEmail() {
    this.validateFields();
    this.afAuth.auth.createUserWithEmailAndPassword(this.newEmail, this.newPassword);
  }

  loginWithEmail() {
    this.validateFields();
    this.afAuth.auth.signInWithEmailAndPassword(this.newEmail, this.newPassword);
  }

  validateFields() {
    if (!this.newEmail) {
      let snackBarRef = this.snackBar.open('Email is missing', 'OK!', {
        duration: 3000
      });
      return;
    } else if (!this.newPassword) {
      let snackBarRef = this.snackBar.open('Password is missing', 'OK!', {
        duration: 3000
      });
      return;
    } else if (this.newPassword.length < 6) {
      let snackBarRef = this.snackBar.open('Password must be at least 6 characters', 'OK!', {
        duration: 3000
      });
      return;
    }
  }
}
