import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { GlobalService } from '../global.service';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productContent: any;
  product: any;
  globalCart: any;

  constructor(public db: AngularFireDatabase, public snackBar: MdSnackBar, public route: ActivatedRoute, public globalService: GlobalService) {
    globalService.cart.subscribe((cart) => {
      this.globalCart = cart;
      window.localStorage.setItem('cart', JSON.stringify(this.globalCart));
      console.log('cart', cart);
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        this.productContent = this.db.list('/products', {
          query: {
            orderByChild: 'url',
            equalTo: params.url
          }
        });
        this.productContent.subscribe(p => {
          if (p[0].published) {
            this.product = p[0];
            if (!this.product.quantity) {
              this.product.quantity = 1;
              this.product.total = this.product.price;
            }
          } else {
            this.product = {
              title: 'Product Not Found',
              body: ''
            }
          }
        });
    });
  }

  addToCart(item) {
    this.globalCart[item.$key] = item;
    this.globalCart[item.$key]['key'] = item.$key;
    this.globalCart[item.$key]['total'] = (item.quantity * item.price);
    this.globalService.cart.next(this.globalCart);

    let snackBarRef = this.snackBar.open('Product added to cart', 'OK!', {
      duration: 3000
    });
  }

}
