import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from '../../services/global.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit {
  globalCart: any;
  user: Observable<firebase.User>;
  cartItems = 0;

  constructor(public globalService: GlobalService, public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.user = afAuth.authState;

    globalService.cart.subscribe((cart) => {
      this.globalCart = cart;

      if (this.globalCart) {
        const cartArray = (<any>Object).values(this.globalCart);
        this.cartItems = cartArray.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
      } else {
        this.cartItems = 0;
      }

      this.user.subscribe(currentUser => {
        if (currentUser && currentUser.uid && cart && Object.keys(cart).length > 0) {
          db.object('/users/' + currentUser.uid).update({
            cart: cart
          });
        }
      });
    });

  }

  ngOnInit() {
  }
}
