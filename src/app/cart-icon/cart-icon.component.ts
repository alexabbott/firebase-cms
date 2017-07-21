import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.css']
})
export class CartIconComponent implements OnInit {
  globalCart: any;

  constructor(public globalService: GlobalService) {
    globalService.cart.subscribe((cart) => {
      this.globalCart = cart;
      console.log('globalCart', this.globalCart);
    });
  }

  ngOnInit() {
    if (window.localStorage.getItem('cart')) {
      this.globalCart = JSON.parse(window.localStorage.getItem('cart'));
      this.globalService.cart.next(this.globalCart);
      console.log('cartFromLocal', this.globalCart);
    }
  }
}
