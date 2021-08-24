import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { GlobalService } from '@services/global.service';
import { LocalCartService } from '@services/localcart.service';

@Component({
  selector: 'main',
  templateUrl: 'main.component.html',
  styleUrls: [`main.component.scss`]
})
export class MainComponent {
  title = 'app';
  nav: Observable<any>;
  theme: Observable<any>;
  user: Observable<firebase.default.User>;
  cartTotal$: Observable<number>;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public globalService: GlobalService,
    public localCart: LocalCartService,
  ) {
    this.nav = db.list('/menus/nav').valueChanges();
    this.theme = db.object('/theme').valueChanges();
    this.cartTotal$ = this.globalService.cartTotalItems;

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

        this.db.object('/users/' + currentUser.uid).valueChanges().subscribe((user: any) => {
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
    this.afAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
  }

  logout() {
    this.globalService.cart.next(null);
    this.globalService.order.next(null);
    this.localCart.clearAll();
    this.afAuth.signOut();
  }


}
