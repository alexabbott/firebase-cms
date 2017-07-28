import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalService } from '../global.service';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.css']
})
export class CartIconComponent implements OnInit {
  globalCart: any;
  user: Observable<firebase.User>;

  constructor(public globalService: GlobalService, public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.user = afAuth.authState;
  
    globalService.cart.subscribe((cart) => {
      this.globalCart = cart;

      this.user.subscribe(currentUser => {
        if (currentUser && currentUser.uid && cart && Object.keys(cart).length > 0) {
          db.object('/users/' + currentUser.uid).update({
            cart: cart
          })
        }
      });
    });

  }

  ngOnInit() {
  }
}
