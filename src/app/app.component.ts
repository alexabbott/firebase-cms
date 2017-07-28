import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router }    from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { GlobalService } from './global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  nav: FirebaseListObservable<any>;
  theme: FirebaseObjectObservable<any>;
  user: Observable<firebase.User>;

  constructor(public router: Router, public db: AngularFireDatabase, public afAuth: AngularFireAuth, public globalService: GlobalService) {
    this.nav = db.list('/menus/nav');
    this.theme = db.object('/theme');

    this.user = afAuth.authState;
    this.user.subscribe(currentUser => {
      globalService.user.next(currentUser);

      if (currentUser) {
        this.db.object('/users/' + currentUser.uid).update({
          uid: currentUser.uid,
          email: currentUser.email,
          photoURL: currentUser.photoURL
        });

        this.db.object('/users/' + currentUser.uid).subscribe((user) => {
          if (user.cart) {
            globalService.cart.next(user.cart);
          }
        });
      }

      if (!currentUser && window.localStorage.getItem('cart')) {
        this.globalService.cart.next(JSON.parse(window.localStorage.getItem('cart')));
      }
    });
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
