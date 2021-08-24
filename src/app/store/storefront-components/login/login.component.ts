import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Title, Meta } from '@angular/platform-browser';
import { Router }    from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { GlobalService } from '@services/global.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take } from 'rxjs/operators'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  admin: Observable<firebase.default.User>;
  newEmail: string;
  newPassword: string;
  showSignUp: boolean;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public globalService: GlobalService,
    public router: Router,
    public snackBar: MatSnackBar,
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
        db.object('/admins/' + this.globalService.hashCode(currentAdmin.email)).valueChanges().pipe(take(1)).subscribe((admin:any) => {
          if (admin && admin.role) {
            this.db.object('/admins/' + currentAdmin.uid).update({
              uid: currentAdmin.uid,
              email: currentAdmin.email,
              photoURL: currentAdmin.photoURL,
              role: admin.role,
              active: true
            }).catch((err) => {
              console.log('Permission Error', err);
              this.router.navigateByUrl('');
              let snackBarRef = this.snackBar.open('You are not an authorized administrator', 'OK!', {
                duration: 3000
              });
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
    this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }

  signUpWithEmail() {
    this.afAuth.createUserWithEmailAndPassword(this.newEmail, this.newPassword).catch((error) => {
      let snackBarRef = this.snackBar.open(error.message, 'OK!', {
        duration: 3000
      });
    });
  }

  loginWithEmail() {
    this.afAuth.signInWithEmailAndPassword(this.newEmail, this.newPassword).catch((error) => {
      let snackBarRef = this.snackBar.open(error.message, 'OK!', {
        duration: 3000
      });
    });
  }
}
