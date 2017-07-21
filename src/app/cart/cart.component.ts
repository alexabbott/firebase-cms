import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  globalCart: any;
  cartArray: any;

  constructor(public globalService: GlobalService, public snackBar: MdSnackBar) {
    this.cartArray = [];

    globalService.cart.subscribe((cart) => {
      this.globalCart = cart;
      this.cartArray = [];
      this.cartArray = (<any>Object).values(this.globalCart);
      window.localStorage.setItem('cart', JSON.stringify(this.globalCart));
      console.log('cartArray', this.cartArray);
    });
  }

  updateCart(item) {
    this.globalCart[item.key] = item;
    this.globalCart[item.key]['total'] = (item.quantity * item.price);
    this.globalService.cart.next(this.globalCart);

    let snackBarRef = this.snackBar.open('Cart updated', 'OK!', {
      duration: 3000
    });
  }

  removeItem(item) {
    delete this.globalCart[item.key];
    this.globalService.cart.next(this.globalCart);

    let snackBarRef = this.snackBar.open('Item removed', 'OK!', {
      duration: 3000
    });
  }

  ngOnInit() {
  }

}
