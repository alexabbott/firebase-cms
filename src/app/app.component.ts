import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router }    from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { GlobalService } from './services/global.service';
import { LocalCartService } from "app/services/localcart.service";

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

  constructor(
    public router: Router,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public globalService: GlobalService,
    public localCart: LocalCartService
  ) {
    this.nav = db.list('/menus/nav');
    this.theme = db.object('/theme');

    this.user = afAuth.authState;
    this.user.subscribe(currentUser => {
      globalService.user.next(currentUser);

      if (currentUser) {
        this.db.object('/users/' + currentUser.uid).update({
          uid: currentUser.uid,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          status: 'active'
        });

        this.db.object('/users/' + currentUser.uid).subscribe((user) => {
          if (user.cart) {
            globalService.cart.next(user.cart);
          }
        });
      }

      if (!currentUser && this.localCart.cartHasItems()) {
        this.globalService.cart.next(this.localCart.cartGetItems());
      }
    });
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.globalService.cart.next(null);
    this.globalService.order.next(null);
    this.localCart.clearCart();
    this.afAuth.auth.signOut();
  }
}
